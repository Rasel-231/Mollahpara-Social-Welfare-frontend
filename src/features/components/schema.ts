import { z } from "zod";

export const educationAidSchema = z.object({
  studentName: z.string().min(1, "শিক্ষার্থীর নাম প্রয়োজন"),
  guardianName: z.string().min(1, "পিতা/মাতার নাম প্রয়োজন"),
  dateOfBirth: z.string().min(1, "জন্ম তারিখ প্রয়োজন"),
  nidOrBirthReg: z.string().min(1, "নিবন্ধন নম্বর প্রয়োজন"),
  institutionName: z.string().min(1, "প্রতিষ্ঠানের নাম প্রয়োজন"),
  className: z.string().min(1, "শ্রেণি নির্বাচন করুন"),
  rollNumber: z.string().min(1, "রোল নম্বর প্রয়োজন"),
  gpa: z.string().min(1, "ফলাফল প্রয়োজন"),
  monthlyIncome: z.string().min(1, "মাসিক আয় প্রয়োজন"),
  currentAddress: z.string().min(1, "ঠিকানা প্রয়োজন"),
  photo: z.instanceof(File).optional(),
  marksheet: z.instanceof(File).optional(),
  recommendation: z.instanceof(File).optional(),
});

export type EducationAidFormValues = z.infer<typeof educationAidSchema>;
