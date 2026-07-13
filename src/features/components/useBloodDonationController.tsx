"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { DonationFormInput, DonationFormSchema } from "../types/types";
import { useCreateDonationMutation } from "@/Redux/api/fundsApi";


export function useDonationController() {
  const [createDonation, { isLoading }] = useCreateDonationMutation();

  const form = useForm<DonationFormInput>({
    resolver: zodResolver(DonationFormSchema),
    defaultValues: {
      donorName: "",
      phone: "",
      email: "",
      amount: undefined,
      paymentMethod: undefined,
      transactionId: "",
      purpose: "general",
      message: "",
    },
  });

  const onSubmit = async (data: DonationFormInput): Promise<void> => {
    try {
      await createDonation({
        donorName: data.donorName,
        phone: data.phone,
        email: data.email || undefined,
        amount: data.amount,
        paymentMethod: data.paymentMethod,
        transactionId: data.transactionId,
        purpose: data.purpose,
        message: data.message || undefined,
      }).unwrap();

      toast.success(
        `আপনার ${data.amount} টাকার অনুদান সফলভাবে গৃহীত হয়েছে! আপনাকে আন্তরিক ধন্যবাদ।`,
        {
          position: "top-right",
          autoClose: 6000,
          theme: "colored",
        }
      );
      form.reset();
    } catch {
      toast.error(
        "অনুদান প্রক্রিয়াকরণে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।",
        {
          position: "top-right",
          theme: "colored",
        }
      );
    }
  };

  return { form, onSubmit: form.handleSubmit(onSubmit), isSubmitting: isLoading };
}
