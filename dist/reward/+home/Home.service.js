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
const http_1 = require('@angular/http');
const Observable_1 = require('rxjs/Observable');
const config_1 = require('../services/config');
class RType {
    constructor(cRTId, cRPRewardType, cRTRewardName, cRTStatus) {
        this.cRTId = cRTId;
        this.cRPRewardType = cRPRewardType;
        this.cRTRewardName = cRTRewardName;
        this.cRTStatus = cRTStatus;
    }
}
exports.RType = RType;
const HomeListUrl = config_1.baseUrl + '/rewardManage/list';
let HomeService = class HomeService {
    constructor(http) {
        this.http = http;
    }
    ngOnInit() {
    }
    get() {
        return this.http.get(HomeListUrl).map(res => res.json()).catch(this.handleError);
    }
    add(program) {
        let body = JSON.stringify(program);
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(HomeListUrl, body, options).map(res => res.json()).catch(this.handleError);
    }
    handleError(error) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    }
};
HomeService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], HomeService);
exports.HomeService = HomeService;
//# sourceMappingURL=/Users/worm/Documents/ng2-reward/tmp/broccoli_type_script_compiler-input_base_path-GxqQNl8n.tmp/0/tmp/broccoli_type_script_compiler-input_base_path-GxqQNl8n.tmp/0/src/reward/+home/Home.service.js.map