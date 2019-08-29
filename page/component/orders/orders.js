// page/component/orders/orders.js
const app = getApp()
Page({
  data:{
    customer:null,
    remark:'',
    hasAddress: false,
    total:0,
    /*orders:[
        {id:1,title:'新鲜芹菜 半斤',image:'/image/s5.png',num:4,price:0.01},
        {id:2,title:'素米 500g',image:'/image/s6.png',num:1,price:0.03}
      ]*/
    orders: []
  },

  onReady() {
    const self = this;
    var arr_orders = new Array();
    app.globalData.carts.forEach(function(item,index){
      //console.log("ready:"+item.title);
      //console.log(self.data.customer);
      if(item.selected==true){
        //item.customer = self.data.customer;
        arr_orders.push(item);
      }
    });
    //console.log('orders:');
    //console.log(arr_orders);
    this.setData({
      hasList: true,
      // orders: app.globalData.carts
      orders: arr_orders
    });
    //app.globalData.orders = this.data.orders;
    this.getTotalPrice();
  },
  
  onShow:function(){
    const self = this;
    wx.getStorage({
      key:'customer',
      success(res) {
        //console.log("show:"+res.data);
        self.setData({
          customer: res.data,
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
  bindTextAreaBlur(e) {
    const self = this;
    self.setData({
      remark: e.detail.value
    })
    console.log(this.data.remark);
  },
  toPay() {
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
    const self = this;
    var arr_orders = new Array();
    if(self.data.customer == null){
      wx.showModal({
        title: '提示',
        content: '请选择客户',
        showCancel: false          
      })
    }else{
      app.globalData.carts.forEach(function(item,index){
        //console.log("toPay:"+item.title);
        //console.log(self.data.customer);
        if(item.selected==true){
          item.customer = self.data.customer;
          item.remark = self.data.remark;
          arr_orders.push(item);
        }
      });
      /*var obj_remark = {remark: self.data.remark}
      arr_orders.push(obj_remark);*/
      console.log('orders:');
      console.log(arr_orders);
      this.setData({
        hasList: true,
        // orders: app.globalData.carts
        orders: arr_orders
      });
      app.globalData.orders = this.data.orders;

      //orders = app.globalData.orders;
      //console.log("orders");
      //console.log(arr_orders);
      var str_order = JSON.stringify(arr_orders)
      console.log(str_order);
      wx.request({
        url: 'https://junke.applinzi.com/miniapp/orders.php', //仅为示例，并非真实的接口地址
        method: 'POST',
        data: {
           order: str_order,
           user: app.globalData.userInfo.nickName 
        } ,
        header: {
          "Content-Type": "application/x-www-form-urlencoded" //POST方式header一定写这个，不能用'content-type': 'application/json'
        },
        success: function(res) {
          //console.log("orders_toPay");
          //console.log(res.data);
          app.globalData.orderInfo = res.data;
          //console.log(app.globalData.orderInfo);
          // app.globalData.orders = app.globalData.carts;
          self.setData({
            orders: []
          })
          app.globalData.carts = [];
          app.globalData.totalNum = 0; 
          wx.navigateTo({
            url: '../ordersConfirm/ordersConfirm'
          })              
        }
      });
    }
    
  }
})