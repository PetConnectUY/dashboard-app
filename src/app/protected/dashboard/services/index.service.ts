import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Stats } from '../interfaces/stats';
import { Tasks } from '../interfaces/tasks';
import { ParamMap } from '@angular/router';
import { TasksPagination } from '../interfaces/tasks-pagination';
import { HelperService } from '../../../shared/services/helper.service';
import { TaskImages } from '../tasks/interfaces/task-images';

@Injectable({
  providedIn: 'root'
})
export class IndexService {
  private baseUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
    private helperService: HelperService
  ) { }

  statsCount():Observable<Stats> {
    return this.http.get<Stats>(this.baseUrl+'counts');
  }

  getTasks(paramMap: ParamMap):Observable<TasksPagination> {
    return this.http.get<TasksPagination>(this.baseUrl+'tasks/user-tasks', {
      params: this.helperService.getHttpParams(paramMap, ['page'])
    });
  }

  listImages(id: number): Observable<TaskImages[]>{
    return this.http.get<TaskImages[]>(`${this.baseUrl}tasks-images/${id}`);
  }

  getImages(id: number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}tasks-images/${id}/view-image`, {responseType:"blob" as "json"});
  }

  completeTask(task: Tasks):Observable<Tasks> {
    return this.http.post<Tasks>(`${this.baseUrl}tasks/${task.id}/complete-task`, {});
  }
}
