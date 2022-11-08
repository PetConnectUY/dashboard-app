import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksImagesIndexComponent } from './pages/tasks-images-index/tasks-images-index.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { ModalViewComponent } from './components/modal-view/modal-view.component';



@NgModule({
  declarations: [
    TasksImagesIndexComponent,
    ModalFormComponent,
    ModalViewComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ImagesModule { }
