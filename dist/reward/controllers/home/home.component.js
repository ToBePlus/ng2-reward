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
const common_1 = require('@angular/common');
const router_1 = require('@angular/router');
const http_1 = require('@angular/http');
require('rxjs/Rx');
const Home_service_1 = require('../../services/Home.service');
const Group_type_pipe_1 = require('../../pipe/Group.type.pipe');
let HomeComponent = class HomeComponent {
    constructor(hs, router) {
        this.hs = hs;
        this.router = router;
    }
    ngOnInit() {
        this.getList();
    }
    getImg(tl) {
        if (tl.cRPBackgroundAdd && tl.cRPBackgroundShow) {
            let imgUrl = tl.cRPBackgroundAdd;
            return 'url(/' + imgUrl + ') no-repeat center center';
        }
    }
    getList() {
        this.hs.get().subscribe(data => this.setList(data), error => this.errorMessage);
    }
    setList(data) {
        if (data.error.state !== 0) {
            alert(data.error.msg);
            return;
        }
        this.params = data.params;
        this.typelist = data.data;
        let runList = this.typelist.filter(item => item.cRPStatus == 1);
        this.run = runList.length;
        this.all = this.typelist.length;
    }
    trackByTypelist(index, rtype) {
        return rtype.cRTId;
    }
    toHome() {
        this.router.navigate(['/']);
    }
    goBack() {
        window.history.back();
    }
};
HomeComponent = __decorate([
    core_1.Component({
        selector: 'home',
        templateUrl: 'reward/controllers/home/template.html',
        styleUrls: ['reward/controllers/home/style.css'],
        directives: [router_1.ROUTER_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.NgFor, common_1.NgSwitch, common_1.NgSwitchWhen, common_1.NgSwitchDefault, common_1.NgStyle],
        providers: [Home_service_1.HomeService, http_1.HTTP_PROVIDERS],
        pipes: [Group_type_pipe_1.GroupTypePipe],
    }), 
    __metadata('design:paramtypes', [Home_service_1.HomeService, router_1.Router])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=/Users/worm/Documents/ng2-reward/tmp/broccoli_type_script_compiler-input_base_path-ZKyOuL9I.tmp/0/tmp/broccoli_type_script_compiler-input_base_path-ZKyOuL9I.tmp/0/src/reward/controllers/home/home.component.js.map