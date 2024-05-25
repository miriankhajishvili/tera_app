import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IData, IUsers } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseService {
  currentUserId = new BehaviorSubject<string>('');

  editSub$ = new BehaviorSubject<IUsers>({
    id: '',
    firstname: '',
    lastname: '',
    password: '',
    email: '',
    role: '',
  });

  getAllUsers(pageCount?: number): Observable<IData> {
    return this.get<IData>(`users?_page=${pageCount}&_per_page=10`);
  }

  getAllUsersForAuth(): Observable<IUsers[]> {
    return this.get<IUsers[]>('users');
  }

  regiterUser(newUser: IUsers): Observable<IUsers> {
    return this.post<IUsers>('users', newUser);
  }

  getCurrentUser(id: string): Observable<IUsers> {
    return this.get<IUsers>(`users/${id}`);
  }
  editUser(id: string | undefined, data: IUsers): Observable<IUsers> {
    return this.put<IUsers>(`users/${id}`, data);
  }

  deleteUser(id: string): Observable<IUsers> {
    return this.delete<IUsers>(`users/${id}`);
  }
}
