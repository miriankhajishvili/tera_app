import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { NgToastModule } from 'ng-angular-popup';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,NgToastModule],
  template: ' <app-header></app-header>, <router-outlet></router-outlet> <ng-toast></ng-toast>',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tera_app';
}
