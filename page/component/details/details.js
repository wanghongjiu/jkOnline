// page/component/details/details.js
const app = getApp()
var api = "https://junke.applinzi.com/miniapp/ajaxQueryGoodsById.php";
Page({
  data:{
    goods: {},
    num: 1,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false,
    unit: '0',
    jg: 0,
    dj: 0,
    jj: 0,
    is_gift: '0'
  },
  /*onReady:function(){
    var that = this;
    that.setData({
      totalNum:app.globalData.totalNum
    });
  },*/
  checkboxChange: function(e){
    var is_gift ;
    var that = this;
    is_gift = e.detail.value[0];
    if(is_gift !='1'){
      is_gift = '0';
    };
    // console.log(is_gift);
    that.setData({
      is_gift: is_gift
    })
    console.log(that.data.is_gift)
  },
  radioChange: function(e){
    var that = this;
    console.log(e.detail.value);
    if(e.detail.value == '0'){
      that.setData({
        unit: '0',
        jg: that.data.dj
      })
    }else{
      that.setData({
        unit: '1',
        jg: that.data.jj
      })
    }
  },
  onLoad: function (option) {    
    var that = this;
    //console.log(option);
    wx.showToast({
      title: "加载中...",
      icon: "loading",
      duration: 10000
    });
    wx.request({
      url: api + "?id=" +option.id,
      data: {},
      header: {
        'content-type': 'json' // 默认值,用默认值application/json不行
      },
      success(res) {
        wx.hideToast();
        that.setData({
          goods:res.data[0],
          totalNum:app.globalData.totalNum,
          dj: res.data[0].jg,
          jj: (res.data[0].jg * res.data[0].bzsl).toFixed(2),
          jg: res.data[0].jg
        });
        if(that.data.totalNum>0){
          that.setData({
            hasCarts: true
          });
        }else{
          that.setData({
            hasCarts: false
          });
        }
        //console.log(res.data);        
      }
    });
  },
  addCount() {
    let num = this.data.num;
    num++;
    this.setData({
      num : num
    })
  },
  minusCount() {
    let num = this.data.num;
    if(num == 1){
      return;
    }
    num--;
    this.setData({
      num : num
    })
  },
  addToCart() {
    const self = this;
    const num = this.data.num;
    let total = this.data.totalNum;
    var spdm = this.data.goods.spdm;
    var pm = this.data.goods.pm;
    var image = '/image/'+this.data.goods.image;
    var dw = this.data.goods.dw;
    var sl = this.data.num;
    var unit = this.data.unit;
    var jg = this.data.jg;
    var is_gift = this.data.is_gift;

    var arr_cart = app.globalData.carts;

    console.log(spdm);
    app.globalData.carts.push({id:spdm,title:pm,image:image,num:sl,price:jg,dw:dw,unit:unit,selected:true,is_gift});
    var arr_cart = app.globalData.carts;
    console.log(arr_cart);
    self.setData({
      show: true
    })
    setTimeout( function() {
      self.setData({
        show: false,
        scaleCart : true
      })
      setTimeout( function() {
        self.setData({
          scaleCart: false,
          hasCarts : true,
          totalNum: num + total
        });
        app.globalData.totalNum = self.data.totalNum;
      }, 200)
    }, 300)

  },

  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  }
 
})