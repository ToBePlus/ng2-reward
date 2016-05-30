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
const ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
const Account_service_1 = require('../Account.service');
let AccountListComponent = class AccountListComponent {
    constructor(as, router) {
        this.as = as;
        this.router = router;
        this.currentPage = 1;
        this.pageSize = 10;
        this.pageCount = 0;
        this.params = {};
        this.params.currentPage = 1;
        this.params.pageSize = 10;
    }
    pageChanged(page) {
        this.currentPage = page.page;
        this.pageSize = page.itemsPerPage;
        this.getList();
    }
    ngOnInit() {
        this.getList();
    }
    getList() {
        this.params.currentPage = this.currentPage;
        this.params.pageSize = this.pageSize;
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
        // this.params = data.params;
        this.list = data.data.list;
        this.page = data.data.page;
        this.currentPage = +data.data.page.currentPage;
        this.pageSize = +data.data.page.pageSize;
        this.pageCount = +data.data.page.pageCount;
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
        templateUrl: 'reward/+account/list/template.html',
        styleUrls: ['reward/+account/list/style.min.css'],
        directives: [ng2_bootstrap_1.PAGINATION_DIRECTIVES, router_1.ROUTER_DIRECTIVES, common_1.CORE_DIRECTIVES, common_1.NgFor, common_1.NgSwitch, common_1.NgSwitchWhen, common_1.NgSwitchDefault],
        providers: [Account_service_1.AccountService, http_1.HTTP_PROVIDERS]
    }), 
    __metadata('design:paramtypes', [Account_service_1.AccountService, router_1.Router])
], AccountListComponent);
exports.AccountListComponent = AccountListComponent;
//# sourceMappingURL=/Users/worm/Documents/ng2-reward/tmp/broccoli_type_script_compiler-input_base_path-1GxHBMum.tmp/0/tmp/broccoli_type_script_compiler-input_base_path-1GxHBMum.tmp/0/src/reward/+account/list/account.list.component.js.map