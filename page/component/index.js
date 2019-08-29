const app = getApp()
var api = "https://junke.applinzi.com/miniapp/ajaxQueryGoods_new.php";
Page({
  data: {
    imgUrls: [
      '/image/b1.jpg',
      '/image/b2.jpg',
      '/image/b3.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 3000,
    duration: 800,
    goodss: []
  },
  onLoad: function () {
    var that = this;
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 10000
    });
    wx.request({
      url: api,
      data: {},
      header: {
        'content-type': 'json' // 默认值,用默认值application/json不行
      },
      success(res) {
        wx.hideToast();
        that.setData({
          goods:res.data
        });     
      }
    });
    //console.log(app.globalData.userInfo);
  }
})