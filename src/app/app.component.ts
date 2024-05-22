import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: ' <app-header></app-header>, <router-outlet></router-outlet>',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tera_app';
}
