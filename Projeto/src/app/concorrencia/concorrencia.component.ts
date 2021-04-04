
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ajax } from 'rxjs/ajax';
import { fromEvent, of, race } from 'rxjs';
import { combineAll, concatMap, exhaustMap, mergeMap, pluck, switchMap, tap } from 'rxjs/operators';
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';

@Component({
  selector: 'app-concorrencia',
  templateUrl: './concorrencia.component.html',
  styleUrls: ['./concorrencia.component.css']
})
export class ConcorrenciaComponent implements OnInit {

  innerHTMLText: string = ''
  textContent: boolean = true;
  ativo: boolean = true;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.exemploCancelando();

    //this.exemplos();
  }


  exemploCancelando(){

    const api = (response: any, delay: any) =>
    ajax({
      url: `http://127.0.0.1:5200/response/${JSON.stringify(response)}/delay/${delay}/`
    });


    // Pegando os elementos!
    const content = document.querySelector('#content');
    const buttomElementStopRequest = document.querySelector('#b1');
    const buttomElementRquest = document.querySelector('#b2');

    // Escutando os eventos dos elementos!
    const buttomRequest$ = fromEvent<any>
    (<FromEventTarget<any>>buttomElementRquest, 'click');

    const buttomStopRequest$ = fromEvent<any>
    (<FromEventTarget<any>>buttomElementStopRequest, 'click');

    const request = api({data: 'Resposta da API!'}, 3000).pipe(
      pluck('response', 'data'),
      tap(response => this.innerHTMLText = response)
    );

    const stopResquet = buttomStopRequest$.pipe(
      tap(() =>  (this.innerHTMLText = 'Requisição Cancelada', this.textContent = false))
    )

    // const requesting = (bool: boolean) => {
    //   bool ? 'display: none': 'display: block';
    //   bool ? 'display: block': 'display: none';
    // }

    buttomRequest$.pipe(

      tap(() => {
        this.ativo = false
        this.innerHTMLText = 'Carregando...';
      }),
      switchMap(() => race(request, stopResquet)),
      tap(() => this.ativo = true)


    ).subscribe();

  }


  exemplos(){

    const api = (response: any, delay: any) =>
    ajax({
      url: `http://127.0.0.1:5200/response/${JSON.stringify(response)}/delay/${delay}/`
    });

    const a = api({data: "A"}, 1000);
    const b = api({data: "B"}, 1000);
    const c = api({data: "C"}, 800);
    const d = api({data: "D"}, 1800);
    const e = api({data: "E"}, 1200);
    const f = api({data: "F"}, 1600);
    const g = api({data: "G"}, 2800);
    const h = api({data: "H"}, 700);


    of(a, b, c, d, e, f, g, h)
    .pipe(
      mergeMap(e => e),
      pluck('response', 'data'),
      combineAll()
    )
    .subscribe(
      x => console.log(x),
      err => console.log(err),
      () => console.log("Complete")
    );



  }













}
