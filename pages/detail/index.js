//index.js  
//获取应用实例  
var app = getApp();
const Api = require('../../utils/api.js')
Page({
  data: {
    /** 
        * 页面配置 
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    //合同信息
    compact: {},
    photoArr: [],
    seleArr: [],
    returnArr: [],
    params: {}
  },
  onLoad: function (options) {
    console.log(options, "********")
    this.setData({ params: options })
    var that = this;

    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
    /**
     * 获得合同信息
     */
    Api.getCompactInfo({ id: this.data.params.id }, res => {
      this.setData({ compact: res.data.data })

    })
  },

  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });
    if (this.data.currentTab == 0) {
    } else if (this.data.currentTab == 1) {
      /**
       * 获得附件信息
       */
      Api.getAccessInfo({ customerId: this.data.params.customerid }, res => {

        this.setData({ photoArr: res.data.data })
      })
    } else if (this.data.currentTab == 2) {
      /**
       * 获得回款信息
       */
      Api.getReturnMoney({ auditId: this.data.params.id, isSpecial: this.data.params.isspecial }, res => {
        res.data.data.forEach(function (item, i) {
          item.createTime = item.createTime.slice(0, 10)
        })
        this.setData({ returnArr: res.data.data })
      })
    } else {
      /**
       * 获得审核信息
       */
      Api.getSelectedList({ achievementId: this.data.params.achievementid }, res => {
        res.data.data.forEach(function (item, i) {

          if (item.contractType == 1) {
            switch (item.process) {
              case 1: item.process = "结案申请";
                break;
              case 2: item.process = "团队长确认";
                break;
              case 3: item.process = "分公司总经理确认";
                break;
              case 4: item.process = "渠道确认";
                break;
              case 5: item.process = "财务确认";
                break;
            }
          } else {
            switch (item.process) {
              case 1: item.process = "结案申请";
                break;
              case 2: item.process = "团队长确认";
                break;
              case 3: item.process = "分公司总经理确认";
                break;
              case 4: item.process = "财务确认";
                break;

            }
          };
          item.status = item.status == 0 ? '同意' : '驳回';
          item.lastUpdateTime = item.lastUpdateTime.slice(0, 10)
        });

        this.setData({ seleArr: res.data.data })
      })

    }


  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /**
   * 预览
   */
  preView(e) {
    wx.previewImage({
      current: e.target.dataset.sour, // 当前显示图片的http链接
      urls: [e.target.dataset.sour] // 需要预览的图片http链接列表
    })
  }
})  