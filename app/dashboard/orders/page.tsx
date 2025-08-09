"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, ShoppingCart, Trash2, User } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";

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

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  async function createOrder(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customer, items }),
    });
    if (res.ok) {
      setItems([{ productId: "", quantity: 1 }]);
      setCustomer("");
      mutate();
    } else {
      alert("Failed to create order");
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600 mt-2">Create new orders and manage existing ones</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* New Order Form */}
        <Card className="bg-white border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Plus className="h-5 w-5" />
              New Order
            </CardTitle>
            <CardDescription className="text-gray-600">
              Create a new order for your customer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={createOrder} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="customer" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Customer Name *
                </Label>
                <Input
                  id="customer"
                  placeholder="Enter customer name"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                  className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                  required
                />
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-semibold text-gray-700">Order Items</Label>
                {items.map((item, i) => (
                  <div key={i} className="flex gap-3 items-end">
                    <div className="flex-1">
                      <select
                        value={item.productId}
                        onChange={(e) => updateItem(i, "productId", e.target.value)}
                        className="w-full h-9 rounded-md border border-gray-200 bg-white px-3 py-1 text-sm shadow-xs transition-colors focus:border-emerald-500 focus:ring-emerald-500/20 focus:ring-[3px] outline-none"
                        required
                      >
                        <option value="">Select product</option>
                        {products?.items?.map((p) => (
                          <option key={p._id} value={p._id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-24">
                      <Input
                        type="number"
                        min={1}
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) => updateItem(i, "quantity", Number(e.target.value))}
                        className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                        required
                      />
                    </div>
                    {items.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeItem(i)}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addItem}
                  className="w-full border-gray-200 hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
                disabled={!customer || items.some(item => !item.productId)}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Create Order
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Orders List */}
        <Card className="bg-white border-0 shadow-soft">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Recent Orders
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Latest customer orders
                </CardDescription>
              </div>
              <Badge variant="outline" className="bg-gray-50 border-gray-200">
                {orders?.items?.length || 0} Orders
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {orders?.items && orders.items.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.items.map((order) => (
                      <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-900">
                          {order.customer}
                        </td>
                        <td className="py-3 px-4 text-right font-semibold text-gray-900">
                          ${order.totalAmount.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <ShoppingCart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
                <p className="text-gray-600">Start by creating your first order.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


