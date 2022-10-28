import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { StatsComponent } from './components/stats/stats.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TasksComponent } from './components/tasks/tasks.component';
import { IndexComponent } from './pages/index/index.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalViewComponent } from './components/modal-view/modal-view.component';

@NgModule({
  declarations: [
    StatsComponent,
    TasksComponent,
    IndexComponent,
    LoaderComponent,
    ModalViewComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FontAwesomeModule,
    NgxSkeletonLoaderModule,
    NgbModule
  ],
})
export class DashboardModule { }
