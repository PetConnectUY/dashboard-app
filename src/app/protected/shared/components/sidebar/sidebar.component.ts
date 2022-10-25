import { Component, OnInit } from '@angular/core';
import { faHouse, faNewspaper } from '@fortawesome/free-solid-svg-icons'; 

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  faHouse = faHouse;
  faNewspaper = faNewspaper;

  constructor() { }

  ngOnInit(): void {
  }

}
