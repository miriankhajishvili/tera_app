import {
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { IUsers } from '../../shared/interfaces/users.interface';
import { MatButtonModule } from '@angular/material/button';
import { DeleteConfirmDialogComponent } from '../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  templateUrl: './users-detail.component.html',
  styleUrl: './users-detail.component.scss',
})
export class UsersDetailComponent implements OnInit {
  destroyRef: DestroyRef = inject(DestroyRef);
  localData: string | null = localStorage.getItem('Role');
  curentUser!: IUsers;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.usersService
      .getCurrentUser(this.activatedRoute.snapshot.params['id'])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => (this.curentUser = res));
  }
  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DeleteConfirmDialogComponent, {
      width: '350px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    this.usersService.currentUserId.next(
      this.activatedRoute.snapshot.params['id']
    );
  }

  onEditClick() {
    this.usersService.editSub$.next(this.curentUser);
    this.router.navigate(['/edit-user', this.curentUser!.id]);
  }
}
