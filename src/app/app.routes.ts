import { Routes } from '@angular/router';
import { AspriggsFavs } from './aspriggs-favs/aspriggs-favs';
import { BfunmakerFaves } from './bfunmaker-faves/bfunmaker-faves';

export const routes: Routes = [
	{ path: "aspriggs", component: AspriggsFavs },
    { path : "bfunmaker", 
        component : BfunmakerFaves }
    ]