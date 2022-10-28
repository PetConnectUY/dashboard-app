import { Pagination } from '../../shared/modules/pagination/interfaces/pagination';
import { Tasks } from './tasks';
export interface TasksPagination extends Pagination{
    data:Tasks []
}
