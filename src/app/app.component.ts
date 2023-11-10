import { Component, OnInit } from '@angular/core';
import { forkJoin, timer, of, EMPTY, interval, map, startWith, audit, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {

    console.log('START');
    
    
    // forkJoin([ timer(500, 1000), of(1, 2, 3), EMPTY ])

    // interval(1000).pipe( map(console.log), startWith('Angular') )

    interval(100).pipe( audit(() => interval(1000)), takeUntil(interval(3500)) )

    .subscribe((count) => console.log(count));
  }

}
