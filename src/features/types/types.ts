export interface ImpactStat {
    id: string;
    icon: string;
    value: string;
    label: string;
    labelBn: string;
    color: "green" | "gold" | "blood";
}

export interface HeroContent {
    titleBn: string;
    subtitleBn: string;
    backgroundImage: string;
    ctaPrimaryLabel: string;
    ctaPrimaryHref: string;
    ctaSecondaryLabel: string;
    ctaSecondaryHref: string;
}

export interface ProgramCard {
    id: string;
    titleBn: string;
    descriptionBn: string;
    image: string;
    href: string;
    ctaLabelBn: string;
    icon: string;
    accentColor: "green" | "gold" | "blood";
}

export interface StatsSection {
    stats: ImpactStat[];
}


import { z } from "zod";

export const NewsArticleSchema = z.object({
    id: z.string(),
    titleBn: z.string().min(1, "Title is required"),
    titleEn: z.string().optional(),
    excerptBn: z.string(),
    contentBn: z.string(),
    image: z.string().url(),
    publishedAt: z.string(),
    category: z.enum(["news", "blog", "announcement", "event"]),
    author: z.string(),
    slug: z.string(),
    tags: z.array(z.string()),
});

export const CreateNewsSchema = z.object({
    titleBn: z.string().min(2, "শিরোনাম কমপক্ষে ২ অক্ষর হতে হবে"),
    titleEn: z.string().optional(),
    excerptBn: z.string().min(10, "সারসংক্ষেপ কমপক্ষে ১০ অক্ষর হতে হবে"),
    contentBn: z.string().min(20, "বিষয়বস্তু কমপক্ষে ২০ অক্ষর হতে হবে"),
    image: z.string().url("একটি বৈধ URL প্রয়োজন"),
    category: z.enum(["news", "blog", "announcement", "event"]),
    author: z.string().min(2, "লেখকের নাম প্রয়োজন"),
    tags: z.array(z.string()),
});

export type NewsArticle = z.infer<typeof NewsArticleSchema>;
export type CreateNewsInput = z.infer<typeof CreateNewsSchema>;




export const MemberSchema = z.object({
    id: z.string(),
    name: z.string(),
    nameEn: z.string().optional(),
    role: z.string(),
    village: z.string().optional(),
    roleBn: z.string(),
    avatar: z.string(),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
    phone: z.string().optional(),
    joinedAt: z.string(),
    badgeType: z.enum(["gold", "silver", "bronze"]),
    memberType: z.enum(["president", "secretary", "treasurer", "executive", "general"]),
    isActive: z.boolean(),
});

export const MemberRegistrationSchema = z.object({
    name: z.string().min(2, "নাম কমপক্ষে ২ অক্ষর হতে হবে"),
    nameEn: z.string().optional(),
    phone: z
        .string()
        .regex(/^01[3-9]\d{8}$/, "বৈধ বাংলাদেশী ফোন নম্বর দিন"),
    email: z.string().email("বৈধ ইমেইল ঠিকানা দিন").optional().or(z.literal("")),
    password: z.string().min(6, "পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে"),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).describe("রক্তের গ্রুপ নির্বাচন করুন"),
    designation: z.string().optional(),
    memberType: z.enum(["PRESIDENT", "VICE_PRESIDENT", "SECRETARY", "JOINT_SECRETARY", "TREASURER", "ORGANIZING_SEC", "EXECUTIVE", "GENERAL", "ADVISOR", "VOLUNTEER"]).optional(),
    nid: z.string().optional(),
    address: z.string().optional(),
    village: z.string().min(5, "ঠিকানা কমপক্ষে ৫ অক্ষর হতে হবে"),
    dateOfBirth: z.string().optional(),
    occupation: z.string().optional(),
});

export type Member = z.infer<typeof MemberSchema>;
export type MemberRegistrationInput = z.infer<typeof MemberRegistrationSchema>;


export const BloodDonationSchema = z.object({
    id: z.string(),
    donorName: z.string(),
    donorNameBn: z.string(),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
    donationDate: z.string(),
    location: z.string(),
    status: z.enum(["completed", "pending", "cancelled"]),
    recipientName: z.string().optional(),
    notes: z.string().optional(),
});

export const BloodRequestSchema = z.object({
    patientName: z.string().min(2, "রোগীর নাম কমপক্ষে ২ অক্ষর হতে হবে"),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
        error: "রক্তের গ্রুপ নির্বাচন করুন",
    }),
    hospitalName: z.string().min(2, "হাসপাতালের নাম প্রয়োজন"),
    requiredDate: z.string().min(1, "প্রয়োজনীয় তারিখ নির্বাচন করুন"),
    unitsRequired: z
        .number()
        .min(1, "কমপক্ষে ১ ইউনিট প্রয়োজন")
        .max(10, "সর্বোচ্চ ১০ ইউনিট"),
    contactPhone: z
        .string()
        .regex(/^01[3-9]\d{8}$/, "বৈধ বাংলাদেশী ফোন নম্বর দিন"),
    urgency: z.enum(["critical", "urgent", "normal"]),
    notes: z.string().optional(),

});

export const DonorRegistrationSchema = z.object({
    name: z.string().min(2, "নাম কমপক্ষে ২ অক্ষর হতে হবে"),
    phone: z.string().regex(/^01[3-9]\d{8}$/, "বৈধ বাংলাদেশী ফোন নম্বর দিন"),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
    lastDonationDate: z.string().optional(),
    address: z.string().min(5, "ঠিকানা কমপক্ষে ৫ অক্ষর হতে হবে"),
    isAvailable: z.boolean().default(true),
});

export type BloodDonation = z.infer<typeof BloodDonationSchema>;
export type BloodRequestInput = z.infer<typeof BloodRequestSchema>;
export type DonorRegistrationInput = z.infer<typeof DonorRegistrationSchema>;


export const DonationMethodSchema = z.object({
    id: z.string(),
    name: z.string(),
    nameBn: z.string(),
    icon: z.string(),
    color: z.string(),
    bgColor: z.string(),
    accountNumber: z.string(),
    isActive: z.boolean(),
});

export const DonationFormSchema = z.object({
    donorName: z.string().min(2, "নাম কমপক্ষে ২ অক্ষর হতে হবে"),
    phone: z
        .string()
        .regex(/^01[3-9]\d{8}$/, "বৈধ বাংলাদেশী ফোন নম্বর দিন"),
    email: z.string().email("বৈধ ইমেইল ঠিকানা দিন").optional().or(z.literal("")),
    amount: z
        .number()
        .min(10, "সর্বনিম্ন ১০ টাকা"),
    paymentMethod: z.enum(["BKASH", "NAGAD", "ROCKET", "CREDIT_CARD", "BANK_TRANSFER"]),
    transactionId: z.string().min(5, "লেনদেন আইডি কমপক্ষে ৫ অক্ষর হতে হবে"),
    purpose: z.enum(["GENERAL", "BLOOD_DONATION", "EDUCATION", "RELIEF", "OTHER"]),
    message: z.string().optional(),
});

export type DonationMethod = z.infer<typeof DonationMethodSchema>;
export type DonationFormInput = z.infer<typeof DonationFormSchema>;


export const GalleryItemSchema = z.object({
    id: z.string(),
    title: z.string(),
    titleBn: z.string(),
    image: z.string().url(),
    category: z.enum(["bloodDonation", "relief", "education", "event", "other"]),
    date: z.string(),
    description: z.string().optional(),
});

export const VideoItemSchema = z.object({
    id: z.string(),
    titleBn: z.string(),
    thumbnailUrl: z.string().url(),
    videoUrl: z.string().url().optional(),
    youtubeId: z.string().optional(),
    duration: z.string().optional(),
    publishedAt: z.string(),
    views: z.number().optional(),
});

export type GalleryItem = z.infer<typeof GalleryItemSchema>;
export type VideoItem = z.infer<typeof VideoItemSchema>;