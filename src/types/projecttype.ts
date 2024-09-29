import { User } from "./usertype";

export type Project = {
    name: string;
    id: string;
    userProjects: User[] ;
    gitlabLink: string | null,
    githubLink: string | null
}[]