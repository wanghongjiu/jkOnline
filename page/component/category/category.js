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
        category: [],
        detail:[],
        curIndex: 0,
        isScroll: false,
        toView: '01',
        pp: ''
    },
    onReady(){
        var self = this;
        wx.request({
            url:'https://junke.applinzi.com/miniapp/ajaxQueryCategory.php',
            success(res){
              var arr_data = res.data;
              var cat_arr = new Array();
              // console.log(arr_data);
              arr_data.forEach(function(item){
                // console.log(item);
                var cat = new Object();
                cat.id = item.id;
                cat.name = item.name;
                // console.log(cat);
                cat_arr.push(cat);
                //console.log(cat_arr);
              });
              // console.log(res.data);
              self.setData({
                  detail : res.data,
                  category : cat_arr
              })
            }
        });
        
    },
    switchTab(e){
      const self = this;
      this.setData({
        isScroll: true,
        pp: e.target.dataset.id
      })
      console.log(e);
      wx.request({
            url:'https://junke.applinzi.com/miniapp/ajaxQueryCategoryById.php?id=' + e.target.dataset.id,
            success(res){
                self.setData({
                    detail : res.data
                })
            }
        });
      setTimeout(function(){
        self.setData({
          toView: e.target.dataset.id,
          curIndex: e.target.dataset.index
        })
      },0)
      setTimeout(function () {
        self.setData({
          // isScroll: false
        })
      },1)
        
    }
    
})