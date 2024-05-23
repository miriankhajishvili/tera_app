import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { IUsers } from '../../shared/interfaces/users.interface';
import { MatButtonModule } from '@angular/material/button';
import { DeleteConfirmDialogComponent } from '../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-users-detail',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './users-detail.component.html',
  styleUrl: './users-detail.component.scss',
})
export class UsersDetailComponent implements OnInit {
  curentUser?: IUsers;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.usersService
      .getCurrentUser(this.activatedRoute.snapshot.params['id'])
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
    
    this.usersService.currentUserId.next(this.activatedRoute.snapshot.params['id'])
  }

  onEditClick(){}
}
