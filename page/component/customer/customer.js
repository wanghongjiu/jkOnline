// page/component/new-pages/user/address/address.js
const app = getApp()
var api = "https://junke.applinzi.com/miniapp/ajaxGetCustomer.php";
Page({
  data:{
    address:{
      name:'',
      phone:'',
      detail:''
    },
    customer: [],
    index: null
  },
  onLoad(){
    var self = this;
    
    /*wx.getStorage({
      key: 'address',
      success: function(res){
        self.setData({
          address : res.data
        })
      }
    })*/
    wx.request({
      url: api + "?user=" + app.globalData.userInfo.nickName,
      success: function(res) {
        //console.log(res.data);
        self.setData({
          customer: res.data
        });              
      }
    });
  },
  bindPickerChange:function(e){
    // console.log(this.data.customer[e.detail.value]);
    this.setData({
      index: e.detail.value
    });
    //console.log(this.data.customer[this.data.index]);
    app.globalData.customer = this.data.customer[this.data.index];
  },
  formSubmit(e){
    const value = e.detail.value;
    //console.log(value);
    if (value.customer){
      wx.setStorage({
        key: 'customer',
        data: app.globalData.customer,
        success(){
          wx.navigateBack();
        }
      })
    }else{
      wx.showModal({
        title:'提示',
        content:'请选择正确的客户',
        showCancel:false
      })
    }
  }
})