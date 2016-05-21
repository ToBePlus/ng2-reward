"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var RewardType_service_1 = require('../../services/RewardType.service');
var CreateComponent = (function () {
    function CreateComponent(rt, router) {
        this.rt = rt;
        this.router = router;
    }
    CreateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.rt.getRewardtypes().then(function (list) { return _this.list = list; });
    };
    CreateComponent.prototype.onSelect = function (item) {
        if (item.status === 0)
            return;
        this.rt.updateChecked(item.type);
    };
    CreateComponent.prototype.routerUrl = function (type) {
        var router;
        switch (type) {
            case 1:
                router = 'ShowAdd';
                break;
            case 2:
                router = 'PinAdd';
                break;
            case 3:
                router = 'Baccarat';
                break;
            case 4:
                router = '/create';
                break;
            case 5:
                router = '/create';
                break;
            case 6:
                router = '/create';
                break;
            case 7:
                router = '/create';
                break;
            case 8:
                router = '/create';
                break;
            default:
                router = '/create';
        }
        this.router.navigate([router]);
    };
    CreateComponent.prototype.redirectTo = function () {
        var _this = this;
        this.rt.getSelectedItem().then(function (data) { return _this.routerUrl(data.type); });
    };
    CreateComponent.prototype.goBack = function () {
        window.history.back();
    };
    CreateComponent = __decorate([
        core_1.Component({
            selector: 'create',
            templateUrl: './controllers/create/template.html',
            styleUrls: ['./controllers/create/style.css'],
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [RewardType_service_1.RewardTypeService]
        })
    ], CreateComponent);
    return CreateComponent;
}());
exports.CreateComponent = CreateComponent;
