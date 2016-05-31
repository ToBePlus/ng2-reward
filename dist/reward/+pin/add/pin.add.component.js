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
const ng2_uploader_1 = require('ng2-uploader/ng2-uploader');
const ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
const config_1 = require('../../services/config');
const Pin_service_1 = require('../Pin.service');
const Validators_1 = require('../../services/Validators');
const Text_to_html_1 = require('../../pipe/Text.to.html');
const URL = config_1.baseUrl + '/medias/uploadBackgroundImage';
const FILE_URL = config_1.baseUrl + '/rewardManage/uploadCheckCode';
let PinAddComponent = class PinAddComponent {
    constructor(ps, router, fb, params) {
        this.ps = ps;
        this.router = router;
        this.options = {
            url: URL
        };
        this.basicProgress = 0;
        this.fileOptions = {
            url: FILE_URL
        };
        this.fileProgress = 0;
        this.dateShow = 0;
        this.additionalNumError = 0;
        this.cRPRateContent = 0;
        this.timeError = 0;
        this.totalRewardsError = 0;
        this.zone = new core_1.NgZone({ enableLongStackTrace: false });
        this.id = +params.getParam('id');
        this.psForm = fb.group({
            'cRPName': ['', Validators_1.Validators.required],
            'cRPRewardType': [2],
            'cRPSubtitle': [''],
            'cRPNameShow': [1],
            'cRPSubtitleShow': [0],
            'cRPBackgroundAdd': [''],
            'cRPBackgroundShow': [0],
            'cRPDesc': [''],
            'cRPDescShow': [0],
            // 'cRPValidDate': [moment().format('YYYY-MM-DD') + '-' + moment().format('YYYY-MM-DD')],
            // 'cRPValidStartDate': [moment().format('YYYY-MM-DD')],
            // 'cRPValidEndDate': [moment().format('YYYY-MM-DD')],
            'cRPValidType': [-1],
            'cRPRate': [1],
            'cRPRateContent': ['', Validators_1.Validators.ratio],
            'totalRewards': [''],
            'additionalNumControl': [''],
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
        this.totalRewards = this.psForm.controls['totalRewards'];
        this.additionalNumControl = this.psForm.controls['additionalNumControl'];
        this.cRPRateContent = this.psForm.controls['cRPRateContent'];
        this.pinProgram = {};
        this.pinProgram.cRPName = '';
        this.pinProgram.cRPSubtitle = '';
        this.pinProgram.cRPNameShow = 1;
        this.pinProgram.cRPSubtitleShow = 0;
        this.pinProgram.cRPBackgroundAdd = '';
        this.pinProgram.cRPBackgroundShow = 0;
        this.pinProgram.cRPDesc = '';
        this.pinProgram.cRPDescShow = 0;
        this.pinProgram.cRPValidType = -1;
        this.pinProgram.cRPRate = 1;
        this.pinProgram.cRPRateContent = null;
        this.pinProgram.totalRewards = null;
        this.pinProgram.cRPCodeType = 1;
        this.pinProgram.cRPCodeCommon = '';
        this.pinProgram.cRPGenerateType = 1;
        this.pinProgram.cRPNoticeNow = 1;
        this.pinProgram.cRPNoticeNowContent = '奖励领取验证码{验证码}，恭喜您获得由{品牌名}提供的的{奖品名称}一份，有效期{生效日期}至{失效日期}。';
        this.pinProgram.cRPValidNotice = 1;
        this.pinProgram.cRPValidNoticeDay = 3;
        this.pinProgram.cRPValidNoticeContent = '奖励领取验证码{验证码}，您获得的由{品牌名}提供的的{奖品名称}将在{失效日}到期，请及时兑换。';
        this.pinProgram.cRPValidStartDate = moment().format('YYYY-MM-DD');
        this.pinProgram.cRPValidEndDate = moment().format('YYYY-MM-DD');
    }
    onShowDate(event) {
        event.stopPropagation();
        this.dateShow = !this.dateShow;
    }
    closeDatePicker(event) {
        event.stopPropagation();
        this.dateShow = 0;
    }
    moment(date) {
        if (date == null)
            return '';
        return moment(date).format('YYYY-MM-DD');
    }
    momentDate(date) {
        return moment(date).toDate();
    }
    ngOnInit() {
        this.getPinProgram();
    }
    getPinProgram() {
        if (this.id === undefined || isNaN(this.id))
            return;
        this.ps.getOne(this.id).subscribe(data => this.setPsForm(data));
    }
    setPsForm(data) {
        this.pinProgram = data.data;
        this.pinProgram.cRPValidStartDate = this.moment(this.pinProgram.cRPValidStartDate);
        this.pinProgram.cRPValidEndDate = this.moment(this.pinProgram.cRPValidEndDate);
        if (this.pinProgram.cRPDesc != null) {
            this.pinProgram.cRPDesc = this.pinProgram.cRPDesc.replace(/<br\/>/g, '\n');
        }
        if (this.pinProgram.cRPBackgroundAdd != '') {
            this.uploadFile = {};
            this.uploadFile.data = this.pinProgram.cRPBackgroundAdd;
        }
    }
    handleUpload(data) {
        if (data.size > 2 * 1024 * 1024) {
            this.uploadFile = { error: { state: 2, msg: '图片文件尺寸请小于2M' } };
        }
        else {
            if (data.response) {
                this.uploadFile = JSON.parse(data.response);
                this.pinProgram.cRPBackgroundAdd = this.uploadFile.data;
                this.basicResp = data;
            }
            this.zone.run(() => {
                this.basicProgress = data.progress.percent;
            });
        }
    }
    handleFileUpload(data) {
        if (data.size > 2 * 1024 * 1024) {
            this.uploadFile = { error: { state: 2, msg: '图片文件尺寸请小于2M' } };
        }
        else {
            if (data.response) {
                this.uploadFileXls = JSON.parse(data.response);
                if (this.uploadFileXls.error.state === 0) {
                    this.pinProgram.fileName = this.uploadFileXls.data.filePath;
                }
                this.fileResp = data;
                this.fileProgress = 0;
            }
            this.zone.run(() => {
                this.fileProgress = data.progress.percent;
            });
        }
    }
    onDelFileName() {
        this.pinProgram.fileName = '';
        this.fileProgress = 0;
        this.uploadFileXls = null;
    }
    onDelImg() {
        this.pinProgram.cRPBackgroundAdd = '';
        this.basicProgress = 0;
        this.uploadFile = null;
    }
    getImg() {
        if (this.pinProgram.cRPBackgroundAdd && this.pinProgram.cRPBackgroundShow) {
            return 'url(\'/' + this.pinProgram.cRPBackgroundAdd + '\') no-repeat center center';
        }
    }
    onAddTotal() {
        if (this.loading) {
            return false;
        }
        if (this.checkTotal(this.additionalNum)) {
            this.loading = 0;
            return false;
        }
        this.loading = 1;
        let data = {};
        data.cRPId = this.pinProgram.cRPId;
        data.cRPDId = this.pinProgram.subInfo[0].cRPDId;
        data.fileName = this.pinProgram.fileName;
        data.additionalNum = +this.additionalNum;
        this.ps.addTotal(data).subscribe(data => {
            this.loading = 0;
            if (data.error.state !== 0) {
                alert(data.error.msg);
                return;
            }
            alert('新增成功');
            this.pinProgram.totalRewards += +this.additionalNum;
            this.additionalNum = null;
            // TimerWrapper.setTimeout(() => {
            //   tl.addStatus = 0;
            //   this.getTotalList();
            // }, 5000);
        }, error => this.handleError);
    }
    onEnterAddTotal(event) {
        event.stopPropagation();
        if (event.keyCode == 13) {
            this.onAddTotal();
        }
    }
    checkTotal(additionalNum) {
        if (additionalNum === '') {
            this.additionalNumError = 1;
            return true;
        }
        if (!/^([1-9][0-9]{0,4}|100000)$/.test(additionalNum)) {
            this.additionalNumError = 1;
            return true;
        }
        this.additionalNumError = 0;
        return false;
    }
    before(start, end) {
        return moment(start).isBefore(end);
    }
    onSubmit() {
        if (!this.psForm.valid) {
            this.psForm.markAsTouched();
            return false;
        }
        if (this.before(this.pinProgram.cRPValidEndDate, this.pinProgram.cRPValidStartDate)) {
            this.timeError = 1;
            return false;
        }
        else {
            this.timeError = 0;
        }
        if (this.pinProgram.cRPGenerateType == 1 && this.pinProgram.totalRewards == null) {
            this.totalRewardsError = 1;
            return false;
        }
        else {
            this.totalRewardsError = 0;
        }
        if (this.loading) {
            return false;
        }
        this.loading = 1;
        if (this.pinProgram.cRPDesc != null) {
            this.pinProgram.cRPDesc = this.pinProgram.cRPDesc.replace(/[.\n]/g, '<br/>');
        }
        this.ps.add(this.pinProgram).subscribe(data => {
            this.loading = 0;
            if (data.error.state !== 0) {
                alert(data.error.msg);
                return;
            }
            alert('成功');
            this.toHome();
        }, error => { this.errorMessage = error; alert(error); this.loading = 0; });
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
PinAddComponent = __decorate([
    core_1.Component({
        selector: 'pin-add',
        templateUrl: 'reward/+pin/add/template.html',
        styleUrls: ['reward/+pin/add/style.css'],
        directives: [router_1.ROUTER_DIRECTIVES, common_1.FORM_DIRECTIVES, ng2_uploader_1.UPLOAD_DIRECTIVES, ng2_bootstrap_1.DATEPICKER_DIRECTIVES],
        providers: [Pin_service_1.PinService, http_1.HTTP_PROVIDERS, http_2.JSONP_PROVIDERS],
        pipes: [Text_to_html_1.TextTohtmlPipe],
        host: {
            '(click)': 'closeDatePicker($event)'
        }
    }), 
    __metadata('design:paramtypes', [Pin_service_1.PinService, router_1.Router, common_1.FormBuilder, router_1.RouteSegment])
], PinAddComponent);
exports.PinAddComponent = PinAddComponent;
//# sourceMappingURL=/Users/worm/Documents/ng2-reward/tmp/broccoli_type_script_compiler-input_base_path-h9Awj8FX.tmp/0/tmp/broccoli_type_script_compiler-input_base_path-h9Awj8FX.tmp/0/src/reward/+pin/add/pin.add.component.js.map