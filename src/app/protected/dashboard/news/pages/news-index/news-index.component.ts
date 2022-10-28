import { Component, OnInit } from '@angular/core';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-news-index',
  templateUrl: './news-index.component.html',
  styleUrls: ['./news-index.component.scss']
})
export class NewsIndexComponent implements OnInit {
  faFolderPlus = faFolderPlus;
  
  constructor() { }

  ngOnInit(): void {
  }

}
