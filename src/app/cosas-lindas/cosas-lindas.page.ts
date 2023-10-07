import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo/photo.service';

@Component({
  selector: 'app-cosas-lindas',
  templateUrl: './cosas-lindas.page.html',
  styleUrls: ['./cosas-lindas.page.scss'],
})
export class CosasLindasPage {

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
      handler: () => {
        this.selectedIndex = undefined;
      }
    }
  ];

  constructor(
    private location: Location,
    private photoService: PhotoService
  ) { }

  takePhoto() {
    this.photoService.addNicePhoto();
  }

  selectIndex(index: number) {
    this.selectedIndex = index;
  }

  back() {
    this.selectedIndex = undefined;
    this.location.back();
  }
}
