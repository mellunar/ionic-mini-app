import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [ButtonComponent],
  exports: [ButtonComponent]
})
export class SharedModule { }
