import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../_models/post';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl = 'http://localhost:5000/api/posts/';

constructor(private httpClient: HttpClient) { }

getPosts(page?, itemsPerPage?): Observable<PaginatedResult<Post[]>> {
  const paginatedResult: PaginatedResult<Post[]> = new PaginatedResult<Post[]>();

  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  return this.httpClient.get<Post[]>(this.baseUrl, { observe: 'response', params})
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

getPost(id: number): Observable<Post> {
  return this.httpClient.get<Post>(this.baseUrl + id);
}

getNewestPosts(): Observable<Post[]> {
  return this.httpClient.get<Post[]>(this.baseUrl + 'newests');
}

deletePost(id: number, userId: number) {
  return this.httpClient.delete(this.baseUrl + id + '/user/' + userId);
}

editPost(id: number, userId: number, post: Post) {
  return this.httpClient.put(this.baseUrl + id + '/user/' + userId, post);
}

}
