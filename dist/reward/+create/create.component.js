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
const http_1 = require('@angular/http');
require('rxjs/Rx');
const RewardType_service_1 = require('./RewardType.service');
let CreateComponent = class CreateComponent {
    constructor(rt, router) {
        this.rt = rt;
        this.router = router;
        this.type = 1;
    }
    ngOnInit() { this.getList(); }
    getList() {
        this.rt.getRewardtypes().subscribe(heroes => { this.list = heroes; }, error => this.errorMessage = error);
    }
    onSelect(item) {
        if (item.status === 0)
            return;
        this.type = item.type;
        this.rt.updateChecked(item.type, this.list);
    }
    routerUrl(type) {
        let router;
        switch (type) {
            case 1:
                router = '/show/add';
                break;
            case 2:
                router = '/pin/add';
                break;
            case 3:
                router = '/baccarat/add';
                break;
            case 4:
                router = '/';
                break;
            case 5:
                router = '/';
                break;
            case 6:
                router = '/';
                break;
            case 7:
                router = '/';
                break;
            case 8:
                router = '/';
                break;
            default:
                router = '/create';
        }
        this.router.navigate([router]);
    }
    redirectTo() {
        this.list.map(data => { if (data.isChecked) {
            this.routerUrl(data.type);
        } });
    }
    goBack() {
        window.history.back();
    }
};
CreateComponent = __decorate([
    core_1.Component({
        selector: 'create',
        templateUrl: 'reward/+create/template.html',
        styleUrls: ['reward/+create/style.css'],
        directives: [router_1.ROUTER_DIRECTIVES],
        providers: [RewardType_service_1.RewardTypeService, http_1.HTTP_PROVIDERS],
    }), 
    __metadata('design:paramtypes', [RewardType_service_1.RewardTypeService, router_1.Router])
], CreateComponent);
exports.CreateComponent = CreateComponent;
//# sourceMappingURL=/Users/worm/Documents/ng2-reward/tmp/broccoli_type_script_compiler-input_base_path-tYsXlf88.tmp/0/tmp/broccoli_type_script_compiler-input_base_path-tYsXlf88.tmp/0/src/reward/+create/create.component.js.map