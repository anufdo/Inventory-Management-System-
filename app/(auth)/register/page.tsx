"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { userSchema } from "@/lib/validation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      userSchema.parse(form);
    } catch (err) {
      const zerr = err as z.ZodError;
      setError(zerr.issues[0]?.message ?? "Invalid input");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/login");
    } else {
      const { error: msg } = await res.json().catch(() => ({ error: "Failed" }));
      setError(msg || "Registration failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white rounded-lg shadow p-6 space-y-4">
        <h1 className="text-xl font-semibold">Create account</h1>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <input className="w-full border rounded-md px-3 py-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input type="email" className="w-full border rounded-md px-3 py-2" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Password</label>
          <input type="password" className="w-full border rounded-md px-3 py-2" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        </div>
        <button disabled={loading} className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 disabled:opacity-50">
          {loading ? "Creating..." : "Register"}
        </button>
        <p className="text-sm text-gray-600">Have an account? <a className="text-blue-600" href="/login">Sign in</a></p>
      </form>
    </div>
  );
}


