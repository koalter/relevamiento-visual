import { Component } from '@angular/core';
import { PhotoService } from '../../services/photo/photo.service';
import { VoteService } from '../../services/vote/vote.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss'],
})
export class GaleriaComponent {

  photos = this.photoService.nicePhotos;
  selectedIndex: number | undefined;
  toastButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      handler: () => this.selectedIndex = undefined
    },
    {
      text: 'Votar',
      handler: async () => {
        debugger
        await this.voteService.emitVote(this.photos[this.selectedIndex!].name, 'lindas');
        this.selectedIndex = undefined;
      }
    }
  ];

  constructor(
    private router: Router,
    private photoService: PhotoService,
    private voteService: VoteService,
    private toastController: ToastController
  ) { }

  takePhoto() {
    this.photoService.addNicePhoto();
  }

  selectIndex(index: number) {
    this.selectedIndex = index;
  }

  back() {
    this.selectedIndex = undefined;
    this.router.navigate(['/home']);
  }

  async vote(index: number) {
    const toast = await this.toastController.create({
      message: 'Voto emitido',
      duration: 2000,
      color: 'success',
    });
    await this.voteService.emitVote(this.photos[index].name, 'lindas');

    await toast.present();
  }
}
