import { Component, OnInit } from '@angular/core';
import { faCircleCheck, faCircleExclamation, faClipboardList, faEllipsis, faExclamationCircle, faEye, faPencil, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { TasksPagination } from '../../interfaces/tasks-pagination';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormComponent } from '../../components/modal-form/modal-form.component';
import { UserService } from '../../../users/services/user.service';
import { UserPagination } from '../../../users/interfaces/user-pagination';
import { Task } from '../../interfaces/task';
import { ModalAlertComponent } from '../../../components/modal-alert/modal-alert.component';
import { ModalViewComponent } from '../../components/modal-view/modal-view.component';

@Component({
  selector: 'app-tasks-index',
  templateUrl: './tasks-index.component.html',
  styleUrls: ['./tasks-index.component.scss']
})
export class TasksIndexComponent implements OnInit {
  faClipboardList = faClipboardList;
  faExclamationCircle = faExclamationCircle;
  faSpinner = faSpinner;
  faEye = faEye;
  faCircleCheck = faCircleCheck;
  faCircleExclamation = faCircleExclamation;
  faEllipsis = faEllipsis;
  faPencil = faPencil;
  faTrash = faTrash;

  loader: boolean = true;
  unknowError: boolean = false;

  userLoader: boolean = true;

  onChangeError!: string;

  tasksPagination!:TasksPagination;
  usersPagination!: UserPagination;

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private taskService: TaskService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.updateTable();
  }

  updateTable(){
    this.route.queryParamMap.subscribe(paramMap => {
      this.loader = true;
      this.userLoader = true;
      this.unknowError = false;
      this.taskService.getTasks(paramMap).subscribe({
        next: (res: TasksPagination) => {
          this.loader = false;
          this.unknowError = false;
          this.tasksPagination = res;
        },
        error: (res: HttpErrorResponse) => {
          this.loader = false;
          this.unknowError = true;
          this.onChangeError = 'Ocurrio un error al obtener las tareas.';
        }
      });
      this.userService.getUsers(paramMap).subscribe({
        next: (res: UserPagination) => {
          this.userLoader = false;
          this.unknowError = false;
          this.usersPagination = res;
        },
        error: (err: HttpErrorResponse) => {
          this.unknowError = true;
          this.onChangeError = 'Ocurrio un error al cargar los usuarios.';
        }
      });
    });
  }

  createTask(){
    const modalRef = this.modalService.open(ModalFormComponent, {
      size: 'lg',
      centered: true,
    });

    modalRef.componentInstance.usersPagination = this.usersPagination;
    modalRef.componentInstance.onSubmit.subscribe((res: Task) => {
      this.tasksPagination.data.unshift(res);
    });
  }

  viewItem(task: Task){
    const modalRef = this.modalService.open(ModalViewComponent, {
      centered: true,
      size: 'lg'
    });
    modalRef.componentInstance.taskToHandle = task;
  }

  updateItem(task: Task){
    const modalRef = this.modalService.open(ModalFormComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.taskToEdit = task;
    modalRef.componentInstance.usersPagination = this.usersPagination;
    modalRef.componentInstance.onSubmit.subscribe((res:Task) => {
      let data = this.tasksPagination.data.find(item => item.id === task.id);
      if(data?.description != undefined) {
        data.description = res.description;
      }
      if(data?.user.id != undefined) {
        data.user.id = res.user.id;
        data.user.firstname = res.user.firstname;
        data.user.lastname = res.user.lastname;
      }
      if(data?.complete != undefined) {
        data.complete = res.complete;
      }
      if(data?.link != undefined) {
        data.link = res.link;
      }
    });
  }

  deleteItem(task: Task){
    const modalRef = this.modalService.open(ModalAlertComponent, {
      size: 'md',
      centered: true
    });
    modalRef.componentInstance.modalTitle = 'Desea eliminar la tarea?';
    modalRef.componentInstance.taskToHandle = task;
    modalRef.componentInstance.deleteTask = true;
    modalRef.componentInstance.btnValue = 'Eliminar';
    modalRef.componentInstance.onConfirm.subscribe(() => {
      let data = this.tasksPagination.data.findIndex(item => item.id === task.id);
      return this.tasksPagination.data.splice(data, 1);
    });
  }

}
