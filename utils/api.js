
let baseInfo = "https://api.fangjinyun.com.cn/fjs/";
let baseToken = "Bearer 467405f6-331c-4914-beb7-42027bf09a01";
// let API_ROOT='https://api.fangjinyun.com.cn/fjs/';
let API_ROOT = 'http://192.168.1.128:1030/fjs/';
let userToken = wx.getStorageSync('token');
console.log(userToken)

function getApi(url, params, success, fail) {
  return wx.request({
    url: API_ROOT + url, //仅为示例，并非真实的接口地址
    data: params,
    method: 'GET',
    header: {
      "Authorization": userToken,
      'content-type': 'application/json'
    },
    success: function (res) {
      success(res)
    },
    fail: function (res) {
      fail(res);
    }
  })
}

function postApi(url, params, success, fail) {
  wx.request({
    url: API_ROOT + url, //仅为示例，并非真实的接口地址
    data: params,
    method: 'POST',
    header: {
      "Authorization": userToken || baseToken,
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      success(res)
    },
    fail: function (res) {
      fail(res);
    }
  })
}
module.exports = {
  //登录
  getLogin(params, callback) {
    wx.request({
      url: 'http://192.168.1.128:1030/fjs/thor-backend/loginWithUserInfo',
      data: {
        username: params.username,
        password: params.password,
        system: 'sale'
      },
      method: 'POST',
      header: {
        "Authorization": baseToken,
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        callback(res);
        userToken = `Bearer ${wx.getStorageSync('token')}`;

      }
    })
  },
  //获得审核模块列表s
  getCheckList(params, success, fail) {
    getApi('thea-backend/check/v1/myCheck', params, success, fail)
  },

  //获得合同信息
  getCompactInfo(params, success, fail) {
    getApi('thea-backend/check/v1/selectContract', params, success, fail)
  },
  //获得附件信息
  getAccessInfo(params, success, fail) {
    getApi('cronuscrm/api/v1/findDocByCustomerId', params, success, fail)
  },
  //获得回款列表信息 
  getReturnMoney(params, success, fail) {
    getApi('thea-backend/receivables/v1/selectByContractId', params, success, fail)
  },
  //获得审核流程
  getSelectedList(params, success, fail) {
    getApi('thea-backend/check/v1/selectListById', params, success, fail)
  }
}