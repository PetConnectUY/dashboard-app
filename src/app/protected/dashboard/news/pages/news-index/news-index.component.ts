import { Component, OnInit } from '@angular/core';
import { faFolderPlus, faCheck, faXmark, faArrowUp, faArrowDown, faEllipsis, faPencil, faTrash, faEye, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { NewsService } from '../../services/news.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormComponent } from '../../components/modal-form/modal-form.component';
import { ActivatedRoute } from '@angular/router';
import { NewsPagination } from '../../interfaces/news-pagination';
import { HttpErrorResponse } from '@angular/common/http';
import { News } from '../../interfaces/news';
import { DirectionEnum } from '../../enums/direction-enum';
import { ModalAlertComponent } from '../../../components/modal-alert/modal-alert.component';
@Component({
  selector: 'app-news-index',
  templateUrl: './news-index.component.html',
  styleUrls: ['./news-index.component.scss']
})
export class NewsIndexComponent implements OnInit {
  faFolderPlus = faFolderPlus;
  faCheck = faCheck;
  faXmark = faXmark;
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faEllipsis = faEllipsis;
  faPencil = faPencil;
  faTrash = faTrash;
  faEye = faEye;
  faExclamationCircle = faExclamationCircle;

  loader: boolean = true;
  unknowError: boolean = false;
  searching: boolean = false;
  errorOnChange!: string;
  
  newsPagination!:NewsPagination;

  constructor(
    private newsService: NewsService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.updateTable();
  }

  updateTable(){
    this.route.queryParamMap.subscribe(paramMap => {
      this.loader = true;
      this.unknowError = false;
      this.newsService.index(paramMap).subscribe({
        next: (res: NewsPagination) => {
          this.loader = false;
          this.unknowError = false;
          this.newsPagination = res;
        },
        error: (err: HttpErrorResponse) => {
          this.loader = false;
          this.unknowError = true;
          this.errorOnChange = 'Ups... ocurrió un problema al traer las noticias.';
        }
      })
    })
  }

  createNews(){
    const modalRef = this.modalService.open(ModalFormComponent, {
      size: 'lg',
      centered: true
    });
    modalRef.componentInstance.onSubmit.subscribe((res:News) => {
      this.newsPagination.data.unshift(res);
    })
  }

  changeVisibility(news: News, index: number) {
    let data = this.newsPagination.data.find(item => item.id === news.id);
    if(data?.visible != undefined) {
      (data.visible === 1 ? data.visible = 0 : data.visible = 1);
    }
    this.newsService.changeVisibility(news).subscribe({
      next: (res: News) => {},
      error: (err: HttpErrorResponse) => {
        this.unknowError = true;
        this.errorOnChange = 'Ups... ocurrió un problema al cambiar la visibilidad de la noticia.';
      }
      
    })
  }

  moveItemUp(news: News, index: number){
    this.changePosition(news, DirectionEnum.UP, index);
  }

  moveItemDown(news: News, index: number){
    this.changePosition(news, DirectionEnum.DOWN, index);
  }

  changePosition(news:News, direction: string, index:number){
    if(direction === DirectionEnum.UP) {
      if(Math.max(index) === 0){
        this.newsPagination.data[index] = this.newsPagination.data[index];
      } else {
        let tmp = this.newsPagination.data[index -1];
        this.newsPagination.data[index-1] = this.newsPagination.data[index];
        this.newsPagination.data[index] = tmp;
      }
    } else {
      if(Math.max(index) === index){
        this.newsPagination.data[index] = this.newsPagination.data[index];
      } else {
        let tmp = this.newsPagination.data[index + 1];
        this.newsPagination.data[index+1] = this.newsPagination.data[index];
        this.newsPagination.data[index] = tmp;
      }
    }
    this.newsService.changePosition(news, direction).subscribe({
      next: (res:News) => {
        console.log(res);
      },
      error: (err: HttpErrorResponse) => {
        this.unknowError = true;
        this.errorOnChange = 'Ocurrio un error al cambiar la posición de la noticia.';
      }
    })
  }

  updateItem(news: News){
    const modalRef = this.modalService.open(ModalFormComponent, {
      size: 'lg',
      centered: true
    });

    modalRef.componentInstance.newsToEdit = news;
    modalRef.componentInstance.onSubmit.subscribe((res:News) => {
      let data = this.newsPagination.data.find(item => item.id === news.id);
      if(data?.visible != undefined) {
        (data.visible === 1 ? data.visible = 0 : data.visible = 1);
      }
      if(data?.title != undefined) {
        data.title = res.title;
      }
    })
  }

  deleteItem(news: News){
    const modalRef = this.modalService.open(ModalAlertComponent, {
      size: 'md',
      centered: true
    });
    modalRef.componentInstance.modalTitle = 'Desea eliminar la noticia '+news.title+'?';
    modalRef.componentInstance.newsToHandle = news;
    modalRef.componentInstance.deleteNews = true;
    modalRef.componentInstance.btnValue = 'Eliminar';
    modalRef.componentInstance.onConfirm.subscribe(() => {
      let data = this.newsPagination.data.findIndex(item => item.id === news.id);
      return this.newsPagination.data.splice(data, 1);
    })
  }

}
