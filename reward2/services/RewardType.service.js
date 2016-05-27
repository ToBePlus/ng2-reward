"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var RewardType = (function () {
    function RewardType(type, name, ico, status, isChecked) {
        this.type = type;
        this.name = name;
        this.ico = ico;
        this.status = status;
        this.isChecked = isChecked;
    }
    return RewardType;
}());
exports.RewardType = RewardType;
var REWARDTYPES = [
    new RewardType(1, '展示型优惠券', 'type-ico-show', 1, true),
    new RewardType(2, '核验型优惠码', 'type-ico-pin', 1, false),
    new RewardType(3, '大转盘', 'type-ico-baccarat', 1, false),
    new RewardType(4, '手机话费', 'type-ico-phone', 0, false),
    new RewardType(5, '天会宝', 'type-ico-tian', 0, false),
    new RewardType(6, '万里通积分', 'type-ico-wan', 0, false),
    new RewardType(7, '线下实物寄送', 'type-ico-outline', 0, false),
    new RewardType(8, '集分宝', 'type-ico-score', 0, false),
];
var rewardtypesPromise = Promise.resolve(REWARDTYPES);
var RewardTypeService = (function () {
    function RewardTypeService() {
    }
    RewardTypeService.prototype.getRewardtypes = function () { return rewardtypesPromise; };
    RewardTypeService.prototype.updateChecked = function (type) {
        return rewardtypesPromise
            .then(function (rewardtypes) { return rewardtypes.map(function (h) { return h.isChecked = h.type === +type; }); });
    };
    RewardTypeService.prototype.getSelectedItem = function () {
        return rewardtypesPromise
            .then(function (rewardtypes) { return rewardtypes.filter(function (r) { return r.isChecked; })[0]; });
    };
    RewardTypeService = __decorate([
        core_1.Injectable()
    ], RewardTypeService);
    return RewardTypeService;
}());
exports.RewardTypeService = RewardTypeService;
