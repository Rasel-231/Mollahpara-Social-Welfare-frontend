"use client";

import { useLoginMutation } from "@/Redux/api/authApi";
import { ILoginRequest } from "@/Redux/types/types";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function LoginForm() {
  const router = useRouter();
  const [login] = useLoginMutation();
  const { register, handleSubmit } = useForm<ILoginRequest>();

  const onSubmit = async (data: ILoginRequest) => {
    try {
      await login(data).unwrap();
      router.push("/dashboard");
    } catch (error) {
      // handle login error
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
        className="relative z-10 w-full max-w-sm rounded-2xl bg-white/10 p-8 backdrop-blur-lg border border-white/20 shadow-2xl flex flex-col gap-6"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
        </div>

        <input
          {...register("email", { required: true })}
          type="text"
          placeholder="E-mail"
          className="w-full rounded-lg border border-white/20 bg-transparent px-4 py-3 text-white placeholder:text-white/50 focus:outline-none"
        />
        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="Password"
          className="w-full rounded-lg border border-white/20 bg-transparent px-4 py-3 text-white placeholder:text-white/50 focus:outline-none"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-white px-4 py-3 font-semibold text-zinc-900 transition-all hover:bg-zinc-200"
        >
          Sign In
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
