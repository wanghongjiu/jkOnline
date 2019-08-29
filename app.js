App({
  onLaunch: function () {
    console.log('App Launch');
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          /*wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })*/
          /*wx.getUserInfo({
            withCredentials: true,//此处设为true，才会返回encryptedData等敏感信息
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo;
              app.globalData.encryptedData = res.encryptedData;
              app.globalData.iv = res.iv;
              this.saveUserInfo();
              console.log(res)
            }
          })*/
        }
      }
    })
  },
  onShow: function () {
    //console.log('App Show!')
  },
  onHide: function () {
    //console.log('App Hide')
  },
  globalData: {
    userInfo: null,
    hasLogin: false,
    carts: [],
    totalNum: 0,
    orders: [],
    orderInfo: [],
    customer: ''
  }
})
