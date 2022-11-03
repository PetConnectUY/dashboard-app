import { User } from '../../../../shared/interfaces/user';
export interface Services {
    id: number,
    name: string,
    description: string,
    image: string,
    user: User
}
