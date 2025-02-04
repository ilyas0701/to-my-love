import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Router],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'marika';

  isMazePage = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isMazePage = this.router.url.includes('/maze');
    });
  }
}
