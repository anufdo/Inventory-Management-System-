"use client";
import useSWR from "swr";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function ProductsPage() {
  const { data, mutate } = useSWR("/api/products", fetcher);

  async function remove(id: string) {
    if (!confirm("Delete product?")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) mutate();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Products</h1>
        <Link className="px-3 py-2 rounded-md bg-blue-600 text-white" href="/dashboard/products/new">New Product</Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.items?.map((p: any) => (
              <tr key={p._id} className={p.stock < 5 ? "bg-red-50" : ""}>
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">${p.price.toFixed(2)}</td>
                <td className="px-4 py-2">{p.stock}</td>
                <td className="px-4 py-2 space-x-2">
                  <Link className="text-blue-600" href={`/dashboard/products/${p._id}`}>Edit</Link>
                  <button className="text-red-600" onClick={() => remove(p._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


