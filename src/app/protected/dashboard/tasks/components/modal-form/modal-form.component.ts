import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserPagination } from '../../../users/interfaces/user-pagination';
import { Task } from '../../interfaces/task';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {
  @Input() taskToEdit!:Task;
  @Input() usersPagination!:UserPagination;
  @Output() onSubmit:EventEmitter<Task> = new EventEmitter();

  modalTitle!: string;
  loading: boolean = false;
  unknowError: boolean = false;
  onChangeError!:string;
  modalBtnTitle!: string;

  taskForm!:FormGroup;

  constructor(
    private taskService: TaskService,
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    if(this.taskToEdit){
      this.modalTitle = 'Editar Tarea';
      this.modalBtnTitle = 'Editar';
      this.taskForm = this.fb.group({
        'description': [this.taskToEdit.description, [Validators.required]],
        'user_id': [this.taskToEdit.user.id, [Validators.required]],
        'link': [this.taskToEdit.link, [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]]
      });
    } else {
      this.modalTitle = 'Nueva tarea';
      this.modalBtnTitle = 'Crear';
      this.taskForm = this.fb.group({
        'description': ["", [Validators.required]],
        'user_id': ["", [Validators.required]],
        'link': ["", [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]]
      });
    }
  }

  save(){
    this.loading = true;
    this.unknowError = false;

    const { description, user_id, link } = this.taskForm.value;
    const formData = new FormData;

    formData.append('description', description);
    formData.append('user_id', user_id);
    formData.append('link', link);

    if(this.taskForm.valid){
      if(this.taskToEdit){
        this.taskService.update(formData, this.taskToEdit.id).subscribe({
          next: (res: Task) => {
            this.closeModal();
            this.unknowError = false;
            this.onSubmit.emit(res);
          },
          error: (err: HttpErrorResponse) => {
            this.loading = false;
            this.unknowError = true;
            this.onChangeError = 'Ocurrio un error al editar la tarea.'
          }
        })
      } else {
        this.taskService.store(formData).subscribe({
          next: (res: Task) => {
            this.closeModal();
            this.unknowError = false;
            this.onSubmit.emit(res);
          },
          error: (err: HttpErrorResponse) => {
            this.loading = false;
            this.unknowError = true;
            this.onChangeError = 'Ocurrio un error al crear la tarea.'
          }
        })
      }
    }
  }

  closeModal(){
    this.activeModal.close();
  }

}
