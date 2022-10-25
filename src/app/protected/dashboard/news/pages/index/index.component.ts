import { Component, OnInit } from '@angular/core';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  faFolderPlus = faFolderPlus;
  constructor() { }

  ngOnInit(): void {
  }

}
