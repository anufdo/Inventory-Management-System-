"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Package, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function CategoriesPage() {
  const { data, mutate } = useSWR("/api/categories", fetcher);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function addCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), description: description.trim() }),
      });
      if (res.ok) {
        setName("");
        setDescription("");
        mutate();
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function remove(id: string, categoryName: string) {
    if (!confirm(`Delete category "${categoryName}"? This action cannot be undone.`)) return;
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    if (res.ok) mutate();
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">Organize your products into categories for better management.</p>
        </div>
        <Badge variant="outline" className="hidden md:flex">
          <Package className="mr-1 h-3 w-3" />
          {data?.items?.length || 0} Categories
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Add Category Form */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Category
              </CardTitle>
              <CardDescription>
                Create a new category to organize your products.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={addCategory} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category-name">Category Name</Label>
                  <Input
                    id="category-name"
                    placeholder="e.g., Electronics, Clothing"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category-description">Description</Label>
                  <Textarea
                    id="category-description"
                    placeholder="Brief description of this category (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading || !name.trim()}>
                  {isLoading ? "Adding..." : "Add Category"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Categories List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>All Categories</CardTitle>
              <CardDescription>
                Manage your existing categories and their details.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {data?.items && data.items.length > 0 ? (
                <div className="divide-y">
                  {data.items.map((category: { _id: string; name: string; description?: string }) => (
                    <div key={category._id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                      <div className="flex-1">
                        <h3 className="font-medium">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {category.description || "No description provided"}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => remove(category._id, category.name)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-semibold">No categories yet</h3>
                  <p className="text-muted-foreground">
                    Create your first category to start organizing your products.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


