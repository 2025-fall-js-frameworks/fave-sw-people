import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { SwPeopleService } from '../sw-people.service';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';

type FaveDisplay = {
  name: string;
  checked: boolean;
  weightInKilograms: number;
  invalidWeight: boolean;
};

@Component({
  selector: 'app-copilot-faves',
  imports: [FormsModule],
  templateUrl: './copilot-faves.html',
  styleUrl: './copilot-faves.css',
})
export class CopilotFaves implements OnInit {

  //
  // DI - dependency injection...
  //
  private readonly peopleSvc = inject(SwPeopleService);

  //
  // Signals...
  //
  protected people: WritableSignal<FaveDisplay[]> = signal([]);

  protected faveCount = computed(
    () => this.people().filter(x => x.checked).length
  );

  protected avgFaveWeight = computed(
    () => {

      // Get selected faves
      const faves = this.people().filter(
        person => person.checked && !person.invalidWeight
      );

      // Sum their weight
      const sumOfFavesWeightInKilograms = faves.reduce(
        (acc, favePerson) => acc + favePerson.weightInKilograms,
        0,
      );

      // Return their avg weight
      return this.faveCount() > 0
        ? faves.length > 0
          ? `Avg Weight ${(sumOfFavesWeightInKilograms / faves.length).toFixed(2)} kg  ${this.faveCount() != faves.length ? '** some faves are missing weight info' : ''}`
          : '** All Selected Faves Missing Weight Info'
        : "No Faves Selected"
      ;

    }
  );
  
  //
  // Other methods/funcs
  //
  async ngOnInit() {
    const people = await firstValueFrom(
      this.peopleSvc.getPeopleFromSwapiApi()
    );

    this.people.set(
      people.map(
        x => ({
          name: x.name,
          checked: false,
          weightInKilograms: Number(x.mass),
          invalidWeight: Number.isNaN(Number(x.mass)),
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

  protected who = "";

  protected readonly postToMsTeams = async () => {
    try {
      const commaDelimitedFaves = this.people()
        .filter(
          x => x.checked
        )
        .map(
          x => x.name
        )
        .join(', ')
      ;

      await this.peopleSvc.postFavesAndFunFactToMsTeams(
        {
          name: this.who,
          faves: commaDelimitedFaves,
          "fun-fact": this.avgFaveWeight(),
        }
      );
    }
    catch (err) {
      console.warn(err);
    }
  };

  protected promisesAsThenables() {
    const page1 = this.peopleSvc.getPeoplePageOne()
      .then(
        data => {
          console.log(data);

          const page2 = this.peopleSvc.getPeoplePageTwo()
            .then(
              data => console.log(data)
            )
            .catch(
              err => console.warn("inside", err)
            )
        }
      )
      .catch(
        err => console.warn("outside", err)
      )
    ;
  }

  protected async promisesWithAsyncAwait() {

    try {

      const page1 = await this.peopleSvc.getPeoplePageOne();
      console.log(page1); // ? ? ?

      const page2 = await this.peopleSvc.getPeoplePageTwo();
      console.log(page2); // ? ? ?
    }

    catch (err) {
      console.warn(
        "catch block"
        , err
      );
    }
  }

  protected async promisesFun() {

    // const await = 0;

    try {

      const page1 = this.peopleSvc.getPeoplePageOne();
      // console.log(page1); // ? ? ?

      const page2 = this.peopleSvc.getPeoplePageTwo();
      // console.log(page2); // ? ? ?

      const data = await Promise.all(
      // const data = await Promise.race(
      // const data = await Promise.any(
        [
          page1 
          , page2
        ]
      );
      console.log(
        data[0].name
      ); // ? ? ? 

    }

    catch (err) {
      console.warn(
        "catch block"
        , err
      );
    }
  }
}
