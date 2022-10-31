import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsPagination } from '../../interfaces/projects-pagination';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;
  @Input() arg!:string;
  @Input() projects!:ProjectsPagination;
  @Input() title!:string;
  isSearching: boolean = false;
  @Output() onSearch: EventEmitter<ProjectsPagination> = new EventEmitter();
  
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
