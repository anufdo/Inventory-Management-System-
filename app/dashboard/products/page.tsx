"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Edit3, Package, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function ProductsPage() {
  const { data, mutate } = useSWR<{ items: { _id: string; name: string; price: number; stock: number }[] }>("/api/products", fetcher);

  async function remove(id: string) {
    if (!confirm("Delete product? This action cannot be undone.")) return;
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) mutate();
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-2">Manage your product inventory and stock levels</p>
        </div>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg">
          <Link href="/dashboard/products/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Product
          </Link>
        </Button>
      </div>

      {/* Products Card */}
      <Card className="bg-white border-0 shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Package className="h-5 w-5" />
                All Products
              </CardTitle>
              <CardDescription className="text-gray-600">
                View and manage your product catalog
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-gray-50 border-gray-200">
              {data?.items?.length || 0} Products
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {data?.items && data.items.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Product Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Price</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Stock</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((product) => (
                    <tr key={product._id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-medium text-gray-900">{product.name}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-gray-900">${product.price.toFixed(2)}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-medium text-gray-900">{product.stock}</span>
                      </td>
                      <td className="py-4 px-6">
                        {product.stock < 5 ? (
                          <Badge className="bg-red-100 text-red-700 border-red-200 flex items-center gap-1 w-fit">
                            <AlertTriangle className="h-3 w-3" />
                            Low Stock
                          </Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-700 border-green-200">
                            In Stock
                          </Badge>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="border-gray-200 hover:bg-gray-50"
                          >
                            <Link href={`/dashboard/products/${product._id}`} className="flex items-center gap-1">
                              <Edit3 className="h-3 w-3" />
                              Edit
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => remove(product._id)}
                            className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No products yet</h3>
              <p className="text-gray-600 mb-6">Start by adding your first product to the inventory.</p>
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                <Link href="/dashboard/products/new" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Product
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


