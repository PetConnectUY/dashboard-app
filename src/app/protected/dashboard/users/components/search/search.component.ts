import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { UserPagination } from '../../interfaces/user-pagination';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;
  @Input() arg!:string;
  @Input() users!:UserPagination;
  @Input() title!:string;
  isSearching: boolean = false;
  @Output() onSearch: EventEmitter<UserPagination> = new EventEmitter();
  
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  search(){
    this.isSearching = true;
    let snapshot = this.route.snapshot;
    let params = {... snapshot.queryParams}
    delete params['page'];

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {'search': this.arg, 'page': params['page']},
      queryParamsHandling: 'merge'
    })
  }

  seeAll(){
    this.isSearching = false;
    this.arg = '';
    this.onSearch.emit();
  }

}
