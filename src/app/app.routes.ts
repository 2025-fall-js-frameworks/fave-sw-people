import { Routes } from '@angular/router';
import { AspriggsFavs } from './aspriggs-favs/aspriggs-favs';
import { TsteeleFaves } from './tsteele-faves/tsteele-faves';

export const routes: Routes = [
	{ path: "aspriggs", component: AspriggsFavs },
    { 
        path: "tsteele"
        , component: TsteeleFaves
    }
];
