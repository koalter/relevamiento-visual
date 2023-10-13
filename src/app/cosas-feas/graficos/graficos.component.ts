import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts";
import { Router } from "@angular/router";
import { VoteService } from "../../services/vote/vote.service";
import { PhotoService } from "../../services/photo/photo.service";
import { ModalController } from '@ionic/angular';
import { PhotoModalComponent } from '../../shared/photo-modal/photo-modal.component';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss'],
})
export class GraficosComponent  implements OnInit {

  highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;

  constructor(private router: Router,
              private voteService: VoteService,
              private photoService: PhotoService,
              private modalController: ModalController) { }

  ngOnInit() { }

  async ionViewWillEnter() {
    const votes = await this.voteService.getAllUgly();
    this.chartOptions = {
      series: [{
        type: 'bar',
        data: this.toChart(votes),
        name: 'Votos'
      }],
      title: { text: 'Resultados de votaciones' }
    };
  }

  toChart(array: Array<string>) {
    const map = new Map();
    const result = [];

    for (let item of array) {
      if (map.has(item)) {
        map.set(item, map.get(item) + 1);
      } else {
        map.set(item, 1);
      }
    }

    for (let [key, value] of map) {
      result.push([key, value]);
    }

    return result;
  }

  getPhotoURL(name: string) {
    return this.photoService.uglyPhotos
      .find(p => p.name === name)?.webViewPath as string;
  }

  async openModal() {
    const photo = await this.voteService.getUglyVote() as string;
    const path = this.getPhotoURL(photo);
    
    const modal = await this.modalController.create({
      component: PhotoModalComponent,
      componentProps: {
        id: photo,
        path: path
      },
      breakpoints: [0, 0.75],
      initialBreakpoint: 0.75
    });

    await modal.present();
  }

  back() {
    this.router.navigate(['/home']);
  }
}
