export type Project = {
    name: string;
    id: string;
    userProjects: {
        projectId: string;
        userId: 1;
    }[] | null;
}