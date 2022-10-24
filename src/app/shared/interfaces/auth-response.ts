import { User } from './user';
export interface AuthResponse {
    access_token: string,
    toke_type: string,
    expires_in: number,
    user: User
}
