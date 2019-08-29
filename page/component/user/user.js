// page/component/new-pages/user/user.js
const app = getApp()
Page({
  data:{
    thumb:'',
    nickname:'',
    orders:[],
    hasAddress:false,
    address:{}
  },
  onLoad(){
    var self = this;
    /**
     * 获取用户信息
     */
    wx.getUserInfo({
      success: function(res){
        self.setData({
          thumb: res.userInfo.avatarUrl,
          nickname: res.userInfo.nickName
        })
      }
    });
    //console.log(app.globalData.userInfo.nickName);

    /**
     * 发起请求获取订单列表信息
     */
    /*wx.request({
      url: 'https://junke.applinzi.com/miniapp/ajaxGetOrders.php?user=' + app.globalData.userInfo.nickName,
      success(res){
        console.log(res);
        self.setData({
          orders: res.data
        })
      }
    })*/
  },
  onShow(){
    var self = this;

    wx.request({
      url: 'https://junke.applinzi.com/miniapp/ajaxGetOrders.php?user=' + app.globalData.userInfo.nickName,
      success(res){
        //console.log(res);
        self.setData({
          orders: res.data
        })
      }
    })
    /**
     * 获取本地缓存 地址信息
     */
    /*wx.getStorage({
      key: 'address',
      success: function(res){
        self.setData({
          hasAddress: true,
          address: res.data
        })
      }
    })*/
  },
  confirmOrders(e){
    var self = this;
    var orderSn = e.currentTarget.dataset['index'];
    //console.log(orderSn)
    wx.request({
      url: 'https://junke.applinzi.com/miniapp/ordersConfirm.php?orderSn=' + orderSn, 
      data: {} ,
      header: {
        "Content-Type": "application/json" 
      },
      success: function(res) {
        //console.log(res.data);
        wx.showModal({
          title: '提示',
          content: '订单已确认',
          showCancel: false,
          complete() {
            self.onShow();
          }
        })
      }
    });
  },
  cancelOrders(e){
    var self = this;
    var orderSn = e.currentTarget.dataset['index'];
    console.log(e);
    //console.log(orderSn)
    wx.request({
      url: 'https://junke.applinzi.com/miniapp/ordersCancel.php?orderSn=' + orderSn, 
      data: {} ,
      header: {
        "Content-Type": "application/json" 
      },
      success: function(res) {
        //console.log(res.data);
        wx.showModal({
          title: '提示',
          content: '订单已取消',
          showCancel: false,
          complete() {
            self.onShow();
          }
        })
      }
    });
  },
  /**
   * 发起支付请求
   */
  payOrders(){
    wx.requestPayment({
      timeStamp: 'String1',
      nonceStr: 'String2',
      package: 'String3',
      signType: 'MD5',
      paySign: 'String4',
      success: function(res){
        //console.log(res)
      },
      fail: function(res) {
        wx.showModal({
          title:'支付提示',
          content:'<text>',
          showCancel: false
        })
      }
    })
  }
})