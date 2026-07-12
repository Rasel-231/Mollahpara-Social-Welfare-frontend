"use client";

import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  GraduationCap,
  Check,
  UploadCloud,
  User,
  BookOpen,
  FileText,
  Wallet,
  Calendar,
  Fingerprint,
  School,
  Hash,
  Award,
  Home,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCreateScholarshipMutation } from "@/Redux/api/scholarshipApi";
import { educationAidSchema, type EducationAidFormValues } from "./schema";

const CLASS_OPTIONS = [
  "ষষ্ঠ শ্রেণি",
  "সপ্তম শ্রেণি",
  "অষ্টম শ্রেণি",
  "নবম শ্রেণি",
  "দশম শ্রেণি",
  "এইচএসসি ১ম বর্ষ",
  "এইচএসসি ২য় বর্ষ",
  "স্নাতক",
];

const REQUIRED_DOCS = [
  { key: "photo", label: "পাসপোর্ট সাইজের ছবি" },
  { key: "marksheet", label: "মার্কশিটের কপি" },
  { key: "recommendation", label: "শিক্ষা প্রতিষ্ঠান প্রধানের সুপারিশপত্র" },
] as const;

type SectionKey = "personal" | "academic" | "other";

const SECTIONS: {
  key: SectionKey;
  no: string;
  title: string;
  icon: React.ElementType;
  fields: (keyof EducationAidFormValues)[];
}[] = [
  {
    key: "personal",
    no: "০১",
    title: "ব্যক্তিগত তথ্য",
    icon: User,
    fields: ["studentName", "guardianName", "dateOfBirth", "nidOrBirthReg"],
  },
  {
    key: "academic",
    no: "০২",
    title: "শিক্ষাগত তথ্য",
    icon: BookOpen,
    fields: ["institutionName", "className", "rollNumber", "gpa"],
  },
  {
    key: "other",
    no: "০৩",
    title: "অন্যান্য তথ্য ও ডকুমেন্ট",
    icon: FileText,
    fields: [
      "monthlyIncome",
      "currentAddress",
      "photo",
      "marksheet",
      "recommendation",
    ],
  },
];

function FieldRow({
  label,
  icon: Icon,
  error,
  children,
}: {
  label: string;
  icon: React.ElementType;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="flex items-center gap-1.5 text-[13px] font-medium text-[#1B2A4A]/80">
        <Icon className="h-3.5 w-3.5 text-[#B33A3A]/70" strokeWidth={2} />
        {label}
      </Label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs font-medium text-[#B33A3A]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function FileSlot({
  fileName,
  onPick,
}: {
  fileName?: string;
  onPick: (f: File | undefined) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      className="group flex w-full items-center gap-2 rounded-sm border border-dashed border-[#1B2A4A]/30 bg-[#1B2A4A]/[0.03] px-3 py-2.5 text-left text-sm text-[#1B2A4A]/60 transition-colors hover:border-[#C9972A] hover:bg-[#C9972A]/[0.06]"
    >
      <UploadCloud className="h-4 w-4 shrink-0 text-[#1B2A4A]/40 group-hover:text-[#C9972A]" />
      <span className="truncate">{fileName ?? "ফাইল কপি যুক্ত করুন..."}</span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={(e) => onPick(e.target.files?.[0])}
      />
    </button>
  );
}

export default function EducationAidForm() {
  const [createScholarship, { isLoading }] = useCreateScholarshipMutation();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EducationAidFormValues>({
    resolver: zodResolver(educationAidSchema),
    mode: "onBlur",
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const values = watch();

  // which sections are fully filled -> drives the "checked" stamp
  const sectionDone = useMemo(() => {
    const map: Record<SectionKey, boolean> = {
      personal: false,
      academic: false,
      other: false,
    };
    for (const s of SECTIONS) {
      map[s.key] = s.fields.every((f) => {
        const v = values[f];
        return v !== undefined && v !== "" && v !== null;
      });
    }
    return map;
  }, [values]);

  const onSubmit = async (data: EducationAidFormValues) => {
    try {
      const fd = new FormData();
      Object.entries(data).forEach(([k, v]) => {
        if (v instanceof File) {
          fd.append(k, v);
        } else if (v !== undefined && v !== null) {
          fd.append(k, String(v));
        }
      });
      await createScholarship(fd).unwrap();
      setSubmitted(true);
      toast.success("আবেদন জমা হয়েছে", {
        description: "আমাদের টিম শীঘ্রই আপনার আবেদনটি পর্যালোচনা করবে।",
      });
    } catch {
      toast.error("জমা দিতে সমস্যা হয়েছে", {
        description: "একটু পর আবার চেষ্টা করুন।",
      });
    }
  };

  return (
    <div
      className="min-h-screen w-full px-4 py-10 md:py-14 pt-24 md:pt-28"
      style={{
        backgroundColor: "#FAF7F0",
      }}
    >
      <div className="relative mx-auto max-w-5xl">
        {/* notebook margin rule */}
        <div className="pointer-events-none absolute -left-3 top-0 hidden h-full w-px bg-[#B33A3A]/40 md:block" />
        <div className="pointer-events-none absolute -left-3.5 top-0 hidden h-full w-px bg-[#B33A3A]/15 md:block" />

        {/* badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-sm bg-[#1B2A4A] px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#FAF7F0]">
          <GraduationCap className="h-3.5 w-3.5" />
          শিক্ষা সহায়তা কার্যক্রম
        </div>

        {/* heading */}
        <h1
          className="text-3xl font-bold text-[#1B2A4A] md:text-4xl"
          style={{ fontFamily: '"Tiro Bangla", serif' }}
        >
          শিক্ষা বৃত্তি ও সহায়তা আবেদন ফরম
        </h1>
        <p className="mt-1.5 text-sm text-[#1B2A4A]/60">
          দয়া করে সঠিক তথ্য দিয়ে ফরমটি পূরণ করুন
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#1B2A4A]/70">
          দরিদ্র ও মেধাবী শিক্ষার্থীদের জন্য আমাদের শিক্ষা বৃত্তি ও সহায়তা
          কার্যক্রম তাদের স্বপ্ন পূরণে সহায়তা করে। বই, খাতা, ইউনিফর্ম এবং মাসিক
          বৃত্তি প্রদান করা হয়।
        </p>

        {submitted ? (
          <SubmittedNotice />
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr_1fr_260px]"
          >
            {SECTIONS.map((section) => (
              <SectionCard
                key={section.key}
                no={section.no}
                title={section.title}
                Icon={section.icon}
                done={sectionDone[section.key]}
              >
                {section.key === "personal" && (
                  <>
                    <FieldRow
                      label="শিক্ষার্থীর নাম"
                      icon={User}
                      error={errors.studentName?.message}
                    >
                      <Input
                        placeholder="শিক্ষার্থীর নাম"
                        {...register("studentName")}
                      />
                    </FieldRow>
                    <FieldRow
                      label="পিতা/মাতার নাম"
                      icon={User}
                      error={errors.guardianName?.message}
                    >
                      <Input
                        placeholder="পিতা/মাতার নাম"
                        {...register("guardianName")}
                      />
                    </FieldRow>
                    <FieldRow
                      label="জন্ম তারিখ"
                      icon={Calendar}
                      error={errors.dateOfBirth?.message}
                    >
                      <Input type="date" {...register("dateOfBirth")} />
                    </FieldRow>
                    <FieldRow
                      label="জাতীয় পরিচয়পত্র/জন্ম নিবন্ধন নম্বর"
                      icon={Fingerprint}
                      error={errors.nidOrBirthReg?.message}
                    >
                      <Input
                        placeholder="নিবন্ধন নম্বর"
                        {...register("nidOrBirthReg")}
                      />
                    </FieldRow>
                  </>
                )}

                {section.key === "academic" && (
                  <>
                    <FieldRow
                      label="বর্তমান শিক্ষা প্রতিষ্ঠানের নাম"
                      icon={School}
                      error={errors.institutionName?.message}
                    >
                      <Input
                        placeholder="প্রতিষ্ঠানের নাম"
                        {...register("institutionName")}
                      />
                    </FieldRow>
                    <FieldRow
                      label="শ্রেণি"
                      icon={BookOpen}
                      error={errors.className?.message}
                    >
                      <Select
                        onValueChange={(v) =>
                          setValue("className", v, { shouldValidate: true })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="শ্রেণি নির্বাচন করুন" />
                        </SelectTrigger>
                        <SelectContent>
                          {CLASS_OPTIONS.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FieldRow>
                    <FieldRow
                      label="রোল নম্বর"
                      icon={Hash}
                      error={errors.rollNumber?.message}
                    >
                      <Input
                        placeholder="রোল নম্বর"
                        className="font-mono"
                        {...register("rollNumber")}
                      />
                    </FieldRow>
                    <FieldRow
                      label="সর্বশেষ পরীক্ষার ফলাফল (GPA)"
                      icon={Award}
                      error={errors.gpa?.message}
                    >
                      <Input
                        placeholder="যেমনঃ ৪.৮৩"
                        className="font-mono"
                        {...register("gpa")}
                      />
                    </FieldRow>
                  </>
                )}

                {section.key === "other" && (
                  <>
                    <FieldRow
                      label="পরিবারের মাসিক আয়"
                      icon={Wallet}
                      error={errors.monthlyIncome?.message}
                    >
                      <Input
                        placeholder="টাকার পরিমাণ"
                        {...register("monthlyIncome")}
                      />
                    </FieldRow>
                    <FieldRow
                      label="বর্তমান ঠিকানা"
                      icon={Home}
                      error={errors.currentAddress?.message}
                    >
                      <Input
                        placeholder="বর্তমান ঠিকানা"
                        {...register("currentAddress")}
                      />
                    </FieldRow>

                    {REQUIRED_DOCS.map((doc) => (
                      <FieldRow
                        key={doc.key}
                        label={doc.label}
                        icon={FileText}
                        error={errors[doc.key]?.message}
                      >
                        <FileSlot
                          fileName={(values[doc.key] as File | undefined)?.name}
                          onPick={(f) =>
                            setValue(doc.key, f, {
                              shouldValidate: true,
                            })
                          }
                        />
                      </FieldRow>
                    ))}
                  </>
                )}
              </SectionCard>
            ))}

            {/* checklist sidebar */}
            <aside className="lg:row-span-1">
              <div className="sticky top-6 rounded-sm border border-[#1B2A4A]/10 bg-white/70 p-5 shadow-sm">
                <p className="mb-3 text-sm font-semibold text-[#1B2A4A]">
                  প্রয়োজনীয় ডকুমেন্টসমূহ
                </p>
                <ul className="space-y-2.5">
                  {REQUIRED_DOCS.map((doc) => {
                    const ok = !!(values as EducationAidFormValues)[doc.key];
                    return (
                      <li
                        key={doc.key}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span
                          className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[10px] transition-colors ${
                            ok
                              ? "border-[#C9972A] bg-[#C9972A] text-white"
                              : "border-[#1B2A4A]/30 text-transparent"
                          }`}
                        >
                          <Check className="h-2.5 w-2.5" strokeWidth={3} />
                        </span>
                        <span
                          className={
                            ok ? "text-[#1B2A4A]" : "text-[#1B2A4A]/60"
                          }
                        >
                          {doc.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>

            <div className="lg:col-span-3">
              <Button
                type="submit"
                disabled={isLoading}
                className="h-11 w-full rounded-sm bg-[#1B2A4A] text-base font-semibold text-[#FAF7F0] hover:bg-[#1B2A4A]/90 sm:w-auto sm:px-10"
              >
                {isLoading ? "জমা হচ্ছে..." : "আবেদন জমা দিন"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section card with roll-call check stamp                                  */
/* -------------------------------------------------------------------------- */

function SectionCard({
  no,
  title,
  Icon,
  done,
  children,
}: {
  no: string;
  title: string;
  Icon: React.ElementType;
  done: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative rounded-sm border border-[#1B2A4A]/10 bg-white/70 p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="font-mono text-xs text-[#B33A3A]/70"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            {no}
          </span>
          <Icon className="h-4 w-4 text-[#1B2A4A]/60" />
          <h2 className="text-base font-semibold text-[#1B2A4A]">{title}</h2>
        </div>

        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ scale: 0, rotate: -15, opacity: 0 }}
              animate={{ scale: 1, rotate: -8, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#B33A3A] text-[#B33A3A]"
              aria-label="সম্পূর্ণ"
            >
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-4">{children}</div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Post-submit notice                                                       */
/* -------------------------------------------------------------------------- */

function SubmittedNotice() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-10 flex flex-col items-center rounded-sm border border-[#C9972A]/30 bg-[#C9972A]/[0.06] px-8 py-14 text-center"
    >
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#C9972A] text-white">
        <Check className="h-7 w-7" strokeWidth={3} />
      </div>
      <h2
        className="text-xl font-bold text-[#1B2A4A]"
        style={{ fontFamily: '"Tiro Bangla", serif' }}
      >
        আবেদন সফলভাবে জমা হয়েছে
      </h2>
      <p className="mt-2 max-w-md text-sm text-[#1B2A4A]/70">
        আমাদের টিম আপনার ডকুমেন্ট যাচাই করে যথাসময়ে যোগাযোগ করবে। ধন্যবাদ।
      </p>
    </motion.div>
  );
}
