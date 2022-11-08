import { Component, OnInit } from '@angular/core';
import { faHouse, faNewspaper, faCode, faLaptopCode, faUsers, faListCheck } from '@fortawesome/free-solid-svg-icons'; 

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  faHouse = faHouse;
  faNewspaper = faNewspaper;
  faCode = faCode;
  faLaptopCode = faLaptopCode;
  faUsers = faUsers;
  faListCheck = faListCheck;

  constructor() { }

  ngOnInit(): void {
  }

}
