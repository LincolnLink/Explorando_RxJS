import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxJSComponent } from './RxJS.component';
import { RxJSRoutingModule } from './RxJSRoutingModule';


@NgModule({
  imports: [
    CommonModule,
    RxJSRoutingModule
  ],
  declarations: [RxJSComponent]
})
export class RxJSModule { }
