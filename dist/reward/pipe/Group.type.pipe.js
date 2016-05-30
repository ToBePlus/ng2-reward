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
let GroupTypePipe = class GroupTypePipe {
    transform(items, args) {
        if (items === undefined)
            return null;
        return items.filter(item => item.cRPRewardType === args);
    }
};
GroupTypePipe = __decorate([
    core_1.Pipe({
        name: 'groupType'
    }),
    core_1.Injectable(), 
    __metadata('design:paramtypes', [])
], GroupTypePipe);
exports.GroupTypePipe = GroupTypePipe;
//# sourceMappingURL=/Users/worm/Documents/ng2-reward/tmp/broccoli_type_script_compiler-input_base_path-1GxHBMum.tmp/0/tmp/broccoli_type_script_compiler-input_base_path-1GxHBMum.tmp/0/src/reward/pipe/Group.type.pipe.js.map