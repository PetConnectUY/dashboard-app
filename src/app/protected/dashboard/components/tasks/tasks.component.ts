import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faEye, faCircleExclamation, faCheck, faXmark, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../../shared/services/auth.service';
import { IndexService } from '../../services/index.service';
import { TasksPagination } from '../../interfaces/tasks-pagination';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Tasks } from '../../interfaces/tasks';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalViewComponent } from '../modal-view/modal-view.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  faEye = faEye;
  faCircleExclamation = faCircleExclamation; 
  faCheck = faCheck;
  faXmark = faXmark;
  faCircleCheck = faCircleCheck;

  loader: boolean = true;
  errorOnChange!: string;

  tasks!: TasksPagination;
  

  constructor(
    private authService: AuthService,
    private indexService: IndexService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.updateTable();
  }

  updateTable(){
    this.route.queryParamMap.subscribe(paramMap => {
      this.loader = true;
      this.indexService.getTasks(paramMap).subscribe({
        next: (pagination) => {
          this.loader = false;
          this.tasks = pagination;
        },
        error: (err: HttpErrorResponse) => {
          this.loader = false;
          this.errorOnChange = 'Ups.. Ocurrio un error al traer las tareas...'
        }
      });
    });
  }

  completeTask(tasks: Tasks){
    let data = this.tasks.data.find(task => task.id === tasks.id);
    this.indexService.completeTask(tasks).subscribe({
      next: (res) => {
        if(data?.complete != undefined) {
          (data.complete === 0 ? data.complete = 0 : data.complete = 1);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.errorOnChange = 'Ups.. Ocurrio un error al traer las tareas...';
      }
    })
  }

  viewTask(task: Tasks) {
    const modalRef = this.modalService.open(ModalViewComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.taskToHandle = task;
    modalRef.componentInstance.onComplete.subscribe(() => {
      let data = this.tasks.data.find(item => item.id === task.id);
      if(data?.complete != undefined) {
        (data.complete === 1 ? data.complete = 0 : data.complete = 1);
      }
    })

  }

  getUser() {
    return this.authService.getUser()!;
  }

}
