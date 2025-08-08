import { LogoutButton } from "@/components/LogoutButton";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { ReactNode } from "react";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authConfig);
  if (!session?.user) {
    return (
      <div className="min-h-screen grid place-items-center">
        <a className="px-4 py-2 rounded-md border" href="/login">Sign in</a>
      </div>
    );
  }
  const userName = session.user.name || "User";


  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr,auto] bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
          <Link href="/dashboard" className="text-lg font-semibold">Inventory</Link>
          <div className="flex items-center">
            <span className="mr-3 text-sm text-gray-600">{userName}</span>
            <LogoutButton className="px-3 py-1.5 rounded-md border hover:bg-gray-100" />
          </div>
        </div>
      </header>
      <div className="grid grid-cols-12 gap-0">
        <aside className="col-span-12 md:col-span-3 lg:col-span-2 border-r bg-white p-4 space-y-2">
          <nav className="space-y-1">
            <Link className="block px-3 py-2 rounded hover:bg-gray-100" href="/dashboard">Dashboard</Link>
            <Link className="block px-3 py-2 rounded hover:bg-gray-100" href="/dashboard/products">Products</Link>
            <Link className="block px-3 py-2 rounded hover:bg-gray-100" href="/dashboard/categories">Categories</Link>
            <Link className="block px-3 py-2 rounded hover:bg-gray-100" href="/dashboard/orders">Orders</Link>
            <Link className="block px-3 py-2 rounded hover:bg-gray-100" href="/dashboard/users">Users</Link>
            <Link className="block px-3 py-2 rounded hover:bg-gray-100" href="/dashboard/settings">Settings</Link>
          </nav>
        </aside>
        <main className="col-span-12 md:col-span-9 lg:col-span-10 p-4">{children}</main>
      </div>
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto p-4 text-sm text-gray-600">Inventory © {new Date().getFullYear()}</div>
      </footer>
    </div>
  );
}


