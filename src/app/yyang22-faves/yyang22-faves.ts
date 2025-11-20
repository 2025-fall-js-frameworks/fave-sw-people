import { Component, inject } from '@angular/core';
import { SwPeopleService } from '../sw-people.service';
import { AsyncPipe } from '@angular/common';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-yyang22-faves',
  imports: [AsyncPipe],
  templateUrl: './yyang22-faves.html',
  styleUrl: './yyang22-faves.css',
})
export class Yyang22Faves {
  private readonly peopleSvc = inject(SwPeopleService);

  protected readonly people$ = this.peopleSvc.getPeopleFromSwapiApi();

  protected promiseAsThenables() {

    const page1 = this.peopleSvc.getPeoplePageOne() 
      .then(
        data => {
          console.log(data);

          const page2 = this.peopleSvc.getPeoplePageTwo()
          .then(
            data => console.log(data)
          )
          .catch(
            err => console.warn(err)
          )
        }
      )
      .catch(
        err => console.warn(err)
      )
    ;

  }
}
