import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImagesIndexComponent } from './images/pages/images-index/images-index.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'images/:id',
    component: ImagesIndexComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
