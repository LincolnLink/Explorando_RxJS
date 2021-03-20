import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import {
  delay,
  filter,
  map,
  skip,
  switchMap,
  take,
  takeUntil,
  tap
} from 'rxjs/operators';
import {
  AsyncSubject,
  BehaviorSubject,
  bindCallback,
  bindNodeCallback,
  defer,
  from,
  fromEvent,
  generate,
  interval,
  merge,
  Observable,
  of,
  range,
  ReplaySubject,
  Subject

} from 'rxjs';
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';


interface groupdate{
  x: string,
  y: string,
  target: {
    x: string,
    y: string
  }
}

@Component({
  selector: 'app-RxJS',
  templateUrl: './RxJS.component.html',
  styleUrls: ['./RxJS.component.css']
})
export class RxJSComponent implements OnInit {

  PromeseVar: string = "";
  PromeseVar2: string = "";
  ObservableVar: number[] = [];

  topEstilo = '';
  leftEstilo = '';
  //topEstilo = '';

  constructor() { }

  ngOnInit() {

    this.DragAndDropReativo();

    //this.OperadoresDeCriacao();
    //this.AsyncSubjects();
    //this.ReplaySubjects();
    //this.BehaviorSubject();
    //this.testeSubjects2();
    /*
    this.testePromise();
    this.testeObservable();
    this.testeObservable3();
    */

  }


  DragAndDropReativo(){

     // Quando ocorrer um evento no mouseDown, o switchMap se desinscreve dele
    // e se inscreve no mouseMove, fica escutando mouseMove até que tenha um mouseUp

    //Pegando o DOM que vai ser manipulado!
    const card = document.querySelector('.card');

    //Transforma eventos JS em Observable, para ser escutado e manipular com RxJS
    const mouseDown$ = fromEvent<any>(<FromEventTarget<any>>card, 'mousedown');
    const mouseUp$ = fromEvent(<FromEventTarget<any>>document, 'mouseup');
    const mouseMove$ = fromEvent(<FromEventTarget<any>>document, 'mousemove')

    // Dando inicio aos Operadores de União
    // Concatenando strime
    const keyUp$ = fromEvent(document, 'keyup');

    const draAndDrop$ = mouseDown$
    .pipe(
      map((e:any ) => ({

        x: e.clientX,
        y: e.clientY,
        target: {
          x: e.target.offsetLeft,
          y: e.target.offsetTop
        }
      })),
      switchMap((start: any ) =>

          // Une dois strime em um só
          merge(

            mouseMove$.pipe(
              map((e: MouseEvent) => ({
                x: e.clientX - start.x + start.target.x,
                y: e.clientY - start.y + start.target.y,
              })),
              takeUntil(mouseUp$)
            ),

            keyUp$.pipe(
              filter((e: any) => e.which === 32),
              tap((tecla: any)  => {
                card?.parentNode?.insertBefore(card.cloneNode(true), card)
              }),
              skip(9999)

            )
          )
      )
    );

    draAndDrop$.pipe(
      //delay(500)
    )
    .subscribe(
      (val) => {
        this.topEstilo = `${val.y}px`;
        this.leftEstilo = `${val.x}px`;
      }
    )

  }


  OperadoresDeCriacao(){

    /*
    * Operadores Criadores!
    */

    /* of: Pode receber valores separador por virgula,
    * argumentos, valores finais. */
    of(1, true, 'string', [1,2,3])
    .subscribe(
      v => console.log("Valor emitido pelo of: ", v)
    );

    // from: Recebe estrutura de dados, e transforma
    // em emições de observable.
    // Ele recebe uma Promise, assim pode facilmente
    // converter, primise em observable.
    from([1,2,3])
    .subscribe(
      v => console.log("Valor do from: ", v)
    );

    // interval
    // Define um tempo para ele ficar emitindo.
    // o take foi colocado para limitar as emições
    interval(1000)
    .pipe(
      take(2)
    )
    .subscribe(
      v => console.log("Valor do interval: ", v)
    );

    // range: Emite valores numericos com determinados
    // valores iniciais e finais
    // parametros: 1° valor iniciar, 2° quantos valores vai emitir!
    range(1000, 5)
    .subscribe(
      v => console.log("Valor do range: ", v)
    );

    //generate : parece que o for, só que em forma de função
    generate(0, x => x < 10, x => x + 1)
    .subscribe(
      v => console.log("Valor do generete: ", v)
    );

    //fromEvent: pode transformar eventos do JS em observable
    // Parametro: 1° elemento DOM, 2°evento JS que deve ser convertido
    // Pesquisar depois como pegar um elemento unico
    //let button = document.querySelector('button');
    fromEvent<any>(document, 'click')
    .subscribe(
      v => console.log("fromEvent: evento capiturado de click", v)
    );

    //defer: cria observable, encapsula uma função e
    // só vai ser executada apartir do momento que tem um subscribe.
    // emite valor com condição usando function
    const a = (a: number)=> defer(() =>{
      return a > 10? of(1): of(2)
    })

    a(22)
    .subscribe(
      v => console.log("teste defer", v)
    );

    // bindCallBack: Criando observable apartir
    // de funções que retorna callBack
    // uma function que recebe o primeiro argumento, depois um cb!
    // o CB cai no subscribe e é executado!
    const testeCallback = (a: any, cb: any) => {
      cb(a);
    }

    bindCallback(testeCallback)(10)
    .subscribe(
      v => console.log('bindCallback: ',v)
    );

    //bindNodeCallback
    const nodeCallback = (a: any, cb: any) => {
      //cb(new Error('abcdef'), a);
      cb(undefined, a);
    }

    bindNodeCallback(nodeCallback)(1990)
    .subscribe(
      v => console.log('Node valor: ',v),
      err => console.log('Erro: ',err)
    );



  }


  AsyncSubjects(){

    const sub = new AsyncSubject();

    sub.next(1);
    sub.next(2);
    sub.next(3);
    sub.next(4);

    sub.subscribe({
      next: num => console.log('Observable 1: ', num),
      error: err => console.log('erro: ',err),
      complete: () => console.log('Completado')
    });

    sub.next(5);
    sub.next(6);

    setTimeout(() => {
      sub.subscribe({
        next: num => console.log('Observable 2: ', num),
        error: err => console.log('erro: ',err),
        complete: () => console.log('Completado')
      });
    }, 400);

    sub.complete();
  }


  ReplaySubjects(){

    const sub = new ReplaySubject(4, 500);

    sub.next(1);
    sub.next(2);
    sub.next(3);
    sub.next(4);

    sub.subscribe({
      next: num => console.log('Observable 1: ', num),
      error: err => console.log('erro: ',err),
      complete: () => console.log('Completado')
    });

    sub.next(5);
    sub.next(6);


    setTimeout(() => {
      sub.subscribe({
        next: num => console.log('Observable 2: ', num),
        error: err => console.log('erro: ',err),
        complete: () => console.log('Completado')
      });
    }, 400);




  }

  BehaviorSubject(){

    const sub = new BehaviorSubject(0);

    sub.next(1);
    sub.next(2);
    sub.next(3);
    sub.next(4);


    sub.subscribe({
      next: num => console.log('Observable 1: ', num),
      error: err => console.log('erro: ',err),
      complete: () => console.log('Completado')
    });

    sub.next(5);
    sub.next(6);

    sub.subscribe({
      next: num => console.log('Observable 2: ', num),
      error: err => console.log('erro: ',err),
      complete: () => console.log('Completado')
    });

    //setTimeout(() => sub.unsubscribe(), 3000);

  }

  testeSubjects2(){



    const sub = new BehaviorSubject(0);

    sub.next(1)
    sub.next(2)
    sub.next(3)
    sub.next(4)
    sub.next(5)

    const subVar = sub.subscribe({
      next: num => console.log('Observable 2: ', num),
      error: err => console.log('erro: ',err),
      complete: () => console.log('Completado')
    });

    setTimeout(() => sub.unsubscribe(), 3000);

  }

  testeSubjects1(){

    const sub = new Subject();

    const subVar1 = sub.subscribe(
      num => console.log('Observable 1: ', num),
      err => console.log(err),
      () => console.log('Completado')
    );

    const subVar2 = sub.subscribe(
      num => console.log('Observable 2: ', num),
      err => console.log(err),
      () => console.log('Completado')
    );

    sub.next(1990);
    sub.next(1991);
    sub.next(1992);
    sub.next(1993);
    //sub.error(new Error('asd'));
    sub.complete();

  }


  testeObservable3(){

    const observerVar = new Observable<any>((obs) => {

      console.log("Iniciando o Obs <----");
      let i =1;

      const interval = setInterval(() => obs.next(i++), 1000);
      setTimeout(() => obs.complete(), 5000);

      // alem de desinscriver, deve limpar o interval!
      return ()=> clearInterval(interval);

      //setTimeout(() => obs.next(1), 10)
    })

    let sub1 = observerVar.subscribe({

      next: num => console.log('Observable: ', num),
      error: err => console.log('erro: ', err),
      complete: () => console.log('Completado')

    });


    setTimeout(() => sub1.unsubscribe(), 3000);

  }

  testeObservable2(){

    const observerVar = new Observable<any>((obs) => {

      console.log("Iniciando o Obs <----");
      let i =1;

      const interval = setInterval(() => obs.next(i++), 1000);
      setTimeout(() => obs.complete(), 5000);

      // alen de desinscriver, deve limpar o interval!
      return ()=> clearInterval(interval);

      //setTimeout(() => obs.next(1), 10)
    })



    observerVar.subscribe(
      num => console.log('Observable: ', num),
      err => console.log(err),
      () => console.log('Completado')
    );

  }

  testePromise(){

    const pro = new Promise((resolve) => {
      console.log('iniciando a promise <------------');
      setTimeout(() => resolve(1), 10);

    });

    pro.then(num => console.log('Promise1: ', num));

    setTimeout(() => {
      pro.then(num => console.log('Promise2: ', num));

    }, 1800);

    /*
    const x = Promise

    x
    .resolve("Valor da promese é em string")
    .then(num => console.log(this.PromeseVar = num));

    x.resolve(this.PromeseVar2 = "segundo valor222")
    //.then(num => console.log(this.PromeseVar2 = num));
*/
  }

  testePromise2(){
    let valorAsync = new Promise<string>((resolve, reject) =>{
      setTimeout( ()=> resolve('Valor assíncrono'), 2000);
    });
    console.log("promese2: ", valorAsync);
  }

  testeObservable(){

    const obs = new Observable<any>((observer) => {
      console.log("Iniciando o observable<------------");
      setTimeout(() => observer.next(1), 10)

      /*
      observer.next(15)
      observer.next(25)*/
      //observer.complete()
    })
    //.pipe(share())
    /*.subscribe((x) =>
    {
      console.log(this.ObservableVar.push(x))
    })*/

    obs.subscribe(num => console.log('Observable1: ', num));

    /*Testando o sincrona e assincrona */
    /*
    obs.subscribe(num => console.log('Observable2: ', num));
    obs.subscribe(num => console.log('Observable3: ', num));
    obs.subscribe(num => console.log('Observable4: ', num));
    obs.subscribe(num => console.log('Observable5: ', num));
    obs.subscribe(num => console.log('Observable6: ', num));
*/
    setTimeout(() => {

      obs.subscribe((x) =>
      {
console.log('Observable7: ', this.ObservableVar.push(x))
      })
    }, 1800);

  }

  Exemplo1(){
/*
    const pessoas: any[] = [
      { nome: 'João', sexo: 'masculino', idade: 18},
      { nome: 'José', sexo: 'masculino', idade: 32},
      { nome: 'Maria', sexo: 'feminino', idade: 11},
      { nome: 'Julia', sexo: 'feminino', idade: 23}
    ]

    const maioresAgrupadosPorGenero = (pessoas) =>


      pessoas.filter(e => e.idade >= 18)
        .reduce((a, b) => ({
          ...a,
          [b.sexo]: [...(a[b.sexo] || []), b]
        }), {})


    maioresAgrupadosPorGenero(pessoas)
*/
  }

}
