import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EMPTY, map, expand, tap, reduce } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SwPeopleService {
  private http = inject(HttpClient);

  public getPeopleFromSwapiApi() {
    return this.http.get<any>('https://swapi.dev/api/people').pipe(
      expand(page => page.next ? this.http.get<any>(page.next) : EMPTY),
      map(response => response.results),
      reduce((acc: any[], people )=> [
        ...acc,
        ...people
      ]),
      map(people => people.sort((a: any, b: any) =>
        a.name.localeCompare(b.name)
      ))
    );
  }
}