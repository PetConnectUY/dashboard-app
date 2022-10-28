import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsIndexComponent } from './pages/news-index/news-index.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    component: NewsIndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
