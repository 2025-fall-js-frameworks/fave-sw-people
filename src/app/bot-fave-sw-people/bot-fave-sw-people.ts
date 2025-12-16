import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { SwPeopleService } from '../sw-people.service';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';

type FaveDisplay = {
  name: string;
  checked: boolean;
  massInKilograms: number;
  invalidMass: boolean;
};

@Component({
  selector: 'app-bot-fave-sw-people',
  imports: [FormsModule],
  templateUrl: './bot-fave-sw-people.html',
  styleUrl: './bot-fave-sw-people.css',
})
export class BotFaveSwPeople implements OnInit {
  private readonly peopleSvc = inject(SwPeopleService);

  protected people : WritableSignal<FaveDisplay[]> = signal([]);

  protected faveCount = computed(
    () => this.people().filter(x => x.checked).length
  );

  protected averageFaveWeight = computed(() => {
    const faves = this.people().filter(
      person => person.checked && !person.invalidMass
    );

    const sumOfMass = faves.reduce(
      (acc, fave) => acc + fave.massInKilograms,
      0
    );

    return this.faveCount() > 0
      ? faves.length > 0
        ? `Average weight ${(sumOfMass / faves.length).toFixed(2)} kg ${this.faveCount() != faves.length ? '** some faves are missing mass info **' : ''}`
        : '**all selected faves missing mass info**'
      : 'No faves selected';
  });

  async ngOnInit() {
    const people = await firstValueFrom(this.peopleSvc.getPeopleFromSwapiApi());
    this.people.set(
      people.map(
        (x: any) => ({
          name: x.name,
          checked: false,
          massInKilograms: Number(x.mass.replace(/,/g, '')),
          invalidMass: Number.isNaN(Number(x.mass.replace(/,/g, ''))),
        })
      )
    );
  }

  protected readonly toggleChecked = (personToToggle: FaveDisplay) => this.people.update(
    previousPeople => previousPeople.map(
      person => ({
        ...person,
        checked: person.name === personToToggle.name
          ? !person.checked
          : person.checked
      })
    )
  );

  protected who = '';

  protected readonly postToMsTeams = async () => {
    try {
      const commaDelimetedFaves = this.people()
        .filter(x => x.checked)
        .map(x => x.name)
        .join(', ');
      await this.peopleSvc.postFavesAndFunFactToMsTeams({
        name: this.who,
        faves: commaDelimetedFaves,
        'fun-fact': this.averageFaveWeight(),
      });
    }
    catch (err) {
      console.warn(err);
    }
  };

  protected promisesAsThenables() {
    const page1 = this.peopleSvc.getPeoplePageOne().then(
      data => {
        console.log(data);
        const page2 = this.peopleSvc.getPeoplePageTwo().then(
          data2 => console.log(data2)
        )
        .catch(
          err => console.warn(err)
        );
      }
    )
    .catch(
      err => console.warn(err)
    );
  }

  protected async promisesWithAsyncAwait() {
    try {
      const page1 = await this.peopleSvc.getPeoplePageOne();
      console.log(page1);
      const page2 = await this.peopleSvc.getPeoplePageTwo();
      console.log(page2);
    }
    catch (err) {
      console.warn(err);
    }
  }

  protected async promisesFun() {
    try {
      const page1 = this.peopleSvc.getPeoplePageOne();
      const page2 = this.peopleSvc.getPeoplePageTwo();
      const data = await Promise.all([page1, page2]);
      console.log(data[0].name);
    }
    catch (err) {
      console.warn(err);
    }
  }

}
