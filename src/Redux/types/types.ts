export enum tagtypes {
    user = "user",
}

export enum Role {
    ADMIN = "ADMIN",
    MEMBER = "MEMBER",
    MODERATOR = "MODERATOR",
    USER = "USER"
}

export const tagtypeList = [tagtypes.user];

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

export interface IMessage {
    _id: string;
    user: IUser;
    role?: Role;
    message: string;
    parentMessage?: IMessage | string | null;
    createdAt: string;
    updatedAt: string;
}