import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { News } from '../interfaces/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private baseUrl = environment.apiUrl+'news';
  constructor(
    private http: HttpClient
  ) { }

  storeNews(formData: FormData):Observable<News> {
    return this.http.post<News>(this.baseUrl, formData);
  }
}
