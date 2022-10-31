import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HelperService } from '../../../../shared/services/helper.service';
import { ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectsPagination } from '../interfaces/projects-pagination';
import { Project } from '../interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private baseUrl = environment.apiUrl+'projects';

  constructor(
    private http: HttpClient,
    private helperService: HelperService
  ) { }

  getProjects(paramMap: ParamMap):Observable<ProjectsPagination>{
    return this.http.get<ProjectsPagination>(this.baseUrl, {
      params: this.helperService.getHttpParams(paramMap, ['search', 'page'])
    });
  }

  store(formData: FormData): Observable<Project> {
    return this.http.post<Project>(this.baseUrl, formData);
  }

  update(formData: FormData, id: number): Observable<Project> {
    if(formData.get('link') == 'null'){
      formData.delete('link');
    }
    return this.http.post<Project>(`${this.baseUrl}/${id}`, formData);
  }

  delete(project: Project): Observable<Project>{
    return this.http.delete<Project>(`${this.baseUrl}/${project.id}`, {});
  }
}
