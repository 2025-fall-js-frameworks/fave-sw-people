import { Routes } from '@angular/router';
import {CsmithFaves} from './csmith-faves/csmith-faves';
import { AspriggsFavs } from './aspriggs-favs/aspriggs-favs';
import { Yyang22Faves } from './yyang22-faves/yyang22-faves';


export const routes: Routes = [
  {
    path: 'csmith',
    component: CsmithFaves
  },
	{
    path: "aspriggs",
    component: AspriggsFavs
  },
  { 
    path: "yyang22"
    , component: Yyang22Faves
  }
];
