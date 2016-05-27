import {Component} from '@angular/core';
import {CORE_DIRECTIVES,NgFor,NgSwitch, NgSwitchWhen, NgSwitchDefault} from '@angular/common';
import {ROUTER_DIRECTIVES,Router} from '@angular/router';
import {Http, Response, HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import {AccountService} from '../../../services/Account.service';
import {Validators} from '../../../services/Validators';

@Component({
    selector: 'account-list',
    templateUrl:'reward/controllers/+account/list/template.html',
    styleUrls:['reward/controllers/+account/list/style.min.css'],
    directives: [ROUTER_DIRECTIVES,CORE_DIRECTIVES,NgFor,NgSwitch, NgSwitchWhen, NgSwitchDefault],
    providers: [AccountService,HTTP_PROVIDERS]
})

export class AccountListComponent{
  list:any;
  params:any;
  errorMessage:any;
  page:any;
  constructor(private as: AccountService, private router: Router) {
    this.params = {};
    this.params.currentPage = 0;
    this.params.pageSize = 10;
  }

  ngOnInit(){
    this.getList();
  }

  getList(){
    this.as.list(this.params).subscribe(data=>this.setList(data),error=>this.errorMessage)
  }

  onDelete(subUser){
    if(subUser.delSubmitText!=='delete'){
      alert('正确填写确认信息,delete');
      return;
    }
    this.as.delete(subUser.cRCUId).subscribe(data=>{
      alert(data.error.msg);
      this.getList();
    },error=>this.errorMessage)
  }

  setList(data){
    if (data.error.state !== 0) {
        alert(data.error.msg);
        return;
    }
    this.params = data.params;
    this.list=data.data.list;
    this.page=data.data.page;
  }

  toHome(){
    this.router.navigate(['/']);
  }

  goBack() {
      window.history.back();
  }
}
