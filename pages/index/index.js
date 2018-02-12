//index.js
//获取应用实例
const app = getApp()
const api= require('../../utils/api.js')

Page({
  data: {
    array:[],
    scrollHeight:null,
  },
  onLoad(){
    this.scrollHeight = wx.getSystemInfoSync().windowHeight;
    api.getCheckList({type:1,page:1,size:10},res=>{
      let resArr = res.data.data.rows;
      resArr.forEach((res,index)=>{
        switch (res.contractType) {
          case 1: res.contractType="渠道";
            break;
          case 2: res.contractType="自营";
            break;
          case 3: res.contractType="房速贷";
            break;
          case 4: res.contractType="利差-自营";
            break;
          case 5: res.contractType="利差-理财";
            break;
        };
        switch (res.nextProcess) {
          case 1: res.nextProcess="结案申请";
            break;
          case 2: res.nextProcess="团队长审核";
            break;
          case 3: res.nextProcess="分公司负责人审核";
            break;
          case 4: res.nextProcess="渠道审核";
            break;
          case 5: res.nextProcess="财务审核";
            break;
          default: res.nextProcess="——————";
            break;
        }
        res.lastUpdateTime = res.lastUpdateTime.slice(2,10)
      })
      this.setData({
        array: res.data.data.rows
      });
    },function(res){

    })
   
  },
  //撤销操作
  longTab(item){
    console.log(item)
    wx.showModal({
      title: '提示',
      content:'确定撤销',
      success:function(res){
        console.log(res )
        if(res.confirm){

        }else if (res.cancel){

        }
      },
      fail:function(){}
    })
    
  },
  //审批操作
  tapCheck(item){
    console.log(item)
    wx.navigateTo({
      url: `../detail/index?id=${item.currentTarget.dataset.id}&&customerid=${item.currentTarget.dataset.customerid}&&achievementid=${item.currentTarget.dataset.achievementid}&&isspecial=${item.currentTarget.dataset.isspecial}`
    })
  }
  
})
