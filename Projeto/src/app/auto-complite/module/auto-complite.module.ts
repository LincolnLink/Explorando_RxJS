import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompliteRoutingModule } from './auto-complite-routing.module';
import { AutoCompliteComponent } from '../auto-complite.component';



@NgModule({
  declarations: [AutoCompliteComponent],
  imports: [
    CommonModule,
    AutoCompliteRoutingModule
  ]
})
export class AutoCompliteModule { }
