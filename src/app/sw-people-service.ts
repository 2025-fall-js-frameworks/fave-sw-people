import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EMPTY, map, expand, tap, reduce, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SwPeopleService {
  private http = inject(HttpClient);

  public getPeopleFromSwapiApi() {
    return this.http.get<any>('https://swapi.dev/api/people').pipe(
      expand(page => page.next ? this.http.get<any>(page.next) : EMPTY), // Opens the next page
      map(response => response.results), // Gets results from SWAPI
      reduce((acc, people) => [ // Adds all people from each page to array of results
        ...acc,
        ...people
      ]),
      map(people => people.sort((a: any, b: any) => a.name.localeCompare(b.name))), // Sorts people alphabetically
    );
  }
}