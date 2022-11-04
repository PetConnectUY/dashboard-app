import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../interfaces/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent implements OnInit {
  @Input() userToEdit!: User;
  @Output() onSubmit:EventEmitter<User> = new EventEmitter();

  modalTitle!:string;
  modalBtnTitle!:string;
  loading: boolean = false;
  unknowError: boolean = false;
  onChangeError!: string;

  userForm!:FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    if(this.userToEdit){
      this.modalTitle = 'Editar usuario';
      this.modalBtnTitle = 'Editar';
      this.userForm = this.fb.group({
        'username': [this.userToEdit.username, [Validators.required, Validators.min(3)]],
        'email': [this.userToEdit.email, [Validators.required, Validators.email]],
        'firstname': [this.userToEdit.firstname, [Validators.required, Validators.min(3)]],
        'lastname': [this.userToEdit.lastname, [Validators.required, Validators.min(3)]],
        'location': [this.userToEdit.location, [Validators.required]],
        'linkedin': [this.userToEdit.linkedin, [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
        'position': [this.userToEdit.position, [Validators.required]]
      });
    } else {
      this.modalTitle = 'Nuevo usuario';
      this.modalBtnTitle = 'Crear';
      this.userForm = this.fb.group({
        'username': ["", [Validators.required, Validators.min(3)]],
        'email': ["", [Validators.required, Validators.email]],
        'password': ["", [Validators.required, Validators.min(6)]],
        'firstname': ["", [Validators.required, Validators.min(3)]],
        'lastname': ["", [Validators.required, Validators.min(3)]],
        'location': ["", [Validators.required]],
        'linkedin': ["", [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
        'position': ["", [Validators.required]]
      });
    }
  }

  save(){
    if(this.userForm.valid){
      this.loading = true;
      this.unknowError = false;

      const {username, email, password, firstname, lastname, location, linkedin, position} = this.userForm.value;
      const formData = new FormData();
      
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('firstname', firstname);
      formData.append('lastname', lastname);
      formData.append('location', location);
      formData.append('linkedin', linkedin);
      formData.append('position', position);

      if(this.userToEdit) {
        this.userService.update(formData, this.userToEdit.id).subscribe({
          next: (res: User) => {
            this.closeModal();
            this.onSubmit.emit(res);
          },
          error: (err: HttpErrorResponse) => {
            this.unknowError = true;
            this.loading = false;
            this.onChangeError = 'Ocurrio un error al actualizar el usuario.';
          }
        })
      } else {
        this.userService.store(formData).subscribe({
          next: (res: User) => {
            this.closeModal();
            this.onSubmit.emit(res);
          },
          error: (err: HttpErrorResponse) => {
            this.unknowError = true;
            this.loading = false;
            this.onChangeError = 'Ocurrio un error al crear el usuario.';
          }
        })
      }
    }
  }

  closeModal(){
    this.activeModal.close();
  }

}
