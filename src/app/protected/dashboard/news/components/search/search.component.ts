import { Component, Input, OnInit } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { NewsPagination } from '../../interfaces/news-pagination';
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
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  search(){
    let snapshot = this.route.snapshot;
    let params = {... snapshot.queryParams}
    delete params['page'];

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {'search': this.arg, 'page': params['page']},
      queryParamsHandling: 'merge'
    })
  }
}
