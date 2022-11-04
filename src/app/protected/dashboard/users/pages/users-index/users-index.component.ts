import { Component, OnInit } from '@angular/core';
import { faEllipsis, faExclamationCircle, faPencil, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { UserPagination } from '../../interfaces/user-pagination';
import { UserService } from '../../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../interfaces/user';
import { ModalFormComponent } from '../../components/modal-form/modal-form.component';
import { ModalAlertComponent } from '../../../components/modal-alert/modal-alert.component';

@Component({
  selector: 'app-users-index',
  templateUrl: './users-index.component.html',
  styleUrls: ['./users-index.component.scss']
})
export class UsersIndexComponent implements OnInit {
  faUser = faUser;
  faExclamationCircle = faExclamationCircle;
  faEllipsis = faEllipsis;
  faPencil = faPencil;
  faTrash = faTrash;

  loader:boolean = true;
  unknowError: boolean = false;
  onChangeError!: string;

  usersPagination!: UserPagination;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.updateTable();
  }

  updateTable(){
    this.route.queryParamMap.subscribe(paramMap => {
      this.loader = true;
      this.unknowError = false;
      this.userService.getUsers(paramMap).subscribe({
        next: (res: UserPagination) => {
          this.loader = false;
          this.unknowError = false;
          this.usersPagination = res;
        },
        error: (err: HttpErrorResponse) => {
          this.loader = false;
          this.unknowError = true;
          this.onChangeError = 'Ocurrio un error al traer los usuarios.';
        }
      });
    })
  }



  createUser(){
    const modalRef = this.modalService.open(ModalFormComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.onSubmit.subscribe({
      next: (res: User) => {
        this.usersPagination.data.unshift(res);
      },
      error: (err: HttpErrorResponse) => {
        this.unknowError = true;
        this.onChangeError = 'Ocurrio un error al pushear el usuario al array.';
      }
    });
  }

  updateItem(user: User){
    const modalRef = this.modalService.open(ModalFormComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.userToEdit = user;
    modalRef.componentInstance.onSubmit.subscribe((res: User) => {
      let data = this.usersPagination.data.find(item => item.id === user.id);
      if(data?.username != undefined) {
        data.username = res.username;
      }
      if(data?.email != undefined) {
        data.email = res.email;
      }
      if(data?.linkedin != undefined) {
        data.linkedin = res.linkedin;
      }
      if(data?.location != undefined) {
        data.location = res.location;
      }
      if(data?.firstname != undefined) {
        data.firstname = res.firstname;
      }
      if(data?.lastname != undefined) {
        data.lastname = res.lastname;
      }
      if(data?.position != undefined) {
        data.position = res.position;
      }
    })
  }

  deleteItem(user: User){
    const modalRef = this.modalService.open(ModalAlertComponent, {
      size: 'md',
      centered: true
    });
    modalRef.componentInstance.modalTitle = 'Desea eliminar la noticia '+user.username+'?';
    modalRef.componentInstance.userToHandle = user;
    modalRef.componentInstance.deleteUser = true;
    modalRef.componentInstance.btnValue = 'Eliminar';
    modalRef.componentInstance.onConfirm.subscribe(() => {
      let data = this.usersPagination.data.findIndex(item => item.id === user.id);
      return this.usersPagination.data.splice(data, 1);
    })
  }

}
