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
const Account_service_1 = require('../../../services/Account.service');
let AccountListComponent = class AccountListComponent {
    constructor(as, router) {
        this.as = as;
        this.router = router;
        this.params = {};
        this.params.currentPage = 0;
        this.params.pageSize = 10;
    }
    ngOnInit() {
        this.getList();
    }
    getList() {
        this.as.list(this.params).subscribe(data => this.setList(data), error => this.errorMessage);
    }
    onDelete(subUser) {
        if (subUser.delSubmitText !== 'delete') {
            alert('正确填写确认信息,delete');
            return;
        }
        this.as.delete(subUser.cRCUId).subscribe(data => {
            alert(data.error.msg);
            this.getList();
        }, error => this.errorMessage);
    }
    setList(data) {
        if (data.error.state !== 0) {
            alert(data.error.msg);
            return;
        }
        this.params = data.params;
        this.list = data.data.list;
        this.page = data.data.page;
    }
    toHome() {
        this.router.navigate(['/']);
    }
    goBack() {
        window.history.back();
    }
};
AccountListComponent = __decorate([
    core_1.Component({
        selector: 'account-list',
        templateUrl: 'reward/controllers/account/list/template.html',
        styleUrls: ['reward/controllers/account/list/style.min.css'],
        directives: [router_1.ROUTER_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.NgFor, common_1.NgSwitch, common_1.NgSwitchWhen, common_1.NgSwitchDefault],
        providers: [Account_service_1.AccountService, http_1.HTTP_PROVIDERS]
    }), 
    __metadata('design:paramtypes', [Account_service_1.AccountService, router_1.Router])
], AccountListComponent);
exports.AccountListComponent = AccountListComponent;
//# sourceMappingURL=/Users/worm/Documents/ng2-reward/tmp/broccoli_type_script_compiler-input_base_path-ZKyOuL9I.tmp/0/tmp/broccoli_type_script_compiler-input_base_path-ZKyOuL9I.tmp/0/src/reward/controllers/account/list/account.list.component.js.map