import { TasksImages } from './tasks-images';
export interface Tasks {
    id: number,
    user_id: number,
    description: string,
    link: string,
    images: TasksImages [],
    complete: number
}
