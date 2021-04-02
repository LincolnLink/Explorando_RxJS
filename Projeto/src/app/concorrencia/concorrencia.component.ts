
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { combineAll, concatMap, exhaustMap, mergeMap, pluck, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-concorrencia',
  templateUrl: './concorrencia.component.html',
  styleUrls: ['./concorrencia.component.css']
})
export class ConcorrenciaComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {



    this.exemplos();
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
