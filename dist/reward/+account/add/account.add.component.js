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
const common_1 = require('@angular/common');
const _ = require('lodash');
const md5_1 = require('ts-md5/dist/md5');
const Account_service_1 = require('../Account.service');
let AccountAddComponent = class AccountAddComponent {
    constructor(as, router, params) {
        this.as = as;
        this.router = router;
        this.params = {};
        this.subAccount = {};
        this.subAccount.cRCUId = this.id = +params.getParam('id');
    }
    ngOnInit() {
        this.getOne();
    }
    getOne() {
        if (this.id === undefined || isNaN(this.id))
            return;
        this.as.getOne(this.id).subscribe(data => this.setAccount(data), error => { this.errorMessage = error; alert(error); });
    }
    setAccount(data) {
        if (data.error.state !== 0) {
            alert(data.error.msg);
            return;
        }
        data.data.cRCUPassword = '';
        this.subAccount = data.data;
    }
    onSubmit() {
        if (this.subAccount.cRCUPassword === undefined || this.subAccount.cRCUPassword === null || this.subAccount.cRCUPassword === '') {
            alert('密码不能为空');
            return;
        }
        if (this.subAccount.cRCUPassword !== this.checkPwd) {
            alert('2次输入密码不一致');
            return;
        }
        this.data = _.assign({}, this.subAccount); //脱钩
        this.data.cRCUPassword = md5_1.Md5.hashStr(this.data.cRCUPassword);
        this.as.add(this.subAccount).subscribe(data => {
            if (data.error.state !== 0) {
                alert(data.error.msg);
                return;
            }
            alert('成功');
            this.toHome();
        }, error => { this.errorMessage = error; alert(error); });
    }
    toHome() {
        this.router.navigate(['/account/list']);
    }
    goBack() {
        window.history.back();
    }
};
AccountAddComponent = __decorate([
    core_1.Component({
        selector: 'account-add',
        templateUrl: 'reward/+account/add/template.html',
        styleUrls: ['reward/+account/add/style.min.css'],
        directives: [router_1.ROUTER_DIRECTIVES, common_1.FORM_DIRECTIVES],
        providers: [Account_service_1.AccountService, http_1.HTTP_PROVIDERS],
    }), 
    __metadata('design:paramtypes', [Account_service_1.AccountService, router_1.Router, router_1.RouteSegment])
], AccountAddComponent);
exports.AccountAddComponent = AccountAddComponent;
//# sourceMappingURL=/Users/worm/Documents/ng2-reward/tmp/broccoli_type_script_compiler-input_base_path-i45Tc3U5.tmp/0/tmp/broccoli_type_script_compiler-input_base_path-i45Tc3U5.tmp/0/src/reward/+account/add/account.add.component.js.map