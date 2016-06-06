"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const router_1 = require('@angular/router');
const home_component_1 = require('./+home/home.component');
const create_component_1 = require('./+create/create.component');
const show_add_component_1 = require('./+show/add/show.add.component');
const pin_add_component_1 = require('./+pin/add/pin.add.component');
const account_add_component_1 = require('./+account/add/account.add.component');
const account_list_component_1 = require('./+account/list/account.list.component');
const baccarat_add_component_1 = require('./+baccarat/add/baccarat.add.component');
const show_detail_component_1 = require('./+show/detail/show.detail.component');
const pin_detail_component_1 = require('./+pin/detail/pin.detail.component');
let AppComponent = class AppComponent {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() {
        // this.router.navigate(['/']);
    }
};
AppComponent = __decorate([
    core_1.Component({
        selector: 'reward-app',
        template: '<router-outlet></router-outlet>',
        directives: [router_1.ROUTER_DIRECTIVES],
        providers: [router_1.ROUTER_PROVIDERS]
    }),
    router_1.Routes([
        { path: '/', component: home_component_1.HomeComponent },
        { path: '/create', component: create_component_1.CreateComponent },
        { path: '/account/add', component: account_add_component_1.AccountAddComponent },
        { path: '/account/edit', component: account_add_component_1.AccountAddComponent },
        { path: '/account/list', component: account_list_component_1.AccountListComponent },
        { path: '/show/add', component: show_add_component_1.ShowAddComponent },
        { path: '/show/edit', component: show_add_component_1.ShowAddComponent },
        { path: '/show/detail', component: show_detail_component_1.ShowDetailComponent },
        { path: '/pin/add', component: pin_add_component_1.PinAddComponent },
        { path: '/pin/edit', component: pin_add_component_1.PinAddComponent },
        { path: '/pin/detail', component: pin_detail_component_1.PinDetailComponent },
        { path: '/baccarat/add', component: baccarat_add_component_1.BaccaratAddComponent },
        { path: '/baccarat/edit', component: baccarat_add_component_1.BaccaratAddComponent },
        { path: '/baccarat/show/detail', component: show_detail_component_1.ShowDetailComponent },
        { path: '/baccarat/pin/detail', component: pin_detail_component_1.PinDetailComponent },
    ]), 
    __metadata('design:paramtypes', [router_1.Router])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=/Users/worm/Documents/ng2-reward/tmp/broccoli_type_script_compiler-input_base_path-zwfUcOLy.tmp/0/tmp/broccoli_type_script_compiler-input_base_path-zwfUcOLy.tmp/0/src/reward/app.component.js.map