import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateTokenGuard } from './shared/guards/guards/validate-token.guard';
import { DashboardComponent } from './shared/pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [ValidateTokenGuard],
    component: DashboardComponent,
    children:[
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'news',
        loadChildren: () => import('./dashboard/news/news.module').then(m => m.NewsModule)
      },
      {
        path: 'projects',
        loadChildren: () => import('./dashboard/projects/projects.module').then(m => m.ProjectsModule)
      },
      {
        path: 'projects-images',
        loadChildren: () => import('./dashboard/projects/images/images.module').then(m => m.ImagesModule)
      },
      {
        path: 'services',
        loadChildren: () => import('./dashboard/service/service.module').then(m => m.ServiceModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./dashboard/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'tasks',
        loadChildren: () => import('./dashboard/tasks/tasks.module').then(m => m.TasksModule)
      },
      {
        path: 'tasks-images',
        loadChildren: () => import('./dashboard/tasks/images/images.module').then(m => m.ImagesModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
