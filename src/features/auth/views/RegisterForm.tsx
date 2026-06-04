"use client";

export function RegisterForm() {
  return (
    <form className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Register</h1>
      <input
        type="text"
        placeholder="Name"
        className="rounded border border-zinc-300 px-3 py-2"
      />
      <input
        type="email"
        placeholder="Email"
        className="rounded border border-zinc-300 px-3 py-2"
      />
      <input
        type="password"
        placeholder="Password"
        className="rounded border border-zinc-300 px-3 py-2"
      />
      <button
        type="submit"
        className="rounded bg-zinc-900 px-4 py-2 text-white"
      >
        Create Account
      </button>
    </form>
  );
}
