import {Component, Input, Output} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, RouteSegment} from '@angular/router';
import {Http, Response, HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Jsonp, URLSearchParams, JSONP_PROVIDERS } from '@angular/http';
import { FORM_DIRECTIVES, ControlGroup, FormBuilder } from '@angular/common';
import * as moment from 'moment';
import * as _ from 'lodash';


import {ShowProgram, ShowService} from '../../../services/Show.service';
import {Validators} from '../../../services/Validators';

const URL = 'http://localhost:4500/ccs/medias/uploadBackgroundImage';


@Component({
    selector: 'show-add',
    templateUrl: 'reward/controllers/show/add/template.html',
    styleUrls: ['reward/controllers/show/add/style.css'],
    directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES],
    providers: [ShowService, HTTP_PROVIDERS, JSONP_PROVIDERS],
})


export class ShowAddComponent {
    psForm: ControlGroup;
    program: any;
    errorMessage: any;
    id: number;
    state: number;
    constructor(private ss: ShowService, private router: Router, fb: FormBuilder, params: RouteSegment) {
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
        //初始化数据
        this.program = new ShowProgram(null, 1, '', 1, '', 0, '', 0, '', 0, '', 0, 1, null, null);
    }

    ngOnInit() {
        this.getProgram();
    }
    //查询
    getProgram() {
        if (this.id === undefined || isNaN(this.id)) return;
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
        this.ss.add(this.program).subscribe(
            data => {
                if (data.error.state !== 0) {
                    alert(data.error.msg);
                    return;
                }
                alert('成功');
                this.toHome();
            },
            error => this.errorMessage = <any>error);
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
