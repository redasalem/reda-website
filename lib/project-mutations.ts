import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc, type Firestore } from "firebase/firestore";
import { projectSchema, type ProjectInput } from "./project-schema";

const DOCUMENT_ID = /^[a-zA-Z0-9_-]{1,128}$/;

export async function saveProject(db: Firestore, value: ProjectInput, id?: string) {
  const data = projectSchema.parse(value);
  if (id) {
    if (!DOCUMENT_ID.test(id)) throw new Error("Invalid project id.");
    await updateDoc(doc(db, "projects", id), { ...data, updatedAt: serverTimestamp() });
    return id;
  }
  const created = await addDoc(collection(db, "projects"), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  return created.id;
}

export async function removeProject(db: Firestore, id: string) {
  if (!DOCUMENT_ID.test(id)) throw new Error("Invalid project id.");
  await deleteDoc(doc(db, "projects", id));
}
