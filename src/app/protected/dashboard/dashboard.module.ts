import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TasksComponent } from './components/tasks/tasks.component';
import { IndexComponent } from './pages/index/index.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalViewComponent } from './components/modal-view/modal-view.component';
import { ModalAlertComponent } from './components/modal-alert/modal-alert.component';
import { PaginationModule } from '../shared/modules/pagination/pagination.module';
import { ModalViewImageComponent } from './components/modal-view-image/modal-view-image.component';
import { StatsModule } from './stats/stats.module';

@NgModule({
  declarations: [
    TasksComponent,
    IndexComponent,
    ModalViewComponent,
    ModalAlertComponent,
    ModalViewImageComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FontAwesomeModule,
    NgxSkeletonLoaderModule,
    NgbModule,
    PaginationModule,
    StatsModule
  ],
})
export class DashboardModule { }
