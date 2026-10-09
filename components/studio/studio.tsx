"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { browserSessionPersistence, onIdTokenChanged, setPersistence, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { getStudioFirebase } from "@/lib/studio-firebase";
import { emptyProject, projectSchema, type Project, type ProjectInput } from "@/lib/project-schema";
import { removeProject, saveProject } from "@/lib/project-mutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Field, FieldGroup, FieldLabel } from "./fields";

type Session = { state: "loading" | "guest" | "denied" | "admin" | "configuration"; user?: User };
const textFields = [
  { key: "title", label: "Project title", max: 100 },
  { key: "category", label: "Category", max: 60 },
  { key: "stack", label: "Technologies (comma separated)", max: 300 },
  { key: "liveUrl", label: "Live URL (optional, HTTPS)", max: 500 },
  { key: "repoUrl", label: "Repository URL (optional, HTTPS)", max: 500 },
] as const;
function errorMessage(error: unknown) {
  const code = (error as { code?: string })?.code;
  if (code === "auth/too-many-requests") return "Too many attempts. Wait a moment and try again.";
  if (code?.startsWith("auth/")) return "Sign-in failed. Check your credentials and connection.";
  if (code === "permission-denied") return "Access denied. Sign in again and check your admin claim.";
  return "The operation could not be completed. Check your connection and retry.";
}
async function revalidatePublicPages(id?: string) {
  try {
    const user = getStudioFirebase().auth.currentUser;
    if (!user) return;
    const token = await user.getIdToken();
    await fetch("/api/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
      body: JSON.stringify(id ? { id } : {}),
    });
  } catch {
    // Public pages still refresh through timed revalidation; do not block the studio flow.
  }
}
export default function Studio() {
  const [session, setSession] = useState<Session>({ state: "loading" });
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [form, setForm] = useState<ProjectInput>({ ...emptyProject });
  const [editing, setEditing] = useState<string>();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [deleting, setDeleting] = useState<Project | null>(null);
  const [deleteError, setDeleteError] = useState("");
  const [legacyCount, setLegacyCount] = useState(0);
  const titleInput = useRef<HTMLInputElement>(null);
  const operation = useRef(false);

  useEffect(() => {
    let active = true;
    let revision = 0;
    try {
      const { auth } = getStudioFirebase();
      const unsubscribe = onIdTokenChanged(auth, async user => {
        const current = ++revision;
        setSession({ state: "loading" });
        setProjects([]);
        setEditing(undefined);
        setForm({ ...emptyProject });
        setDeleting(null);
        if (!user) { setSession({ state: "guest" }); return; }
        try {
          const token = await user.getIdTokenResult();
          if (active && current === revision) setSession({ state: token.claims.admin === true ? "admin" : "denied", user });
        } catch { if (active && current === revision) { setSession({ state: "denied", user }); setError("Could not verify access. Sign in again."); } }
      }, () => { if (active) { setSession({ state: "guest" }); setError("Authentication is unavailable. Reload to retry."); } });
      return () => { active = false; revision++; unsubscribe(); };
    } catch (cause) { setSession({ state: "configuration" }); setError((cause as Error).message); }
  }, []);

  useEffect(() => {
    if (session.state !== "admin") return;
    setLoadingProjects(true);
    const { db } = getStudioFirebase();
    return onSnapshot(collection(db, "projects"), snapshot => {
      let invalid = 0;
      const next = snapshot.docs.flatMap(document => {
        const { createdAt, updatedAt, ...data } = document.data();
        void createdAt; void updatedAt;
        const parsed = projectSchema.safeParse(data);
        if (!parsed.success) { invalid++; return []; }
        return [{ ...parsed.data, id: document.id }];
      });
      setProjects(next.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))); setLegacyCount(invalid); setLoadingProjects(false);
    }, cause => { setError(errorMessage(cause)); setLoadingProjects(false); });
  }, [session.state, session.user?.uid]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (operation.current) return;
    operation.current = true; setBusy(true); setError("");
    const values = new FormData(event.currentTarget);
    try {
      const { auth } = getStudioFirebase();
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, String(values.get("email")).trim(), String(values.get("password")));
    } catch (cause) { setError(errorMessage(cause)); }
    finally { operation.current = false; setBusy(false); }
  }
  async function logout() {
    if (operation.current) return;
    operation.current = true; setBusy(true);
    try { await signOut(getStudioFirebase().auth); setMessage(""); setError(""); }
    catch (cause) { setError(errorMessage(cause)); }
    finally { operation.current = false; setBusy(false); }
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (operation.current) return;
    setError(""); setMessage(""); setErrors({});
    const parsed = projectSchema.safeParse(form);
    if (!parsed.success) {
      const issues = Object.fromEntries(parsed.error.issues.map(issue => [String(issue.path[0]), issue.message]));
      setErrors(issues);
      document.getElementById(String(parsed.error.issues[0]?.path[0]))?.focus();
      return;
    }
    operation.current = true; setBusy(true);
    try {
      const projectId = await saveProject(getStudioFirebase().db, parsed.data, editing);
      await revalidatePublicPages(parsed.data.published ? projectId : editing);
      setMessage(parsed.data.published ? "Project saved and published immediately." : "Draft saved. It is not visible publicly.");
      setForm({ ...emptyProject }); setEditing(undefined);
    } catch (cause) { setError(errorMessage(cause)); }
    finally { operation.current = false; setBusy(false); }
  }
  async function confirmDelete() {
    if (!deleting || operation.current) return;
    operation.current = true; setBusy(true); setDeleteError("");
    try {
      const deletedId = deleting.id;
      await removeProject(getStudioFirebase().db, deletedId);
      await revalidatePublicPages(deletedId);
      if (editing === deletedId) { setEditing(undefined); setForm({ ...emptyProject }); }
      setDeleting(null); setMessage("Project deleted and removed from public pages.");
    } catch (cause) { setDeleteError(errorMessage(cause)); }
    finally { operation.current = false; setBusy(false); }
  }
  const feedback = <>{error && <Alert variant="destructive" className="studio-status"><AlertDescription>{error}</AlertDescription></Alert>}{message && <Alert role="status" className="studio-status"><AlertDescription>{message}</AlertDescription></Alert>}</>;
  if (session.state === "loading") return <p role="status">Verifying access…</p>;
  if (session.state === "configuration") return <><h1>Studio setup required</h1>{feedback}</>;
  if (session.state === "guest") return <section className="studio-panel studio-login"><p className="eyebrow">REDA / PRIVATE STUDIO</p><h1>Welcome back.</h1><p className="field-help mb-6">Sign in to manage your projects.</p>{feedback}<form onSubmit={login}><FieldGroup><Field><FieldLabel htmlFor="email">Email</FieldLabel><Input id="email" name="email" type="email" autoComplete="username" required disabled={busy} /></Field><Field><FieldLabel htmlFor="password">Password</FieldLabel><Input id="password" name="password" type="password" autoComplete="current-password" required disabled={busy} /></Field><Button type="submit" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</Button></FieldGroup></form></section>;
  if (session.state === "denied") return <><h1>Access restricted</h1><p className="field-help mb-6">This account does not have project administrator access.</p>{feedback}<Button onClick={logout} disabled={busy}>Sign out</Button></>;
  return <>
    <header className="studio-header"><div><p className="eyebrow">REDA / PROJECT STUDIO</p><h1>Your work, curated.</h1><p className="field-help">{session.user?.email}</p></div><Button variant="outline" onClick={logout} disabled={busy}>Sign out</Button></header>
    {feedback}
    {legacyCount > 0 && <Alert className="studio-status"><AlertDescription>{legacyCount} documents use an unsupported schema. Back them up and migrate them before editing here.</AlertDescription></Alert>}
    <div className="studio-grid"><section className="studio-panel"><h2 className="mb-6">{editing ? "Edit project" : "New project"}</h2><form onSubmit={submit} noValidate><fieldset disabled={busy}><FieldGroup>
      {textFields.map(({ key, label, max }) => <Field key={key} data-invalid={Boolean(errors[key])}><FieldLabel htmlFor={key}>{label}</FieldLabel><Input ref={key === "title" ? titleInput : undefined} id={key} value={form[key]} maxLength={max} type={key.endsWith("Url") ? "url" : "text"} onChange={e => setForm({ ...form, [key]: e.target.value })} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? key + "-error" : undefined} />{errors[key] && <p id={key + "-error"} className="text-sm text-destructive">{errors[key]}</p>}</Field>)}
      {(["summary", "body"] as const).map(key => <Field key={key} data-invalid={Boolean(errors[key])}><FieldLabel htmlFor={key}>{key === "summary" ? "Summary" : "Case study (plain text)"}</FieldLabel><Textarea id={key} value={form[key]} rows={key === "body" ? 9 : 3} maxLength={key === "body" ? 8000 : 300} onChange={e => setForm({ ...form, [key]: e.target.value })} aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? key + "-error" : undefined} />{errors[key] && <p id={key + "-error"} className="text-sm text-destructive">{errors[key]}</p>}</Field>)}
      <Field data-invalid={Boolean(errors.order)}><FieldLabel htmlFor="order">Display order (0–999)</FieldLabel><Input id="order" type="number" min={0} max={999} step={1} value={Number.isNaN(form.order) ? "" : form.order} onChange={e => setForm({ ...form, order: e.target.valueAsNumber })} aria-invalid={Boolean(errors.order)} aria-describedby={errors.order ? "order-error" : undefined} />{errors.order && <p id="order-error" className="text-sm text-destructive">{errors.order}</p>}</Field>
      <Field><div className="flex items-center gap-3"><Checkbox id="published" checked={form.published} onCheckedChange={checked => setForm({ ...form, published: checked === true })} /><FieldLabel htmlFor="published">Publish on portfolio</FieldLabel></div><p className="field-help">Unpublished projects remain private. Previously published content can remain cached for about a minute.</p></Field>
      <div className="flex gap-3"><Button type="submit" disabled={busy}>{busy ? "Saving…" : editing ? "Save changes" : "Create project"}</Button>{editing && <Button type="button" variant="outline" disabled={busy} onClick={() => { setEditing(undefined); setForm({ ...emptyProject }); setErrors({}); }}>Cancel edit</Button>}</div>
    </FieldGroup></fieldset></form></section>
    <section className="studio-list" aria-label="Projects"><h2>Project library</h2>{loadingProjects && <p role="status">Loading projects…</p>}{!loadingProjects && projects.length === 0 && <p className="field-help">No projects yet. Create a draft to get started.</p>}{projects.map(project => <article className="studio-item" key={project.id}><h3>{project.title}</h3><Badge variant={project.published ? "default" : "secondary"}>{project.published ? "Published" : "Draft"}</Badge><p className="field-help mt-3">{project.summary}</p><div className="studio-item-actions"><Button variant="outline" size="sm" disabled={busy} onClick={() => { const { id, ...data } = project; setEditing(id); setForm(data); setErrors({}); setMessage(""); titleInput.current?.focus(); }}>Edit<span className="sr-only"> {project.title}</span></Button><Button variant="destructive" size="sm" disabled={busy} onClick={() => { setDeleting(project); setDeleteError(""); }}>Delete<span className="sr-only"> {project.title}</span></Button>{project.published && <Button asChild variant="ghost" size="sm"><a href={"/work/" + project.id} target="_blank" rel="noopener noreferrer">View ↗</a></Button>}</div></article>)}</section></div>
    <AlertDialog open={Boolean(deleting)} onOpenChange={open => { if (!open && !busy) setDeleting(null); }}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Delete {deleting?.title}?</AlertDialogTitle><AlertDialogDescription>This permanently removes this project from Firestore. This action cannot be undone.</AlertDialogDescription></AlertDialogHeader>{deleteError && <Alert variant="destructive"><AlertDescription>{deleteError}</AlertDescription></Alert>}<AlertDialogFooter><AlertDialogCancel disabled={busy}>Cancel</AlertDialogCancel><AlertDialogAction disabled={busy} onClick={event => { event.preventDefault(); void confirmDelete(); }}>{busy ? "Deleting…" : "Delete project"}</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
  </>;
}
