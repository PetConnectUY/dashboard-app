import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { NewsIndexComponent } from './news/pages/news-index/news-index.component';
import { ProjectsIndexComponent } from './projects/pages/projects-index/projects-index.component';
import { ImagesIndexComponent } from './projects/images/pages/images-index/images-index.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'news',
    component: NewsIndexComponent
  },
  {
    path: 'projects',
    component: ProjectsIndexComponent
  },
  {
    path: 'projects/images/:id',
    component: ImagesIndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
