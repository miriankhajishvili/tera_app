import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Subject, concatMap, switchMap, takeUntil } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-delete-confirm-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrl: './delete-confirm-dialog.component.scss',
})
export class DeleteConfirmDialogComponent implements OnInit, OnDestroy {
  destroySub$ = new Subject<void>();
  currentUserId!: string;

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmDialogComponent>,
    private usersService: UsersService,
    private router: Router,
    private ngToastService: NgToastService
  ) {}

  ngOnInit(): void {
    this.getCurrentUsersId();
  }

  getCurrentUsersId() {
    this.usersService.currentUserId
      .pipe(takeUntil(this.destroySub$))
      .subscribe((res) => (this.currentUserId = res));
  }

  onYesClick() {
    this.usersService
      .deleteUser(this.currentUserId)
      .pipe(takeUntil(this.destroySub$))
      .subscribe((res) => {
        this.ngToastService.success({
          detail: 'Success Message',
          summary: 'User deleted successfully',
        });
        this.router.navigate(['/users-list']);
      });
  }

  ngOnDestroy(): void {
    // this.destroySub$.next(), this.destroySub$.complete();
  }
}
