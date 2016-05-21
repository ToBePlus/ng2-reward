"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Program = (function () {
    function Program(cRPRewardType, cRPName, cRPNameShow, cRPSubtitle, cRPSubtitleShow, cRPbackgroundAdd, cRPbackgroundShow, cRPDesc, cRPDescShow, cRPValidDate, cRPValidType, cRPRate, cRPRateContent, totalRewards) {
        this.cRPRewardType = cRPRewardType;
        this.cRPName = cRPName;
        this.cRPNameShow = cRPNameShow;
        this.cRPSubtitle = cRPSubtitle;
        this.cRPSubtitleShow = cRPSubtitleShow;
        this.cRPbackgroundAdd = cRPbackgroundAdd;
        this.cRPbackgroundShow = cRPbackgroundShow;
        this.cRPDesc = cRPDesc;
        this.cRPDescShow = cRPDescShow;
        this.cRPValidDate = cRPValidDate;
        this.cRPValidType = cRPValidType;
        this.cRPRate = cRPRate;
        this.cRPRateContent = cRPRateContent;
        this.totalRewards = totalRewards;
    }
    return Program;
}());
exports.Program = Program;
var ShowService = (function () {
    function ShowService() {
    }
    ShowService.prototype.add = function (program) {
        console.log(program);
    };
    ShowService = __decorate([
        core_1.Injectable()
    ], ShowService);
    return ShowService;
}());
exports.ShowService = ShowService;
