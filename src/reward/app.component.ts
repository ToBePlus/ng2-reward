import { Component, OnInit } from '@angular/core';
import {ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router, Routes} from '@angular/router';

import {HomeComponent} from './controllers/home/home.component';
import {CreateComponent} from './controllers/create/create.component';
import {ShowAddComponent} from './controllers/show/add/show.add.component';
import {ShowDetailComponent} from './controllers/show/detail/show.detail.component';
import {PinAddComponent} from './controllers/pin/add/pin.add.component';
import {PinDetailComponent} from './controllers/pin/detail/pin.detail.component';



@Component({
    selector: 'reward-app',
    template: '<router-outlet></router-outlet>',
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS]
})

@Routes([
    { path: '/', component: HomeComponent},
    { path: '/create', component: CreateComponent},
    { path: '/show/add', component: ShowAddComponent },
    { path: '/show/edit', component: ShowAddComponent },
    { path: '/show/detail', component: ShowDetailComponent },
    { path: '/pin/add', component: PinAddComponent },
    { path: '/pin/edit', component: PinAddComponent },
    { path: '/pin/detail', component: PinDetailComponent },
])

export class AppComponent implements OnInit {
    constructor(private router: Router) {

    }
    ngOnInit() {
        // this.router.navigate(['/']);
    }
}
