import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-60 border-r bg-white p-4 space-y-2">
      <nav className="space-y-1">
        <Link className="block px-3 py-2 rounded hover:bg-gray-100" href="/dashboard">Dashboard</Link>
        <Link className="block px-3 py-2 rounded hover:bg-gray-100" href="/dashboard/products">Products</Link>
        <Link className="block px-3 py-2 rounded hover:bg-gray-100" href="/dashboard/categories">Categories</Link>
        <Link className="block px-3 py-2 rounded hover:bg-gray-100" href="/dashboard/orders">Orders</Link>
        <Link className="block px-3 py-2 rounded hover:bg-gray-100" href="/dashboard/users">Users</Link>
        <Link className="block px-3 py-2 rounded hover:bg-gray-100" href="/dashboard/settings">Settings</Link>
      </nav>
    </aside>
  );
}


