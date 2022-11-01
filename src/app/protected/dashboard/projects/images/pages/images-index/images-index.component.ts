import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImagesService } from '../../services/images.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormComponent } from '../../components/modal-form/modal-form.component';
import { ProjectImages } from '../../../interfaces/project-images';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalImageComponent } from '../../components/modal-image/modal-image.component';

@Component({
  selector: 'app-images-index',
  templateUrl: './images-index.component.html',
  styleUrls: ['./images-index.component.scss']
})
export class ImagesIndexComponent implements OnInit {
  faPlusCircle = faPlusCircle;

  projectId?: string;
  images:any[] = [];
  loader: boolean = true;
  unknowError: boolean = false;
  onChangeError!:string;
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
            this.viewImages(res.id);
          });
        },
        error: (err: HttpErrorResponse) => {
          this.unknowError = true;
          this.onChangeError = 'Ocurrio un error al buscar las imágenes.';
        }
      })
    });

    
    
  }

  viewImages(id: number){    
    this.imagesService.getImages(id).subscribe({
      next: (res: Blob) =>{
        let reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onload = (__event) => {
          this.loader = false;
          this.unknowError = false;
          this.images.push(reader.result);
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
        this.viewImages(res.id);
      }
    })
  }

}
