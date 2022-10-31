import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsIndexComponent } from './pages/projects-index/projects-index.component';
import { SearchComponent } from './components/search/search.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { PaginationModule } from '../../shared/modules/pagination/pagination.module';


@NgModule({
  declarations: [
    ProjectsIndexComponent,
    SearchComponent,
    ModalFormComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule,
    EditorModule,
    PaginationModule
  ],
})
export class ProjectsModule { }
