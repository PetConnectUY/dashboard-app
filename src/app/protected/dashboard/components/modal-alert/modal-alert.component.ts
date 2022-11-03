import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { News } from '../../news/interfaces/news';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsService } from '../../news/services/news.service';
import { HttpErrorResponse } from '@angular/common/http';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Project } from '../../projects/interfaces/project';
import { ProjectsService } from '../../projects/services/projects.service';
import { ProjectImages } from '../../projects/interfaces/project-images';
import { ImagesService } from '../../projects/images/services/images.service';

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
  //news
  @Input() newsToHandle!: News;
  @Input() deleteNews!:boolean;

  //project
  @Input() projectToHandle!: Project;
  @Input() deleteProject!: boolean;

  //image
  @Input() imageToHandle!: ProjectImages;
  @Input() deleteImage!: boolean;

  @Output() onConfirm:EventEmitter<any> = new EventEmitter();
  
  constructor(
    private activeModal: NgbActiveModal,
    private newsService: NewsService,
    private projectService: ProjectsService,
    private imagesService: ImagesService,
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
      })
    }
  }

}
