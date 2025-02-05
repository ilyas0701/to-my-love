import { Component, OnInit, Renderer2 } from '@angular/core';
import { commonImports } from '../../app.imports';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [...commonImports],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{

  countClick: number = 1;

  constructor(
    private renderer: Renderer2, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    this.startFallingHearts();
  }

  startFallingHearts(): void {

    if (!isPlatformBrowser(this.platformId)) return;
    const container = document.querySelector('.hearts-container');
    if (!container) return;

    setInterval(() => {
      const heart = this.renderer.createElement('div');
      this.renderer.addClass(heart, 'heart');

      const size = Math.random() * 30 + 20; // Random size between 10px and 30px
      heart.style.width = `${size}px`;
      heart.style.height = `${size}px`;

      heart.style.left = `${Math.random() * 100}vw`; // Random horizontal position
      heart.style.animationDuration = `${Math.random() * 2 + 3}s`; // Random fall duration

      this.renderer.appendChild(container, heart);

      // Remove heart after animation ends
      setTimeout(() => {
        this.renderer.removeChild(container, heart);
      }, 8000);
    }, 300); // Create a new heart every 300ms
  }

  moveButton(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const container = document.querySelector('.buttons') as HTMLElement;
    const button = document.getElementById('no-button') as HTMLElement;

    if (!container || !button) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    const maxX = containerRect.width - buttonRect.width;
    const maxY = containerRect.height - buttonRect.height;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
    button.style.scale = `${this.countClick}`;

    this.countClick = this.countClick - 0.1;
  }

  redirectToAnotherPage(): void {
    this.router.navigate(['/yes-answer']);
  }
}
