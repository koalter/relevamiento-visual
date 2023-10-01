import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  logoutButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
      cssClass: ['ion-color-danger'],
    },
    {
      text: 'Confirmar',
      role: 'confirm',
      cssClass: ['ion-color-success'],
      handler: () => this.logout()
    }
  ]

  constructor(
    private auth: AuthService,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  async logout() {
    const loadingElement = await this.loadingController
      .create({ message: 'Cerrando sesión...' });
      
    await loadingElement.present();
    const result = await this.auth.logout();
    await loadingElement.dismiss();

    if (result) {
      this.router.navigate(['login']);
    }
  }
}
