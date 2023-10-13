import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HighchartsChartModule } from 'highcharts-angular';
import { CosasFeasPageRoutingModule } from './cosas-feas-routing.module';

import { CosasFeasPage } from './cosas-feas.page';
import { GaleriaComponent } from "./galeria/galeria.component";
import { GraficosComponent } from "./graficos/graficos.component";
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CosasFeasPageRoutingModule,
    HighchartsChartModule,
    SharedModule
  ],
  declarations: [
    CosasFeasPage,
    GaleriaComponent,
    GraficosComponent
  ]
})
export class CosasFeasPageModule {}
