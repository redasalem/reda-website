import type { Metadata } from "next";
import { AdminProvider } from "@/components/admin/admin-context";
import AdminShell from "@/components/admin/admin-shell";

export const metadata: Metadata = {
  title: "Admin Dashboard | Reda Salem",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <AdminShell>{children}</AdminShell>
    </AdminProvider>
  );
}
