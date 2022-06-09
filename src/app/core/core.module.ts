import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './components/toast/toast.component';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from './components/button/button.component';
import { IconComponent } from './components/icon/icon.component';

@NgModule({
  declarations: [ButtonComponent, ToastComponent, IconComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [ButtonComponent, ToastComponent, IconComponent],
})
export class CoreModule { }
