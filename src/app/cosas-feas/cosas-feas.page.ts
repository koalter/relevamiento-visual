import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo/photo.service';
import { VoteService } from '../services/vote/vote.service';

@Component({
  selector: 'app-cosas-feas',
  templateUrl: './cosas-feas.page.html',
  styleUrls: ['./cosas-feas.page.scss'],
})
export class CosasFeasPage {

  photos = this.photoService.uglyPhotos;
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
        await this.voteService.emitVote(this.photos[this.selectedIndex!].name, 'feas');
        this.selectedIndex = undefined;
      }
    }
  ];

  constructor(
    private location: Location,
    private photoService: PhotoService,
    private voteService: VoteService
  ) { }

  takePhoto() {
    this.photoService.addUglyPhoto();
  }

  selectIndex(index: number) {
    this.selectedIndex = index;
  }

  back() {
    this.selectedIndex = undefined;
    this.location.back();
  }
}
