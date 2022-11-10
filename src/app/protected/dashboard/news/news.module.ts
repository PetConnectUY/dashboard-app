import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationModule } from '../../shared/modules/pagination/pagination.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsIndexComponent } from './pages/news-index/news-index.component';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SearchComponent } from './components/search/search.component';
import { StatsModule } from '../stats/stats.module';

@NgModule({
  declarations: [
    NewsIndexComponent,
    ModalFormComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    FontAwesomeModule,
    PaginationModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    NgxSkeletonLoaderModule,
    StatsModule
  ],
})
export class NewsModule { }
