import { Component, OnInit } from '@angular/core';
import { faUsers, faNewspaper, faStar, faRectangleList } from '@fortawesome/free-solid-svg-icons';
import { IndexService } from '../../services/index.service';
import { Stats } from '../../interfaces/stats';
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  faUsers = faUsers;
  faNewspaper = faNewspaper;
  faStar = faStar;
  faRectangleList = faRectangleList;

  stats!: Stats;
  loading: boolean = true;
  unknowError: boolean = false;
  constructor(
    private indexService: IndexService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.unknowError = false;
    this.indexService.statsCount()
      .subscribe(res=>{
        this.stats = res;
        this.loading = false;
        this.unknowError = false;
      }, err=>{
        this.loading = false;
        this.unknowError = true;
      });
  }

}
