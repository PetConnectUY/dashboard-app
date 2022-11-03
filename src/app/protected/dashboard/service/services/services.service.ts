import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../../../../shared/services/helper.service';
import { ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { ServicesPagination } from '../interfaces/services-pagination';
import { Services } from '../interfaces/services';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private baseUrl = environment.apiUrl+'services';
  constructor(
    private http: HttpClient,
    private helperService: HelperService
  ) { }

  getServices(paramMap: ParamMap):Observable<ServicesPagination>{
    return this.http.get<ServicesPagination>(this.baseUrl, {
      params: this.helperService.getHttpParams(paramMap, ['search', 'page'])
    });
  }

  store(formData: FormData): Observable<Services>{
    return this.http.post<Services>(this.baseUrl, formData);
  }

  update(formData: FormData, id: number): Observable<Services>{
    if(formData.get('image') == 'null'){
      formData.delete('image');
    }
    return this.http.post<Services>(`${this.baseUrl}/${id}`, formData);
  }

  delete(service: Services): Observable<Services>{
    return this.http.delete<Services>(`${this.baseUrl}/${service.id}`);
  }
}
