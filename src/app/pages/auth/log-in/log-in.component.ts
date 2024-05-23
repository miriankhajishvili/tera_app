import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../../shared/services/users.service';
import { IUsers } from '../../../shared/interfaces/users.interface';
import { NgToastService } from 'ng-angular-popup';
import { map } from 'rxjs';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatTabsModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogInComponent {
  errorMsg!: string;

  hide = true;
  get getEmail() {
    return this.form.get('email');
  }

  get getPassword() {
    return this.form.get('password');
  }

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15),
    ]),
  });

  constructor(
    private userService: UsersService,
    private router: Router,
    private ngToastService: NgToastService
  ) {}

  submit() {
    this.userService.getAllUsersForAuth().subscribe((res) => {
     

      const user = res.find((user: IUsers) => {
        return (
          user.email === this.form.value.email &&
          user.password === this.form.value.password
        );
      });
      if (user) {
        localStorage.setItem('Users', 'fakeToken');
        this.ngToastService.success({
          detail: 'Success Message',
          summary: 'User logined successfully',
        });
        this.form.reset();
        this.router.navigate(['/users-list']);
      } else {
        this.ngToastService.error({
          detail: 'Error Message',
          summary: 'Email or Password is wrong',
        });
      }
    });
  }
}
