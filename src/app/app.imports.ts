import {RouterModule} from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { MazeComponent } from './pages/maze/maze.component';


export const commonModuleImports: ReadonlyArray<any> = [
  RouterModule,
];

export const commonComponentImports: ReadonlyArray<any> = [
  MainComponent,
  MazeComponent,
];

export const commonImports: ReadonlyArray<any> = [
  ...commonModuleImports,
  ...commonComponentImports
]
