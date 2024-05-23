import { Component, OnInit } from '@angular/core';
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
import { concatMap, switchMap } from 'rxjs';
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
export class DeleteConfirmDialogComponent implements OnInit {
  currentUserId!: any;

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmDialogComponent>,
    private usersService: UsersService,
    private router: Router,
    private ngToastService: NgToastService
  ) {}

  ngOnInit(): void {
   this.getCurrentUsersId()
  }

  getCurrentUsersId(){
    this.usersService.currentUserId.subscribe(
      (res) => (this.currentUserId = res)
    );
  }

  onYesClick() {
    this.usersService.deleteUser(this.currentUserId).subscribe((res) => {
      this.ngToastService.success({
        detail: 'Success Message',
        summary: 'User Deleted successfully',
      });
      this.router.navigate(['/users-list']);
    });
  }
}
