import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Post } from "./interface";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class PostService {
  constructor(private httpClient: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.httpClient.post(`${environment.dbUrl}/posts.json`, post).pipe(
      map((response: Post) => {
        return { ...post, id: response.id, date: new Date(post.date) };
      })
    );
  }

  getAll(): Observable<Post[]> {
    return this.httpClient.get(`${environment.dbUrl}/posts.json`).pipe(
      map((response: { [key: string]: any }) => {
        if(response){
          return Object.keys(response).map((key) => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date),
          }));
        }
      })
    );
  }

  remove(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.dbUrl}/posts/${id}.json`);
  }
  update(post: Post): Observable<Post> {
    return this.httpClient.patch<Post>(`${environment.dbUrl}/posts/${post.id}.json`,post);
  }

  getPostById(id): Observable<Post>{
    return this.httpClient.get<Post>(`${environment.dbUrl}/posts/${id}.json`).pipe(
      map((post: Post) => {
        return { ...post, id, date: new Date(post.date) };
      })
    );
  }
}
