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
const Show_service_1 = require('../Show.service');
const Validators_1 = require('../../services/Validators');
const Text_to_html_1 = require('../../pipe/Text.to.html');
const URL = config_1.baseUrl + '/medias/uploadBackgroundImage';
let ShowAddComponent = class ShowAddComponent {
    constructor(ss, router, fb, params) {
        this.ss = ss;
        this.router = router;
        this.uploadedFiles = [];
        this.options = {
            url: URL
        };
        this.basicProgress = 0;
        this.dateShow = 0;
        this.addTotaError = 0;
        this.zone = new core_1.NgZone({ enableLongStackTrace: false });
        this.id = +params.getParam('id'); //获取URL中的ID
        this.state = +params.getParam('state'); //获取URL中的状态
        //自定义from 验证规则
        this.psForm = fb.group({
            'cRTId': [params.getParam('id')],
            'cRPName': ['', Validators_1.Validators.required],
            'cRPRewardType': [1],
            'cRPSubtitle': [''],
            'cRPNameShow': [1],
            'cRPSubtitleShow': [0],
            'cRPBackgroundAdd': [''],
            'cRPBackgroundShow': [0],
            'cRPDesc': [''],
            'cRPDescShow': [0],
            'cRPValidStartDate': [''],
            'cRPValidEndDate': [''],
            'cRPValidType': [-1],
            'cRPRate': [1],
            'cRPRateContent': [''],
            'totalRewards': [''],
            'additionalNumControl': [''],
        });
        this.totalRewards = this.psForm.controls['totalRewards'];
        this.additionalNumControl = this.psForm.controls['additionalNumControl'];
        this.cRPRateContent = this.psForm.controls['cRPRateContent'];
        //初始化数据
        this.basicResp = {};
        this.program = new Show_service_1.ShowProgram(null, 1, '', 1, '', 0, '', 0, '', 0, 0, 1, null, null, moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));
    }
    onShowDate(event) {
        event.stopPropagation();
        this.dateShow = !this.dateShow;
    }
    onInitDate() {
        this.program.cRPValidStartDate = moment().format('YYYY-MM-DD');
        this.program.cRPValidEndDate = moment().format('YYYY-MM-DD');
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
        this.getProgram();
    }
    handleUpload(data) {
        if (data.size > 2 * 1024 * 1024) {
            this.uploadFile = { error: { state: 2, msg: '图片文件尺寸请小于2M' } };
        }
        else {
            if (data.response) {
                this.uploadFile = JSON.parse(data.response);
                this.program.cRPBackgroundAdd = this.uploadFile.data;
                this.basicResp = data;
            }
            this.zone.run(() => {
                this.basicProgress = data.progress.percent;
            });
        }
    }
    onDelImg() {
        this.program.cRPBackgroundAdd = '';
        this.basicProgress = 0;
        this.uploadFile = null;
    }
    getImg() {
        if (this.program.cRPBackgroundAdd && this.program.cRPBackgroundShow) {
            return 'url(\'/' + this.program.cRPBackgroundAdd + '\') no-repeat center center';
        }
    }
    //查询
    getProgram() {
        if (this.id === undefined || isNaN(this.id))
            return;
        this.ss.getOne(this.id).subscribe(data => this.setPsForm(data));
    }
    setPsForm(data) {
        this.program = data.data;
        this.program.cRPValidStartDate = this.moment(this.program.cRPValidStartDate);
        this.program.cRPValidEndDate = this.moment(this.program.cRPValidEndDate);
        if (this.program.cRPDesc != null) {
            this.program.cRPDesc = this.program.cRPDesc.replace(/<br\/>/g, '\n');
        }
        if (this.program.cRPBackgroundAdd == '' || this.program.cRPBackgroundAdd == null) {
        }
        else {
            this.uploadFile = {};
            this.uploadFile.data = this.program.cRPBackgroundAdd;
        }
    }
    onAddTotal(tl) {
        if (this.loading) {
            return false;
        }
        this.loading = 1;
        let data = {};
        data.cRPId = this.program.cRPId;
        data.cRPDId = this.program.subInfo[0].cRPDId;
        data.fileName = this.program.fileName;
        data.additionalNum = isNaN(+this.additionalNum) ? 0 : +this.additionalNum;
        if (data.additionalNum == 0) {
            this.addTotaError = 1;
            return false;
        }
        else {
            this.addTotaError = 0;
        }
        this.ss.addTotal(data).subscribe(data => {
            this.loading = 0;
            if (data.error.state !== 0) {
                alert(data.error.msg);
                return;
            }
            this.program.totalRewards += +this.additionalNum;
            this.additionalNum = null;
            alert('新增成功');
            // TimerWrapper.setTimeout(() => {
            //   tl.addStatus = 0;
            //   this.getTotalList();
            // }, 5000);
        }, error => this.handleError);
    }
    onEnterAddTotal(event, tl) {
        event.stopPropagation();
        if (event.keyCode == 13) {
            this.onAddTotal(tl);
        }
    }
    before(start, end) {
        return moment(start).isBefore(end);
    }
    onSubmit() {
        if (!this.psForm.valid) {
            this.psForm.markAsTouched();
            return false;
        }
        if (this.before(this.program.cRPValidEndDate, this.program.cRPValidStartDate)) {
            this.timeError = 1;
            return false;
        }
        else {
            this.timeError = 0;
        }
        if (this.loading) {
            return false;
        }
        this.loading = 1;
        if (this.program.cRPDesc != null) {
            this.program.cRPDesc = this.program.cRPDesc.replace(/[\n]/g, '<br/>');
        }
        this.ss.add(this.program).subscribe(data => {
            this.loading = 0;
            if (data.error.state !== 0) {
                alert(data.error.msg);
                return;
            }
            alert('成功');
            this.toHome();
        }, error => { this.errorMessage = error; this.loading = 0; });
    }
    handleError(error) {
        this.loading = 0;
        // In a real world app, we might use a remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    }
    //跳转首页
    toHome() {
        this.router.navigate(['/']);
    }
    //回退
    goBack() {
        window.history.back();
    }
};
ShowAddComponent = __decorate([
    core_1.Component({
        selector: 'show-add',
        templateUrl: 'reward/+show/add/template.html',
        styleUrls: ['reward/+show/add/style.css'],
        directives: [router_1.ROUTER_DIRECTIVES, common_1.FORM_DIRECTIVES, ng2_uploader_1.UPLOAD_DIRECTIVES, ng2_bootstrap_1.DATEPICKER_DIRECTIVES],
        providers: [Show_service_1.ShowService, http_1.HTTP_PROVIDERS, http_2.JSONP_PROVIDERS],
        pipes: [Text_to_html_1.TextTohtmlPipe],
        host: {
            '(click)': 'closeDatePicker($event)',
        }
    }), 
    __metadata('design:paramtypes', [Show_service_1.ShowService, router_1.Router, common_1.FormBuilder, router_1.RouteSegment])
], ShowAddComponent);
exports.ShowAddComponent = ShowAddComponent;
//# sourceMappingURL=/Users/worm/Documents/ng2-reward/tmp/broccoli_type_script_compiler-input_base_path-i45Tc3U5.tmp/0/tmp/broccoli_type_script_compiler-input_base_path-i45Tc3U5.tmp/0/src/reward/+show/add/show.add.component.js.map