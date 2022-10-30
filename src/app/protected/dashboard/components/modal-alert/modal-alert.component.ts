import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { News } from '../../news/interfaces/news';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsService } from '../../news/services/news.service';
import { HttpErrorResponse } from '@angular/common/http';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

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
  @Output() onConfirm:EventEmitter<News> = new EventEmitter();
  
  constructor(
    private activeModal: NgbActiveModal,
    private newsService: NewsService
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
  }

}
