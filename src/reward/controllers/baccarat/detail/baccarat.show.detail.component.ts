import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router, RouteSegment} from '@angular/router';
import {Http, Response, HTTP_PROVIDERS, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import * as _ from 'lodash';


import {ShowProgram, ShowService} from '../../../services/Show.service';
import {Validators} from '../../../services/Validators';

const URL = 'http://localhost:4500/ccs/medias/uploadBackgroundImage';
// const URL = 'http://192.168.1.146:8080/medias/uploadBackgroundImage';

const downLoadBase = 'http://localhost:4500/ccs/rewardManage/show/export';

@Component({
    selector: 'show-detail',
    templateUrl: 'reward/controllers/show/detail/template.html',
    styleUrls: ['reward/controllers/show/detail/style.min.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [ShowService, HTTP_PROVIDERS],
})


export class BaccaratShowDetailComponent {
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
    showList: any;
    page: any;

    constructor(private ss: ShowService, private router: Router, params: RouteSegment) {
        this.id = +params.getParam('id'); //获取URL中的ID
        this.state = +params.getParam('state'); //获取URL中的状态
        this.projectsParams = {};
        this.prizesParams = {};
        this.projectsParams.cRPId = this.id;
        this.projectsParams.queryType = 1;
        this.prizesParams.cRPId = this.id;
        this.prizesParams.startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
        this.prizesParams.endDate = moment().format('YYYY-MM-DD');
    }

    onDownload() {
        let search = new URLSearchParams();
        search.set('cRPId', this.prizesParams.cRPId);
        search.set('startDate', this.prizesParams.startDate);
        search.set('endDate', this.prizesParams.endDate);
        search.set('projectId', this.prizesParams.projectId);
        return downLoadBase + search;
    }

    onSearch() {
        this.search();
    }

    onDelete() {
        this.ss.delete(this.id).subscribe(data => {
            if (this.errorAlert(data)) {
                this.toHome();
            }
        }, error => this.handleError);
    }

    onState() {
        this.ss.putState(this.id, this.state === 1 ? 2 : 1).subscribe(data => {
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
        this.ss.getOne(this.id).subscribe(data => {
            if (this.errorAlert(data)) {
                this.info = data.data;
                this.state = this.info.cRPStatus;
            }
        }, error => this.handleError);
    }

    getTotalList() {
        this.ss.totalList(this.id).subscribe(data => {
            if (this.errorAlert(data)) {
                this.totalList = data.data;
            }
        }, error => this.handleError);
    }

    getProjectsList() {
        this.ss.projectsList(this.projectsParams).subscribe(data => {
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
        this.ss.showList(this.prizesParams).subscribe(data => {
            if (this.errorAlert(data)) {
                this.showList = data.data.list;
                this.page = data.data.page;
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
