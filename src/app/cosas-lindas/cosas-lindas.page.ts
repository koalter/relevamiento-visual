import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo/photo.service';

@Component({
  selector: 'app-cosas-lindas',
  templateUrl: './cosas-lindas.page.html',
  styleUrls: ['./cosas-lindas.page.scss'],
})
export class CosasLindasPage implements OnInit {

  photos = this.photoService.nicePhotos;

  constructor(
    private location: Location,
    private photoService: PhotoService
  ) { }

  ngOnInit() {
  }

  takePhoto() {
    this.photoService.addNicePhoto();
  }

  back() {
    this.location.back();
  }
}
