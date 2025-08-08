"use client";
import useSWR from "swr";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function CategoriesPage() {
  const { data, mutate } = useSWR("/api/categories", fetcher);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  async function addCategory(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });
    if (res.ok) {
      setName("");
      setDescription("");
      mutate();
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete category?")) return;
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    if (res.ok) mutate();
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-3">New Category</h2>
        <form onSubmit={addCategory} className="space-y-3">
          <input className="w-full border rounded-md px-3 py-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="w-full border rounded-md px-3 py-2" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <button className="px-3 py-2 rounded-md bg-blue-600 text-white">Add</button>
        </form>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.items?.map((c: any) => (
              <tr key={c._id}>
                <td className="px-4 py-2">{c.name}</td>
                <td className="px-4 py-2">{c.description}</td>
                <td className="px-4 py-2">
                  <button className="text-red-600" onClick={() => remove(c._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


