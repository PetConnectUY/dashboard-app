import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { News } from '../../news/interfaces/news';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsService } from '../../news/services/news.service';
import { HttpErrorResponse } from '@angular/common/http';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Project } from '../../projects/interfaces/project';
import { ProjectsService } from '../../projects/services/projects.service';
import { Services } from '../../service/interfaces/services';
import { ServicesService } from '../../service/services/services.service';
import { ProjectImages } from '../../projects/interfaces/project-images';
import { ImagesService } from '../../projects/images/services/images.service';
import { User } from '../../users/interfaces/user';
import { UserService } from '../../users/services/user.service';
import { TaskService } from '../../tasks/services/task.service';
import { Task } from '../../tasks/interfaces/task';
import { TaskImages } from '../../tasks/interfaces/task-images';
import { TaskImagesService } from '../../tasks/images/services/task-images.service';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.scss']
})
export class ModalAlertComponent implements OnInit {
  faSpinner = faSpinner;

  modalTitle!: string;
  submittingForm: boolean = false;
  onChangeError!: string;
  @Input() btnValue!: string;

  @Input() newsToHandle!: News;
  @Input() deleteNews!:boolean;

  @Input() projectToHandle!: Project;
  @Input() deleteProject!: boolean;

  @Input() serviceToHandle!: Services;
  @Input() deleteService!: boolean;
  
  @Input() imageToHandle!: ProjectImages;
  @Input() deleteImage!: boolean;

  @Input() userToHandle!: User;
  @Input() deleteUser!:boolean;

  @Input() taskToHandle!: Task;
  @Input() deleteTask!:boolean;

  @Input() taskImageToHandle!: TaskImages;
  @Input() deleteTaskImage!:boolean;

  @Output() onConfirm:EventEmitter<any> = new EventEmitter();
  
  constructor(
    private activeModal: NgbActiveModal,
    private newsService: NewsService,
    private projectService: ProjectsService,
    private ServicesService: ServicesService,
    private imagesService: ImagesService,
    private userService: UserService,
    private taskService: TaskService,
    private taskImagesService: TaskImagesService
  ) { }

  ngOnInit(): void {
  }

  closeModal(){
    this.activeModal.close();
  }

  confirm(){
    this.submittingForm = true;
    this.btnValue = '';
    if(this.deleteNews) {
      this.newsService.delete(this.newsToHandle)
        .subscribe({
          next: (res) => {
            this.closeModal();
            this.onConfirm.emit(res);
          },
          error: (e:HttpErrorResponse) => {
            this.submittingForm = false;
            this.onChangeError = 'Ocurrio un error al borrar la noticia.';
          }
        });
    }
    if(this.deleteProject){
      this.projectService.delete(this.projectToHandle).subscribe({
        next: (res: Project) => {
          this.closeModal();
          this.onConfirm.emit(res);
        },
        error: (err: HttpErrorResponse) => {
          this.submittingForm = false;
          this.onChangeError = 'Ocurrio un error al borrar el proyecto.';
        }
      })
    }
    if(this.deleteService){
      this.ServicesService.delete(this.serviceToHandle).subscribe({
        next: (res: Services) => {
          this.closeModal();
          this.onConfirm.emit(res);
        },
        error: (res: HttpErrorResponse) => {
          this.submittingForm = false;
          this.onChangeError = 'Ocurrio un error al borrar el servicio.';
        }
      });
    }
    if(this.deleteImage){
      this.imagesService.delete(this.imageToHandle).subscribe({
        next: (res: ProjectImages) => {
          this.closeModal();
          this.onConfirm.emit(res);
        },
        error: (res: HttpErrorResponse) => {
          this.submittingForm = false;
          this.onChangeError = 'Ocurrio un error al borrar la imagen.';
        }
      });
    }
    if(this.deleteUser){
      this.userService.delete(this.userToHandle).subscribe({
        next: (res: User) => {
          this.closeModal();
          this.onConfirm.emit(res);
        },
        error: (err: HttpErrorResponse) => {
          this.submittingForm = false;
          this.onChangeError = 'Ocurrio un error al borrar el usuario.';
        }
      })
    }
    if(this.deleteTask){
      this.taskService.delete(this.taskToHandle).subscribe({
        next: (res: Task) => {
          this.closeModal();
          this.onConfirm.emit(res);
        },
        error: (err: HttpErrorResponse) => {
          this.submittingForm = false;
          this.onChangeError = 'Ocurrio un error al borrar la tarea.';
          
        }
      })
    }
    if(this.deleteTaskImage){
      this.taskImagesService.delete(this.taskImageToHandle).subscribe({
        next: (res: TaskImages) => {
          this.closeModal();
          this.onConfirm.emit(res);
        },
        error: (err: HttpErrorResponse) => {
          this.submittingForm = false;
          this.onChangeError = 'Ocurrio un error al borrar la imagen de la tarea.'
        }
      })
    }
  }

}
