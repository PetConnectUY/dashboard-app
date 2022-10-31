import { Pagination } from "src/app/protected/shared/modules/pagination/interfaces/pagination";
import { Project } from "./project";
export interface ProjectsPagination extends Pagination {
    data:Project []
}