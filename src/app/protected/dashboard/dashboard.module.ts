import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { StatsComponent } from './components/stats/stats.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TasksComponent } from './components/tasks/tasks.component';
import { IndexComponent } from './pages/index/index.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalViewComponent } from './components/modal-view/modal-view.component';
import { ModalAlertComponent } from './components/modal-alert/modal-alert.component';
import { IndexUsersComponent } from './users/pages/index-users/index-users.component';

@NgModule({
  declarations: [
    StatsComponent,
    TasksComponent,
    IndexComponent,
    ModalViewComponent,
    ModalAlertComponent,
    IndexUsersComponent,
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
