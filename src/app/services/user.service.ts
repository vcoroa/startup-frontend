import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../models/user.model';

export interface PaginationParams {
  page: number;
  limit: number;
}

export const PAGE_SIZES = [10, 20, 50, 100];

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://679c4c2a33d31684632654a7.mockapi.io/api/v1/users';

  constructor(private http: HttpClient) { }

  getUsers(params: PaginationParams): Observable<{data: User[], total: number}> {
    // First request to get total count
    return this.http.get<User[]>(this.apiUrl).pipe(
      switchMap(allUsers => {
        const total = allUsers.length;
        const start = (params.page - 1) * params.limit;
        const end = start + params.limit;
        const paginatedUsers = allUsers.slice(start, end);
        
        return of({
          data: paginatedUsers,
          total: total
        });
      })
    );
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}