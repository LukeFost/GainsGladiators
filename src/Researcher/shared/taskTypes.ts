export interface Task {
    id: string;
    description: string;
    parameters: Record<string, any>;
}

export interface TaskResult {
    id: string;
    workerId: string;
    status: 'success' | 'error';
    result?: any;
    error?: string;
}
