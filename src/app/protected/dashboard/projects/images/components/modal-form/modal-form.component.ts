import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImagesService } from '../../services/images.service';
import { ProjectImages } from '../../../interfaces/project-images';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {
  @Input() projectId!:string;
  @Output() onSubmit: EventEmitter<ProjectImages> = new EventEmitter();
  loading: boolean = false;
  unknowError: boolean = false;
  onChangeError!: string

  imageForm!: FormGroup;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private imagesService: ImagesService,
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
    formData.append('project_id', this.projectId);
    formData.append('image', this.imageForm.get('image')?.value);
    this.imagesService.store(formData).subscribe({
      next: (res: ProjectImages) => {
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
