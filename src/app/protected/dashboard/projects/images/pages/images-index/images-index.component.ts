import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagesService } from '../../services/images.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormComponent } from '../../components/modal-form/modal-form.component';
import { ProjectImages } from '../../../interfaces/project-images';
import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalImageComponent } from '../../components/modal-image/modal-image.component';
import { ModalAlertComponent } from '../../../../components/modal-alert/modal-alert.component';

@Component({
  selector: 'app-images-index',
  templateUrl: './images-index.component.html',
  styleUrls: ['./images-index.component.scss']
})
export class ImagesIndexComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faTrash = faTrash;

  @Output() onDeleteImage: EventEmitter<ProjectImages> = new EventEmitter();

  projectId?: string;
  images:any[] = [];
  loader: boolean = true;
  unknowError: boolean = false;
  onChangeError!:string;

  allImages: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private imagesService: ImagesService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(res => {
      this.projectId = res['id'];
      this.imagesService.listImages(res['id']).subscribe({
        next: (res) => {
          this.loader = true;
          this.unknowError = false;
          res.forEach(res => {
            this.viewImages(res);
          });
        },
        error: (err: HttpErrorResponse) => {
          this.unknowError = true;
          this.onChangeError = 'Ocurrio un error al buscar las imágenes.';
        }
      })
    });
  }

  viewImages(item: ProjectImages){    
    this.imagesService.getImages(item.id).subscribe({
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

  openImage(image: any){
    const modalRef = this.modalService.open( ModalImageComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.image = image;
  }

  createImage(){
    const modalRef = this.modalService.open(ModalFormComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.projectId = this.projectId;
    modalRef.componentInstance.onSubmit.subscribe({
      next: (res: ProjectImages) => {
        this.loader = true;
        this.viewImages(res);
      }
    })
  }

  deleteItem(image: ProjectImages){
    const modalRef = this.modalService.open(ModalAlertComponent, {
      size: 'md',
      centered: true,
    });
    modalRef.componentInstance.modalTitle = 'Desea eliminar la imagen?';
    modalRef.componentInstance.imageToHandle = image;
    modalRef.componentInstance.deleteImage = true;
    modalRef.componentInstance.btnValue = 'Eliminar';
    modalRef.componentInstance.onConfirm.subscribe(() => {
      let data = this.images.findIndex(item => item.id === image.id);
      return this.images.splice(data, 1);
    })
  }

}
