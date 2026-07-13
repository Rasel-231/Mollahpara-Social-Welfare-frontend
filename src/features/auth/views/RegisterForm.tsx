"use client";

import { useCreateUserMutation } from "@/Redux/api/userApi";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type RegisterFormInput = {
  name: string;
  email: string;
  password: string;
  phone: string;
  village: string;
};

export function RegisterForm() {
  const router = useRouter();
  const [createUser, { isLoading }] = useCreateUserMutation();
  const { register, handleSubmit } = useForm<RegisterFormInput>();

  const onSubmit = async (data: RegisterFormInput) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("phone", data.phone);
      formData.append("village", data.village);

      await createUser(formData).unwrap();
      toast.success("Registration successful!");
      router.push("/login");
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center p-4">
      <Image
        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
        alt="Background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />

      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onSubmit={handleSubmit(onSubmit)}
        className="relative z-10 w-full max-w-sm rounded-2xl bg-white/10 p-8 backdrop-blur-lg border border-white/20 shadow-2xl flex flex-col gap-5"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-white/60 text-sm mt-1">মোল্লাপাড়া সমাজ কল্যাণ সংস্থায় যোগ দিন</p>
        </div>

        <input
          {...register("name", { required: "Name is required" })}
          type="text"
          placeholder="Name"
          className="w-full rounded-lg border border-white/20 bg-transparent px-4 py-3 text-white placeholder:text-white/50 focus:outline-none"
        />
        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          placeholder="Email"
          className="w-full rounded-lg border border-white/20 bg-transparent px-4 py-3 text-white placeholder:text-white/50 focus:outline-none"
        />
        <input
          {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
          type="password"
          placeholder="Password"
          className="w-full rounded-lg border border-white/20 bg-transparent px-4 py-3 text-white placeholder:text-white/50 focus:outline-none"
        />
        <input
          {...register("phone", { required: "Phone is required" })}
          type="tel"
          placeholder="Phone"
          className="w-full rounded-lg border border-white/20 bg-transparent px-4 py-3 text-white placeholder:text-white/50 focus:outline-none"
        />
        <input
          {...register("village", { required: "Address is required" })}
          type="text"
          placeholder="Address / Village"
          className="w-full rounded-lg border border-white/20 bg-transparent px-4 py-3 text-white placeholder:text-white/50 focus:outline-none"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-white px-4 py-3 font-semibold text-zinc-900 transition-all hover:bg-zinc-200 disabled:opacity-60"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="text-white/70 text-sm hover:text-white transition-all text-center"
        >
          ← আগের পেজে ফিরে যান
        </button>
      </motion.form>
    </div>
  );
}
