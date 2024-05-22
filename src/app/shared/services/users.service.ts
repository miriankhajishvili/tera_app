import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { IUsers } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends BaseService {
  getAllUsers(): Observable<IUsers[]> {
    return this.get<IUsers[]>('users');
  }

  regiterUser(newUser: IUsers): Observable<IUsers> {
    return this.post<IUsers>('users', newUser);
  }
}
