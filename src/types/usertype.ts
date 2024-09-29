export type User = {
        id: number;
        fullName: string;
        email: string;
        createdAt: string;
        updatedAt:string;
        verified:boolean;
        enabled: boolean;
        username:string;
        authorities: null | [];
        accountNonExpired: boolean;
        accountNonLocked: boolean;
        credentialsNonExpired: boolean;
        gitlabToken?: string;
        githubToken?: string;
} 