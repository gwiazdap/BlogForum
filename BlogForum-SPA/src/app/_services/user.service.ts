import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../_models/user';
import { Post } from '../_models/post';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:5000/api/users/';
  searchUrl = 'http://localhost:5000/api/users';

constructor(private httpClient: HttpClient) {
 }

getUsers(page?, itemsPerPage?): Observable<PaginatedResult<User[]>> {
  const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  return this.httpClient.get<User[]>(this.baseUrl, {observe: 'response', params})
  .pipe(
    map(response => {
      paginatedResult.result = response.body;
      if (response.headers.get('Pagination') != null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    })
  );
}

getUser(userId: number): Observable<User> {
  return this.httpClient.get<User>(this.baseUrl + userId);
}

getUsersPosts(userId: number, page?, itemsPerPage?): Observable<PaginatedResult<Post[]>> {
  const paginatedResult: PaginatedResult<Post[]> = new PaginatedResult<Post[]>();
  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  return this.httpClient.get<Post[]>(this.baseUrl + userId + '/posts', {observe: 'response', params})
  .pipe(
    map(response => {
      paginatedResult.result = response.body;
      if (response.headers.get('Pagination') != null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    })
  );
}

createPost(userId: number, post: Post) {
  return this.httpClient.post(this.baseUrl + userId + '/posts', post);
}

searchUsers(query: string, page?, itemsPerPage?): Observable<PaginatedResult<User[]>> {
  const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }
  return this.httpClient.get<User[]>(this.searchUrl + '?query=' + query, {observe: 'response', params})
  .pipe(
    map(response => {
      paginatedResult.result = response.body;
      if (response.headers.get('Pagination') != null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    })
  );
}

}
