import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { SearchComponent } from './components/search/search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationModule } from '../../shared/modules/pagination/pagination.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewsIndexComponent } from './pages/news-index/news-index.component';


@NgModule({
  declarations: [
    SearchComponent,
    NewsIndexComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    FontAwesomeModule,
    PaginationModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class NewsModule { }
