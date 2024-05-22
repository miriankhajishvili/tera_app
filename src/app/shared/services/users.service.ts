import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, shareReplay } from 'rxjs';
import { IUsers } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseService {



  getAllUsers(): Observable<IUsers[]> {


    return this.get<IUsers[]>('users');
  }

  regiterUser(newUser: IUsers): Observable<IUsers> {
    let users: IUsers[] = [];
    let Myuser = localStorage.getItem('Users');

    if (Myuser) {
      users = JSON.parse(Myuser);
      users = [newUser, ...users];
    } else users = [newUser];

    localStorage.setItem('Users', JSON.stringify(users));
    return this.post<IUsers>('users', newUser);
  }
}
