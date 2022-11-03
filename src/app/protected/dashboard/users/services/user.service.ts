import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../../../../shared/services/helper.service';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { UserPagination } from '../interfaces/user-pagination';
import { ParamMap } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl+'users';
  constructor(
    private http:HttpClient,
    private helperService: HelperService
  ) { }

  getUsers(paramMap: ParamMap):Observable<UserPagination>{
    return this.http.get<UserPagination>(this.baseUrl, {
      params: this.helperService.getHttpParams(paramMap, ['search', 'page'])
    })
  }
}
