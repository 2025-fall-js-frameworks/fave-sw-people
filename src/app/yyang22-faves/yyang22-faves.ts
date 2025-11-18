import { Component, inject } from '@angular/core';
import { SwPeopleService } from '../sw-people.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-yyang22-faves',
  imports: [AsyncPipe],
  templateUrl: './yyang22-faves.html',
  styleUrl: './yyang22-faves.css',
})
export class Yyang22Faves {
  private readonly peopleSvc = inject(SwPeopleService);

  protected readonly people$ = this.peopleSvc.getPeopleFromSwapiApi();
}
