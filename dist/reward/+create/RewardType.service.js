"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const http_1 = require('@angular/http');
require('rxjs/Rx');
class RewardType {
    constructor(type, name, ico, status, isChecked) {
        this.type = type;
        this.name = name;
        this.ico = ico;
        this.status = status;
        this.isChecked = isChecked;
    }
}
exports.RewardType = RewardType;
let RewardTypeService = class RewardTypeService {
    constructor(http) {
        this.http = http;
        this.url = 'RewardType.json';
    }
    getRewardtypes() {
        return this.http
            .get(this.url)
            .map(request => request.json());
    }
    updateChecked(type, list) {
        list.map(res => res.isChecked = res.type === type);
    }
    getSelectedItem() {
        return null;
    }
};
RewardTypeService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], RewardTypeService);
exports.RewardTypeService = RewardTypeService;
//# sourceMappingURL=/Users/worm/Documents/ng2-reward/tmp/broccoli_type_script_compiler-input_base_path-2JaFNAP8.tmp/0/tmp/broccoli_type_script_compiler-input_base_path-2JaFNAP8.tmp/0/src/reward/+create/RewardType.service.js.map