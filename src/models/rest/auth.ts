export type AuthResponse = {
    user: {
        id: string;
        email: string;
    };
    accessToken: string;
};

export type LoginData = {
    email: string;
    password: string;
};

export type RegisterData = {
    email: string;
    name: string;
    avatarPath?: string;
    about?: string;
    phone?: string;
    roles?: string[];
    password: string;
};
