import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsersService } from '../../shared/services/users.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IUsers } from '../../shared/interfaces/users.interface';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginator,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {

  currentPage:number = 0
  displayedColumns: string[] = ['id', 'fullname', 'email'];
  users$: IUsers[] = [];
  // dataSource = new MatTableDataSource(this.users$);

  // allUsers$ = this.userService.getAllUsers();
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((res) => {
      console.log(res)
      this.users$ = res});
  }
  handlePageEvent($event:PageEvent){
    console.log(this.currentPage)
    this.currentPage = $event.pageIndex 
    console.log($event)
  }
}
