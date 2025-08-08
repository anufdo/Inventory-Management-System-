"use client";
import useSWR from "swr";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function OrdersPage() {
  const { data: products } = useSWR<{ items: { _id: string; name: string }[] }>("/api/products", fetcher);
  const { data: orders, mutate } = useSWR<{ items: { _id: string; createdAt: string; customer?: string; totalAmount: number }[] }>("/api/orders", fetcher);
  const [items, setItems] = useState<{ productId: string; quantity: number }[]>([{ productId: "", quantity: 1 }]);
  const [customer, setCustomer] = useState("");

  function addItem() {
    setItems((prev) => [...prev, { productId: "", quantity: 1 }]);
  }

  function updateItem(i: number, field: "productId" | "quantity", value: string | number) {
    setItems((prev) => prev.map((it, idx) => (idx === i ? { ...it, [field]: value } : it)));
  }

  async function createOrder(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customer, items }),
    });
    if (res.ok) {
      setItems([]);
      setCustomer("");
      mutate();
    } else {
      alert("Failed to create order");
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-3">New Order</h2>
        <form onSubmit={createOrder} className="space-y-3">
          <input className="w-full border rounded-md px-3 py-2" placeholder="Customer" value={customer} onChange={(e) => setCustomer(e.target.value)} />
          <div className="space-y-3">
            {items.map((it, i) => (
              <div key={i} className="grid grid-cols-12 gap-2">
                <select className="col-span-8 border rounded-md px-3 py-2" value={it.productId} onChange={(e) => updateItem(i, "productId", e.target.value)}>
                  <option value="">Select product</option>
                  {products?.items?.map((p) => (
                    <option key={p._id} value={p._id}>{p.name}</option>
                  ))}
                </select>
                <input type="number" min={1} className="col-span-4 border rounded-md px-3 py-2" value={it.quantity} onChange={(e) => updateItem(i, "quantity", Number(e.target.value))} />
              </div>
            ))}
            <button type="button" onClick={addItem} className="px-3 py-2 rounded-md border">Add Item</button>
          </div>
          <button className="px-3 py-2 rounded-md bg-blue-600 text-white">Create Order</button>
        </form>
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders?.items?.map((o) => (
              <tr key={o._id}>
                <td className="px-4 py-2">{new Date(o.createdAt).toLocaleString()}</td>
                <td className="px-4 py-2">{o.customer}</td>
                <td className="px-4 py-2">${o.totalAmount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


