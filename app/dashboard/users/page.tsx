"use client";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function UsersPage() {
  const { data, mutate } = useSWR<{ items: { _id: string; name: string; email: string; role: "ADMIN" | "STAFF" }[] }>("/api/users", fetcher);
  const { data: me } = useSWR("/api/auth/session", fetcher);

  async function remove(id: string) {
    if (!confirm("Delete user?")) return;
    const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
    if (res.ok) mutate();
  }

  if (me && me.user?.role !== "ADMIN") {
    return <p>Access denied</p>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Users</h1>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.items?.map((u) => (
              <tr key={u._id}>
                <td className="px-4 py-2">{u.name}</td>
                <td className="px-4 py-2">{u.email}</td>
                <td className="px-4 py-2">{u.role}</td>
                <td className="px-4 py-2">
                  <button className="text-red-600" onClick={() => remove(u._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


