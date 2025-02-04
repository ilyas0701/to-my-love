import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-maze',
  standalone: true,
  imports: [],
  templateUrl: './maze.component.html',
  styleUrl: './maze.component.scss'
})
export class MazeComponent{
  maze: number[][] = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 0, 0, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
  ];

  playerX: number = 1;
  playerY: number = 1;

  touchStartX: number | null = null;
  touchStartY: number | null = null;

  gameWon: boolean = false;

  move(dx: number, dy: number) {
    let newX = this.playerX + dx;
    let newY = this.playerY + dy;

    if (this.isValidMove(newX, newY)) {
      this.playerX = newX;
      this.playerY = newY;
    }

    if (this.maze[this.playerY][this.playerX] === 2) {
      this.gameWon = true;
    }
  }

  isValidMove(x: number, y: number): boolean {
    return (
      y >= 0 &&
      y < this.maze.length &&
      x >= 0 &&
      x < this.maze[0].length &&
      this.maze[y][x] !== 1 // Можно идти только по "0" или "2"
    );
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
      case 'w':
        this.move(0, -1);
        break;
      case 'ArrowDown':
      case 's':
        this.move(0, 1);
        break;
      case 'ArrowLeft':
      case 'a':
        this.move(-1, 0);
        break;
      case 'ArrowRight':
      case 'd':
        this.move(1, 0);
        break;
    }
  }

  @HostListener('touchstart', ['$event'])
  handleTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
  }

  @HostListener('touchend', ['$event'])
  handleTouchEnd(event: TouchEvent) {
    if (this.touchStartX === null || this.touchStartY === null) return;

    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;
    
    const deltaX = touchEndX - this.touchStartX;
    const deltaY = touchEndY - this.touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 50) this.move(1, 0);
      else if (deltaX < -50) this.move(-1, 0);
    } else {
      if (deltaY > 50) this.move(0, 1);
      else if (deltaY < -50) this.move(0, -1);
    }

    this.touchStartX = null;
    this.touchStartY = null;
  }
}
