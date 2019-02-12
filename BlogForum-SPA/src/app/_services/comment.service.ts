import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../_models/comment';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl = 'http://localhost:5000/api/comments/post/';
  deleteUrl = 'http://localhost:5000/api/comments/';

constructor(private httpClient: HttpClient) { }

addComment(postId: number, userId: number, comment: Comment) {
  return this.httpClient.post(this.baseUrl + postId + '/user/' + userId, comment);
}

getComments(postId: number, page?, itemsPerPage?): Observable<PaginatedResult<Comment[]>> {
  const paginatedResult: PaginatedResult<Comment[]> = new PaginatedResult<Comment[]>();
  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }
  return this.httpClient.get<Comment[]>(this.baseUrl + postId, {observe: 'response', params})
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

deleteComment(commentId: number, userId: number) {
  return this.httpClient.delete(this.deleteUrl + commentId + '/user/' + userId);
}

}
