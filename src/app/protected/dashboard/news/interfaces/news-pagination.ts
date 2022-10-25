import { Pagination } from "src/app/protected/shared/modules/pagination/interfaces/pagination";
import { News } from "./news";
export interface NewsPagination extends Pagination {
    data:News []
}