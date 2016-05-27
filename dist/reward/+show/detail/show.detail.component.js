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
const Observable_1 = require('rxjs/Observable');
const moment = require('moment');
const config_1 = require('../../services/config');
const ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
const Show_service_1 = require('../Show.service');
const URL = config_1.baseUrl + '/ccs/medias/uploadBackgroundImage';
// const URL = 'http://192.168.1.146:8080/medias/uploadBackgroundImage';
const downLoadBase = config_1.baseUrl + '/rewardManage/show/export';
let ShowDetailComponent = class ShowDetailComponent {
    constructor(ss, router, params) {
        this.ss = ss;
        this.router = router;
        this.currentPage = 1;
        this.pageSize = 10;
        this.pageCount = 0;
        this.dateShow = 0;
        this.id = +params.getParam('id'); //获取URL中的ID
        this.state = +params.getParam('state'); //获取URL中的状态
        this.projectsParams = {};
        this.prizesParams = {};
        this.projectsParams.cRPId = this.id;
        this.projectsParams.queryType = 1;
        this.prizesParams.cRPId = this.id;
        this.prizesParams.startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
        this.prizesParams.endDate = moment().format('YYYY-MM-DD');
        this.prizesParams.range = -1;
    }
    onShowDate(event) {
        event.stopPropagation();
        this.dateShow = !this.dateShow;
    }
    closeDatePicker(event) {
        event.stopPropagation();
        this.dateShow = 0;
    }
    setPage(pageNo) {
        this.currentPage = pageNo;
    }
    ;
    moment(date) {
        if (date == null)
            return '';
        return moment(date).format('YYYY-MM-DD');
    }
    onSetRange(range) {
        this.prizesParams.range = range;
        if (range < 91) {
            this.prizesParams.startDate = moment().subtract(range, 'days').format('YYYY-MM-DD');
            this.prizesParams.endDate = moment().format('YYYY-MM-DD');
        }
        else if (range === 'currentYear') {
            this.prizesParams.startDate = moment().startOf('year').format('YYYY-MM-DD');
            this.prizesParams.endDate = moment().endOf('year').format('YYYY-MM-DD');
        }
        else if (range === 'nextYear') {
            this.prizesParams.startDate = moment().add(1, 'y').startOf('year').format('YYYY-MM-DD');
            this.prizesParams.endDate = moment().add(1, 'y').endOf('year').format('YYYY-MM-DD');
        }
    }
    pageChanged(page) {
        this.currentPage = page.page;
        this.pageSize = page.itemsPerPage;
        this.search();
    }
    onDownload() {
        let search = new http_1.URLSearchParams();
        search.set('cRPId', this.prizesParams.cRPId);
        search.set('startDate', this.prizesParams.startDate);
        search.set('endDate', this.prizesParams.endDate);
        search.set('projectId', this.prizesParams.projectId);
        return downLoadBase + '?' + search;
    }
    onDoneDownload(dId) {
        let search = new http_1.URLSearchParams();
        search.set('cRPId', this.prizesParams.cRPId);
        search.set('cRPDId', dId);
        search.set('cRPStatus', '1');
        return downLoadBase + '?' + search;
    }
    onSearch() {
        this.search();
    }
    onDelete() {
        if (!confirm('是否删除该奖励?')) {
            return;
        }
        this.ss.delete(this.id).subscribe(data => {
            if (this.errorAlert(data)) {
                this.toHome();
            }
        }, error => this.handleError);
    }
    onState() {
        if (!confirm('是否变更该奖励状态?')) {
            return;
        }
        this.ss.putState(this.id, this.state === 1 ? 2 : 1).subscribe(data => {
            if (this.errorAlert(data)) {
                this.getOne();
            }
        }, error => this.handleError);
    }
    ngOnInit() {
        this.getOne();
        this.getProjectsList();
        this.getTotalList();
    }
    getOne() {
        this.ss.getOne(this.id).subscribe(data => {
            if (this.errorAlert(data)) {
                this.info = data.data;
                this.state = this.info.cRPStatus;
            }
        }, error => this.handleError);
    }
    getTotalList() {
        this.ss.totalList(this.id).subscribe(data => {
            if (this.errorAlert(data)) {
                this.totalList = data.data;
            }
        }, error => this.handleError);
    }
    getProjectsList() {
        this.ss.projectsList(this.projectsParams).subscribe(data => {
            if (this.errorAlert(data)) {
                this.projectsList = data.data;
                this.curProjectsList = data.data.filter(data => data.cPStatus === '1');
                if (this.projectsList.length > 0 && this.prizesParams.projectId === undefined) {
                    this.prizesParams.projectId = this.projectsList[0].cPId;
                }
                this.search();
            }
        }, error => this.handleError);
    }
    search() {
        if (this.prizesParams.projectId === undefined) {
            return;
        }
        this.prizesParams.currentPage = this.currentPage;
        this.prizesParams.pageSize = this.pageSize;
        this.ss.showList(this.prizesParams).subscribe(data => {
            if (this.errorAlert(data)) {
                this.showList = data.data.list;
                this.page = data.data.page;
                this.prizesParams.range = -1;
            }
        }, error => this.handleError);
    }
    errorAlert(data) {
        if (data.error.state !== 0) {
            alert(data.error.msg);
            return false;
        }
        return true;
    }
    handleError(error) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    }
    toHome() {
        this.router.navigate(['/']);
    }
    goBack() {
        window.history.back();
    }
};
ShowDetailComponent = __decorate([
    core_1.Component({
        selector: 'show-detail',
        templateUrl: 'reward/+show/detail/template.html',
        styleUrls: ['reward/+show/detail/style.min.css'],
        directives: [ng2_bootstrap_1.PAGINATION_DIRECTIVES, ng2_bootstrap_1.DATEPICKER_DIRECTIVES, router_1.ROUTER_DIRECTIVES],
        providers: [Show_service_1.ShowService, http_1.HTTP_PROVIDERS],
        host: {
            '(click)': 'closeDatePicker($event)'
        }
    }), 
    __metadata('design:paramtypes', [Show_service_1.ShowService, router_1.Router, router_1.RouteSegment])
], ShowDetailComponent);
exports.ShowDetailComponent = ShowDetailComponent;
//# sourceMappingURL=/Users/worm/Documents/ng2-reward/tmp/broccoli_type_script_compiler-input_base_path-2JaFNAP8.tmp/0/tmp/broccoli_type_script_compiler-input_base_path-2JaFNAP8.tmp/0/src/reward/+show/detail/show.detail.component.js.map