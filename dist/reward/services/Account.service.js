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
const config_1 = require('./config');
// import { Md5 } from 'ts-md5/dist/md5';
const searchUrl = config_1.baseUrl + '/rewardCheckUser/list';
const delUrl = config_1.baseUrl + '/rewardCheckUser/delete';
const addUrl = config_1.baseUrl + '/rewardCheckUser/add';
const editUrl = config_1.baseUrl + '/rewardCheckUser/edit';
const queryUrl = config_1.baseUrl + '/rewardCheckUser/query/';
let AccountService = class AccountService {
    constructor(http) {
        this.http = http;
    }
    getOne(id) {
        let search = new http_1.URLSearchParams();
        search.set('cRCUId', id);
        return this.http.get(queryUrl, { search: search }).map(res => res.json()).catch(this.handleError);
    }
    /**
     * 新增和修改核验人
     * @param  {[object]} data [插入数据]
     * @return {[Observables]}      [observables 数据]
     */
    add(data) {
        let URL;
        if (data.cRCUId === null || data.cRCUId === undefined || isNaN(data.cRCUId)) {
            URL = addUrl; //新增
        }
        else {
            URL = editUrl; //修改
        }
        let body = JSON.stringify(data);
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(URL, body, options).map(res => res.json()).catch(this.handleError);
    }
    /**
     * 删除核验人
     * @param  {[number]} id
     * @return {[Observables]}  [observables 数据]
     */
    delete(id) {
        let search = new http_1.URLSearchParams();
        search.set('cRCUId', id);
        return this.http.delete(delUrl, { search: search }).map(res => res.json()).catch(this.handleError);
    }
    /**
     * 发放/暂停核验型奖励
     * @param  {[type]} id
     * @param  {[type]} state [0删除,1发放中,2暂停中]
     * @return {[type]}       [observables 数据]
     */
    putState(id, state) {
        let URL = config_1.baseUrl + '/rewardManage/status/edit';
        let data = { cRPId: id, cRPStatus: state }; //0删除,1发放中,2暂停中
        let body = JSON.stringify(data);
        let headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(URL, body, options).map(res => res.json()).catch(this.handleError);
    }
    /**
     * 关联项目
     * @param  {[object]} params [cRPId,queryType:[1当前正在关联的/2所有的关联的，包括历史]]
     * @return {[Observables]}   [observables 数据]
     */
    projectsList(params) {
        let search = new http_1.URLSearchParams();
        search.set('cRPId', params.cRPId);
        search.set('queryType', params.queryType);
        let URL = config_1.baseUrl + '/rewardManage/projects/list';
        return this.http.get(URL, { search: search }).map(res => res.json()).catch(this.handleError);
    }
    /**
     * 核验子账号列表
     * @param  {[object]} params [分页currentPage,pageSize]
     * @return {[Observables]}   [observables 数据]
     */
    list(params) {
        let search = new http_1.URLSearchParams();
        search.set('currentPage', params.currentPage + '');
        search.set('pageSize', params.pageSize + '');
        return this.http.get(searchUrl, { search: search }).map(res => res.json()).catch(this.handleError);
    }
    /**
     * 发放总量
     * @param  {[object]} id [ID]
     * @return {[Observables]}   [observables 数据]
     */
    totalList(id) {
        let URL = config_1.baseUrl + '/rewardManage/check/total/' + id;
        return this.http.get(URL).map(res => res.json()).catch(this.handleError);
    }
    handleError(error) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    }
};
AccountService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], AccountService);
exports.AccountService = AccountService;
//# sourceMappingURL=/Users/worm/Documents/ng2-reward/tmp/broccoli_type_script_compiler-input_base_path-lKJx3Ehh.tmp/0/tmp/broccoli_type_script_compiler-input_base_path-lKJx3Ehh.tmp/0/src/reward/services/Account.service.js.map