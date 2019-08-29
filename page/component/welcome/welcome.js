// page/component/welcome/welcome.js
const app = getApp()
var phoneObj = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tokenobj:'',
    phoneObj:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onGotUserInfo: function (e) {
    //console.log(e.detail.errMsg)
    //console.log(e.detail.userInfo)
    //console.log(e.detail.rawData)
    app.globalData.userInfo = e.detail.userInfo;
    wx.switchTab({
      url: '/page/component/index'
    })
  },

//通过绑定手机号登录
  getPhoneNumber: function (e) {
    var ivObj = e.detail.iv
    var telObj = e.detail.encryptedData
    var codeObj = "";
    var that = this;
    //------执行Login
    wx.login({
      success: res => {
        console.log('code转换', res.code); //用code传给服务器调换session_key

        wx.request({
          url: 'https://junke.applinzi.com/miniapp/getPhoneNumber/demo.php', //接口地址
          data: {
            appid: "wx777db1f741a52510",
            secret: "e9bfff6d78e246ca6b5a94fcf7c691d8",
            code: res.code,
            encryptedData: telObj,
            iv: ivObj
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            phoneObj = res.data.phoneNumber;
            console.log("手机号=", phoneObj)
            wx.setStorage({   //存储数据并准备发送给下一页使用
              key: "phoneObj",
              data: res.data.phoneNumber,
            })
          }
        })

        //-----------------是否授权，授权通过进入主页面，授权拒绝则停留在登陆界面
        if (e.detail.errMsg == 'getPhoneNumber:fail user deny') { //用户点击拒绝
          wx.navigateTo({
            url: '../index/index',
          })
        } else { //授权通过执行跳转
          
          wx.navigateTo({
            url: '../index',
          })
        }
      }
    });

    //---------登录有效期检查
    wx.checkSession({
      success: function () {
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail: function () {
        // session_key 已经失效，需要重新执行登录流程
        wx.login() //重新登录
      }
    });
  },

  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})