import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './pages/stats/stats.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';



@NgModule({
  declarations: [
    StatsComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgxSkeletonLoaderModule
  ],
  exports: [
    StatsComponent
  ],
})
export class StatsModule { }
