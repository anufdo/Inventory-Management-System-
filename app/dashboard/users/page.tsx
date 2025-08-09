"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Trash2, UserCheck, Users } from "lucide-react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function UsersPage() {
  const { data, mutate } = useSWR<{ items: { _id: string; name: string; email: string; role: "ADMIN" | "STAFF" }[] }>("/api/users", fetcher);
  const { data: me } = useSWR("/api/auth/session", fetcher);

  async function remove(id: string) {
    if (!confirm("Delete user? This action cannot be undone.")) return;
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    if (res.ok) mutate();
  }

  if (me && me.user?.role !== "ADMIN") {
    return (
      <Card className="bg-white border-0 shadow-soft">
        <CardContent className="text-center py-12">
          <Shield className="mx-auto h-16 w-16 text-red-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Access Denied</h3>
          <p className="text-gray-600">You don't have permission to view this page.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-600 mt-2">Manage user accounts and permissions</p>
      </div>

      {/* Users Card */}
      <Card className="bg-white border-0 shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="h-5 w-5" />
                All Users
              </CardTitle>
              <CardDescription className="text-gray-600">
                View and manage user accounts
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-gray-50 border-gray-200">
              {data?.items?.length || 0} Users
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {data?.items && data.items.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Name</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Email</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Role</th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((user) => (
                    <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-medium text-gray-900">{user.name}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-600">{user.email}</span>
                      </td>
                      <td className="py-4 px-6">
                        <Badge
                          className={
                            user.role === "ADMIN"
                              ? "bg-purple-100 text-purple-700 border-purple-200"
                              : "bg-blue-100 text-blue-700 border-blue-200"
                          }
                        >
                          {user.role === "ADMIN" ? (
                            <Shield className="h-3 w-3 mr-1" />
                          ) : (
                            <UserCheck className="h-3 w-3 mr-1" />
                          )}
                          {user.role}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => remove(user._id)}
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
              <Users className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-600">User accounts will appear here once they're created.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


