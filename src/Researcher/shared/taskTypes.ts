export interface Task {
    id: string;
    description: string;
    params: Record<string, any>;
}

export interface TaskResult {
    id: string;
    workerId: string;
    status: 'success' | 'error';
    result?: any;
    error?: string;
}
