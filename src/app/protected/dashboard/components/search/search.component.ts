import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { NewsPagination } from '../../news/interfaces/news-pagination';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;
  @Input() arg!:string;
  @Input() news!:NewsPagination;
  @Input() title!:string;
  isSearching: boolean = false;
  @Output() onSearch: EventEmitter<NewsPagination> = new EventEmitter();
  
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
