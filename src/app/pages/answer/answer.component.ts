import { commonImports } from '../../app.imports';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import * as confetti from 'canvas-confetti';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [...commonImports],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.scss'
})
export class AnswerComponent implements OnInit, AfterViewInit {
  countClick: number = 1;

  imgs: string[] = ["1.jpg", "2.png", "3.png", "4.png", "5.png"];
  
  constructor(private renderer: Renderer2, private router: Router) {}
  
  ngOnInit(): void {
    this.celebrate();
    this.startFallingHearts();
  }

  ngAfterViewInit(): void {
    this.setupVideoListener();
  }
  
  startFallingHearts(): void {
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
    const duration = 5000;

      confetti.default({
      particleCount: 100,
      spread: 160,
      origin: { y: 0.6 },
    });

    setTimeout(() => confetti.reset(), duration);
  }

  setupVideoListener(): void {
    const video = document.getElementById("loveVideo") as HTMLVideoElement;
    const button = document.getElementById("giftButton") as HTMLButtonElement;

    if (!video || !button) return;

    video.addEventListener("timeupdate", () => {
      const percentWatched = (video.currentTime / video.duration) * 100;

      if (percentWatched >= 99) {
        button.style.display = "block";
      }
    });

    button.addEventListener("click", () => {
      alert("🎁 Твой сюрприз: Купон на поход в суши-бар!");
      window.location.href = "your-coupon-link.html";
    });
  }
  
}
