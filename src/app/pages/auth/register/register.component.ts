import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PasswordValidate } from '../../../core/validators/password.validators';
import { UsersService } from '../../../shared/services/users.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatTabsModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit, OnDestroy {
  hide = true;
  hideConfirmPassword = true;
  get getEmail() {
    return this.form.get('email');
  }
  get getPassword() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  isEdit: boolean = this.activatedRoute.snapshot.url[0].path === 'edit-user';
  currentUserId!: number;

  form: FormGroup = new FormGroup(
    {
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(25),
      ]),
      confirmPassword: new FormControl(''),
    },
    { validators: PasswordValidate.passwordMatch }
  );

  constructor(
    private userService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private NgToastService: NgToastService
  ) {}

  ngOnInit(): void {
    this.userService.editSub$.subscribe((res) => {
      this.form.patchValue(res);
      this.currentUserId = res.id;
    });
  }
  submit() {
    if (this.form.valid) {
      if (this.isEdit) {
        this.userService
          .editUser(this.currentUserId, this.form.value)
          .subscribe((res) => {
            this.NgToastService.success({
              detail: 'Success Messege',
              summary: 'User edited successfully',
            });
            this.router.navigate(['/users-list']);
          });
      } else {
        this.userService.regiterUser(this.form.value).subscribe({
          next: (res) => {
            localStorage.setItem('Users', 'fakeToken');
            this.router.navigate(['/users-list']);
          },
        });
      }
    }

    this.form.markAllAsTouched();
  }

  ngOnDestroy(): void {}
}
