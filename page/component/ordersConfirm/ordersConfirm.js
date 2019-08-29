// page/component/ordersConfirm/ordersConfirm.js
const app = getApp()
Page({
  data:{
    address:{},
    hasAddress: false,
    total:0,    
    orders: [],
    orderInfo: {},
    userInfo: {}
  },

  onReady:function() {
    const self = this;
    //console.log("ordersConfirm_onReady");
    //console.log(app.globalData.orderInfo[0]);
    self.setData({
      hasList: true,
      orders: app.globalData.orders,
      orderInfo: app.globalData.orderInfo[0],
      userInfo: app.globalData.userInfo
    });
    this.getTotalPrice();
  },
  
  onShow:function(){
    const self = this;
    wx.getStorage({
      key:'address',
      success(res) {
        self.setData({
          address: res.data,
          hasAddress: true
        })
      }
    })
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let orders = this.data.orders;
    let total = 0;
    for(let i = 0; i < orders.length; i++) {
      total += orders[i].num * orders[i].price;
    }
    this.setData({
      total: total.toFixed(2)
    })
  },

  toConfirm() {
    // wx.showModal({
    //   title: '提示',
    //   content: '本系统只做演示，支付系统已屏蔽',
    //   text:'center',
    //   complete() {
    //     wx.switchTab({
    //       url: '/page/component/user/user'
    //     })
    //   }
    // })
    var orderSn = this.data.orderInfo.orderSn;
    //console.log(orderSn);
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
          content: '订单已提交',
          showCancel: false,
          complete() {
            /*app.globalData.carts = [];
            app.globalData.totalNum = 0;*/
            wx.switchTab({
              url: '/page/component/user/user'
            })
          }
        })
      }
    });
  }
})