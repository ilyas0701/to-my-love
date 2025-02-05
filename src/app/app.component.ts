import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'marika';

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: object) {
    this.router.events.subscribe((event) => {
      if (isPlatformBrowser(this.platformId)){
        if (event instanceof NavigationEnd) {
          const isMazePage = this.router.url.includes('/yes-answer');
          document.body.classList.toggle('no-scroll', isMazePage);
        }
      }
    });
  }

}
