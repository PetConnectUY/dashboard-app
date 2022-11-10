import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesIndexComponent } from './pages/services-index/services-index.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { PaginationModule } from '../../shared/modules/pagination/pagination.module';
import { StatsModule } from '../stats/stats.module';

@NgModule({
  declarations: [
    ServicesIndexComponent,
    SearchComponent,
    ModalFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule,
    NgbModule,
    EditorModule,
    PaginationModule,
    StatsModule
  ]
})
export class ServiceModule { }
