"use client";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";
import { useEffect, useState } from "react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const isNew = params.id === "new";
  const { data: categories } = useSWR("/api/categories", fetcher);
  const { data } = useSWR(!isNew ? `/api/products/${params.id}` : null, fetcher);

  const [form, setForm] = useState({ name: "", price: 0, stock: 0, categoryId: "", description: "" });
  useEffect(() => {
    if (data?.item) {
      setForm({
        name: data.item.name,
        price: data.item.price,
        stock: data.item.stock,
        categoryId: data.item.categoryId,
        description: data.item.description || "",
      });
    }
  }, [data]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = isNew ? "POST" : "PUT";
    const url = isNew ? "/api/products" : `/api/products/${params.id}`;
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) router.push("/dashboard/products");
  }

  return (
    <div className="max-w-2xl">
      <form onSubmit={onSubmit} className="bg-white rounded-lg shadow p-4 space-y-4">
        <h1 className="text-lg font-semibold">{isNew ? "New" : "Edit"} Product</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm">Name</label>
            <input className="w-full border rounded-md px-3 py-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="space-y-1">
            <label className="text-sm">Category</label>
            <select className="w-full border rounded-md px-3 py-2" value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
              <option value="">Select Category</option>
              {categories?.items?.map((c: any) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm">Price</label>
            <input type="number" className="w-full border rounded-md px-3 py-2" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
          </div>
          <div className="space-y-1">
            <label className="text-sm">Stock</label>
            <input type="number" className="w-full border rounded-md px-3 py-2" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} />
          </div>
          <div className="md:col-span-2 space-y-1">
            <label className="text-sm">Description</label>
            <textarea className="w-full border rounded-md px-3 py-2" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-md bg-blue-600 text-white">Save</button>
          <button type="button" onClick={() => router.push("/dashboard/products")} className="px-4 py-2 rounded-md border">Cancel</button>
        </div>
      </form>
    </div>
  );
}


