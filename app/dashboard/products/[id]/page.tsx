"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Package, Save } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const isNew = params.id === "new";
  const { data: categories } = useSWR<{ items: { _id: string; name: string }[] }>("/api/categories", fetcher);
  const { data } = useSWR<{ item: { name: string; price: number; stock: number; categoryId: string; description?: string } }>(!isNew ? `/api/products/${params.id}` : null, fetcher);

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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push("/dashboard/products")}
          className="border-gray-200 hover:bg-gray-50"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            {isNew ? "Add New Product" : "Edit Product"}
          </h1>
          <p className="text-gray-600 mt-2">
            {isNew ? "Create a new product in your inventory" : "Update product information and stock levels"}
          </p>
        </div>
      </div>

      {/* Form Card */}
      <Card className="max-w-4xl bg-white border-0 shadow-soft">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="h-5 w-5" />
            Product Information
          </CardTitle>
          <CardDescription className="text-gray-600">
            Fill in the details below to {isNew ? "create" : "update"} your product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                  Product Name *
                </Label>
                <Input
                  id="name"
                  placeholder="Enter product name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-semibold text-gray-700">
                  Category
                </Label>
                <select
                  id="category"
                  value={form.categoryId}
                  onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                  className="w-full h-9 rounded-md border border-gray-200 bg-white px-3 py-1 text-sm shadow-xs transition-colors focus:border-emerald-500 focus:ring-emerald-500/20 focus:ring-[3px] outline-none"
                >
                  <option value="">Select Category</option>
                  {categories?.items?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-sm font-semibold text-gray-700">
                  Price ($) *
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                  className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock" className="text-sm font-semibold text-gray-700">
                  Stock Quantity *
                </Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                  className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                  required
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Enter product description (optional)"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500/20 min-h-[100px]"
                  rows={4}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
                disabled={!form.name || form.price < 0 || form.stock < 0}
              >
                <Save className="h-4 w-4 mr-2" />
                {isNew ? "Create Product" : "Update Product"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard/products")}
                className="border-gray-200 hover:bg-gray-50"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


