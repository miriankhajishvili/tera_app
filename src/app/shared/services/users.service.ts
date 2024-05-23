import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IData, IUsers } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseService {
  currentUserId = new BehaviorSubject<string>('');

  editSub$ = new BehaviorSubject<any>(null);

  getAllUsers(pageCount?: number): Observable<IData> {
    return this.get<IData>(`users?_page=${pageCount}&_per_page=20`);
  }

  getAllUsersForAuth(): Observable<IUsers[]> {
    return this.get<IUsers[]>('users');
  }

  regiterUser(newUser: IUsers): Observable<IUsers> {
    return this.post<IUsers>('users', newUser);
  }

  getCurrentUser(id: number): Observable<IUsers> {
    return this.get<IUsers>(`users/${id}`);
  }
  editUser(id: number | undefined, data: IUsers): Observable<IUsers> {
    return this.put<any>(`users/${id}`, data);
  }

  deleteUser(id: string): Observable<IUsers> {
    return this.delete<IUsers>(`users/${id}`);
  }
}
