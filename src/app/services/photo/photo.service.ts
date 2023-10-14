import { Injectable } from '@angular/core';
import { Storage, getDownloadURL, getMetadata, list, ref, uploadString } from '@angular/fire/storage';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AuthService } from '../auth/auth.service';
import { Logger } from '../logger/logger.service';
import { UserPhoto } from '../../models/user-photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private readonly NICE_BUCKET = 'relevamiento-visual/lindas';
  private readonly UGLY_BUCKET = 'relevamiento-visual/feas';

  nicePhotos: UserPhoto[] = [];
  uglyPhotos: UserPhoto[] = [];

  constructor(
    private storage: Storage,
    private authService: AuthService,
    private logger: Logger
  ) { }

  async build(ref: any, photoList: UserPhoto[]) {
    try {
      const listResult = await list(ref);
      listResult.items.forEach(async photo => {
        const path = await getDownloadURL(photo);
        const [email, timestamp] = photo.name.split(' ');
        photoList.push(new UserPhoto(photo.name, parseInt(timestamp), path));
        photoList.sort((a, b) => b.timestamp - a.timestamp);
      });
    } catch (e: any) {
      this.logger.logError(e);
    }
  }

  async getNicePhotos() {
    const res: UserPhoto[] = [];
    await this.build(ref(this.storage, this.NICE_BUCKET), res);
    return res;
  }

  async getUglyPhotos() {
    const res: UserPhoto[] = [];
    await this.build(ref(this.storage, this.UGLY_BUCKET), res);
    return res;
  }

  async addNicePhoto() {
    return await this.addNewToGallery(this.nicePhotos, this.NICE_BUCKET);
  }

  async addUglyPhoto() {
    return await this.addNewToGallery(this.uglyPhotos, this.UGLY_BUCKET);
  }

  private async addNewToGallery(gallery: UserPhoto[], bucket: string) {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100
    });

    const date = Date.now();
    const storageRef = ref(this.storage, `${bucket}/${this.authService.user!.email} ${date}`);

    try {
      await uploadString(storageRef, `data:image/jpeg;base64, ${capturedPhoto.base64String!}`, 'data_url');
      const webViewPath = await getDownloadURL(storageRef);
      gallery.unshift(new UserPhoto(storageRef.name, date, webViewPath));
    } catch (e: any) {
      this.logger.logError(e);
    }
  }
}
