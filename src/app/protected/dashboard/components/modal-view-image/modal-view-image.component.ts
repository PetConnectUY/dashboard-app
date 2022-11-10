import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-view-image',
  templateUrl: './modal-view-image.component.html',
  styleUrls: ['./modal-view-image.component.scss']
})
export class ModalViewImageComponent implements OnInit {
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
