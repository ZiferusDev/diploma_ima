export type Task = {
    id: string;
    projectId: string;
    name: string | null;
    description: string | null;
    status: 'OPEN' | 'IN_ANALYSIS' | 'IN_PROGRESS' | 'IN_TESTING' | 'DONE';
    creator: number;
    assignee: number | null;
    gitlabId?: number;
    gitlabLink?: string;
    githubLink?: string;
}