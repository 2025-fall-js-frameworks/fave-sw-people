import { Routes } from '@angular/router';
import {CsmithFaves} from './csmith-faves/csmith-faves';
import { AspriggsFavs } from './aspriggs-favs/aspriggs-favs';
import { AkoroliovaFaveSwPeople } from './akoroliova-fave-sw-people/akoroliova-fave-sw-people';

export const routes: Routes = [
  {
    path: 'csmith',
    component: CsmithFaves
  },
	{
    path: "aspriggs",
    component: AspriggsFavs
  }
{ path: "aspriggs", component: AspriggsFavs }
    {
        path: "akoroliova", 
        component: AkoroliovaFaveSwPeople
    }
];
