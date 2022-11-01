import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagesIndexComponent } from './pages/images-index/images-index.component';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalImageComponent } from './components/modal-image/modal-image.component';


@NgModule({
  declarations: [
    ImagesIndexComponent,
    ModalFormComponent,
    ModalImageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class ImagesModule { }
