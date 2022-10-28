import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Stats } from '../interfaces/stats';
import { Tasks } from '../interfaces/tasks';
import { ParamMap } from '@angular/router';
import { TasksPagination } from '../interfaces/tasks-pagination';

@Injectable({
  providedIn: 'root'
})
export class IndexService {
  private baseUrl = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  statsCount():Observable<Stats> {
    return this.http.get<Stats>(this.baseUrl+'counts');
  }

  getTasks(paramMap: ParamMap):Observable<TasksPagination> {
    return this.http.get<TasksPagination>(this.baseUrl+'tasks', {
      params: this.getHttpParams(paramMap, ['page'])
    });
  }

  getTasksImages(task: Tasks){
    //return this.http.get(`${this.baseUrl}tasks-images/${task.id}/get-image/1`, {responseType:"blob" as "json"});
  }

  completeTask(task: Tasks):Observable<Tasks> {
    return this.http.post<Tasks>(`${this.baseUrl}tasks/${task.id}/complete-task`, {});
  }

  getHttpParams(paramMap: ParamMap, paramsNames: string[]): HttpParams {
    let params = new HttpParams();
    paramsNames.forEach(paramName => {
      if(paramMap.has(paramName)) {
        params = params.append(paramName, paramMap.get(paramName)!);
      }
    });
    return params;
  }
}
