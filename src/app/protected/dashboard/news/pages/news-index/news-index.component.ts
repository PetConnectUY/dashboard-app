import { Component, OnInit } from '@angular/core';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { NewsService } from '../../services/news.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormComponent } from '../../components/modal-form/modal-form.component';
@Component({
  selector: 'app-news-index',
  templateUrl: './news-index.component.html',
  styleUrls: ['./news-index.component.scss']
})
export class NewsIndexComponent implements OnInit {
  faFolderPlus = faFolderPlus;
  
  constructor(
    private newsService: NewsService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  createNews(){
    this.modalService.open(ModalFormComponent, {
      size: 'lg',
      centered: true
    });
  }

}
