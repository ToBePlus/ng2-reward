"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var Show_service_1 = require('../../../services/Show.service');
var ShowAddComponent = (function () {
    function ShowAddComponent(s, router) {
        this.s = s;
        this.router = router;
        this.options = {
            url: 'http://192.168.1.146:8080/ccs/medias/uploadBackgroundImage'
        };
    }
    ShowAddComponent.prototype.handleUpload = function (data) {
        if (data && data.response) {
            data = JSON.parse(data.response);
            this.uploadFile = data;
        }
    };
    ShowAddComponent.prototype.ngOnInit = function () {
    };
    ShowAddComponent.prototype.onSubmit = function (value) {
        console.log(value);
    };
    ShowAddComponent.prototype.goBack = function () {
        window.history.back();
    };
    ShowAddComponent = __decorate([
        core_1.Component({
            selector: 'show-add',
            templateUrl: './controllers/+show/add/template.html',
            styleUrls: ['./controllers/+show/add/style.css'],
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [Show_service_1.ShowService]
        })
    ], ShowAddComponent);
    return ShowAddComponent;
}());
exports.ShowAddComponent = ShowAddComponent;
