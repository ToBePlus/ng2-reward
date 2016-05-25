import {Component, Input, Output,NgZone} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, RouteSegment} from '@angular/router';
import {Http, Response, HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Jsonp, URLSearchParams, JSONP_PROVIDERS } from '@angular/http';
import { FORM_DIRECTIVES, ControlGroup, FormBuilder } from '@angular/common';
import * as moment from 'moment';
import {UPLOAD_DIRECTIVES} from 'ng2-uploader/ng2-uploader';

import {baseUrl} from '../../../services/config';
import {PinProgram, PinService} from '../../../services/Pin.service';
import {Validators} from '../../../services/Validators';

const URL = baseUrl+'/medias/uploadBackgroundImage';

const FILE_URL = baseUrl+'/rewardManage/uploadCheckCode';


@Component({
    selector: 'pin-add',
    templateUrl: 'reward/controllers/pin/add/template.html',
    styleUrls: ['reward/controllers/pin/add/style.css'],
    directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES,UPLOAD_DIRECTIVES],
    providers: [PinService, HTTP_PROVIDERS, JSONP_PROVIDERS],
})

export class PinAddComponent {
    zone: NgZone;
    psForm: ControlGroup;
    pinProgram: PinProgram;
    errorMessage: any;
    id: number;

    options: Object = {
        url: URL
    };
    basicProgress: number = 0;
    basicResp: Object;
    uploadFile: any;

    fileOptions: Object = {
        url: FILE_URL
    };
    fileProgress: number = 0;
    fileResp: Object;

    uploadFileXls: any;
    constructor(private ps: PinService, private router: Router, fb: FormBuilder, params: RouteSegment) {
        this.zone = new NgZone({ enableLongStackTrace: false });
        this.id = +params.getParam('id');
        this.psForm = fb.group({
            'cRPName': ['', Validators.required],
            'cRPRewardType': [2],
            'cRPSubtitle': [''],
            'cRPNameShow': [1],
            'cRPSubtitleShow': [0],
            'cRPBackgroundAdd': [''],
            'cRPBackgroundShow': [0],
            'cRPDesc': [''],
            'cRPDescShow': [0],
            'cRPValidDate': [moment().format('YYYY-MM-DD') + '-' + moment().format('YYYY-MM-DD')],
            'cRPValidStartDate': [moment().format('YYYY-MM-DD')],
            'cRPValidEndDate': [moment().format('YYYY-MM-DD')],
            'cRPValidType': [-1],
            'cRPRate': [1],
            'cRPRateContent': ['', Validators.ratio],
            'totalRewards': [''],
            'cRPCodeType': [1],
            'cRPCodeCommon': [''],
            'cRPGenerateType': [1],
            'fileName': [''],
            'cRPNoticeNow': [1],
            'cRPNoticeNowContent': ['奖励领取验证码888888，恭喜您获得由{品牌名}提供的的{奖品名称}一份，有效期{生效日期}至{失效日期}。'],
            'cRPValidNotice': [1],
            'cRPValidNoticeDay': [3],
            'cRPValidNoticeContent': ['奖励领取验证码888888，您获得的由{品牌名}提供的的{奖品名称}将在{失效日}到期，请及时兑换。'],
        });
        this.pinProgram = new PinProgram(null, 2, '', 1, '', 0, '', 0, '', 0, moment().format('YYYY-MM-DD') + '-' + moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'), 0, 1, '', null, 1, '', 1, '', 0, '奖励领取验证码888888，恭喜您获得由{品牌名}提供的的{奖品名称}一份，有效期{生效日期}至{失效日期}。', 0, '3', '奖励领取验证码888888，您获得的由{品牌名}提供的的{奖品名称}将在{失效日}到期，请及时兑换。');
    }

    ngOnInit() {
        this.getPinProgram();
    }

    getPinProgram() {
        if (this.id === undefined || isNaN(this.id)) return;
        this.ps.getOne(this.id).subscribe(data => this.setPsForm(data));
    }

    setPsForm(data) {
        this.pinProgram = data.data;
    }

    handleUpload(data): void {
      if (data.response) {
        this.uploadFile = JSON.parse(data.response);
        this.pinProgram.cRPBackgroundAdd = this.uploadFile.data;
        this.basicResp = data;
      }
      this.zone.run(() => {
          this.basicProgress = data.progress.percent;
      });
    }

    handleFileUpload(data): void {
      if (data.response) {
        this.uploadFileXls = JSON.parse(data.response);
        this.pinProgram.cRPBackgroundAdd = this.uploadFileXls.data;
        this.fileResp = data;
      }
      this.zone.run(() => {
          this.fileProgress = data.progress.percent;
      });
    }

    getImg(){
      if(this.pinProgram.cRPBackgroundAdd&&this.pinProgram.cRPBackgroundShow){
        return 'url(\'/'+this.pinProgram.cRPBackgroundAdd+'\') no-repeat center center';
      }
    }


    onSubmit() {
        if (!this.psForm.valid) {
            this.psForm.markAsTouched();
            return false;
        }
        this.ps.add(this.pinProgram).subscribe(data => {
            if (data.error.state !== 0) {
                alert(data.error.msg);
                return;
            }
            alert('成功');
            this.toHome();
        },
            error => { this.errorMessage = <any>error; alert(error) });
    }

    toHome() {
        this.router.navigate(['/']);
    }
    goBack() {
        window.history.back();
    }
}
