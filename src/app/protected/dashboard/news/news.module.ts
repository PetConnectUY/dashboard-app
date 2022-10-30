import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { SearchComponent } from './components/search/search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationModule } from '../../shared/modules/pagination/pagination.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsIndexComponent } from './pages/news-index/news-index.component';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { LoaderComponent } from '../components/loader/loader.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    SearchComponent,
    NewsIndexComponent,
    ModalFormComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    FontAwesomeModule,
    PaginationModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    NgxSkeletonLoaderModule
  ],
})
export class NewsModule { }
