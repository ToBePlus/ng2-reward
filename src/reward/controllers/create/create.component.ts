import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HTTP_PROVIDERS }  from '@angular/http';
import 'rxjs/Rx';

import {RewardType, RewardTypeService} from '../../services/RewardType.service';

@Component({
    selector: 'create',
    templateUrl: 'reward/controllers/create/template.html',
    styleUrls: ['reward/controllers/create/style.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [RewardTypeService, HTTP_PROVIDERS],
})

export class CreateComponent {
    list: RewardType[];
    type: number;

    constructor(private rt: RewardTypeService, private router: Router) {

    }

    errorMessage: string;

    ngOnInit() { this.getList(); }

    getList() {
        this.rt.getRewardtypes().subscribe(
            heroes => { this.list = heroes },
            error => this.errorMessage = <any>error);
    }

    onSelect(item: RewardType) {
        if (item.status === 0) return;
        this.rt.updateChecked(item.type, this.list);
    }

    routerUrl(type: number) {
        let router;
        switch (type) {
            case 1: router = '/show/add';
                break;
            case 2: router = '/pin/add';
                break;
            case 3: router = '/baccarat';
                break;
            case 4: router = '/create';
                break;
            case 5: router = '/create';
                break;
            case 6: router = '/create';
                break;
            case 7: router = '/create';
                break;
            case 8: router = '/create';
                break;
            default:
                router = '/create';
        }
        this.router.navigate([router]);
    }

    redirectTo() {
        this.list.map(data => { if (data.isChecked) { this.routerUrl(data.type) } });
    }

    goBack() {
        window.history.back();
    }

}
