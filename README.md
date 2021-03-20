# Explorando_RxJS

# dicas 

  - todo evento keyup, tem um which que representa o numero de cada tecla, espaço é 32


# Programação Reativa

 - Paradigma baseado em fluxo de dados asincronas, propaga mudança de dados nesse fluxo!

 - Paradigna reativa e arquitetura reativa!

    - Elástica:

    - Resiliente:

    - Message Driven:

    - Responsiva:

 - Padrão Observer Pattern: Se inscreve!

 - Padrão Iterator pattern: pergunta se existir outro elemento para enterar!

 - Programação funcional: uma função chama a outra! varios conceitos e paradigma!

# ReactiveX

 - Tem para varias linguagens de programação!

 <blockquete>
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
 </blockquete>


# Observables vs Promises 


 - Promises: Encapsuladores de dados também!

    - Trabalha com um unico valor!
      - Apartir do momento que ela foi resolvida, ela não resolve mais nada.

    - Execussão imaediata (Eager)
     - executa mesmo não tendo o ".then()"

    - Comportamento compartilhado.

    - 

  - Observables: Encapsuladores de dados, aonde você manipula os dados com os métodos do RxJS!

    - Trabalha com multiplos valores!
      - Recebe multiplos valores

    - Execussão sob demanda(Lazy)
     - Só executa quando tem um ".subscrible()"

    - Podem ou nãoserem compartilhado.

    -  

# Observables vs Promises - Cronologia e Cancelamento 

 - share deixa o observable compartilhado

 - mas parece que ele não existe https://stackoverflow.com/questions/35141722/how-does-the-rxjs-5-share-operator-work


 - Promise

   - Pode ser Assincrona
   - Não é cancelável


 - Observable

   - Pode ser Síncrona e ou Assíncrona
   - Cancelável (unsubscribe)


   - codigo que testa o cancelamento

    <blockquote>
      
      const observer = observable.create((observer) => {
      let i = 0;
      const interval = setInterval(() => {
        console.log('aki', i);
        observer.next(i++)

      }, 1000);

      return () => clearInterval(interval);
    });

    setTimeout(() => {
      subscriber.unsubscribe();
    }, 5000);

    </blockquote>

# Subjects e Subscriptions 

 - Subscribe: é uma forma de vc se inscrever em um observable e receber os valores(todo o fluxo dos dados), 

 - Observable: é um  streaming  de dados, é um fluxo de dados.

 - O Subscribe recebe 3 parametros ( são 3 callback )

  - O proprio valor emitido.   

  - O callback de erro: finaliza o observable quando cai nele

  - O 3° é um complete: não recebe nenhuma propriedade mas indica que o observable acabou.

  <blockquote>

    observerVar.subscribe(
      num => console.log('Observable: ', num),
      err => console.log(err),
      () => console.log('Completado')      
    );

  </blockquote>

 ### objeto literal !

 <blockquote>

  const observerVar = new Observable< any>((obs) => {

      console.log("Iniciando o Obs <----");
      let i =1;

      const interval = setInterval(() => obs.next(i++), 1000);
      setTimeout(() => obs.complete(), 5000);

      // alem de desinscriver, deve limpar o interval!
      return ()=> clearInterval(interval);

      //setTimeout(() => obs.next(1), 10)
    })



    observerVar.subscribe({

      next: num => console.log('Observable: ', num),
      error: err => console.log(err),
      complete: () => console.log('Completado')
      
    });
   
 </blockquote>

 ### se desinscrevendo , nem o erro e nem o complete é executado

 <blockquote>
    let sub = observerVar.subscribe({

      next: num => console.log('Observable: ', num),
      error: err => console.log('erro: ', err),
      complete: () => console.log('Completado')

    });

    setTimeout(() => sub.unsubscribe(), 3000);
 </blockquote>

 ### Pode unir as 2 subinscrição para que no final se desinscrever das duas, e pode desunir usando o remove()

 <blockquote>
   
    let sub1 = observerVar.subscribe({

      next: num => console.log('Observable: ', num),
      error: err => console.log('erro: ', err),
      complete: () => console.log('Completado')

    });

    let sub2 = observerVar.subscribe({

      next: num => console.log('Observable: ', num),
      error: err => console.log('erro: ', err),
      complete: () => console.log('Completado')

    });

    sub1.add(sub2);
    //sub1.remove(sub2);

    setTimeout(() => sub1.unsubscribe(), 3000);
 </blockquote>

 ### Subjects 

 - Sempre será multcast, será tera status compartilhados

 - Eles são Observable.

 - Ele emite valor independente se existe um subscrible

 <blockquote>
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
 </blockquote>

  - Passando um subject, para ser executado dentro de um Observable!

  <blockquote>
    
    const sub = new Subject();

    const obs = new Observable<any>((observer) => {


      observer.next(1)
      observer.next(2)
      observer.next(3)
      observer.next(4)
      observer.next(5)
    });

    const subVar2 = sub.subscribe(
      num => console.log('Observable 2: ', num),
      err => console.log(err),
      () => console.log('Completado')
    );

    const subscription = obs.subscribe(sub);
  </blockquote>

# BehaviorSubjects, AsyncSubjects e ReplaySubjects


  ### BehaviorSubjects: inicia com um valor, e sempre mantem o valor para ser emitido a qualquer outro subscript.

  - BehaviorSubjects

    <blockquote>

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
      
    </blockquote>

  - Mantem o estado e tem sempre o ultimo valor, ele sempre a tualiza o iltimo valor que foi emitido.

  - Sendo uma nova ou antiga inscrição(subscribe).

    <blockquote>
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
    </blockquote>


  - ReplaySubjects

   ### ReplaySubjects: Armazena uma quantidade definida de valores emitidos.

   - E informa quantos valores emitidos, para ele propagar, quando ela se inscrever.

    <blockquote>

      const sub = new ReplaySubject(4);

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

    </blockquote>


  - Pode passar um segundo parametro, que define o tempo de deração do armazenamento

  - Serve para gerar Cache!


 - AsyncSubjects: Ele só recebe a ultima emição do subject, e só quando o subject for completado!

  ### AsyncSubjects
  
  <blockquote>

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
    
  </blockquote>


# Operadores de criação

  - Operadores criadores

  ### of()

  - Pode receber valores separador por virgula, argumentos, valores finais.

  <blockquote>

     of(1, true, 'string', [1,2,3])
    .subscribe(
      v => console.log("Valor emitido pelo of: ", v)
    );    

  </blockquote>

  ### from()

  - Recebe estrutura de dados, e transforma em emições de observable!

  - Ele recebe uma Promise, assim pode facilmente converter, primise em observable.

  <blockquote>

    from([1,2,3])
    .subscribe(
      v => console.log("Valor do from: ", v)
    );    

  </blockquote>

  ### interval()

  - Emite valor numerico crescentes, de acordo com o intervalo de tempo
  informado.
  - o take foi colocado para limitar as emições

  <blockquote>

     interval(1000)    
    .subscribe(
      v => console.log("Valor do interval: ", v)
    );
    

  </blockquote>

  ### range()

  - range: Emite valores numericos com determinados 
    valores iniciais e finais
  - parametros: 1° valor iniciar, 2° quantos valores vai emitir!

  <blockquote>

    range(1000, 5)    
    .subscribe(
      v => console.log("Valor do range: ", v)
    );

  </blockquote>

  ### generate()

  - parece que o for, só que em forma de função

  <blockquote>
    generate(0, x => x < 10, x => x + 1)
    .subscribe(
      v => console.log("Valor do generete: ", v)
    );

  </blockquote>

  ### fromEvent()
  
  - fromEvent: pode transformar eventos do JS em observable.
  - Parametro: 1° elemento DOM, 2°evento JS que deve ser convertido.
  - Pesquisar depois como pegar um elemento unico.

  <blockquote>

    fromEvent<any>(document, 'click')
    .subscribe(
      v => console.log("fromEvent: evento capiturado de click", v)
    );

  </blockquote>

   ### defer

  - defer: cria observable, encapsula uma função e
  - só vai ser executada apartir do momento que tem um subscribe.
  - emite valor com condição usando function

  <blockquote>
     const a = (a: number)=> defer(() =>{
      return a > 10? of(1): of(2)
    })

    a(10)
    .subscribe(
      v => console.log("teste defer", v)
    );    

  </blockquote>

  ### bindCallBack

  - bindCallBack: Criando observable apartir 
    de funções que retorna callBack.
  - Uma function que recebe o primeiro argumento, depois um cb!
    o CB cai no subscribe e é executado!

  <blockquote>
     const testeCallback = (a: any, cb: any) => {
      cb(a);
    }

    bindCallback(a)(10)
    .subscribe(
      v => console.log(v)
    );    

  </blockquote>

  ### bindNodeCallback

  - Transforma em observable os metodos de node que retorna callback

  <blockquote>

    bindNodeCallback(nodeCallback)(1990)
    .subscribe(
      v => console.log('Node valor: ',v),
      err => console.log('Erro: ',err)
    );    

  </blockquote>


# Drag and Drop reativo 


  -Operadores de controle de fluxo!

  ### switchMap

  - Desinscreve do outro observable e bota outro para ser inscrito.
  - Sempre a ultima inscrição que vai esta ativa.

  - Quando ocorrer um evento no 'mouseDown', o 'switchMap' se desinscreve dele, e se inscreve no mouseMove, fica escutando 'mouseMove' até que tenha um 'mouseUp'.   

  <blockquote>

    const card = document.querySelector('.card');

    const mouseDown$ = fromEvent(document, 'mousedown');
    const mouseUp$ = fromEvent(document, 'mouseup');
    const mouseMove$ = fromEvent(document, 'mousemove')
   
    const draAndDrop$ = mouseDown$.pipe(
      switchMap(start => mouseMove$.pipe(
        takeUntil(mouseUp$)
      ))
    )    

  </blockquote>

  ### map

  - Pega um valor e tranforma em outra

  <blockquote>
    

  </blockquote>

  ### mergeMap

  - 

  <blockquote>
    

  </blockquote>

  ### ConcatMap

  - 

  <blockquote>
    

  </blockquote>

  ### ExasthMap

  - 

  <blockquote>
    

  </blockquote>

  ### delay()

  - Define um valor de delay, passando por parametro!

  <blockquote>
    

  </blockquote>

  ### merge

  - Une dois strime em um só

  <blockquote>

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
                document.body
              })
            )
          )   

  </blockquote>

  ### filter

  - filtra um observable, caso a condição seja verdadeira

  <blockquote>   
    filter((e: any) => e.which === 32),
  </blockquote>

  ### tap

  - para ter um efeito colateral, um outro efeito alem do subscrible!

  - Não afeta o fluxo porq retorna a mesma entrada!

  - serve como debug!

  <blockquote>
    

  </blockquote>

  ### insertBefore (JS, não é operador)

  - Copia elementos do HTML, dominando o DOM!

  <blockquote>
    https://www.w3schools.com/jsref/met_node_insertbefore.asp

  </blockquote>
  

   ### parentNode (JS, não é operador)

  - Obtem um Nó do Nó pai!

  - exemplo e explicação : https://www.w3schools.com/jsref/prop_node_parentnode.asp

  - Mais exemplo e explicação: https://stackoverflow.com/questions/4043327/document-insertbefore-throws-error

  <blockquote>

     const card = document.querySelector('.card');
    
     card?.parentNode?.insertBefore(card.cloneNode(true), card)

  </blockquote>

   ### skip(9999)

  - Não o resultado do ultimo observable ir para o submit!

  <blockquote>

      keyUp$.pipe(
        filter((e: any) => e.which === 32),
        tap((tecla: any)  => {
          card?.parentNode?.insertBefore(card.cloneNode(true), card)
        }),
        skip(9999)

      )    

  </blockquote>

# 8

  ###

  -

  -

  <blockquete>

  </blockquete>

  ###

  -

  -

  <blockquete>

  </blockquete>
  
  ###

  -

  -

  <blockquete>

  </blockquete>

  ###

  -

  -

  <blockquete>

  </blockquete>

  ###

  -

  -

  <blockquete>

  </blockquete>




 

  
   

