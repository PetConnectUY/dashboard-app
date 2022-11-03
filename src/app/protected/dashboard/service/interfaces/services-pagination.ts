import { Pagination } from '../../../shared/modules/pagination/interfaces/pagination';
import { Services } from './services';
export interface ServicesPagination extends Pagination {
    data: Services []
}
