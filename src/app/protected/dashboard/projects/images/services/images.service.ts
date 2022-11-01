import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../../../../../shared/services/helper.service';
import { Observable } from 'rxjs';
import { ProjectImages } from '../../interfaces/project-images';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private baseUrl = environment.apiUrl+'projects-images';
  constructor(
    private http: HttpClient,
    private helperService: HelperService
  ) { }

  store(formData: FormData): Observable<ProjectImages>{
    return this.http.post<ProjectImages>(this.baseUrl, formData);
  }

  listImages(id: number): Observable<ProjectImages[]>{
    return this.http.get<ProjectImages[]>(`${this.baseUrl}/${id}`);
  }

  getImages(id: number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/${id}/view-image`, {responseType:"blob" as "json"});
  }
}
