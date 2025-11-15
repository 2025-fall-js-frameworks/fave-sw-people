import { Routes } from '@angular/router';
import {CsmithFaves} from './csmith-faves/csmith-faves';
import { AspriggsFavs } from './aspriggs-favs/aspriggs-favs';
import { AkoroliovaFaveSwPeople } from './akoroliova-fave-sw-people/akoroliova-fave-sw-people';
import { TsteeleFaves } from './tsteele-faves/tsteele-faves';

export const routes: Routes = [
  {
    path: 'csmith',
    component: CsmithFaves
  }
	, {
    path: "aspriggs",
    component: AspriggsFavs
  }
  , {
      path: "akoroliova", 
      component: AkoroliovaFaveSwPeople
  }
  , {
      path: "tsteele", 
      component: TsteeleFaves
  }
];
