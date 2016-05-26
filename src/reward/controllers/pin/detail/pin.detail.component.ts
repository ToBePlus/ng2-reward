import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, RouteSegment} from '@angular/router';
import {Http, Response, HTTP_PROVIDERS, URLSearchParams } from '@angular/http';
import {TimerWrapper} from '@angular/core/src/facade/async';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import * as _ from 'lodash';
import {baseUrl} from '../../../services/config';
import { PAGINATION_DIRECTIVES, DATEPICKER_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';



import {PinProgram, PinService, PinParams} from '../../../services/Pin.service';
import {Validators} from '../../../services/Validators';

const URL = baseUrl + '/ccs/medias/uploadBackgroundImage';

const downLoadBase = baseUrl + '/rewardManage/check/export';

@Component({
    selector: 'pin-detail',
    templateUrl: 'reward/controllers/pin/detail/template.html',
    styleUrls: ['reward/controllers/pin/detail/style.min.css'],
    directives: [PAGINATION_DIRECTIVES, DATEPICKER_DIRECTIVES, ROUTER_DIRECTIVES],
    providers: [PinService, HTTP_PROVIDERS],
    host: {
        '(click)': 'closeDatePicker($event)'
    }
})

export class PinDetailComponent {
    errorMessage: any;
    id: number;
    state: number;
    showDetail: any;
    projectsParams: any;
    prizesParams: any;
    info: any;
    totalList: any;
    projectsList: any;
    curProjectsList: any;
    pinList: any;
    page: any;

    currentPage: number = 0;
    pageSize: number = 10;
    pageCount: number = 0;

    dateShow: any = 0;

    constructor(private ps: PinService, private router: Router, params: RouteSegment) {
        this.id = +params.getParam('id'); //获取URL中的ID
        this.state = +params.getParam('state'); //获取URL中的状态
        this.projectsParams = {};
        this.projectsParams.cRPId = this.id;
        this.projectsParams.queryType = 1;
        this.prizesParams = {};
        this.prizesParams.cRPId = this.id;
        this.prizesParams.sendStatus = 0;
        this.prizesParams.verifyStatus = 0;
        // this.prizesParams.projectId = 0;
        this.prizesParams.currentPage = 0;
        this.prizesParams.pageSize = 10;
        this.prizesParams.startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
        this.prizesParams.endDate = moment().format('YYYY-MM-DD');
        this.prizesParams.endDate = moment().format('YYYY-MM-DD');
        this.prizesParams.rangeDate = this.prizesParams.startDate + '~' + this.prizesParams.endDate;
        this.prizesParams.range = -1;
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
        return moment(date).format('YYYY-MM-DD');
    }

    onSetRange(range) {
        this.prizesParams.range = range;
        if (range < 91) {
            this.prizesParams.startDate = moment().subtract(range, 'days').format('YYYY-MM-DD');
            this.prizesParams.endDate = moment().format('YYYY-MM-DD');
        } else if (range === 'currentYear') {
            this.prizesParams.startDate = moment().startOf('year').format('YYYY-MM-DD');
            this.prizesParams.endDate = moment().endOf('year').format('YYYY-MM-DD');
        } else if (range === 'nextYear') {
            this.prizesParams.startDate = moment().add(1, 'y').startOf('year').format('YYYY-MM-DD');
            this.prizesParams.endDate = moment().add(1, 'y').endOf('year').format('YYYY-MM-DD');
        }
    }


    pageChanged(event) {
        console.log(event);
    }

    onDownload() {
        let search = new URLSearchParams();
        let status = '0';
        if(this.prizesParams.sendStatus==2){
          if(this.prizesParams.verifyStatus==2){
            status = '2';
          } else {
            status = '1';
          }
        }
        search.set('cRPId', this.prizesParams.cRPId);
        search.set('cRPDId', this.prizesParams.cRPId);
        search.set('cRPStatus', status);
        search.set('startDate', this.prizesParams.startDate);
        search.set('endDate', this.prizesParams.endDate);
        search.set('projectId', this.prizesParams.projectId);
        return downLoadBase+'?'+ search;
    }

    onDoneDownload(dId) {
        let search = new URLSearchParams();
        search.set('cRPId', this.prizesParams.cRPId);
        search.set('cRPDId', dId);
        search.set('cRPStatus', '1');
        return downLoadBase+'?'+ search;
    }

    onExchangeDownload(dId) {
        let search = new URLSearchParams();
        search.set('cRPId', this.prizesParams.cRPId);
        search.set('cRPDId', dId);
        search.set('cRPStatus', '2');
        return downLoadBase+'?'+ search;
    }

    onSearch() {
        this.search();
    }

    onDelete() {
        if(!confirm('是否删除该奖励?')){
          return;
        }
        this.ps.delete(this.id).subscribe(data => {
            if (this.errorAlert(data)) {
                this.toHome();
            }
        }, error => this.handleError);
    }

    onState() {
      if(!confirm('是否变更该奖励状态?')){
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
        this.ps.pinList(this.prizesParams).subscribe(data => {
            if (this.errorAlert(data)) {
                this.pinList = data.data;
                this.prizesParams = data.param;
                this.prizesParams.range = -1;
                this.currentPage= +this.prizesParams.currentPage;
                this.pageSize=+this.prizesParams.pageSize;
                this.pageCount=+this.prizesParams.pageCount;
            }
        }, error => this.handleError);
    }

    onAddTotal(tl) {
        tl.additionalNum = +tl.additionalNum;
        this.ps.addTotal(tl).subscribe(data => {
            if (data.error.state !== 0) {
                tl.addStatus = 2;
            } else {
                tl.addTotalShow = 0;
                tl.addStatus = 1;
            }
            TimerWrapper.setTimeout(() => {
                tl.addStatus = 0;
                this.getTotalList();
            }, 5000);
        }, error => this.handleError);
    }
    onEnterAddTotal(event, data) {
        if (event.keyCode == 13) {
            this.onAddTotal(data);
        }
    }


    errorAlert(data) {
        if (data.error.state !== 0) {
            alert(data.error.msg);
            return false;
        }
        return true;
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
