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
const async_1 = require('@angular/core/src/facade/async');
require('rxjs/Rx');
const Observable_1 = require('rxjs/Observable');
const moment = require('moment');
const config_1 = require('../../services/config');
const ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
const ng2_uploader_1 = require('ng2-uploader/ng2-uploader');
const Pin_service_1 = require('../Pin.service');
const URL = config_1.baseUrl + '/ccs/medias/uploadBackgroundImage';
const FILE_URL = config_1.baseUrl + '/rewardManage/uploadCheckCode';
const downLoadBase = config_1.baseUrl + '/rewardManage/check/export';
let PinDetailComponent = class PinDetailComponent {
    constructor(ps, router, params) {
        this.ps = ps;
        this.router = router;
        this.currentPage = 1;
        this.pageSize = 10;
        this.pageCount = 0;
        this.dateShow = 0;
        this.loading = 0;
        this.fileOptions = {
            url: FILE_URL
        };
        this.fileProgress = 0;
        this.zone = new core_1.NgZone({ enableLongStackTrace: false });
        this.id = +params.getParam('id'); //获取URL中的ID
        this.state = +params.getParam('state'); //获取URL中的状态
        this.projectsParams = {};
        this.projectsParams.cRPId = this.id;
        this.projectsParams.queryType = 1;
        this.prizesParams = {};
        this.prizesParams.cRPId = this.id;
        this.prizesParams.projectId = '';
        this.prizesParams.cRPDId = 0;
        this.prizesParams.sendStatus = 0;
        this.prizesParams.verifyStatus = 0;
        this.prizesParams.startDate = moment().format('YYYY-MM-DD');
        this.prizesParams.endDate = moment().format('YYYY-MM-DD');
        this.prizesParams.range = -1;
    }
    onShowDate(event) {
        event.stopPropagation();
        this.dateShow = !this.dateShow;
        this.prizesParams.range = 'custom';
    }
    closeDatePicker(event) {
        event.stopPropagation();
        this.dateShow = 0;
    }
    moment(date, format = 'YYYY-MM-DD') {
        if (date == null)
            return '';
        return moment(date).format(format);
    }
    momentDate(date) {
        return moment(date).toDate();
    }
    onSetRange(range) {
        this.prizesParams.range = range;
        if (range == '-1') {
            this.prizesParams.startDate = moment().format('YYYY-MM-DD');
            this.prizesParams.endDate = moment().format('YYYY-MM-DD');
        }
        else if (range == '7' || range == '30' || range == '90') {
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
        let status = '0';
        search.set('cRPId', this.prizesParams.cRPId);
        search.set('cRPDId', this.prizesParams.cRPDId);
        search.set('sendStatus', this.prizesParams.sendStatus);
        search.set('verifyStatus', this.prizesParams.verifyStatus);
        search.set('startDate', this.prizesParams.startDate || '');
        search.set('endDate', this.prizesParams.endDate || '');
        search.set('projectId', this.prizesParams.projectId);
        return downLoadBase + '?' + search;
    }
    onDoneDownload(dId) {
        let search = new http_1.URLSearchParams();
        search.set('cRPId', this.prizesParams.cRPId);
        search.set('cRPDId', dId);
        search.set('sendStatus', '2');
        return downLoadBase + '?' + search;
    }
    onExchangeDownload(dId) {
        let search = new http_1.URLSearchParams();
        search.set('cRPId', this.prizesParams.cRPId);
        search.set('cRPDId', dId);
        search.set('verifyStatus', '2');
        return downLoadBase + '?' + search;
    }
    onSearch() {
        this.currentPage = 1;
        this.pageSize = 10;
        this.search();
    }
    onDelete() {
        if (!confirm('是否删除该奖励?')) {
            return;
        }
        this.ps.delete(this.id).subscribe(data => {
            if (this.errorAlert(data)) {
                this.toHome();
            }
        }, error => this.handleError);
    }
    onState() {
        if (!confirm('是否变更该奖励状态?')) {
            return;
        }
        this.ps.putState(this.id, this.state === 1 ? 2 : 1).subscribe(data => {
            if (this.errorAlert(data)) {
                alert('奖励状态变更成功');
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
        this.ps.getOne(this.id).subscribe(data => {
            if (this.errorAlert(data)) {
                this.info = data.data;
                this.state = this.info.cRPStatus;
            }
        }, error => this.handleError);
    }
    getTotalList() {
        this.ps.totalList(this.id).subscribe(data => {
            if (this.errorAlert(data)) {
                this.totalList = data.data;
            }
        }, error => this.handleError);
    }
    getProjectsList() {
        this.ps.projectsList(this.projectsParams).subscribe(data => {
            if (this.errorAlert(data)) {
                this.projectsList = data.data;
                this.curProjectsList = data.data.filter(data => data.cPStatus === '1');
                if (this.projectsList.length > 0 && this.prizesParams.projectId === '') {
                    this.prizesParams.projectId = this.projectsList[0].cPId;
                }
                if (this.prizesParams.projectId !== undefined) {
                    this.search();
                }
            }
        }, error => this.handleError);
    }
    before(start, end) {
        return moment(start).isBefore(end);
    }
    search() {
        if (this.before(this.prizesParams.cRPValidEndDate, this.prizesParams.cRPValidStartDate)) {
            this.timeError = 1;
            return false;
        }
        else {
            this.timeError = 0;
        }
        this.prizesParams.currentPage = this.currentPage;
        this.prizesParams.pageSize = this.pageSize;
        this.ps.pinList(this.prizesParams).subscribe(data => {
            if (this.errorAlert(data)) {
                this.pinList = data.data;
                // this.prizesParams = data.param;
                this.currentPage = +this.prizesParams.currentPage;
                this.pageSize = +this.prizesParams.pageSize;
                this.pageCount = +this.prizesParams.pageCount;
            }
        }, error => this.handleError);
    }
    onAddFile(tl) {
        if (this.loading) {
            return false;
        }
        this.loading = 1;
        let data = {};
        data.cRPId = this.prizesParams.cRPId;
        data.cRPDId = tl.cRPDId;
        data.fileName = tl.fileName;
        this.ps.addTotal(data).subscribe(data => {
            if (data.error.state !== 0) {
                tl.addStatus = 2;
            }
            else {
                tl.addTotalShow = 0;
                tl.addStatus = 1;
            }
            async_1.TimerWrapper.setTimeout(() => {
                tl.addStatus = 0;
                this.getTotalList();
            }, 2000);
        }, error => this.handleError);
    }
    onAddTotal(tl) {
        if (this.loading) {
            return false;
        }
        if (this.checkTotal(tl)) {
            this.loading = 0;
            return false;
        }
        this.loading = 1;
        let data = {};
        data.cRPId = this.prizesParams.cRPId;
        data.cRPDId = tl.cRPDId;
        data.fileName = tl.fileName;
        data.additionalNum = isNaN(+tl.additionalNum) ? 0 : +tl.additionalNum;
        this.ps.addTotal(data).subscribe(data => {
            if (data.error.state !== 0) {
                tl.addStatus = 2;
            }
            else {
                tl.addTotalShow = 0;
                tl.addStatus = 1;
            }
            async_1.TimerWrapper.setTimeout(() => {
                tl.addStatus = 0;
                this.getTotalList();
            }, 2000);
        }, error => this.handleError);
    }
    onEnterAddTotal(event, data) {
        if (event.keyCode == 13) {
            this.onAddTotal(data);
        }
    }
    checkTotal(tl) {
        if (tl.additionalNum === '') {
            tl.additionalNumError = 1;
            return true;
        }
        if (!/^([1-9][0-9]{0,4}|100000)$/.test(tl.additionalNum)) {
            tl.additionalNumError = 1;
            return true;
        }
        tl.additionalNumError = 0;
        return false;
    }
    checkUploadFile() {
        return this.info.cRPCodeType === 1 && this.info.cRPGenerateType === 2;
    }
    handleFileUpload(data, tl) {
        if (data.size > 2 * 1024 * 1024) {
            tl.uploadFile = { error: { state: 2, msg: '图片文件尺寸请小于2M' } };
        }
        else {
            if (data.response) {
                tl.uploadFileXls = JSON.parse(data.response);
                if (tl.uploadFileXls.error.state === 0) {
                    tl.fileName = tl.uploadFileXls.data.filePath;
                }
                tl.fileResp = data;
                tl.fileProgress = 0;
            }
            this.zone.run(() => {
                tl.fileProgress = data.progress.percent;
            });
        }
    }
    onDelFileName(tl) {
        tl.fileName = '';
        tl.fileProgress = 0;
        tl.uploadFileXls = null;
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
PinDetailComponent = __decorate([
    core_1.Component({
        selector: 'pin-detail',
        templateUrl: 'reward/+pin/detail/template.html',
        styleUrls: ['reward/+pin/detail/style.min.css'],
        directives: [ng2_bootstrap_1.PAGINATION_DIRECTIVES, ng2_bootstrap_1.DATEPICKER_DIRECTIVES, router_1.ROUTER_DIRECTIVES, ng2_uploader_1.UPLOAD_DIRECTIVES],
        providers: [Pin_service_1.PinService, http_1.HTTP_PROVIDERS],
        host: {
            '(click)': 'closeDatePicker($event)'
        }
    }), 
    __metadata('design:paramtypes', [Pin_service_1.PinService, router_1.Router, router_1.RouteSegment])
], PinDetailComponent);
exports.PinDetailComponent = PinDetailComponent;
//# sourceMappingURL=/Users/worm/Documents/ng2-reward/tmp/broccoli_type_script_compiler-input_base_path-i45Tc3U5.tmp/0/tmp/broccoli_type_script_compiler-input_base_path-i45Tc3U5.tmp/0/src/reward/+pin/detail/pin.detail.component.js.map