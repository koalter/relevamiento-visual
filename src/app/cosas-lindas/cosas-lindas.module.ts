import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HighchartsChartModule } from 'highcharts-angular';
import { CosasLindasPageRoutingModule } from './cosas-lindas-routing.module';

import { CosasLindasPage } from './cosas-lindas.page';
import { GaleriaComponent } from './galeria/galeria.component';
import { GraficosComponent } from './graficos/graficos.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CosasLindasPageRoutingModule,
    HighchartsChartModule,
    SharedModule
  ],
  declarations: [
    CosasLindasPage,
    GaleriaComponent,
    GraficosComponent
  ]
})
export class CosasLindasPageModule {}
