import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksIndexComponent } from './pages/tasks-index/tasks-index.component';
import { SearchComponent } from './components/search/search.component';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PaginationModule } from '../../shared/modules/pagination/pagination.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalViewComponent } from './components/modal-view/modal-view.component';



@NgModule({
  declarations: [
    TasksIndexComponent,
    SearchComponent,
    ModalFormComponent,
    ModalViewComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    EditorModule,
    ReactiveFormsModule,
    FormsModule,
    PaginationModule,
    RouterModule,
    NgbModule
  ]
})
export class TasksModule { }
