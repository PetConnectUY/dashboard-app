import { Component, Input, OnInit } from '@angular/core';
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Task } from '../../interfaces/task';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskImagesService } from '../../images/services/task-images.service';
import { TaskImages } from '../../interfaces/task-images';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.component.html',
  styleUrls: ['./modal-view.component.scss']
})
export class ModalViewComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  faExclamationCircle = faExclamationCircle;

  @Input() taskToHandle!:Task;

  items:any[] = [];

  loader: boolean = true;
  unknowError: boolean = false;
  noImages: boolean = false;
  onChangeError!: string;

  constructor(
    private activeModal: NgbActiveModal,
    private imagesService: TaskImagesService
  ) { }

  ngOnInit(): void {
    this.loader = true;
    this.unknowError = false;
    this.noImages = false;
    this.imagesService.listImages(this.taskToHandle.id).subscribe({
      next: (res: TaskImages[]) => {
        if(res.length <= 0) {
          this.loader = false;
          this.noImages = true;
        } else {
          res.forEach(img => {
            this.imagesService.getImages(img.id).subscribe({
              next: (res: Blob) => {
                let reader = new FileReader();
                reader.readAsDataURL(res);
                reader.onload = (__event) => {
                  this.loader = false;
                  this.unknowError = false;        
                  this.items.push({images: reader.result, item: img});                 
                }
              },
              error: (err: HttpErrorResponse) => {
                this.loader = false;
                this.unknowError = true;
                this.onChangeError = 'No se encontraron las imágenes de la tarea';
              }
            })
          })
        }
      },
      error: (res: HttpErrorResponse) => {
        this.unknowError = true;
        this.loader = false;
        this.onChangeError = 'Ocurrio un error al encontrar la lista de imágenes.';
      }
    })
  }

  closeModal(){
    this.activeModal.close();
  }

}
