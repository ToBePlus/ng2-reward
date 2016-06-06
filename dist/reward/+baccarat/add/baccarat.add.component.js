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
const http_2 = require('@angular/http');
const common_1 = require('@angular/common');
const moment = require('moment');
const _ = require('lodash');
const ng2_uploader_1 = require('ng2-uploader/ng2-uploader');
const config_1 = require('../../services/config');
const Baccarat_service_1 = require('../Baccarat.service');
const Validators_1 = require('../../services/Validators');
const Text_to_html_1 = require('../../pipe/Text.to.html');
const ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
const URL = config_1.baseUrl + '/medias/uploadBackgroundImage';
const FILE_URL = config_1.baseUrl + '/rewardManage/uploadCheckCode';
let BaccaratAddComponent = class BaccaratAddComponent {
    constructor(bs, router, fb, params) {
        this.bs = bs;
        this.router = router;
        this.options = {
            url: URL
        };
        this.basicProgress = 0;
        this.fileOptions = {
            url: FILE_URL
        };
        this.fileProgress = 0;
        this.timeError = 0;
        this.nameError = 0;
        this.state = 0;
        this.addTotaError = 0;
        this.zone = new core_1.NgZone({ enableLongStackTrace: false });
        this.id = +params.getParam('id');
        this.state = +params.getParam('state'); //获取URL中的状态
        this.subForm = fb.group({
            'cRPDName': ['', Validators_1.Validators.required],
            'cRPDSubtitle': [''],
            'cRPDNum': [''],
            'cRPBackgroundShow': [0],
            'cRPDBackgroundAdd': [''],
        });
        this.bsForm = fb.group({
            'cRPName': ['', Validators_1.Validators.required],
            'cRPSubtitle': [''],
            'cRPNameShow': [1],
            'cRPSubtitleShow': [0],
            'cRPBackgroundAdd': [''],
            'cRPBackgroundShow': [0],
            'cRPExchangeType': [1],
            'cRPDesc': [''],
            'cRPDescShow': [0],
            'cRPValidDate': [moment().format('YYYY-MM-DD') + '-' + moment().format('YYYY-MM-DD')],
            'cRPValidStartDate': [moment().format('YYYY-MM-DD')],
            'cRPValidEndDate': [moment().format('YYYY-MM-DD')],
            'cRPValidType': [-1],
            'cRPRate': [1],
            'cRPRateContent': ['', Validators_1.Validators.ratio],
            'totalRewards': [''],
            'cRPCodeType': [1],
            'cRPCodeCommon': [''],
            'cRPGenerateType': [1],
            'fileName': [''],
            'cRPNoticeNow': [1],
            'cRPNoticeNowContent': ['奖励领取验证码{验证码}，恭喜您获得由{品牌名}提供的的{奖品名称}一份，有效期{生效日期}至{失效日期}。'],
            'cRPValidNotice': [1],
            'cRPValidNoticeDay': [3],
            'cRPValidNoticeContent': ['奖励领取验证码{验证码}，您获得的由{品牌名}提供的的{奖品名称}将在{失效日}到期，请及时兑换。'],
        });
        this.cRPRateContent = this.bsForm.controls['cRPRateContent'];
        this.baseUrl = config_1.baseUrl;
    }
    ngOnInit() {
        this.baccarat = {};
        this.baccarat.cRPValidDate = moment().format('YYYY-MM-DD') + '-' + moment().format('YYYY-MM-DD');
        this.baccarat.cRPExchangeType = 2;
        this.baccarat.cRPValidType = -1;
        this.baccarat.cRPRate = 1;
        this.baccarat.cRPCodeType = 1;
        this.baccarat.cRPGenerateType = 1;
        this.baccarat.cRPValidNoticeDay = 3;
        this.baccarat.cRPNoticeNowContent = '奖励领取验证码{验证码}，恭喜您获得由{品牌名}提供的的{奖品名称}一份，有效期{生效日期}至{失效日期}';
        this.baccarat.cRPValidNoticeContent = '奖励领取验证码{验证码}，您获得的由{品牌名}提供的的{奖品名称}将在{失效日}到期，请及时兑换。';
        this.baccarat.cRPValidStartDate = moment().format('YYYY-MM-DD');
        this.baccarat.cRPValidEndDate = moment().format('YYYY-MM-DD');
        this.baccarat.range = -1;
        this.baccarat.subInfo = [{}, {}, {}];
        this.getPinProgram();
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
    momentDate(date) {
        return moment(date).toDate();
    }
    handleBasicUpload(data, index) {
        let sb = this.baccarat.subInfo[index];
        if (data.size > 2 * 1024 * 1024) {
            sb.uploadFile = { error: { state: 2, msg: '图片文件尺寸请小于2M' } };
        }
        else {
            if (data && data.response) {
                sb.uploadFile = JSON.parse(data.response);
                sb.cRPDBackgroundAdd = sb.uploadFile.data;
            }
            sb.basicResp = data;
            this.zone.run(() => {
                sb.basicProgress = data.progress.percent;
            });
        }
    }
    handleFileUpload(data) {
        if (data.response) {
            this.uploadFileXls = JSON.parse(data.response);
            if (this.uploadFileXls.error.state === 0) {
                this.baccarat.fileName = this.uploadFileXls.data.filePath;
            }
            this.fileResp = data;
        }
        this.zone.run(() => {
            this.fileProgress = data.progress.percent;
        });
    }
    onDelFileName() {
        this.baccarat.fileName = '';
        this.fileProgress = 0;
        this.uploadFileXls = {};
    }
    onDelImg(i) {
        let sb = this.baccarat.subInfo[i];
        sb.cRPDBackgroundAdd = '';
        sb.basicProgress = 0;
        sb.uploadFile = null;
    }
    getImg(subinfo) {
        return 'url(\'/' + subinfo.cRPDBackgroundAdd + '\') no-repeat center center';
    }
    getPinProgram() {
        if (this.id === undefined || isNaN(this.id))
            return;
        this.bs.getOne(this.id).subscribe(data => this.setPsForm(data));
    }
    setPsForm(data) {
        this.baccarat = data.data;
        this.baccarat.cRPValidStartDate = this.moment(this.baccarat.cRPValidStartDate);
        this.baccarat.cRPValidEndDate = this.moment(this.baccarat.cRPValidEndDate);
        if (this.baccarat.cRPDesc != null) {
            this.baccarat.cRPDesc = this.baccarat.cRPDesc.replace(/<br\/>/g, '\n');
        }
        this.baccarat.subInfo.forEach(function (item, i) {
            if (item.cRPDBackgroundAdd == '' || item.cRPDBackgroundAdd == null) {
            }
            else {
                item.uploadFile = {};
                item.uploadFile.data = item.cRPDBackgroundAdd;
            }
        });
    }
    before(start, end) {
        return moment(start).isBefore(end);
    }
    checkNum(data, target) {
        if (/^([1-9][0-9]{0,4}|100000)$/.test(data)) {
            target.numberError = 0;
        }
        else {
            target.numberError = 1;
        }
    }
    onSubmit() {
        let error = 0;
        if (!this.bsForm.valid) {
            this.bsForm.markAsTouched();
            return false;
        }
        if (this.baccarat.cRPName != null && _.trim(this.baccarat.cRPName) == '') {
            this.nameError = 1;
            return false;
        }
        else {
            this.nameError = 0;
        }
        if (this.before(this.baccarat.cRPValidEndDate, this.baccarat.cRPValidStartDate)) {
            this.timeError = 1;
            return false;
        }
        else {
            this.timeError = 0;
        }
        this.baccarat.subInfo.forEach(item => {
            this.checkNum(item.cRPDNum, item);
            if (item.numberError) {
                error += 1;
                return false;
            }
            if (_.trim(item.cRPDName) == '') {
                item.subNameError = 1;
                error += 1;
                return false;
            }
            else {
                item.subNameError = 0;
            }
        });
        if (error) {
            return false;
        }
        if (this.loading) {
            return false;
        }
        this.loading = 1;
        if (this.baccarat.cRPDesc != null) {
            this.baccarat.cRPDesc = this.baccarat.cRPDesc.replace(/[\n]/g, '<br/>');
        }
        this.bs.add(this.baccarat).subscribe(data => {
            this.loading = 0;
            if (data.error.state !== 0) {
                alert(data.error.msg);
                return;
            }
            alert('成功');
            this.toHome();
        }, error => { this.errorMessage = error; alert(error); this.loading = 0; });
    }
    onAddTotal(subinfo) {
        let data = {};
        data.cRPId = this.baccarat.cRPId;
        data.cRPDId = subinfo.cRPDId;
        data.fileName = this.baccarat.fileName;
        data.additionalNum = isNaN(+subinfo.additionalNum) ? 0 : +subinfo.additionalNum;
        if (data.additionalNum == 0) {
            subinfo.addTotaError = 1;
            return false;
        }
        else {
            subinfo.addTotaError = 0;
        }
        this.bs.addTotal(data).subscribe(data => {
            if (data.error.state !== 0) {
                alert(data.error.msg);
                return;
            }
            alert('新增成功');
            subinfo.cRPDNum += +subinfo.additionalNum;
            subinfo.additionalNum = '';
            // TimerWrapper.setTimeout(() => {
            //   tl.addStatus = 0;
            //   this.getTotalList();
            // }, 5000);
        }, error => this.handleError);
    }
    onEnterAddTotal(event, subinfo) {
        event.stopPropagation();
        if (event.keyCode == 13) {
            this.onAddTotal(subinfo);
        }
    }
    onAddSubInfo() {
        if (this.baccarat.subInfo.length > 7) {
            return;
        }
        this.baccarat.subInfo.push({});
    }
    onDeleteSubInfo(i) {
        this.baccarat.subInfo.splice(i, 1);
    }
    getTotal() {
        let total = 0;
        this.baccarat.subInfo.forEach(item => total += isNaN(+item.cRPDNum) ? 0 : +item.cRPDNum);
        return total || 0;
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
BaccaratAddComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'baccarat-add',
        templateUrl: 'template.html',
        styleUrls: ['style.min.css'],
        directives: [router_1.ROUTER_DIRECTIVES, common_1.FORM_DIRECTIVES, ng2_uploader_1.UPLOAD_DIRECTIVES, ng2_bootstrap_1.DATEPICKER_DIRECTIVES],
        providers: [Baccarat_service_1.BaccaratService, http_1.HTTP_PROVIDERS, http_2.JSONP_PROVIDERS],
        pipes: [Text_to_html_1.TextTohtmlPipe],
        host: {
            '(click)': 'closeDatePicker($event)'
        }
    }), 
    __metadata('design:paramtypes', [Baccarat_service_1.BaccaratService, router_1.Router, common_1.FormBuilder, router_1.RouteSegment])
], BaccaratAddComponent);
exports.BaccaratAddComponent = BaccaratAddComponent;
//# sourceMappingURL=/Users/worm/Documents/ng2-reward/tmp/broccoli_type_script_compiler-input_base_path-zwfUcOLy.tmp/0/tmp/broccoli_type_script_compiler-input_base_path-zwfUcOLy.tmp/0/src/reward/+baccarat/add/baccarat.add.component.js.map