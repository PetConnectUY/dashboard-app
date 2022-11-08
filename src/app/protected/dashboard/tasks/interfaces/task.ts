import { User } from '../../users/interfaces/user';
export interface Task {
    id: number,
    user: User,
    description: string,
    link: string,
    images: number,
    complete: number
}
