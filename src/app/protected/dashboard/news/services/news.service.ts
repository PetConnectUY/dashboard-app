import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { News } from '../interfaces/news';
import { ParamMap } from '@angular/router';
import { HelperService } from '../../../../shared/services/helper.service';
import { NewsPagination } from '../interfaces/news-pagination';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private baseUrl = environment.apiUrl+'news';
  constructor(
    private http: HttpClient,
    private helperService: HelperService
  ) { }

  index(paramMap: ParamMap): Observable<NewsPagination> {
    return this.http.get<NewsPagination>(this.baseUrl, {
      params: this.helperService.getHttpParams(paramMap, ['search', 'page'])
    });
  }

  store(formData: FormData):Observable<News> {
    return this.http.post<News>(this.baseUrl, formData);
  }

  update(formData: FormData, id: number):Observable<News> {
    if(formData.get('image') == 'null'){
      formData.delete('image');
    }
    if(formData.get('link') == 'null'){
      formData.delete('link');
    }
    return this.http.post<News>(`${this.baseUrl}/${id}`, formData);
  }

  delete(news: News): Observable<News>{
    return this.http.delete<News>(`${this.baseUrl}/${news.id}`);
  }

  changeVisibility(news: News): Observable<News> {
    return this.http.post<News>(`${this.baseUrl}/${news.id}/change-visibility`, {});
  }

  changePosition(news: News, direction: string): Observable<News> {
    return this.http.post<News>(`${this.baseUrl}/${news.id}/change-position/?direction=${direction}`, {});
  }
}
