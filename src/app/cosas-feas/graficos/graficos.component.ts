import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts";
import { Router } from "@angular/router";
import { VoteService } from "../../services/vote/vote.service";
import { PhotoService } from "../../services/photo/photo.service";

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss'],
})
export class GraficosComponent  implements OnInit {

  selectedPhoto: string = '';
  highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;
  isModalOpen: boolean = false;

  constructor(private router: Router,
              private voteService: VoteService,
              private photoService: PhotoService) { }

  async ngOnInit() {
    const votes = await this.voteService.getAllUgly();
    const data = this.toChart(votes);
    this.chartOptions = {
      series: [{
        type: 'bar',
        data: data,
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
    const photo = await this.voteService.getVote('feas') as string;
    this.selectedPhoto = this.getPhotoURL(photo);
    this.isModalOpen = true;
  }

  back() {
    this.router.navigate(['/home']);
  }
}
