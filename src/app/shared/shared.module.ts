import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoModalComponent } from './photo-modal/photo-modal.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    PhotoModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class SharedModule { }
