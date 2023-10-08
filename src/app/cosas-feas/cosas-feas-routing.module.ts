import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CosasFeasPage } from './cosas-feas.page';
import { GaleriaComponent } from "./galeria/galeria.component";
import { GraficosComponent } from "./graficos/graficos.component";

const routes: Routes = [
  {
    path: '',
    component: CosasFeasPage,
    children: [
      {
        path: 'galeria',
        component: GaleriaComponent
      },
      {
        path: 'graficos',
        component: GraficosComponent
      },
      {
        path: '',
        redirectTo: 'galeria',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CosasFeasPageRoutingModule {}
