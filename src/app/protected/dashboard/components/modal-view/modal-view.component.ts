import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tasks } from '../../interfaces/tasks';
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { IndexService } from '../../services/index.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.component.html',
  styleUrls: ['./modal-view.component.scss']
})
export class ModalViewComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  faExclamationCircle = faExclamationCircle;
  @Input() taskToHandle!: Tasks;
  @Output() onComplete: EventEmitter<Tasks> = new EventEmitter();

  loader: boolean = false;
  unknowError: boolean = false;
  constructor(
    private activeModal: NgbActiveModal,
    private indexService: IndexService
  ) { }

  ngOnInit(): void {}

  completeTask() {
    this.loader = true;
    this.unknowError = false;
    this.indexService.completeTask(this.taskToHandle).subscribe({
      next:(res) => {
        console.log(res);
        this.onComplete.emit(res);
        this.loader = false;
        this.unknowError = false;
      }, 
      error:(err: HttpErrorResponse) => {
        this.unknowError = true;
        this.loader = false;
      }
    })
  }

  closeModal(){
    this.activeModal.close();
  }

}
