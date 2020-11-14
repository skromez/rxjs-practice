import { Component, OnInit, ViewChild } from '@angular/core';
import {forkJoin, from, fromEvent, Observable, Subscription, combineLatest, Subject, zip} from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {concatMap, delay, exhaust, exhaustMap, filter, flatMap, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
  <button #btn md-raised-button color="accent">Click me!</button>
  <div class="container">
    <h1>{{message}}</h1>
  </div>
  `
})
export class AppComponent implements OnInit {
  @ViewChild('btn') btn;
  message: string;
  response$: Observable<any>;
  url = 'https://jsonplaceholder.typicode.com';
  color$ = new Subject<string>();
  logo$ = new Subject<string>();

  ngOnInit(): void {
    combineLatest([this.color$, this.logo$]).subscribe(([color, logo]) => console.log(`${color}`));
    zip(this.color$, this.logo$).subscribe(([color, logo]) => console.log(`${color} shirt with ${logo}`));
    this.color$.pipe(withLatestFrom(this.logo$)).subscribe(([color, logo]) => console.log(`${color} shirt with ${logo}`));

    this.color$.next('white');
    this.logo$.next('fish');
    this.color$.next('green');
    this.logo$.next('dog');
    this.color$.next('red');
    this.logo$.next('bird');
    this.color$.next('blue');
    this.logo$.next('monkey');
    this.color$.next('red');

    fromEvent(document, 'click').pipe(
      switchMap((r) => {
        return ajax('http://slowwly.robertomurray.co.uk/delay/3000/url/https://jsonplaceholder.typicode.com/todos/1');
      }),
    ).subscribe((a) => console.log(a));
  }

}
