const app = getApp()
Page({
    data: {
        // category: [
        //     {name:'奥赛',id:'as'},
        //     {name:'洽洽',id:'qq'},
        //     {name:'百世兴',id:'bsx'},
        //     {name:'长思',id:'cs'},
        //     {name:'中卓',id:'zz'},
        //     {name:'龟甲万',id:'gj'}
        // ],
        brand: [],
        detail:[],
        details:[],
        curIndex: 0,
        isScroll: false,
        toView: 'as',
        pp: '',
        goods: {},
        num: [],
        totalNum: 0,
        hasCarts: [],
        curIndex: 0,
        show: false,
        scaleCart: false,
        unit: [],
        jg: 0,
        dj: 0,
        jj: 0,
        is_gift: []
    },
    numInput: function(e){
      const index = e.currentTarget.dataset.index;
      var that = this;
      let numarr = this.data.num;
      numarr[index] = e.detail.value;
      that.setData({
        num: numarr
      })
    },
    checkboxChange: function(e){
      const index = e.currentTarget.dataset.index;
      let is_gift = this.data.is_gift;
      var that = this;
      // console.log(e);
      is_gift[index] = e.detail.value[0];      
      // console.log(is_gift);
      that.setData({
        is_gift: is_gift
      })
      // console.log(that.data.is_gift)
    },
    radioChange: function(e){
      var that = this;
      const index = e.currentTarget.dataset.index;
      // console.log(e);
      // console.log(index);
      // console.log(e.detail.value);
      let unit = this.data.unit;
      
      if(e.detail.value == '0'){
        unit[index] = '0'
        that.setData({
          unit: unit,
          jg: that.data.dj
        })
      }else{
        unit[index] = '1'
        that.setData({
          unit: unit,
          jg: that.data.jj
        })
      }
    },
    onReady(){
        var self = this;
        wx.request({
            // url:'http://127.0.0.1/miniapp/ajaxQueryBrandById.php?id=' + 'as',
            url:'https://junke.applinzi.com/miniapp/ajaxFetchBrand.php',
            success(res){
              var brand_arr = new Array();
              brand_arr = res.data;
              //console.log(brand_arr[0].id);
              self.setData({
                  brand : brand_arr
              });
              var pp = self.data.brand[0];
              //console.log(pp.id);
              wx.request({
                url:'https://junke.applinzi.com/miniapp/ajaxQueryBrandById.php?id=' + pp.id,
                success(res){
                  console.log(res.data);
                  self.setData({
                      detail : res.data,
                      details : res.data
                  });

                  // console.log(self.data.brand);
                  // console.log(self.data.detail);
                  // console.log('forEach1:')
                  var numarr = Array();
                  var hasCartsarr = Array();
                  var unitarr = Array();
                  var is_giftarr = Array();
                  self.data.detail[0].detail.forEach(function(item,index){
                    // console.log(item)
                    numarr.push(1);
                    hasCartsarr.push(false);
                    unitarr.push('1');
                    is_giftarr.push('0');
                    self.setData({
                      num : numarr,
                      hasCarts : hasCartsarr,
                      unit : unitarr,
                      is_gift : is_giftarr
                    })
                  });
                }
              })
            }
        });
        
        /*wx.request({
          // url:'http://127.0.0.1/miniapp/ajaxQueryBrandById.php?id=' + 'as',
          url:'https://junke.applinzi.com/miniapp/ajaxFetchBrand.php?id=' + pp,
          success(res){
            console.log(res.data);
            
            var brand_arr = new Array();
            brand_arr = res.data;
            console.log(brand_arr[0].id);
            self.setData({
                brand : brand_arr
            })
          }
        });*/
        
    },
    addCount(e) {
      const index = e.currentTarget.dataset.index;
      // console.log(e);
      // console.log(index);
      let num = this.data.num;
      num[index]++
      //num++;
      this.setData({
        num : num
      })
    },
    minusCount(e) {
      const index = e.currentTarget.dataset.index;
      let num = this.data.num;
      if(num[index] == 1){
        return;
      }
      num[index]--;
      this.setData({
        num : num
      })
    },
    addToCart(e) {
      const self = this;
      const index = e.currentTarget.dataset.index;
      const num = this.data.num;
      let total = this.data.totalNum;
      var spdm = e.currentTarget.dataset['spdm'];
      var pm = e.currentTarget.dataset['pm'];
      var image = '/image/' + e.currentTarget.dataset['image'];;
      var dw = e.currentTarget.dataset['dw'];
      var sl = this.data.num[index];
      //var sl = this.data.sl;
      var unit = this.data.unit[index];
      var bzsl = e.currentTarget.dataset['bzsl'];
      var jg = e.currentTarget.dataset['jg'];
      var jj = e.currentTarget.dataset['jj'];
      var is_gift = this.data.is_gift[index];

      
      var arr_cart = app.globalData.carts;
      console.log(e);
      // console.log(spdm);
      
      // jj = jj.toFixed(2);
      if(unit=='1'){
        jg=jj;
      }
      app.globalData.carts.push({id:spdm,title:pm,image:image,num:sl,price:jg,dw:dw,unit:unit,selected:true,is_gift,bzsl});
      var arr_cart = app.globalData.carts;
      console.log(arr_cart);
      self.setData({
        show: true
      });
      wx.showToast({
        title: '加入购物车',
        icon: 'success',
        duration: 1000
      })
     
      let hasCarts = this.data.hasCarts;
      hasCarts[index] = true;
      /*this.setData({
        num : num
      })*/
      setTimeout( function() {
        self.setData({
          show: false,
          scaleCart : true
        })
        setTimeout( function() {
          self.setData({
            scaleCart: false,
            hasCarts : hasCarts,
            totalNum: num + total
          });
          app.globalData.totalNum = self.data.totalNum;
        }, 200)
      }, 300)

      
      

    },
    switchTab(e){
      const self = this;
      this.setData({
        isScroll: true,
        pp: e.target.dataset.id,
        details: null
      })
      // console.log(e);
      
      wx.request({
            url:'https://junke.applinzi.com/miniapp/ajaxQueryBrandById.php?id=' + e.target.dataset.id,
            success(res){
              // console.log('1:');
              // console.log(res.data);  
              self.setData({
                  detail : res.data,
                  details : res.data
              });
              // console.log(self.data.brand);
              // console.log(self.data.detail);
              // console.log('forEach:')
              var numarr = Array();
              var hasCartsarr = Array();
              var unitarr = Array();
              var is_giftarr = Array();
              self.data.detail[0].detail.forEach(function(item,index){
                // console.log(item)
                numarr.push(1);
                hasCartsarr.push(false);
                unitarr.push('1');
                is_giftarr.push('0');
                self.setData({
                  num : numarr,
                  hasCarts : hasCartsarr,
                  unit : unitarr,
                  is_gift : is_giftarr
                })
              });
              // console.log(is_giftarr);
            }
        });
      // console.log("2:");
      // console.log(self.data.detail);
      setTimeout(function(){
        self.setData({
          toView: e.target.dataset.id,
          curIndex: e.target.dataset.index,
          num: 1,
          is_gift: '0'
        })
      },0)
      setTimeout(function () {
        self.setData({
          // isScroll: false
        })
      },1)
     
    }

    
})