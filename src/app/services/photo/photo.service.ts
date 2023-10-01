import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';

export interface UserPhoto {
  filePath: string;
  webViewPath?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  nicePhotos: UserPhoto[] = [];
  uglyPhotos: UserPhoto[] = [];

  constructor() { }

  async addNicePhoto() {
    return await this.addNewToGallery(this.nicePhotos);
  }

  async addUglyPhoto() {
    return await this.addNewToGallery(this.uglyPhotos);
  }

  private async addNewToGallery(gallery: UserPhoto[]) {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    gallery.unshift({
      filePath: "soon...",
      webViewPath: capturedPhoto.webPath!
    })
  }
}
