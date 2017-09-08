


import Vue from 'vue'
import Vuex from 'vuex'
import util from 'util/util.js'
import actions from './action.js'

Vue.use(Vuex);

//vue 定义全局变量
const store = new Vuex.Store({
   // actions,
  //共有数据
  state: {
    login:false, //=>accessToken
    waiting:false,
    noticeId:'',
    shopCount:1,
    headIndex:0,
    activeId:{
        number:1
    },
    flag:{
        addflag:true
    },
    shopData:{
        "name":"",
        "adminName":""
    },
    msgTimer:null, //监听消息
    msgData:{
        appUnconfirmList:[],
        msgNum:0
    },
    member:{
        shopName:''
    },
    itemData:{
        appProductDetail:{},
        appSpecifications:[],
    },
    itemRepertory:{
          needQuantity:0,
          appRepertories:[]
    },
    localList:[], //本地数据集合
    pageList:[],  //内存数据集合

    //子类数据
    currentPage:{   //当前数据节点


    },
  },
   // 变量赋值
  mutations:{
      setAccessToken(state,data){
          state.login=data;
          window.localStorage.setItem("accessToken",data);
      },
      clearAccessToken(state,data){
          state.login=false;
          window.localStorage.removeItem("accessToken");
      },
      setLoading(state,data){
         state.loading=data;
      },
      setShopData(state,data){
          var obj=Object.assign({},state.shopData,data);
          state.shopData=obj;
          util.pushLocal('shopData',obj);
      },
      setPageTab(state,data){
          state.currentPage.pageTab=data; //存在内存
      },
      setAddData(state,data){
          state.currentPage.addData=data; //存在内存
      },
      setActive(state,data){
         state.activeId=data;
      },
      setPageData (state,data){
          state.currentPage.pageData=data; //存在内存
      },
      setItemData (state,data){
          state.itemData=data;
      },
      setCategoryData (state,data){
          state.currentPage.categoryData=data;
      },

      setProductParams (state,params){

          var temp=Object.assign({},state.currentPage.list,params);

          if(JSON.stringify(state.currentPage.list)!=JSON.stringify(temp)){
              state.currentPage.list=temp;
          }
      },
      setOrderParams(state,data){
          Object.assign(state.currentPage.orderParams,data);
      },
      setOrderData(state, data){
          state.currentPage.orderData = data;
      },
      setPrintData(state, data){
          state.currentPage.printData = data;
      },
      setCustomData(state, data){
          state.currentPage.customData = data;
          state.currentPage.orderParams.memberId = data.id;
      },
      setShopAdminData(state, data){
          state.currentPage.shopAdminData = data;
      },
      setLogData(state,data){
          state.currentPage.logData = data;
      },
      setpersonalData(state,data){
         state.currentPage.personalData=data;
      },
      setstockData(state,data){
          state.currentPage.stockData=data;
      },
      setTakeData(state,data){
         state.currentPage.takeData=data;
      },
      setPageList(state, data){
          state.pageList = data;
          state.currentPage = state.pageList[state.pageList.length - 1];
      },
      // 全局waiting
      show_waiting(state){
          state.waiting = true;
      },
      hide_waiting(state){
          state.waiting = false;
      },
      // 列表waiting
      set_list_waiting(state,value){
          state.currentPage.listLoading = value;
      },
      getLocalList(state){
          var lastData=util.pullLocal('lastData');
          if(lastData) {
              state.localList = lastData.list;
              state.headIndex = lastData.index;
              state.shopCount = lastData.count;
          }
      },
      setLocalList(state,value){
          state.localList=state.pageList;
          var data={
              'index':state.headIndex,
              'count':state.shopCount,
              'list':state.localList,
          }
          util.pushLocal('lastData',data);
      }
    },
    actions
});





export default store