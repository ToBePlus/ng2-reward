import {Component, Input, Output, NgZone} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, RouteSegment} from '@angular/router';
import {Http, Response, HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Jsonp, URLSearchParams, JSONP_PROVIDERS } from '@angular/http';
import { FORM_DIRECTIVES, ControlGroup, FormBuilder } from '@angular/common';
import * as moment from 'moment';
import {UPLOAD_DIRECTIVES} from 'ng2-uploader/ng2-uploader';

import {baseUrl} from '../../services/config';
import { BaccaratService } from '../Baccarat.service';
import {Validators} from '../../services/Validators';
import { PAGINATION_DIRECTIVES, DATEPICKER_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';

const URL = baseUrl + '/medias/uploadBackgroundImage';
const FILE_URL = baseUrl+'/rewardManage/uploadCheckCode';

@Component({
    selector: 'baccarat-add',
    templateUrl: 'reward/+baccarat/add/template.html',
    styleUrls: ['reward/+baccarat/add/style.min.css'],
    directives: [ROUTER_DIRECTIVES, FORM_DIRECTIVES, UPLOAD_DIRECTIVES,DATEPICKER_DIRECTIVES],
    providers: [BaccaratService, HTTP_PROVIDERS, JSONP_PROVIDERS],
    host: {
        '(click)': 'closeDatePicker($event)'
    }
})

export class BaccaratAddComponent {
    zone: NgZone;
    bsForm: ControlGroup;
    subForm: ControlGroup;
    baccarat: any;
    errorMessage: any;
    id: number;
    loading: number;

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

    dateShow:any;
    currentPage:any;

    constructor(private bs: BaccaratService, private router: Router, fb: FormBuilder, params: RouteSegment) {
        this.zone = new NgZone({ enableLongStackTrace: false });
        this.id = +params.getParam('id');
        this.subForm = fb.group({
            'cRPDName': ['', Validators.required],
            'cRPDSubtitle': [''],
            'cRPDNum': [''],
            'cRPBackgroundShow': [0],
            'cRPDBackgroundAdd': [''],
        });
        this.bsForm = fb.group({
            'cRPName': ['', Validators.required],
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
        this.baccarat.cRPNoticeNowContent = '奖励领取验证码888888，恭喜您获得由{品牌名}提供的的{奖品名称}一份，有效期{生效日期}至{失效日期}'
        this.baccarat.cRPValidNoticeContent = '奖励领取验证码888888，您获得的由{品牌名}提供的的{奖品名称}将在{失效日}到期，请及时兑换。'
        this.baccarat.cRPValidStartDate = moment().format('YYYY-MM-DD');
        this.baccarat.cRPValidEndDate = moment().add(7, 'days').format('YYYY-MM-DD');
        this.baccarat.range = -1;

        this.baccarat.subInfo = [{}, {}, {}];

        this.getPinProgram();
    }

    onShowDate(event) {
        event.stopPropagation();
        this.dateShow = !this.dateShow;
    }

    public closeDatePicker(event) {
        event.stopPropagation();
        this.dateShow = 0;
    }

    public setPage(pageNo: number): void {
        this.currentPage = pageNo;
    };

    moment(date) {
      if (date == null) return '';
        return moment(date).format('YYYY-MM-DD');
    }

    onSetRange(range) {
        this.baccarat.range = range;
        if (range < 91) {
            this.baccarat.cRPValidStartDate = moment().subtract(range, 'days').format('YYYY-MM-DD');
            this.baccarat.cRPValidEndDate = moment().format('YYYY-MM-DD');
        } else if (range === 'currentYear') {
            this.baccarat.cRPValidStartDate = moment().startOf('year').format('YYYY-MM-DD');
            this.baccarat.cRPValidEndDate = moment().endOf('year').format('YYYY-MM-DD');
        } else if (range === 'nextYear') {
            this.baccarat.cRPValidStartDate = moment().add(1, 'y').startOf('year').format('YYYY-MM-DD');
            this.baccarat.cRPValidEndDate = moment().add(1, 'y').endOf('year').format('YYYY-MM-DD');
        }
    }

    handleBasicUpload(data, index): void {
        let sb = this.baccarat.subInfo[index];
        if (data && data.response) {
            sb.uploadFile = JSON.parse(data.response);
            sb.cRPBackgroundAdd = sb.uploadFile.data;
        }
        sb.basicResp = data;
        this.zone.run(() => {
            sb.basicProgress = data.progress.percent;
        });
    }

    handleFileUpload(data): void {
      if (data.response) {
        this.uploadFileXls = JSON.parse(data.response);
        if(this.uploadFileXls.error.state===0){
          this.baccarat.fileName = this.uploadFileXls.data.filePath;
        }
        this.fileResp = data;
      }
      this.zone.run(() => {
          this.fileProgress = data.progress.percent;
      });
    }

    onDelFileName(){
      this.baccarat.fileName='';
      this.fileProgress=0;
      this.uploadFileXls = {};
    }


    getPinProgram() {
        if (this.id === undefined || isNaN(this.id)) return;
        this.bs.getOne(this.id).subscribe(data => this.setPsForm(data));
    }

    setPsForm(data) {
        this.baccarat = data.data;
        this.baccarat.cRPValidStartDate = this.moment(this.baccarat.cRPValidStartDate);
        this.baccarat.cRPValidEndDate = this.moment(this.baccarat.cRPValidEndDate);
    }

    onSubmit() {
        if (!this.bsForm.valid) {
            this.bsForm.markAsTouched();
            return false;
        }
        if (this.loading) {
            return false;
        }
        this.loading = 1;
        this.bs.add(this.baccarat).subscribe(data => {
            this.loading = 0;
            if (data.error.state !== 0) {
                alert(data.error.msg);
                return;
            }
            alert('成功');
            this.toHome();
        },
            error => { this.errorMessage = <any>error; alert(error); this.loading = 0; });
    }

    onAddTotal(subinfo) {
        let data:any = {};
        data.cRPId = this.baccarat.cRPId;
        data.cRPDId = subinfo.cRPDId;
        data.fileName = this.baccarat.fileName;
        data.additionalNum = +subinfo.additionalNum;
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
    onEnterAddTotal(event,subinfo) {
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

    onDeleteSubInfo(i){
      this.baccarat.subInfo.splice(i,1);
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg = error.message || 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    toHome() {
        this.router.navigate(['/']);
    }
    goBack() {
        window.history.back();
    }
}
