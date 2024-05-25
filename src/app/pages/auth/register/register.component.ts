import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
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
import { Subject, takeUntil } from 'rxjs';
import { MatRadioModule } from '@angular/material/radio';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    MatRadioModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  destroyRef: DestroyRef = inject(DestroyRef);
  localData: string | null = localStorage.getItem('Role');
  hide: boolean = true;
  hideConfirmPassword: boolean = true;
  isEdit: boolean = this.activatedRoute.snapshot.url[0].path === 'edit-user';
  currentUserId!: string;

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
      role: new FormControl('User'),
      confirmPassword: new FormControl(''),
    },
    { validators: PasswordValidate.passwordMatch }
  );

  get getEmail() {
    return this.form.get('email');
  }
  get getPassword() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }
  get role() {
    return this.form.get('role');
  }
  constructor(
    private usersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngToastService: NgToastService
  ) {}

  ngOnInit(): void {
    this.editUser();
    this.resetFormValue();
  }

  resetFormValue() {
    if (!this.isEdit) {
      this.form.reset();
      this.role?.setValue('User');
    }
  }

  editUser() {
    this.usersService.editSub$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.currentUserId = res.id;
        this.form.patchValue(res);
      });
  }

  submit() {
    if (this.form.valid) {
      if (this.isEdit) {
        this.usersService
          .editUser(this.currentUserId, this.form.value)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((res) => {
            this.ngToastService.success({
              detail: 'Success Messege',
              summary: 'User edited successfully',
            });

            this.router.navigate(['/users-list']);
          });
        this.form.reset();
      } else {
        this.usersService
          .regiterUser(this.form.value)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: (res) => {
              this.ngToastService.success({
                detail: 'Success Messege',
                summary: 'User registered successfully',
              });
              localStorage.setItem('Name', res.firstname + ' ' + res.lastname);
              localStorage.setItem('Role', this.form.value.role);
              this.router.navigate(['/users-list']);
            },
          });
      }
    }

    this.form.markAllAsTouched();
  }
}
