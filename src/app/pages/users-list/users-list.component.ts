import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import {  MatTableModule } from '@angular/material/table';
import { UsersService } from '../../shared/services/users.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IUsers } from '../../shared/interfaces/users.interface';
import { RouterModule } from '@angular/router';

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
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  currentPage: number = 0;
  displayedColumns: string[] = ['id', 'fullname', 'email', 'profile'];
  users$: IUsers[] = [];
  items!: number;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService
      .getAllUsers(this.currentPage + 1)

      .subscribe((res) => {
        this.users$ = res.data;
        this.items = res.items;
      });
    console.log(this.currentPage);


    
  }

  handlePageEvent($event: PageEvent) {
    console.log(this.currentPage);

    this.currentPage + 1;
    console.log($event);
    this.userService.getAllUsers($event.pageIndex).subscribe((res) => {
      this.users$ = res.data;
    });
    if ((this.currentPage = 0)) {
      this.currentPage === 1;
    }
  }
}
