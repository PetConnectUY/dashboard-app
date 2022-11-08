import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-view',
  templateUrl: './modal-view.component.html',
  styleUrls: ['./modal-view.component.scss']
})
export class ModalViewComponent implements OnInit {
  @Input() image: any;
  constructor(
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {    
  }

  closeModal(){
    this.activeModal.close();
  }

}
