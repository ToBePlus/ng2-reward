// storeApp.factory('storeDepStore', ['$http', function($http) {
//     var service = {};
//     service.getDeployeObject = function(data, params, success, error) {
//         $http.post(baseUrl + '/prostoque/getDeployeObject?q=' +
//             moment().format('x'), data, {
//                 params: params
//             }).then(success, error);
//     };
//     service.addDeployeObject = function(data, params, success, error) {
//         $http.post(baseUrl + '/prostoque/addDeployeObject?q=' +
//             moment().format('x'), data, {
//                 params: params
//             }).then(success, error);
//     };
//     service.updateAutoDeployFlag = function(data, params, success, error) {
//         $http.post(baseUrl + '/project/updateAutoDeployFlag?q=' +
//             moment().format('x'), data, {
//                 params: params
//             }).then(success, error);
//     };
//     return service;
// }]);
// export const addStoreDeployment =  {
//   bindings:{
//     storeDeployment:'=',
//     added:'&'
//   },
//   template:`
//   <div class="ng-overlay-win pro-add-deployment" style="display:none" id="addwin">
//   <div class="ng-slide-popbox-large  th-clear" style="width:702px;height:524px;">
//       <div class="ng-slide-pophead" style="height:36px;">
//           项目部署
//       </div>
//       <div class="ng-slide-popcont th-clear" style="min-height:400px;">
//           <!--左-->
//           <div class="ng-slide-left">
//               <select class="form-control" ng-model="search.cPSQType" ng-options="t.id as t.name for t in typeList"></select>
//               <div class="mt10">
//                   <div class="input-group">
//                       <input type="text" class="form-control" ng-model="search.storeName" ng-keyup="searchTxt($event)" placeholder="搜索名称或编号">
//                       <div class="input-group-btn">
//                           <button class="btn btn-default" ng-click="clearSearchTxt()" title="清空">
//                               <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
//                           </button>
//                           <button class="btn btn-default" ng-click="searchTxtBlur()" title="搜索">
//                               <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
//                           </button>
//                       </div>
//                   </div>
//                   <div class="pd20 mt10 ng-tree-block" group-id="params.cGId" mx-store-group type="search.cPSQType" project-id="$routeParams.id" max-layer="5" all-num="{{vm.store.totalcount}}" tree-editable='false' tree-num-type="dbl"></div>
//                   <!-- 勾选预激活 -->
//
//                   <div class="sd-ckb" ng-if="search.cPSQType == 1">
//                       <input type="checkbox" id="sd-ckb-active-store" ng-model="projectInfo.cpAutoDeploy" ng-true-value="1" ng-false-value="0" ng-change="changeAutoDeploy()">
//                       <label for="sd-ckb-active-store" >自动部署新激活门店</label>
//                       <div class="zs-b-des">
//                           <i></i>
//                           <div>
//                               勾选后，通过预激活门店进入的门店将自动与该项目进行关联部署
//                           </div>
//                       </div>
//                   </div>
//               </div>
//           </div>
//           <!--左 end-->
//           <!--右-->
//           <div class="ng-slide-right" ng-show="list.length>0">
//               <label class="mt10">
//                   <input type="checkbox" ng-model="allChk[search.cPSQType]" ng-click="allChkClick()">全选
//               </label>
//               <div class="" ng-if="!hidetool">
//                   <span><span ng-if="showall">已选中当前分组{{checksum}}条记录&nbsp;&nbsp;</span><span ng-if="!showall">已选中当前分组全部{{checksum-listcheck}}条记录&nbsp;&nbsp;</span><a ng-if="showall" class="text-primary" ng-click="addAllDeployment();" href="">点击选择全部{{search.pageCount-listcheck}}条记录</a><a ng-if="!showall" class="text-primary" ng-click="cancelAllDeployment()" href="">点击取消选择</a></span>
//               </div>
//               <div class="overflow-y h300">
//                   <ul>
//                       <li ng-repeat="l in list">
//                           <label ng-class="{'unchecked':l.pdStatus=='1' || l.storeStatus == '2'}" title="{{l.pdStatus=='1'?'此对象已经部署过，不能重复部署':''}}">
//                               <input type="checkbox" ng-disabled="l.pdStatus=='1' || l.storeStatus == '2'" ng-model="l.checked" ng-change="chkRecord(l)"> {{l.storeName+'('+l.csNo+')'}}
//                           </label>
//                       </li>
//                   </ul>
//               </div>
//           </div>
//           <!--右 end-->
//           <div ng-if="list.length<1" class="text-danger" style="padding-top:180px;padding-left:395px">未搜索到结果</div>
//           <div bgf-pagination class="bgf-pagination-sm mx-paginate-sm" page="search.currentPage" link-group-size="1" num-pages="pageTotal" per-page="search.pageSize" num-items="search.pageCount" auto-presets="false"></div>
//           <div style="width:95%;text-align:right;height:27px" class="ng-btn-row">
//               <a href="" ng-click="!disabled&&save()" class="confirm-btn">确定</a>
//               <a href="" ng-click="close()" class="cancel-btn2 ml20">取消</a>
//           </div>
//       </div>
//   </div>
//   `
//   controller:function(){
//     this.onAdd = ()=>{
//       this.added(this.storeDeployment);
//     }
//     function postLink(scope, iElement, iAttrs) {
//         // $rootScope.$on('add.store.deployment', function(e, data) {
//
//             this.show = data.show;
//             this.nodata = true;
//             this.search.cPSQType = '1';
//             this.search.currentPage = 0;
//             this.type[this.search.cPSQType] = false;
//             this.allChk[this.search.cPSQType] = false;
//             this.submitList[this.search.cPSQType] = {};
//             getDeployeObject();
//             iteratorAllDeploye();
//             if (this.show == 1)
//                 $("#addwin").show();
//             else
//                 $("#addwin").hide();
//
//         // });
//         this.close = function() {
//             this.show = 0;
//             $("#addwin").hide();
//
//             $rootScope.$emit('add.store.deployment', {
//                 show: 0
//             });
//         }
//
//         this.search = {};
//         this.params = {};
//         this.search.cPSQType = '1';
//         this.search.cPSQCPId = $routeParams.id;
//         this.chkNum = {};
//         this.params.cPId = $routeParams.id;
//         this.params.cGId = 0;
//         this.params.type = 0;
//         this.chkList = {};
//         this.submitList = {};
//         this.allChk = {};
//         this.type = {};
//         this.checksum = 0;
//         // 是否显示全部选中
//         this.showall = true;
//         this.hidetool = false;
//         this.addAllDeployment = function() {
//             this.type[this.search.cPSQType] = true;
//             this.allChk[this.search.cPSQType] = true;
//             this.showall = false;
//             var tmpsearch = {};
//             tmpsearch.cPSQCPId = this.search.cPSQCPId;
//             tmpsearch.cPSQType = this.search.cPSQType;
//             tmpsearch.currentPage = 0;
//             tmpsearch.pageCount = this.search.pageCount;
//             tmpsearch.pageSize = this.search.pageSize;
//             tmpsearch.sortByTime = this.search.sortByTime;
//             tmpsearch.startIndex = this.search.startIndex;
//             tmpsearch.storeName = this.search.storeName;
//             tmpsearch.totalcount = this.search.totalcount;
//             tmpsearch.userId = this.search.userId;
//             //angular.copy(tmpsearch,this.search);
//             this.submitList[this.search.cPSQType] = {};
//             var conti = true;
//             var currentPage = 0;
//             tmpsearch.currentPage = currentPage;
//             this.checksum = 0;
//
//             function getAllDeploy(tmpsearch) {
//                 storeDepStore.getDeployeObject(tmpsearch, this.params, function(data) {
//                     var list = data.data.deployeList;
//                     angular.forEach(list, function(val, i) {
//                         if (val.pdStatus != '1') {
//                             this.submitList[this.search.cPSQType][val.cPSQCSId] = val.storeName + '(' + val.csNo + ')';
//                         }
//                         this.checksum++;
//                     });
//                     if (list != null && list.length > 0) {
//                         tmpsearch.currentPage++;
//                         getAllDeploy(tmpsearch);
//                     } else {
//                         getDeployeObject();
//                     }
//                 });
//             }
//
//             getAllDeploy(tmpsearch);
//         }
//
//         //自动布署新激活门店
//         this.changeAutoDeploy = function() {
//             storeDepStore.updateAutoDeployFlag({}, {
//                 projectId: $rootScope.projectInfo.cPId,
//                 cpAutoDeploy: $rootScope.projectInfo.cpAutoDeploy
//             }, function(data) {
//                 if(data.data.error == 0) {
//                     alert("修改成功");
//                 }
//             })
//         }
//
//
//
//         this.cancelAllDeployment = function() {
//             this.allChk[this.search.cPSQType] = 0;
//             this.type[this.search.cPSQType] = 0;
//             uniteratorAllDeploye();
//             this.showall = false;
//         }
//
//         this.allChkClick = function() {
//             this.checksum = 0;
//             this.chkNum[this.search.cPSQType] = 0;
//             this.type[this.search.cPSQType] = 0;
//             this.submitList[this.search.cPSQType] = this.submitList[this.search.cPSQType] || {};
//             angular.forEach(this.list, function(val, i) {
//                 if (val.pdStatus == '0') {
//                     if (this.allChk[this.search.cPSQType]) {
//                         this.chkNum[this.search.cPSQType]++;
//                         this.checksum++;
//                         val.checked = true;
//                         this.submitList[this.search.cPSQType][val.cPSQCSId] = val.storeName + '(' + val.csNo + ')';
//                     } else {
//                         val.checked = false;
//                         // this.checksum--;
//                         delete this.submitList[this.search.cPSQType][val.cPSQCSId];
//                     }
//                 }
//             });
//             //iteratorAllDeploye();
//             /*this.checksum=0;
//             for(var i in this.submitList[this.search.cPSQType]){
//               this.checksum++;
//             }*/
//         }
//
//         this.search.storeName = '';
//
//         this.typeList = [{
//             id: '1',
//             name: '门店'
//         }, {
//             id: '3',
//             name: '商品'
//         }, {
//             id: '4',
//             name: '员工'
//         }];
//
//         $rootScope.$on('store.group.fliter', function(e, data) {
//             this.params.cGId = data.$nodeScope.$modelValue.cGId;
//             this.search.currentPage = 0;
//             getDeployeObject();
//             iteratorAllDeploye();
//         });
//
//         this.$watch('search.cPSQType', function(news, olds) {
//             this.submitList[this.search.cPSQType] = {};
//             this.params.cGId = 0;
//             this.search.currentPage = 0;
//             this.type[this.search.cPSQType] = false;
//             this.allChk[this.search.cPSQType] = false;
//             this.submitList[this.search.cPSQType] = {};
//             this.type[1] = false;
//             this.allChk[1] = false;
//             this.submitList[1] = {};
//             this.type[3] = false;
//             this.allChk[3] = false;
//             this.submitList[3] = {};
//             this.type[4] = false;
//             this.allChk[4] = false;
//             this.submitList[4] = {};
//             getDeployeObject();
//             iteratorAllDeploye();
//         })
//
//         this.$watch('search.currentPage', function(news, olds) {
//             if (news != olds) {
//                 // this.chkNum[this.search.cPSQType] = 0;
//                 // this.allChk[this.search.cPSQType] = false;
//                 // this.type[this.search.cPSQType] = 0
//                 getDeployeObject();
//             }
//         })
//
//         function iteratorAllDeploye() {
//             var tmpsearch = {};
//             tmpsearch.cPSQCPId = this.search.cPSQCPId;
//             tmpsearch.cPSQType = this.search.cPSQType;
//             tmpsearch.currentPage = 0;
//             tmpsearch.pageCount = this.search.pageCount;
//             tmpsearch.pageSize = this.search.pageSize;
//             tmpsearch.sortByTime = this.search.sortByTime;
//             tmpsearch.startIndex = this.search.startIndex;
//             tmpsearch.storeName = this.search.storeName;
//             tmpsearch.totalcount = this.search.totalcount;
//             tmpsearch.userId = this.search.userId;
//
//             var selectdeploye = 0;
//             var alldeploye = 0;
//             var currentPage = 0;
//             this.listcheck = 0;
//
//             function getAllDeploy(tmpsearch) {
//                 tmpsearch.currentPage = currentPage;
//                 storeDepStore.getDeployeObject(tmpsearch, this.params, function(data) {
//                     var list = data.data.deployeList;
//                     angular.forEach(list, function(val, i) {
//                         if (this.submitList[this.search.cPSQType] && this.submitList[this.search.cPSQType][val.cPSQCSId]) {
//                             selectdeploye++;
//                         }
//                         alldeploye++;
//                         if (val.pdStatus == '1') {
//                             this.listcheck++;
//                             this.checksum++;
//                         }
//                     });
//                     if (list == null || list.length < 1) {
//                         this.checksum = selectdeploye;
//                         if ((alldeploye - this.listcheck) < 1) {
//                             this.hidetool = true;
//                         } else {
//                             this.hidetool = false;
//                         }
//
//                         if (selectdeploye < (alldeploye - this.listcheck)) {
//                             this.showall = true;
//                         } else {
//                             this.showall = false;
//                         }
//                     } else {
//                         currentPage++;
//                         getAllDeploy(tmpsearch);
//                     }
//                 });
//             }
//             getAllDeploy(tmpsearch);
//         }
//
//         function uniteratorAllDeploye() {
//             var tmpsearch = {};
//             tmpsearch.cPSQCPId = this.search.cPSQCPId;
//             tmpsearch.cPSQType = this.search.cPSQType;
//             tmpsearch.currentPage = 0;
//             tmpsearch.pageCount = this.search.pageCount;
//             tmpsearch.pageSize = this.search.pageSize;
//             tmpsearch.sortByTime = this.search.sortByTime;
//             tmpsearch.startIndex = this.search.startIndex;
//             tmpsearch.storeName = this.search.storeName;
//             tmpsearch.totalcount = this.search.totalcount;
//             tmpsearch.userId = this.search.userId;
//             var currentPage = 0;
//
//             function getAllDeploy(tmpsearch) {
//                 tmpsearch.currentPage = currentPage;
//                 storeDepStore.getDeployeObject(tmpsearch, this.params, function(data) {
//                     var list = data.data.deployeList;
//                     angular.forEach(list, function(val, i) {
//                         if (this.submitList[this.search.cPSQType] && this.submitList[this.search.cPSQType][val.cPSQCSId]) {
//                             val.checked = false;
//                             delete this.submitList[this.search.cPSQType][val.cPSQCSId];
//                         }
//                         if (val.pdStatus == '1') {
//                             this.checksum++;
//                         }
//                     });
//                     if (list == null || list.length < 1) {
//                         this.showall = true;
//                         this.checksum = 0;
//                         getDeployeObject();
//                     } else {
//                         currentPage++;
//                         getAllDeploy(tmpsearch);
//                     }
//                 });
//             }
//             getAllDeploy(tmpsearch);
//         }
//
//         function getDeployeObjectFilter() {
//             this.chkNum[this.search.cPSQType] = 0
//             if (!this.type[this.search.cPSQType]) {
//                 //this.submitList[this.search.cPSQType]={};
//                 //this.allChk[this.search.cPSQType]=0;
//             }
//             storeDepStore.getDeployeObject(this.search, this.params, function(data) {
//                 this.search = data.data.psq;
//                 this.list = data.data.deployeList;
//                 var count = 0;
//                 angular.forEach(this.list, function(val, i) {
//                     if (this.submitList[this.search.cPSQType] && this.submitList[this.search.cPSQType][val.cPSQCSId]) {
//                         val.checked = true;
//                         count++;
//                         this.chkNum[this.search.cPSQType]++;
//                     }
//                     if (val.pdStatus == '1') {
//                         val.checked = true;
//                         this.chkNum[this.search.cPSQType]++;
//                         count++;
//                     }
//                 })
//                 if (this.list.length == count) {
//                     this.allChk[this.search.cPSQType] = true;
//                 } else {
//                     this.allChk[this.search.cPSQType] = false;
//                 }
//
//                 this.pageTotal = Math.ceil(Math.max(1, this.search.pageCount /
//                     this.search.pageSize));
//                 iteratorAllDeploye();
//             });
//         }
//
//         function getDeployeObject() {
//             this.chkNum[this.search.cPSQType] = 0
//             if (!this.type[this.search.cPSQType]) {
//                 //this.submitList[this.search.cPSQType]={};
//                 //this.allChk[this.search.cPSQType]=0;
//             }
//             storeDepStore.getDeployeObject(this.search, this.params, function(data) {
//                 this.search = data.data.psq;
//                 this.list = data.data.deployeList;
//                 var count = 0;
//                 angular.forEach(this.list, function(val, i) {
//                     if (this.submitList[this.search.cPSQType] && this.submitList[this.search.cPSQType][val.cPSQCSId]) {
//                         val.checked = true;
//                         count++;
//                         this.chkNum[this.search.cPSQType]++;
//                     }
//                     if (val.pdStatus == '1') {
//                         val.checked = true;
//                         //this.listcheck++;
//                         this.chkNum[this.search.cPSQType]++;
//                         count++;
//                     }
//                 })
//                 if (this.list.length == count) {
//                     this.allChk[this.search.cPSQType] = true;
//                 } else {
//                     this.allChk[this.search.cPSQType] = false;
//                 }
//
//                 this.pageTotal = Math.ceil(Math.max(1, this.search.pageCount /
//                     this.search.pageSize));
//             });
//         }
//
//         function getCurrentDeployeObject() {
//             //this.submitList[this.search.cPSQType]={};
//             this.checksum = 0;
//             angular.forEach(this.list, function(val, i) {
//                 if (val.checked) {
//                     this.submitList[this.search.cPSQType][val.cPSQCSId] = val.storeName + '(' + val.csNo + ')';
//                     this.checksum++;
//                 }
//             })
//
//             this.allChk[this.search.cPSQType] = true;
//             /*if(this.chkNum[this.search.cPSQType] ==(this.list.length-this.listcheck)){
//                this.allChk[this.search.cPSQType]=true;
//             }else{
//                this.allChk[this.search.cPSQType]=false;
//             }*/
//             //delete this.submitList[this.search.cPSQType][result.cPSQCSId];
//
//         }
//
//         this.$watchCollection('allChk', function(news, olds) {
//             /*this.chkNum[this.search.cPSQType] = 0;
//             this.submitList[this.search.cPSQType] = this.submitList[this.search.cPSQType] || {};
//             angular.forEach(this.list, function(val, i) {
//               if (val.pdStatus == '0') {
//                 if (this.allChk[this.search.cPSQType]) {
//                   this.chkNum[this.search.cPSQType]++;
//                   val.checked = true;
//                   this.submitList[this.search.cPSQType][val.cPSQCSId] = val.storeName + '(' + val.csNo + ')';
//                 } else {
//                   val.checked = false;
//                   delete this.submitList[this.search.cPSQType][val.cPSQCSId];
//                 }
//               }
//             });*/
//         })
//
//         this.chkRecord = function(result) {
//             this.submitList[this.search.cPSQType] = this.submitList[this.search.cPSQType] || {};
//             if (result.checked) {
//                 if (this.chkNum[this.search.cPSQType] == null || this.chkNum[this.search.cPSQType] == 'undefined') {
//                     this.chkNum[this.search.cPSQType] = 0;
//                 }
//                 this.chkNum[this.search.cPSQType]++;
//                 this.submitList[this.search.cPSQType][result.cPSQCSId] = result.storeName + '(' + result.csNo + ')';
//                 if (this.chkNum[this.search.cPSQType] == (this.list.length)) {
//                     this.allChk[this.search.cPSQType] = true;
//                 } else {
//                     this.allChk[this.search.cPSQType] = false;
//                 }
//                 this.checksum++;
//             } else {
//                 delete this.submitList[this.search.cPSQType][result.cPSQCSId];
//                 //if(this.chkNum[this.search.cPSQType] ==(20-this.listcheck))
//                 //	getCurrentDeployeObject(result.cPSQCSId);
//                 ///
//                 this.chkNum[this.search.cPSQType]--;
//                 this.allChk[this.search.cPSQType] = false;
//                 this.type[this.search.cPSQType] = false;
//                 this.checksum--;
//                 //this.type[this.search.cPSQType]=false;
//             }
//
//             if ((this.checksum + this.listcheck) >= this.search.pageCount) {
//                 this.showall = false;
//             }
//
//
//             if ((this.checksum + this.listcheck) < this.search.pageCount) {
//                 this.showall = true;
//             }
//         }
//
//
//         this.delChkList = function(key) {
//             delete this.chkList[key];
//         }
//         this.searchTxtBlur = function() {
//             getDeployeObject();
//         }
//         this.clearSearchTxt = function() {
//             this.search.storeName = '';
//             getDeployeObject();
//         }
//         this.searchTxt = function($event) {
//             if ($event.keyCode == 13) {
//                 this.params.cGId = 0;
//                 getDeployeObject();
//             }
//             if ($event.keyCode == 8) {
//                 if (!this.search.storeName) {
//                     getDeployeObject();
//                 }
//             }
//         }
//
//         this.save = function() {
//
//             this.disabled = 1;
//             var flag = 0;
//             angular.forEach(this.submitList, function(val, i) {
//                 angular.forEach(val, function(sub, j) {
//                     flag++;
//                 });
//             });
//             if (flag == 0) {
//                 alert('当前未选择任何部署对象');
//                 return;
//             }
//             angular.forEach(this.submitList, function(val, i) {
//                 var params = {};
//                 params.cSId = [];
//                 params.dtype = i;
//                 params.type = this.type[i] || 0;
//                 params.cGId = this.params.cGId;
//                 params.cPId = $routeParams.id;
//                 if (!params.type) {
//                     angular.forEach(val, function(sub, j) {
//                         params.cSId.push(j);
//                     });
//                 }
//                 if (params.type || params.cSId.length > 0) {
//                     storeDepStore.addDeployeObject({}, params, function(data) {
//                         if (data.data.error == 0) {
//                             alert('部署成功');
//                             this.close();
//                         } else {
//                             alert(data.data.msg);
//                         }
//                         this.disabled = 0;
//                     });
//                 }
//             });
//         }
//     }
//   }
// }
// storeApp.directive('addStoreDeployment', ['storeDepStore',
//     '$routeParams',
//     '$document',
//     '$rootScope',
//     '$timeout',
//     function(storeDepStore, $routeParams, $document, $rootScope, $timeout) {
//         return {
//             priority: 500,
//             templateUrl: baseUrl + '/template/add-store-deployment.html',
//             replace: true,
//             restrict: 'A',
//             scope: false,
//             link: function postLink(scope, iElement, iAttrs) {
//                 $rootScope.$on('add.store.deployment', function(e, data) {
//
//                     scope.show = data.show;
//                     scope.nodata = true;
//                     scope.search.cPSQType = '1';
//                     scope.search.currentPage = 0;
//                     scope.type[scope.search.cPSQType] = false;
//                     scope.allChk[scope.search.cPSQType] = false;
//                     scope.submitList[scope.search.cPSQType] = {};
//                     getDeployeObject();
//                     iteratorAllDeploye();
//                     if (scope.show == 1)
//                         $("#addwin").show();
//                     else
//                         $("#addwin").hide();
//
//                 });
//                 scope.close = function() {
//                     scope.show = 0;
//                     $("#addwin").hide();
//
//                     $rootScope.$emit('add.store.deployment', {
//                         show: 0
//                     });
//                 }
//
//                 scope.search = {};
//                 scope.params = {};
//                 scope.search.cPSQType = '1';
//                 scope.search.cPSQCPId = $routeParams.id;
//                 scope.chkNum = {};
//                 scope.params.cPId = $routeParams.id;
//                 scope.params.cGId = 0;
//                 scope.params.type = 0;
//                 scope.chkList = {};
//                 scope.submitList = {};
//                 scope.allChk = {};
//                 scope.type = {};
//                 scope.checksum = 0;
//                 // 是否显示全部选中
//                 scope.showall = true;
//                 scope.hidetool = false;
//                 scope.addAllDeployment = function() {
//                     scope.type[scope.search.cPSQType] = true;
//                     scope.allChk[scope.search.cPSQType] = true;
//                     scope.showall = false;
//                     var tmpsearch = {};
//                     tmpsearch.cPSQCPId = scope.search.cPSQCPId;
//                     tmpsearch.cPSQType = scope.search.cPSQType;
//                     tmpsearch.currentPage = 0;
//                     tmpsearch.pageCount = scope.search.pageCount;
//                     tmpsearch.pageSize = scope.search.pageSize;
//                     tmpsearch.sortByTime = scope.search.sortByTime;
//                     tmpsearch.startIndex = scope.search.startIndex;
//                     tmpsearch.storeName = scope.search.storeName;
//                     tmpsearch.totalcount = scope.search.totalcount;
//                     tmpsearch.userId = scope.search.userId;
//                     //angular.copy(tmpsearch,scope.search);
//                     scope.submitList[scope.search.cPSQType] = {};
//                     var conti = true;
//                     var currentPage = 0;
//                     tmpsearch.currentPage = currentPage;
//                     scope.checksum = 0;
//
//                     function getAllDeploy(tmpsearch) {
//                         storeDepStore.getDeployeObject(tmpsearch, scope.params, function(data) {
//                             var list = data.data.deployeList;
//                             angular.forEach(list, function(val, i) {
//                                 if (val.pdStatus != '1') {
//                                     scope.submitList[scope.search.cPSQType][val.cPSQCSId] = val.storeName + '(' + val.csNo + ')';
//                                 }
//                                 scope.checksum++;
//                             });
//                             if (list != null && list.length > 0) {
//                                 tmpsearch.currentPage++;
//                                 getAllDeploy(tmpsearch);
//                             } else {
//                                 getDeployeObject();
//                             }
//                         });
//                     }
//
//                     getAllDeploy(tmpsearch);
//                 }
//
//                 //自动布署新激活门店
//                 scope.changeAutoDeploy = function() {
//                     storeDepStore.updateAutoDeployFlag({}, {
//                         projectId: $rootScope.projectInfo.cPId,
//                         cpAutoDeploy: $rootScope.projectInfo.cpAutoDeploy
//                     }, function(data) {
//                         if(data.data.error == 0) {
//                             alert("修改成功");
//                         }
//                     })
//                 }
//
//
//
//                 scope.cancelAllDeployment = function() {
//                     scope.allChk[scope.search.cPSQType] = 0;
//                     scope.type[scope.search.cPSQType] = 0;
//                     uniteratorAllDeploye();
//                     scope.showall = false;
//                 }
//
//                 scope.allChkClick = function() {
//                     scope.checksum = 0;
//                     scope.chkNum[scope.search.cPSQType] = 0;
//                     scope.type[scope.search.cPSQType] = 0;
//                     scope.submitList[scope.search.cPSQType] = scope.submitList[scope.search.cPSQType] || {};
//                     angular.forEach(scope.list, function(val, i) {
//                         if (val.pdStatus == '0') {
//                             if (scope.allChk[scope.search.cPSQType]) {
//                                 scope.chkNum[scope.search.cPSQType]++;
//                                 scope.checksum++;
//                                 val.checked = true;
//                                 scope.submitList[scope.search.cPSQType][val.cPSQCSId] = val.storeName + '(' + val.csNo + ')';
//                             } else {
//                                 val.checked = false;
//                                 // scope.checksum--;
//                                 delete scope.submitList[scope.search.cPSQType][val.cPSQCSId];
//                             }
//                         }
//                     });
//                     //iteratorAllDeploye();
//                     /*scope.checksum=0;
//                     for(var i in scope.submitList[scope.search.cPSQType]){
//                     	scope.checksum++;
//                     }*/
//                 }
//
//                 scope.search.storeName = '';
//
//                 scope.typeList = [{
//                     id: '1',
//                     name: '门店'
//                 }, {
//                     id: '3',
//                     name: '商品'
//                 }, {
//                     id: '4',
//                     name: '员工'
//                 }];
//
//                 $rootScope.$on('store.group.fliter', function(e, data) {
//                     scope.params.cGId = data.$nodeScope.$modelValue.cGId;
//                     scope.search.currentPage = 0;
//                     getDeployeObject();
//                     iteratorAllDeploye();
//                 });
//
//                 scope.$watch('search.cPSQType', function(news, olds) {
//                     scope.submitList[scope.search.cPSQType] = {};
//                     scope.params.cGId = 0;
//                     scope.search.currentPage = 0;
//                     scope.type[scope.search.cPSQType] = false;
//                     scope.allChk[scope.search.cPSQType] = false;
//                     scope.submitList[scope.search.cPSQType] = {};
//                     scope.type[1] = false;
//                     scope.allChk[1] = false;
//                     scope.submitList[1] = {};
//                     scope.type[3] = false;
//                     scope.allChk[3] = false;
//                     scope.submitList[3] = {};
//                     scope.type[4] = false;
//                     scope.allChk[4] = false;
//                     scope.submitList[4] = {};
//                     getDeployeObject();
//                     iteratorAllDeploye();
//                 })
//
//                 scope.$watch('search.currentPage', function(news, olds) {
//                     if (news != olds) {
//                         // scope.chkNum[scope.search.cPSQType] = 0;
//                         // scope.allChk[scope.search.cPSQType] = false;
//                         // scope.type[scope.search.cPSQType] = 0
//                         getDeployeObject();
//                     }
//                 })
//
//                 function iteratorAllDeploye() {
//                     var tmpsearch = {};
//                     tmpsearch.cPSQCPId = scope.search.cPSQCPId;
//                     tmpsearch.cPSQType = scope.search.cPSQType;
//                     tmpsearch.currentPage = 0;
//                     tmpsearch.pageCount = scope.search.pageCount;
//                     tmpsearch.pageSize = scope.search.pageSize;
//                     tmpsearch.sortByTime = scope.search.sortByTime;
//                     tmpsearch.startIndex = scope.search.startIndex;
//                     tmpsearch.storeName = scope.search.storeName;
//                     tmpsearch.totalcount = scope.search.totalcount;
//                     tmpsearch.userId = scope.search.userId;
//
//                     var selectdeploye = 0;
//                     var alldeploye = 0;
//                     var currentPage = 0;
//                     scope.listcheck = 0;
//
//                     function getAllDeploy(tmpsearch) {
//                         tmpsearch.currentPage = currentPage;
//                         storeDepStore.getDeployeObject(tmpsearch, scope.params, function(data) {
//                             var list = data.data.deployeList;
//                             angular.forEach(list, function(val, i) {
//                                 if (scope.submitList[scope.search.cPSQType] && scope.submitList[scope.search.cPSQType][val.cPSQCSId]) {
//                                     selectdeploye++;
//                                 }
//                                 alldeploye++;
//                                 if (val.pdStatus == '1') {
//                                     scope.listcheck++;
//                                     scope.checksum++;
//                                 }
//                             });
//                             if (list == null || list.length < 1) {
//                                 scope.checksum = selectdeploye;
//                                 if ((alldeploye - scope.listcheck) < 1) {
//                                     scope.hidetool = true;
//                                 } else {
//                                     scope.hidetool = false;
//                                 }
//
//                                 if (selectdeploye < (alldeploye - scope.listcheck)) {
//                                     scope.showall = true;
//                                 } else {
//                                     scope.showall = false;
//                                 }
//                             } else {
//                                 currentPage++;
//                                 getAllDeploy(tmpsearch);
//                             }
//                         });
//                     }
//                     getAllDeploy(tmpsearch);
//                 }
//
//                 function uniteratorAllDeploye() {
//                     var tmpsearch = {};
//                     tmpsearch.cPSQCPId = scope.search.cPSQCPId;
//                     tmpsearch.cPSQType = scope.search.cPSQType;
//                     tmpsearch.currentPage = 0;
//                     tmpsearch.pageCount = scope.search.pageCount;
//                     tmpsearch.pageSize = scope.search.pageSize;
//                     tmpsearch.sortByTime = scope.search.sortByTime;
//                     tmpsearch.startIndex = scope.search.startIndex;
//                     tmpsearch.storeName = scope.search.storeName;
//                     tmpsearch.totalcount = scope.search.totalcount;
//                     tmpsearch.userId = scope.search.userId;
//                     var currentPage = 0;
//
//                     function getAllDeploy(tmpsearch) {
//                         tmpsearch.currentPage = currentPage;
//                         storeDepStore.getDeployeObject(tmpsearch, scope.params, function(data) {
//                             var list = data.data.deployeList;
//                             angular.forEach(list, function(val, i) {
//                                 if (scope.submitList[scope.search.cPSQType] && scope.submitList[scope.search.cPSQType][val.cPSQCSId]) {
//                                     val.checked = false;
//                                     delete scope.submitList[scope.search.cPSQType][val.cPSQCSId];
//                                 }
//                                 if (val.pdStatus == '1') {
//                                     scope.checksum++;
//                                 }
//                             });
//                             if (list == null || list.length < 1) {
//                                 scope.showall = true;
//                                 scope.checksum = 0;
//                                 getDeployeObject();
//                             } else {
//                                 currentPage++;
//                                 getAllDeploy(tmpsearch);
//                             }
//                         });
//                     }
//                     getAllDeploy(tmpsearch);
//                 }
//
//                 function getDeployeObjectFilter() {
//                     scope.chkNum[scope.search.cPSQType] = 0
//                     if (!scope.type[scope.search.cPSQType]) {
//                         //scope.submitList[scope.search.cPSQType]={};
//                         //scope.allChk[scope.search.cPSQType]=0;
//                     }
//                     storeDepStore.getDeployeObject(scope.search, scope.params, function(data) {
//                         scope.search = data.data.psq;
//                         scope.list = data.data.deployeList;
//                         var count = 0;
//                         angular.forEach(scope.list, function(val, i) {
//                             if (scope.submitList[scope.search.cPSQType] && scope.submitList[scope.search.cPSQType][val.cPSQCSId]) {
//                                 val.checked = true;
//                                 count++;
//                                 scope.chkNum[scope.search.cPSQType]++;
//                             }
//                             if (val.pdStatus == '1') {
//                                 val.checked = true;
//                                 scope.chkNum[scope.search.cPSQType]++;
//                                 count++;
//                             }
//                         })
//                         if (scope.list.length == count) {
//                             scope.allChk[scope.search.cPSQType] = true;
//                         } else {
//                             scope.allChk[scope.search.cPSQType] = false;
//                         }
//
//                         scope.pageTotal = Math.ceil(Math.max(1, scope.search.pageCount /
//                             scope.search.pageSize));
//                         iteratorAllDeploye();
//                     });
//                 }
//
//                 function getDeployeObject() {
//                     scope.chkNum[scope.search.cPSQType] = 0
//                     if (!scope.type[scope.search.cPSQType]) {
//                         //scope.submitList[scope.search.cPSQType]={};
//                         //scope.allChk[scope.search.cPSQType]=0;
//                     }
//                     storeDepStore.getDeployeObject(scope.search, scope.params, function(data) {
//                         scope.search = data.data.psq;
//                         scope.list = data.data.deployeList;
//                         var count = 0;
//                         angular.forEach(scope.list, function(val, i) {
//                             if (scope.submitList[scope.search.cPSQType] && scope.submitList[scope.search.cPSQType][val.cPSQCSId]) {
//                                 val.checked = true;
//                                 count++;
//                                 scope.chkNum[scope.search.cPSQType]++;
//                             }
//                             if (val.pdStatus == '1') {
//                                 val.checked = true;
//                                 //scope.listcheck++;
//                                 scope.chkNum[scope.search.cPSQType]++;
//                                 count++;
//                             }
//                         })
//                         if (scope.list.length == count) {
//                             scope.allChk[scope.search.cPSQType] = true;
//                         } else {
//                             scope.allChk[scope.search.cPSQType] = false;
//                         }
//
//                         scope.pageTotal = Math.ceil(Math.max(1, scope.search.pageCount /
//                             scope.search.pageSize));
//                     });
//                 }
//
//                 function getCurrentDeployeObject() {
//                     //scope.submitList[scope.search.cPSQType]={};
//                     scope.checksum = 0;
//                     angular.forEach(scope.list, function(val, i) {
//                         if (val.checked) {
//                             scope.submitList[scope.search.cPSQType][val.cPSQCSId] = val.storeName + '(' + val.csNo + ')';
//                             scope.checksum++;
//                         }
//                     })
//
//                     scope.allChk[scope.search.cPSQType] = true;
//                     /*if(scope.chkNum[scope.search.cPSQType] ==(scope.list.length-scope.listcheck)){
//                     	 scope.allChk[scope.search.cPSQType]=true;
//                     }else{
//                     	 scope.allChk[scope.search.cPSQType]=false;
//                     }*/
//                     //delete scope.submitList[scope.search.cPSQType][result.cPSQCSId];
//
//                 }
//
//                 scope.$watchCollection('allChk', function(news, olds) {
//                     /*scope.chkNum[scope.search.cPSQType] = 0;
//                     scope.submitList[scope.search.cPSQType] = scope.submitList[scope.search.cPSQType] || {};
//                     angular.forEach(scope.list, function(val, i) {
//                       if (val.pdStatus == '0') {
//                         if (scope.allChk[scope.search.cPSQType]) {
//                           scope.chkNum[scope.search.cPSQType]++;
//                           val.checked = true;
//                           scope.submitList[scope.search.cPSQType][val.cPSQCSId] = val.storeName + '(' + val.csNo + ')';
//                         } else {
//                           val.checked = false;
//                           delete scope.submitList[scope.search.cPSQType][val.cPSQCSId];
//                         }
//                       }
//                     });*/
//                 })
//
//                 scope.chkRecord = function(result) {
//                     scope.submitList[scope.search.cPSQType] = scope.submitList[scope.search.cPSQType] || {};
//                     if (result.checked) {
//                         if (scope.chkNum[scope.search.cPSQType] == null || scope.chkNum[scope.search.cPSQType] == 'undefined') {
//                             scope.chkNum[scope.search.cPSQType] = 0;
//                         }
//                         scope.chkNum[scope.search.cPSQType]++;
//                         scope.submitList[scope.search.cPSQType][result.cPSQCSId] = result.storeName + '(' + result.csNo + ')';
//                         if (scope.chkNum[scope.search.cPSQType] == (scope.list.length)) {
//                             scope.allChk[scope.search.cPSQType] = true;
//                         } else {
//                             scope.allChk[scope.search.cPSQType] = false;
//                         }
//                         scope.checksum++;
//                     } else {
//                         delete scope.submitList[scope.search.cPSQType][result.cPSQCSId];
//                         //if(scope.chkNum[scope.search.cPSQType] ==(20-scope.listcheck))
//                         //	getCurrentDeployeObject(result.cPSQCSId);
//                         ///
//                         scope.chkNum[scope.search.cPSQType]--;
//                         scope.allChk[scope.search.cPSQType] = false;
//                         scope.type[scope.search.cPSQType] = false;
//                         scope.checksum--;
//                         //scope.type[scope.search.cPSQType]=false;
//                     }
//
//                     if ((scope.checksum + scope.listcheck) >= scope.search.pageCount) {
//                         scope.showall = false;
//                     }
//
//
//                     if ((scope.checksum + scope.listcheck) < scope.search.pageCount) {
//                         scope.showall = true;
//                     }
//                 }
//
//
//                 scope.delChkList = function(key) {
//                     delete scope.chkList[key];
//                 }
//                 scope.searchTxtBlur = function() {
//                     getDeployeObject();
//                 }
//                 scope.clearSearchTxt = function() {
//                     scope.search.storeName = '';
//                     getDeployeObject();
//                 }
//                 scope.searchTxt = function($event) {
//                     if ($event.keyCode == 13) {
//                         scope.params.cGId = 0;
//                         getDeployeObject();
//                     }
//                     if ($event.keyCode == 8) {
//                         if (!scope.search.storeName) {
//                             getDeployeObject();
//                         }
//                     }
//                 }
//
//                 scope.save = function() {
//
//                     scope.disabled = 1;
//                     var flag = 0;
//                     angular.forEach(scope.submitList, function(val, i) {
//                         angular.forEach(val, function(sub, j) {
//                             flag++;
//                         });
//                     });
//                     if (flag == 0) {
//                         alert('当前未选择任何部署对象');
//                         return;
//                     }
//                     angular.forEach(scope.submitList, function(val, i) {
//                         var params = {};
//                         params.cSId = [];
//                         params.dtype = i;
//                         params.type = scope.type[i] || 0;
//                         params.cGId = scope.params.cGId;
//                         params.cPId = $routeParams.id;
//                         if (!params.type) {
//                             angular.forEach(val, function(sub, j) {
//                                 params.cSId.push(j);
//                             });
//                         }
//                         if (params.type || params.cSId.length > 0) {
//                             storeDepStore.addDeployeObject({}, params, function(data) {
//                                 if (data.data.error == 0) {
//                                     alert('部署成功');
//                                     scope.close();
//                                 } else {
//                                     alert(data.data.msg);
//                                 }
//                                 scope.disabled = 0;
//                             });
//                         }
//                     });
//                 }
//             }
//         };
//     }
// ])
//# sourceMappingURL=/Users/worm/Documents/ng2-reward/tmp/broccoli_type_script_compiler-input_base_path-ZKyOuL9I.tmp/0/tmp/broccoli_type_script_compiler-input_base_path-ZKyOuL9I.tmp/0/src/reward/ng1/add-store-deployment.js.map