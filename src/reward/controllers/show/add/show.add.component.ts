import {Component, Input, Output, NgZone} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, RouteSegment} from '@angular/router';
import {Http, Response, HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Jsonp, URLSearchParams, JSONP_PROVIDERS } from '@angular/http';
import { FORM_DIRECTIVES, ControlGroup, FormBuilder } from '@angular/common';
import * as moment from 'moment';
import * as _ from 'lodash';
import {UPLOAD_DIRECTIVES} from 'ng2-uploader/ng2-uploader';

import {baseUrl} from '../../../services/config';
import {ShowProgram, ShowService} from '../../../services/Show.service';
import {Validators} from '../../../services/Validators';
import {TextTohtmlPipe} from '../../../pipe/Text.to.html';

// const URL = baseUrl+'/medias/uploadprize';
const URL = baseUrl + '/medias/uploadBackgroundImage';


@Component({
    selector: 'show-add',
    templateUrl: 'reward/controllers/show/add/template.html',
    styleUrls: ['reward/controllers/show/add/style.css'],
    directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, UPLOAD_DIRECTIVES],
    providers: [ShowService, HTTP_PROVIDERS, JSONP_PROVIDERS],
    pipes: [TextTohtmlPipe]
})


export class ShowAddComponent {
    zone: NgZone;
    psForm: ControlGroup;
    program: any;
    errorMessage: any;
    id: number;
    state: number;
    loading: number;
    additionalNum: number;

    uploadedFiles: any[] = [];
    options: Object = {
        url: URL
    };
    basicProgress: number = 0;
    basicResp: Object;
    uploadFile: any;
    totalRewards: any;

    constructor(private ss: ShowService, private router: Router, fb: FormBuilder, params: RouteSegment) {
        this.zone = new NgZone({ enableLongStackTrace: false });
        this.id = +params.getParam('id'); //获取URL中的ID
        this.state = +params.getParam('state'); //获取URL中的状态
        //自定义from 验证规则
        this.psForm = fb.group({
            'cRTId': [params.getParam('id')],
            'cRPName': ['', Validators.required],
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
        this.totalRewards = this.psForm.controls['totalRewards'];
        //初始化数据
        this.basicResp = {};
        this.program = new ShowProgram(null, 1, '', 1, '', 0, '', 0, '', 0, '', 0, 1, null, null);
    }

    moment(date) {
        return moment(date).format('YYYY-MM-DD');
    }

    ngOnInit() {
        this.getProgram();
    }


    handleUpload(data): void {
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
        if (this.id === undefined || isNaN(this.id)) return;
        this.ss.getOne(this.id).subscribe(data => this.setPsForm(data));
    }

    setPsForm(data) {
        this.program = data.data;
        this.program.cRPValidStartDate = this.moment(this.program.cRPValidStartDate);
        this.program.cRPValidEndDate = this.moment(this.program.cRPValidEndDate);

    }

    onAddTotal() {
        let data:any = {};
        data.cRPId = this.program.cRPId;
        data.cRPDId = this.program.cRPId;
        data.fileName = this.program.fileName;
        data.additionalNum = +this.additionalNum;
        this.ss.addTotal(data).subscribe(data => {
          alert('追加成功');
          this.program.totalRewards += +this.additionalNum;
            // TimerWrapper.setTimeout(() => {
            //   tl.addStatus = 0;
            //   this.getTotalList();
            // }, 5000);
        }, error => this.handleError);
    }
    onEnterAddTotal(event) {
        if (event.keyCode == 13) {
            this.onAddTotal();
        }
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
        this.ss.add(this.program).subscribe(
            data => {
                this.loading = 0;
                if (data.error.state !== 0) {
                    alert(data.error.msg);
                    return;
                }
                alert('成功');
                this.toHome();
            },
            error => { this.errorMessage = <any>error; this.loading = 0 });
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    //跳转首页
    toHome() {
        this.router.navigate(['/']);
    }
    //回退
    goBack() {
        window.history.back();
    }
}
