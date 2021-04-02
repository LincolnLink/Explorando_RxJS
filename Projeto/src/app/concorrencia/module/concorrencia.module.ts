
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConcorrenciaComponent } from '../concorrencia.component';
import { ConcorrenciaRoutingModule } from './concorrencia-routing.module';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ConcorrenciaComponent],
  imports: [
    CommonModule,
    ConcorrenciaRoutingModule,
    HttpClientModule
  ]
})
export class ConcorrenciaModule { }
