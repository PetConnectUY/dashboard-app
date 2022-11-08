import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskImages } from '../../../interfaces/task-images';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskImagesService } from '../../services/task-images.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {
  @Input() taskId!:string;
  @Output() onSubmit: EventEmitter<TaskImages> = new EventEmitter();
  loading: boolean = false;
  unknowError: boolean = false;
  onChangeError!: string

  imageForm!: FormGroup;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private taskImagesService: TaskImagesService,
  ) {
    this.imageForm = this.fb.group({
      image: [null]
    });
  }

  ngOnInit(): void {
  }

  onFileChange(event:any) {
    if(event.target.files.length>0){
      const image = event.target.files[0];
      this.imageForm.patchValue({image: image});
    }
  }

  save(){
    this.loading = true;
    this.unknowError = false;
    const formData = new FormData();
    formData.append('task_id', this.taskId);
    formData.append('image', this.imageForm.get('image')?.value);
    this.taskImagesService.store(formData).subscribe({
      next: (res: TaskImages) => {
        this.unknowError = false;
        this.closeModal();
        this.onSubmit.emit(res);
      },
      error: (err: HttpErrorResponse) => {
        this.unknowError = true;
        this.loading = false;
        this.onChangeError = 'Ocurrio un error al subir la imagen.';
      }
    })
  }

  closeModal(){
    this.activeModal.close();
  }

}
