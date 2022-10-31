import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from '../../services/projects.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Project } from '../../interfaces/project';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {
  @Input() projectToEdit!: Project;
  @Output() onSubmit:EventEmitter<Project> = new EventEmitter();

  modalTitle!:string;
  modalBtnTitle!:string;
  loading: boolean = false;
  unknowError: boolean = false;
  onChangeError!: string;
  
  projectForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectsService: ProjectsService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    if(this.projectToEdit){
      this.modalTitle = 'Editar proyecto';
      this.modalBtnTitle = 'Editar';
      this.projectForm = this.fb.group({
        'name': [this.projectToEdit.name, [Validators.required]],
        'description': [this.projectToEdit.description, [Validators.required]],
        'link': [this.projectToEdit.link, [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]]
      })
    } else {
      this.modalTitle = 'Nuevo proyecto';
      this.modalBtnTitle = 'Crear';
      this.projectForm = this.fb.group({
        'name': ["", [Validators.required]],
        'description': ["", [Validators.required]],
        'link': ['', [Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]]
      });
    }
  }

  save(){
    if(this.projectForm.valid) {
      this.loading = true;
      this.unknowError = false;

      const {name, description, link} = this.projectForm.value;    
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('link', link);

      if(this.projectToEdit){
        this.projectsService.update(formData, this.projectToEdit.id).subscribe({
          next: (res: Project) => {
            this.closeModal();
            this.onSubmit.emit(res);
            this.unknowError = false;
          },
          error: (err: HttpErrorResponse) => {
            this.loading = false;
            this.unknowError = true;
            this.onChangeError = 'Ocurrio un error al editar la noticia.';
          }
        })
      } else{
        this.projectsService.store(formData).subscribe({
          next: (res: Project) => {
            this.closeModal();
            this.onSubmit.emit(res);
            this.unknowError = false;
          },
          error: (err: HttpErrorResponse) => {
            this.loading = false;
            this.unknowError = true;
            this.onChangeError = 'Ocurrio un error al crear el proyecto.';
          }
        })
      }
    }
  }

  closeModal(){
    this.activeModal.close();
  }

}
