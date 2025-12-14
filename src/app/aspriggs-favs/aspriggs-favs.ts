import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { SwPeopleService } from '../sw-people.service';
import { firstValueFrom } from 'rxjs';


type FaveDisplay = {
  name: string;
  checked: boolean;
  height: number;
}

@Component({
  selector: 'app-aspriggs-favs',
  imports: [],
  templateUrl: './aspriggs-favs.html',
  styleUrl: './aspriggs-favs.css',
})
export class AspriggsFavs implements OnInit {
  private readonly peopleSvc = inject(SwPeopleService);

  protected people: WritableSignal<FaveDisplay[]> = signal([]);

  protected faveCount = computed(() => this.people().filter(x => x.checked).length)

  // Called on program start
  async ngOnInit(): Promise<void> {
    const people = await firstValueFrom(this.peopleSvc.getPeopleFromSwapiApi());

    this.people.set(
      people.map((x: any) => ({
          name: x.name,
          checked: false,
          height: Number(x.height),
        })
      )
    );
  }

  protected readonly toggleChecked = (p: FaveDisplay) => this.people.update(
    people => people.map(
      person => ({
        ...person,
        // Set checked to the opposite of the current checked state if changed
        checked: person.name == p.name ? !person.checked : person.checked
      })
    )
  );

  protected promisesAsThenables(): void {
    const pageOne = this.peopleSvc.getPeoplePageOne()
      .then(data => {
        console.log(data);

        const pageTwo = this.peopleSvc.getPeoplePageTwo()
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.warn(error);
          });
      })
      .catch(error => {
        console.warn(error);
      });
    }

  protected async promisesWithAsyncAwait(): Promise<void> {
    try {
      const pageOne = await this.peopleSvc.getPeoplePageOne();
      console.log(pageOne);

      const pageTwo = await this.peopleSvc.getPeoplePageTwo();
      console.log(pageTwo);
    } catch (error) {
      console.warn(error);
    }
  }

  protected async promisesFun(): Promise<void> {
    try {
      const pageOne = this.peopleSvc.getPeoplePageOne();
      const pageTwo = this.peopleSvc.getPeoplePageTwo();

      // All - returns all of the options
      const data = await Promise.all([
        pageOne,
        pageTwo,
      ]);

      // Any - randomly picks one of the options to be assigned to data
      // const data = await Promise.any([
      //   pageOne,
      //   pageTwo,
      // ]);

      // Race - the two promises race and the first to resolve is assigned to data
      // const data = await Promise.race([
      //   pageOne,
      //   pageTwo,
      // ]);
      console.log(data);
    } catch (error) {
      console.warn(error);
    }
  }
}
