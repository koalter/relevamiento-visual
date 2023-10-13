import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'photo-modal',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.scss'],
})
export class PhotoModalComponent {

  @Input() id?: string;
  @Input() path?: string;

  constructor(private modalController: ModalController) { }

  dismiss() {
    this.modalController.dismiss();
  }
}
