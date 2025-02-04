import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { AnswerComponent } from './pages/answer/answer.component';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'yes-answer', component: AnswerComponent },
];
