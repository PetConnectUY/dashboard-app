import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faLaptopCode, faExclamationCircle, faEllipsis, faPencil, faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ServicesPagination } from '../../interfaces/services-pagination';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServicesService } from '../../services/services.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Services } from '../../interfaces/services';
import { ModalFormComponent } from '../../components/modal-form/modal-form.component';
import { UserPagination } from '../../../users/interfaces/user-pagination';
import { UserService } from '../../../users/services/user.service';
import { ModalAlertComponent } from '../../../components/modal-alert/modal-alert.component';

@Component({
  selector: 'app-services-index',
  templateUrl: './services-index.component.html',
  styleUrls: ['./services-index.component.scss']
})
export class ServicesIndexComponent implements OnInit {
  faLaptopCode = faLaptopCode;
  faExclamationCircle = faExclamationCircle;
  faEllipsis = faEllipsis;
  faPencil = faPencil;
  faTrash = faTrash;
  faSpinner = faSpinner;

  loader: boolean = true;
  userLoading: boolean = true;
  unknowError: boolean = false;
  onChangeError!:string;

  servicesPagination!: ServicesPagination;
  usersPagination!: UserPagination;

  constructor(
    private modalService: NgbModal,
    private servicesService: ServicesService,
    private route: ActivatedRoute,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.updateTable();
    this.route.queryParamMap.subscribe(paramMap => {
      this.userLoading = true;
      this.unknowError = false;
      this.userService.getUsers(paramMap).subscribe({
        next: (res: UserPagination) => {
          this.userLoading = false;
          this.unknowError = false;
          this.usersPagination = res;
        },
        error: (err: HttpErrorResponse) => {
          this.unknowError = true;
          this.userLoading = false;
          this.onChangeError = 'Ocurrio un error al traer los usuarios.';
        }
      });
    });
  }

  updateTable(){
    this.route.queryParamMap.subscribe(paramMap => {
      this.loader = true;
      this.unknowError = false;
      this.servicesService.getServices(paramMap).subscribe({
        next: (res: ServicesPagination) => {
          this.servicesPagination = res;
          this.loader = false;
          this.unknowError = false;
        },
        error: (err: HttpErrorResponse) => {
          this.unknowError = true;
          this.loader = false;
          this.onChangeError = 'Ocurrio un error al traer los servicios.';
        }
      })
    });
  }

  createService(){
    const modalRef = this.modalService.open(ModalFormComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.usersPagination = this.usersPagination;
    modalRef.componentInstance.usersLoading = this.userLoading;

    modalRef.componentInstance.onSubmit.subscribe((res: Services) => {
      this.servicesPagination.data.unshift(res);
    });
  }

  updateItem(service: Services){
    const modalRef = this.modalService.open(ModalFormComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.serviceToEdit = service;
    modalRef.componentInstance.usersPagination = this.usersPagination;
    modalRef.componentInstance.usersLoading = this.userLoading;
    modalRef.componentInstance.onSubmit.subscribe((res:Services) => {
    let data = this.servicesPagination.data.find(item => item.id === service.id);
      if(data?.name != undefined) {
        data.name = res.name;
      }
    });
  }

  deleteItem(service: Services){
    const modalRef = this.modalService.open(ModalAlertComponent, {
      size: 'md',
      centered: true,
    });
    modalRef.componentInstance.modalTitle = 'Desea eliminar el servicio '+service.name+'?';
    modalRef.componentInstance.serviceToHandle = service;
    modalRef.componentInstance.deleteService = true;
    modalRef.componentInstance.btnValue = 'Eliminar';
    modalRef.componentInstance.onConfirm.subscribe(() => {
      let data = this.servicesPagination.data.findIndex(item => item.id === service.id);
      return this.servicesPagination.data.splice(data, 1);
    })
  }

}
