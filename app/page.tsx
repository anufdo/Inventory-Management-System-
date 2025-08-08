import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold">Inventory Management</h1>
        <p className="text-gray-600">Proceed to the dashboard</p>
        <Link href="/dashboard" className="px-4 py-2 rounded-md bg-blue-600 text-white">Open Dashboard</Link>
      </div>
    </main>
  );
}
