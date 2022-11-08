import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faPlusCircle, faTrash, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { TaskImages } from '../../../interfaces/task-images';
import { ActivatedRoute } from '@angular/router';
import { TaskImagesService } from '../../services/task-images.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormComponent } from '../../components/modal-form/modal-form.component';
import { ModalViewComponent } from '../../components/modal-view/modal-view.component';
import { ModalAlertComponent } from '../../../../components/modal-alert/modal-alert.component';

@Component({
  selector: 'app-tasks-images-index',
  templateUrl: './tasks-images-index.component.html',
  styleUrls: ['./tasks-images-index.component.scss']
})
export class TasksImagesIndexComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faExclamationCircle = faExclamationCircle;
  faTrash = faTrash;

  @Output() onDeleteImage: EventEmitter<TaskImages> = new EventEmitter();

  taskId?: string;
  images:any[] = [];
  loader: boolean = true;
  unknowError: boolean = false;
  onChangeError!:string;

  allImages: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private taskImagesService: TaskImagesService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(res => {
      this.taskId = res['id'];
      this.taskImagesService.listImages(res['id']).subscribe({
        next: (res) => {
          if(res.length <= 0){
            this.loader = false;
            this.unknowError = false;
          } else {
            this.loader = true;
            this.unknowError = false;
            res.forEach(res => {
              this.viewImages(res);
            });
          }
        },
        error: (err: HttpErrorResponse) => {
          this.unknowError = true;
          this.onChangeError = 'Ocurrio un error al buscar las imágenes.';
        }
      })
    });
  }

  viewImages(item: TaskImages){    
    this.taskImagesService.getImages(item.id).subscribe({
      next: (res: Blob) =>{
        let reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onload = (__event) => {
          this.loader = false;
          this.unknowError = false;
          this.images.push({image: reader.result, item: item});          
        }
      },
      error: (err: HttpErrorResponse) => {
        this.unknowError = true;
        this.onChangeError = 'Ocurrio un error al traer las imágenes.';
      }
    })
  }

  createImage(){
    const modalRef = this.modalService.open(ModalFormComponent, {
      centered: true,
      size: 'lg'
    });
    modalRef.componentInstance.taskId = this.taskId;
    modalRef.componentInstance.onSubmit.subscribe({
      next: (res: TaskImages) => {
        this.loader = true;
        this.viewImages(res);
      }
    });
  }

  openImage(image: any){
    const modalRef = this.modalService.open( ModalViewComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.image = image;
  }

  deleteItem(image: TaskImages){
    const modalRef = this.modalService.open(ModalAlertComponent, {
      size: 'md',
      centered: true,
    });
    modalRef.componentInstance.modalTitle = 'Desea eliminar la imagen?';
    modalRef.componentInstance.taskImageToHandle = image;
    modalRef.componentInstance.deleteTaskImage = true;
    modalRef.componentInstance.btnValue = 'Eliminar';
    modalRef.componentInstance.onConfirm.subscribe(() => {
      let data = this.images.findIndex(item => item.id === image.id);
      return this.images.splice(data, 1);
    })
  }

}
