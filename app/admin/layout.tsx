import type React from "react";
import type { Metadata, Viewport } from "next";
import RootShell from "@/components/root-shell";
import { AdminProvider } from "@/components/admin/admin-context";
import AdminShell from "@/components/admin/admin-shell";
import { BASE_METADATA, SITE_VIEWPORT } from "@/lib/seo";

export const viewport: Viewport = SITE_VIEWPORT;

export const metadata: Metadata = {
  ...BASE_METADATA,
  title: "Admin Dashboard | Reda Salem",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootShell locale="en" dir="ltr">
      <AdminProvider>
        <AdminShell>{children}</AdminShell>
      </AdminProvider>
    </RootShell>
  );
}
