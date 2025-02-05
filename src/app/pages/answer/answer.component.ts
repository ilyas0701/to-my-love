import { commonImports } from '../../app.imports';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [...commonImports],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.scss'
})
export class AnswerComponent implements OnInit {
  countClick: number = 1;

  imgs: string[] = ["1.jpg", "2.png", "3.png", "4.png", "5.png"];

  private confetti: any; 
  
  constructor(
    private renderer: Renderer2, 
    private router: Router, 
    @Inject(PLATFORM_ID) private platformId: object
  ) {}
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('canvas-confetti').then((module) => {
        this.confetti = module.default;
        this.celebrate();
      });

      this.startFallingHearts();
    }
  }
  
  startFallingHearts(): void {
      if (!isPlatformBrowser(this.platformId)) return;
      const container = document.querySelector('.circle-container');
      if (!container) return;
  
      setInterval(() => {
        const heart = this.renderer.createElement('div');
        this.renderer.addClass(heart, 'circle');
  
        const size = Math.random() * 30 + 20; // between 10px and 30px
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;

        const imgUrl = Math.random() * 4 + 1;
  
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 2 + 3}s`;
        heart.style.background = `url('/assets/img/img-yes/${Math.round(imgUrl)}.png')`;
        heart.style.backgroundSize = 'contain';
        heart.style.backgroundRepeat = 'no-repeat';
        heart.style.backgroundPosition = 'center';
        heart.style.borderRadius = '50%';

  
        this.renderer.appendChild(container, heart);

        setTimeout(() => {
          this.renderer.removeChild(container, heart);
        }, 8000);
      }, 300); // 300ms
  }

  celebrate() {
    if (!this.confetti) return;

    const duration = 5000;
    this.confetti({
      particleCount: 100,
      spread: 160,
      origin: { y: 0.6 },
    });

    setTimeout(() => {}, duration);
  }
}
