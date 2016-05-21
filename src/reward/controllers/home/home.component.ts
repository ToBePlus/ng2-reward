import {Component} from '@angular/core';
import {CORE_DIRECTIVES,NgFor,NgSwitch, NgSwitchWhen, NgSwitchDefault} from '@angular/common';
import {ROUTER_DIRECTIVES,Router} from '@angular/router';
import {Http, Response, HTTP_PROVIDERS} from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import {RType, HomeService} from '../../services/Home.service';
import {Validators} from '../../services/Validators';

import {GroupTypePipe} from '../../pipe/Group.type.pipe';

@Component({
    selector: 'home',
    templateUrl:'reward/controllers/home/template.html',
    styleUrls:['reward/controllers/home/style.css'],
    directives: [ROUTER_DIRECTIVES,CORE_DIRECTIVES,NgFor,NgSwitch, NgSwitchWhen, NgSwitchDefault],
    providers: [HomeService,HTTP_PROVIDERS],
    pipes: [ GroupTypePipe ],
})

export class HomeComponent{
  typelist:any;
  params:any;
  errorMessage:any;
  item:RType;
  constructor(private hs: HomeService, private router: Router) {

  }

  ngOnInit(){
    this.getList();
  }

  getList(){
    this.hs.get().subscribe(data=>this.setList(data),error=>this.errorMessage)
  }

  setList(data){
    if (data.error.state !== 0) {
        alert(data.error.msg);
        return;
    }
    this.params = data.params;
    this.typelist=data.data;
  }

  trackByTypelist(index:number,rtype:RType){
    return rtype.cRTId;
  }

  toHome(){
    this.router.navigate(['/']);
  }

  goBack() {
      window.history.back();
  }
}
