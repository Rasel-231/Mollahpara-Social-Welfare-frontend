export enum tagtypes {
    user = "user",
    fund = "fund",
    complain = "complain",
    news = "news",
    gallery = "gallery",
    event = "event",
    contact = "contact",
    donor = "donor",
    bloodRequest = "bloodRequest",
    scholarship = "scholarship",
    video = "video",
}

export interface IDonor {
    id: string;
    name: string;
    phone: string;
    bloodGroup: string;
    lastDonationDate?: string | null;
    address: string;
    isAvailable: boolean;
    userId?: string | null;
    createdAt: Date;
    user?: { id: string; name: string; email: string };
}

export interface ICreateDonor {
    name: string;
    phone: string;
    bloodGroup: string;
    lastDonationDate?: string;
    address: string;
    isAvailable?: boolean;
    userId?: string;
}
export enum Role {
    ADMIN = "ADMIN",
    MEMBER = "MEMBER",
    MODERATOR = "MODERATOR",
    USER = "USER"
}

export const tagtypeList = [
    tagtypes.user,
    tagtypes.fund,
    tagtypes.complain,
    tagtypes.news,
    tagtypes.gallery,
    tagtypes.event,
    tagtypes.contact,
    tagtypes.donor,
    tagtypes.bloodRequest,
    tagtypes.scholarship,
    tagtypes.video,
];

export interface IResponse<T = unknown> {
    success: boolean;
    statusCode?: number;
    message: string;
    data: T;
    username?: string;
    role?: Role;
    accessToken?: string;
    refreshToken?: string;
    token?: string;
    meta?: {
        page: number;
        limit: number;
        total: number;
    };
}

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ILoginHistory {
    ip: string;
    browser: string;
    os: string;
    device: string;
    accessToken?: string;
    refreshToken?: string;
    token?: string;
    provider: string;
    location: string;
    loginAt: string;
}

export enum BloodGroup {
    A_POSITIVE = "A_POSITIVE",
    A_NEGATIVE = "A_NEGATIVE",
    B_POSITIVE = "B_POSITIVE",
    B_NEGATIVE = "B_NEGATIVE",
    AB_POSITIVE = "AB_POSITIVE",
    AB_NEGATIVE = "AB_NEGATIVE",
    O_POSITIVE = "O_POSITIVE",
    O_NEGATIVE = "O_NEGATIVE",
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    phone?: string | null;
    village: string;
    image?: string | null;
    designation?: string | null;
    bloodGroup?: BloodGroup | null;
    role: Role;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    donorId?: string | null;
    memberType?: string | null;
    nid?: string | null;
    nameEn?: string | null;
    address?: string | null;
    dateOfBirth?: string | null;
    occupation?: string | null;
}

export interface IBloodRequests {
    id: string;
    patientName: string;
    bloodGroup: string;
    hospitalName: string;
    contactPhone: string;
    requiredDate: Date;
    unitsRequired: number;
    urgency: string;
    notes?: string | null;
    status: string;
    requesterId?: string | null;
    createdAt: Date;
    requester?: { id: string; name: string; email: string };
}

export interface ICreateBloodRequest {
    patientName: string;
    bloodGroup: string;
    hospitalName: string;
    contactPhone: string;
    requiredDate: string;
    unitsRequired: number;
    urgency: string;
    notes?: string;
    requesterId?: string;
}


export interface IMessage {
    _id: string;
    user: IUser;
    role?: Role;
    message: string;
    parentMessage?: IMessage | string | null;
    createdAt: string;
    updatedAt: string;
}

export enum PaymentMethod {
    BKASH = "BKASH",
    NAGAD = "NAGAD",
    ROCKET = "ROCKET",
    CREDIT_CARD = "CREDIT_CARD",
    BANK_TRANSFER = "BANK_TRANSFER",
}

export enum DonationStatus {
    PENDING = "PENDING",
    VERIFIED = "VERIFIED",
    REJECTED = "REJECTED",
}

export enum DonationPurpose {
    GENERAL = "GENERAL",
    BLOOD_DONATION = "BLOOD_DONATION",
    EDUCATION = "EDUCATION",
    RELIEF = "RELIEF",
    OTHER = "OTHER",
}

export interface IFund {
    id: string;
    donorName: string;
    phone: string;
    email?: string | null;
    amount: number;
    paymentMethod: PaymentMethod;
    transactionId: string;
    purpose: DonationPurpose;
    message?: string | null;
    status: DonationStatus;
    memberId?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface Member {
    id: string;
    name: string;
    roleBn: string;
    avatar: string;
    bloodGroup: string;
    badgeType: "gold" | "silver" | "bronze";
    isActive: boolean;
}