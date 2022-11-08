import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskImages } from '../../interfaces/task-images';

@Injectable({
  providedIn: 'root'
})
export class TaskImagesService {

  private baseUrl = environment.apiUrl+'tasks-images';

  constructor(
    private http: HttpClient
  ) { }

  listImages(id: number): Observable<TaskImages[]>{
    return this.http.get<TaskImages[]>(`${this.baseUrl}/${id}`);
  }

  getImages(id: number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${id}/view-image`, {responseType:"blob" as "json"});
  }

  store(formData: FormData): Observable<TaskImages>{
    return this.http.post<TaskImages>(`${this.baseUrl}`, formData);
  }

  delete(image: TaskImages): Observable<TaskImages>{
    return this.http.delete<TaskImages>(`${this.baseUrl}/${image.task_id}/destroy-image/${image.id}`);
  }
}
