import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

   {
    path: '', pathMatch: 'full', redirectTo: 'autoComplete'
   },
   {
     path: 'rxjs',
     loadChildren: () => import('./RxJS/RxJS.module').then(m => m.RxJSModule)
   },
   {
    path: 'autoComplete',
    loadChildren: () => import('./auto-complite/module/auto-complite.module').then(a => a.AutoCompliteModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
