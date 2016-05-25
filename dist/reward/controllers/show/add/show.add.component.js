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
const http_2 = require('@angular/http');
const common_1 = require('@angular/common');
const moment = require('moment');
const ng2_uploader_1 = require('ng2-uploader/ng2-uploader');
const config_1 = require('../../../services/config');
const Show_service_1 = require('../../../services/Show.service');
const Validators_1 = require('../../../services/Validators');
// const URL = baseUrl+'/medias/uploadprize';
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
            'cRPValidStartDate': [moment().format('YYYY-MM-DD')],
            'cRPValidEndDate': [moment().format('YYYY-MM-DD')],
            'cRPValidType': [-1],
            'cRPRate': [1],
            'cRPRateContent': [''],
            'totalRewards': [''],
        });
        //初始化数据
        this.basicResp = {};
        this.program = new Show_service_1.ShowProgram(null, 1, '', 1, '', 0, '', 0, '', 0, '', 0, 1, null, null);
    }
    ngOnInit() {
        this.getProgram();
    }
    handleUpload(data) {
        if (data.response) {
            this.uploadFile = JSON.parse(data.response);
            this.program.cRPBackgroundAdd = this.uploadFile.data;
            this.basicResp = data;
        }
        this.zone.run(() => {
            this.basicProgress = data.progress.percent;
        });
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
    }
    onSubmit() {
        if (!this.psForm.valid) {
            this.psForm.markAsTouched();
            return false;
        }
        if (this.loading) {
            return false;
        }
        this.loading = 1;
        this.ss.add(this.program).subscribe(data => {
            if (data.error.state !== 0) {
                alert(data.error.msg);
                return;
            }
            alert('成功');
            this.toHome();
            this.loading = 0;
        }, error => { this.errorMessage = error; this.loading = 0; });
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
        templateUrl: 'reward/controllers/show/add/template.html',
        styleUrls: ['reward/controllers/show/add/style.css'],
        directives: [router_1.ROUTER_DIRECTIVES, common_1.FORM_DIRECTIVES, ng2_uploader_1.UPLOAD_DIRECTIVES],
        providers: [Show_service_1.ShowService, http_1.HTTP_PROVIDERS, http_2.JSONP_PROVIDERS],
    }), 
    __metadata('design:paramtypes', [Show_service_1.ShowService, router_1.Router, common_1.FormBuilder, router_1.RouteSegment])
], ShowAddComponent);
exports.ShowAddComponent = ShowAddComponent;
//# sourceMappingURL=/Users/worm/Documents/ng2-reward/tmp/broccoli_type_script_compiler-input_base_path-lKJx3Ehh.tmp/0/tmp/broccoli_type_script_compiler-input_base_path-lKJx3Ehh.tmp/0/src/reward/controllers/show/add/show.add.component.js.map