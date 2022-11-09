import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../../../../shared/services/helper.service';
import { ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { TasksPagination } from '../interfaces/tasks-pagination';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = environment.apiUrl+'tasks';

  constructor(
    private http: HttpClient,
    private helperService: HelperService
  ) { }

  getTasks(paramMap: ParamMap): Observable<TasksPagination>{
    return this.http.get<TasksPagination>(this.baseUrl, {
      params: this.helperService.getHttpParams(paramMap, ['search', 'page'])
    })
  }

  getTaskById(paramMap: ParamMap): Observable<TasksPagination>{
    return this.http.get<TasksPagination>(`${this.baseUrl}/user-tasks`, {
      params: this.helperService.getHttpParams(paramMap, ['search', 'page'])
    })
  }

  store(formData: FormData): Observable<Task>{
    return this.http.post<Task>(this.baseUrl, formData);
  }

  update(formData: FormData, id: number): Observable<Task>{
    if(formData.get('link') == 'null'){
      formData.delete('link');
    }
    return this.http.post<Task>(`${this.baseUrl}/${id}`, formData);
  }

  delete(task: Task): Observable<Task>{
    return this.http.delete<Task>(`${this.baseUrl}/${task.id}`);
  }
}
