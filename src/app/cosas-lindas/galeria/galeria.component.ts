import { Component } from '@angular/core';
import { PhotoService } from '../../services/photo/photo.service';
import { VoteService } from '../../services/vote/vote.service';
import { Router } from '@angular/router';

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
    private voteService: VoteService
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
}
