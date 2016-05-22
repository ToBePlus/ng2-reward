import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, RouteSegment} from '@angular/router';
import {Http, Response, HTTP_PROVIDERS, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import * as _ from 'lodash';


import {PinProgram, PinService,PinParams} from '../../../services/Pin.service';
import {Validators} from '../../../services/Validators';

const URL = 'http://localhost:4500/ccs/medias/uploadBackgroundImage';
// const URL = 'http://192.168.1.146:8080/medias/uploadBackgroundImage';

const downLoadBase = 'http://localhost:4500/ccs/rewardManage/show/export';

@Component({
    selector: 'pin-detail',
    templateUrl: 'reward/controllers/pin/detail/template.html',
    styleUrls: ['reward/controllers/pin/detail/style.min.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [PinService, HTTP_PROVIDERS],
})


export class BaccaratPinDetailComponent {
    errorMessage: any;
    id: number;
    state: number;
    showDetail: any;
    projectsParams: any;
    prizesParams: PinParams;
    info: any;
    totalList: any;
    projectsList: any;
    curProjectsList: any;
    pinList: any;
    page: any;

    constructor(private ps: PinService, private router: Router, params: RouteSegment) {
        this.id = +params.getParam('id'); //获取URL中的ID
        this.state = +params.getParam('state'); //获取URL中的状态
        this.projectsParams = {};
        this.projectsParams.cRPId = this.id;
        this.projectsParams.queryType = 1;
        this.prizesParams = new PinParams();
        this.prizesParams.cRPId = 18;
        // this.prizesParams.projectId = 0;
        this.prizesParams.currentPage = 0;
        this.prizesParams.pageSize = 10;
        this.prizesParams.startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
        this.prizesParams.endDate = moment().format('YYYY-MM-DD');
    }

    onDownload() {
        let search = new URLSearchParams();
        search.set('cRPId', this.prizesParams.cRPId+'');
        search.set('startDate', this.prizesParams.startDate);
        search.set('endDate', this.prizesParams.endDate);
        search.set('projectId', this.prizesParams.projectId+'');
        return downLoadBase + search;
    }

    onSearch() {
        this.search();
    }

    onDelete() {
        this.ps.delete(this.id).subscribe(data => {
            if (this.errorAlert(data)) {
                this.toHome();
            }
        }, error => this.handleError);
    }

    onState() {
        this.ps.putState(this.id, this.state === 1 ? 2 : 1).subscribe(data => {
            if (this.errorAlert(data)) {
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
                this.curProjectsList = data.data.filter(data => data.cPStatus === '2');
                if (this.projectsList.length > 0 && this.prizesParams.projectId === undefined) {
                    this.prizesParams.projectId = this.projectsList[0].cPId;
                }
                this.search();
            }
        }, error => this.handleError);
    }

    search() {
        if (this.prizesParams.projectId === undefined) {
            alert('没有项目');
            return;
        }
        this.ps.pinList(this.prizesParams).subscribe(data => {
            if (this.errorAlert(data)) {
                this.pinList = data.data.list;
                this.page = data.data.page;
                this.prizesParams = data.param;
            }
        }, error => this.handleError);
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
