import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

   {
    path: '', pathMatch: 'full', redirectTo: 'rxjs'
   },
   {
     path: 'rxjs',
     loadChildren: () => import('./RxJS/RxJS.module').then(m => m.RxJSModule)
   }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
