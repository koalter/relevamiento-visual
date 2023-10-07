import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VoteService } from '../../services/vote/vote.service';
import * as Highcharts from 'highcharts';
import {PhotoService} from "../../services/photo/photo.service";

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss'],
})
export class GraficosComponent {

  ownVote: string = '';
  selectedPhoto: string = '';
  highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;
  isModalOpen: boolean = false;

  constructor(private router: Router,
    private voteService: VoteService,
    private photoService: PhotoService) { }

  async ngOnInit() {
    this.ownVote = await this.voteService.getVote('lindas');
    const votes = await this.voteService.getAllNice();
    this.chartOptions = {
      series: [{
        type: 'pie',
        data: this.toChart(votes)
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
    return this.photoService.nicePhotos
      .find(p => p.name === name)?.webViewPath as string;
  }

  openModal(photoName: string) {
    this.selectedPhoto = this.getPhotoURL(photoName);
    this.isModalOpen = true;
  }

  back() {
    this.router.navigate(['/home']);
  }
}
