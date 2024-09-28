interface AuthRegisterData{
    email: string;
    fullname: string;
    password: string;
}

interface AuthCredentials{
    email: string;
    password: string;
    
}
interface AuthToken{
    token: string;
    expireDate: number;
}

export type { AuthCredentials }
export type { AuthToken }
export type { AuthRegisterData}