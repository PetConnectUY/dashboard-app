import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tasks } from '../../interfaces/tasks';
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { IndexService } from '../../services/index.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TaskImages } from '../../tasks/interfaces/task-images';
import { ModalViewImageComponent } from '../modal-view-image/modal-view-image.component';

@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.component.html',
  styleUrls: ['./modal-view.component.scss']
})
export class ModalViewComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  faExclamationCircle = faExclamationCircle;
  @Input() taskToHandle!: Tasks;
  @Output() onComplete: EventEmitter<Tasks> = new EventEmitter();

  loader: boolean = false;
  unknowError: boolean = false;

  noImages: boolean = false;
  onChangeError!: string;
  items: any = [];
  constructor(
    private activeModal: NgbActiveModal,
    private indexService: IndexService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loader = true;
    this.unknowError = false;
    this.noImages = false;
    this.indexService.listImages(this.taskToHandle.id).subscribe({
      next: (res: TaskImages[]) => {
        if(res.length <= 0) {
          this.loader = false;
          this.noImages = true;
        } else {
          res.forEach(img => {
            this.indexService.getImages(img.id).subscribe({
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

  completeTask() {
    this.loader = true;
    this.unknowError = false;
    this.indexService.completeTask(this.taskToHandle).subscribe({
      next:(res) => {
        console.log(res);
        this.onComplete.emit(res);
        this.loader = false;
        this.unknowError = false;
      }, 
      error:(err: HttpErrorResponse) => {
        this.unknowError = true;
        this.loader = false;
      }
    })
  }

  openImage(image: any){
    const modalRef = this.modalService.open( ModalViewImageComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.image = image;
  }

  closeModal(){
    this.activeModal.close();
  }

}
