import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo/photo.service';

@Component({
  selector: 'app-cosas-feas',
  templateUrl: './cosas-feas.page.html',
  styleUrls: ['./cosas-feas.page.scss'],
})
export class CosasFeasPage implements OnInit {

  photos = this.photoService.uglyPhotos;

  constructor(
    private location: Location,
    private photoService: PhotoService
  ) { }

  ngOnInit() {
  }

  takePhoto() {
    this.photoService.addUglyPhoto();
  }

  back() {
    this.location.back();
  }
}
