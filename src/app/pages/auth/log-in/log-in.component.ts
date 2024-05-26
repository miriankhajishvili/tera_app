import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnDestroy, OnInit, inject } from '@angular/core';
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
import { Subject, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


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
export class LogInComponent implements OnInit {
  destroyRef: DestroyRef = inject(DestroyRef);
  hide:boolean = true;

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15),
    ]),
  });

  get getEmail() {
    return this.form.get('email');
  }

  get getPassword() {
    return this.form.get('password');
  }

  constructor(
    private usersService: UsersService,
    private router: Router,
    private ngToastService: NgToastService
  ) {}

  ngOnInit(): void {
    
  }

  submit() {
    this.usersService
      .getAllUsersForAuth()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        const user = res.find((user: IUsers) => {
          return (
            user.email === this.form.value.email &&
            user.password === this.form.value.password
          );
        });
        if (user) {
          
          localStorage.setItem('Name', user.firstname + ' ' + user.lastname);
          localStorage.setItem('Role', user.role);
          this.ngToastService.success({
            detail: 'Success Message',
            summary: 'User logged in successfully',
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
