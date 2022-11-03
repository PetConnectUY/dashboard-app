import { Pagination } from '../../../shared/modules/pagination/interfaces/pagination';
import { User } from './user';
export interface UserPagination extends Pagination {
    data: User []
}
