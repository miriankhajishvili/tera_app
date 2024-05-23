import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { UsersService } from '../../shared/services/users.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IUsers } from '../../shared/interfaces/users.interface';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../layout/header/header.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginator,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterModule,
    HeaderComponent,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit , OnDestroy {
  destroySub$ = new Subject<null>();
  currentPage: number = 0;
  displayedColumns: string[] = ['id', 'fullname', 'email', 'role',  'profile'];
  users$: IUsers[] = [];
  items!: number;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.currentPage = this.currentPage + 1;
    this.userService
      .getAllUsers(this.currentPage)

      .pipe(takeUntil(this.destroySub$)).subscribe((res) => {
        this.users$ = res.data;
        this.items = res.items;
      });
  }

  handlePageEvent($event: PageEvent) {
    this.userService.getAllUsers($event.pageIndex + 1).pipe(takeUntil(this.destroySub$)).subscribe((res) => {
      this.users$ = res.data;
    });
  }
  ngOnDestroy(): void {
    this.destroySub$.next(null),
    this.destroySub$.complete();
  }
}
