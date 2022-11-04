import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersIndexComponent } from './pages/users-index/users-index.component';
import { SearchComponent } from './components/search/search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { PaginationModule } from '../../shared/modules/pagination/pagination.module';



@NgModule({
  declarations: [
    UsersIndexComponent,
    SearchComponent,
    ModalFormComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PaginationModule
  ]
})
export class UsersModule { }
