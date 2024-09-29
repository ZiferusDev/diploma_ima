import { User } from "./usertype";

export type Project = {
    name: string;
    id: string;
    userProjects: User[] ;
}[]