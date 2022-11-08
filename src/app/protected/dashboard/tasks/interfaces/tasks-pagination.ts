import { Pagination } from '../../../shared/modules/pagination/interfaces/pagination';
import { Task } from './task';
export interface TasksPagination extends Pagination{
    data:Task []
}
