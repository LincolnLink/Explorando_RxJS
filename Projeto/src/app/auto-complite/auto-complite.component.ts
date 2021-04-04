import { Component, OnInit } from '@angular/core';
import { fromEvent, of } from 'rxjs';
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';
import { ajax } from 'rxjs/ajax';
import {
  map,
  catchError,
  pluck,
  debounce,
  debounceTime,
  switchMap,
  distinctUntilChanged,
  startWith

} from 'rxjs/operators';

@Component({
  selector: 'app-auto-complite',
  templateUrl: './auto-complite.component.html',
  styleUrls: ['./auto-complite.component.css']
})
export class AutoCompliteComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {

    this.metodoDOM();


  }




  metodoDOM(){
    // Entrada de dados
    const input = fromEvent<any>(<FromEventTarget<any>>document, 'input');

    // Popular a lista
    const div = document.getElementById("pais");
    const ul = div?.querySelector('ul');


    //Criando uma função que cria o DOM da <ul></ul>
    //É colocada em uma const, para poder passar como parametro.
    const mostraResultado = (res: any) => {
      let ulValor: string = '';
      ulValor = res.map((e: any) => `<li>${e}</li>`).join('');

      ul?.insertAdjacentHTML('beforeend', ulValor);
    }

    //Pegando os dados
    const buscaPaisesNaApi = (termo: any) =>
    ajax(`https://restcountries.eu/rest/v2/name/${termo}?fields=name`)
    .pipe(
      pluck('response'), //extraindo o valor do response
      map(resposta => resposta.map((i: any) => i.name))
    )


    /*Manipulando evento do input*/
    /*Passa um tempo como parametro, e executa quando terminar!*/
    input.pipe(

      debounceTime(300), /*leva um tempo para buscar.*/
      pluck('target', 'value'), /*extraindo o valor do target.*/
      map(e => e.trim()), /* limpa o espa;o vazio.*/
      distinctUntilChanged(), /* evita buscas repetidas.*/
      switchMap(termo => {
          if(!termo || termo.length < 3)  /*so busca se tiver 3 caracteres*/
          {
            return of([])  /*emite vazio*/
          }
          else
          {
            return buscaPaisesNaApi(termo); /*executa a funcao de busca no servidor*/
          }
      }),
      catchError((err, source) => {
        console.log("error: ", err);
        return source.pipe(
          startWith([]) /*retorna so que com valor vazio*/
        )
      })

    )
    .subscribe(mostraResultado);

  }

}
