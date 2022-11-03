import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Services } from '../../interfaces/services';
import { ServicesService } from '../../services/services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../users/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { UserPagination } from '../../../users/interfaces/user-pagination';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {
  faSpinner = faSpinner;

  @Input() serviceToEdit!: Services;
  @Input() usersPagination!: UserPagination;
  @Input() usersLoading!: boolean;

  @Output() onSubmit:EventEmitter<Services> = new EventEmitter();

  modalTitle!:string;
  modalBtnTitle!:string;
  loading: boolean = false;
  unknowError: boolean = false;
  onChangeError!: string;

  serviceForm!:FormGroup;

  constructor(
    private fb: FormBuilder,
    private servicesService: ServicesService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {    
    if(this.serviceToEdit) {
      this.modalTitle = 'Editar servicio';
      this.modalBtnTitle = 'Editar';
      this.serviceForm = this.fb.group({
        'name': [this.serviceToEdit.name, [Validators.required]],
        'description': [this.serviceToEdit.description, [Validators.required]],
        'image': [null, []],
        'user_service_manager': [this.serviceToEdit.user.id, [Validators.required]],
      });
    } else {
      this.modalTitle = 'Nuevo servicio';
      this.modalBtnTitle = 'Crear';
      this.serviceForm = this.fb.group({
        'name': ["", [Validators.required]],
        'description': ["", [Validators.required]],
        'image': [null, [Validators.required]],
        'user_service_manager': ["", [Validators.required]]
      });
    }
  }

  onFileChange(event:any) {
    if(event.target.files.length>0){
      const image = event.target.files[0];
      this.serviceForm.patchValue({image: image});
    }
  }

  save(){
    if(this.serviceForm.valid) {
      this.loading = true;
      this.unknowError = false;

      const { name, description, user_service_manager } = this.serviceForm.value;
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('user_service_manager', user_service_manager);
      formData.append('image', this.serviceForm.get('image')?.value);

      if(this.serviceToEdit) {
        this.servicesService.update(formData, this.serviceToEdit.id).subscribe({
          next: (res: Services) => {
            this.loading = false;
            this.unknowError = false;
            this.onSubmit.emit(res);
            this.closeModal();
          },
          error: (res: HttpErrorResponse) => {
            this.loading = false;
            this.unknowError = true;
            this.onChangeError = 'Ocurrio un error al acutalizar el servicio.';
          }
        });
      } else {
        this.servicesService.store(formData).subscribe({
          next: (res: Services) => {
            this.loading = false;
            this.closeModal();
            this.onSubmit.emit(res);
          },
          error: (err: HttpErrorResponse) => {
            this.loading = false;
            this.unknowError = true;
            this.onChangeError = 'Ocurrio un error al crear el servicio.';
          }
        });
      }
    }
  }

  closeModal(){
    this.activeModal.close();
  }
}
