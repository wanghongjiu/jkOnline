// page/component/new-pages/cart/cart.js
const app = getApp()
Page({
  data: {
    carts:[],               // 购物车列表
    hasList:false,          // 列表是否有数据
    totalPrice:0,           // 总价，初始为0
    totalNum:0,              // 总数量，初始为0
    selectAllStatus:true,    // 全选状态，默认全选
    isSelected:true,           // 是否选择了商品
    obj:{
        name:"hello"
    }
  },
  onShow() {
    console.log(app.globalData.carts);
    this.setData({
      hasList: true,
      carts: app.globalData.carts
    });
    this.getTotalPrice();
    this.getTotalNum();
  },
  /**
   * 当前商品选中事件
   */
  selectList(e) {

    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    const selected = carts[index].selected;
    var isSelect = false;
    var isAllSelected = true;
    carts[index].selected = !selected;
    // console.log(carts[index].selected);
    this.setData({
      carts: carts
    });
    console.log(carts);
    carts.forEach(function(item,index){
      //console.log(item);
      isSelect = isSelect||item.selected;
      isAllSelected = isAllSelected&&item.selected;
    });
    this.setData({
      isSelected: isSelect,
      selectAllStatus: isAllSelected
    });
    //console.log(this.data.isSelected);
    this.getTotalPrice();
    app.globalData.carts = carts;
  },

  /**
   * 删除购物车当前商品
   */
  deleteList(e) {
    const index = e.currentTarget.dataset.index;
    // console.log(index);
    var num = app.globalData.carts[index].num;
    // console.log(num);
    let carts = this.data.carts;
    carts.splice(index,1);
    this.setData({
      carts: carts
    });
    app.globalData.carts = this.data.carts;
    app.globalData.totalNum = app.globalData.totalNum - num;
    if(!carts.length){
      this.setData({
        hasList: false
      });
    }else{
      this.getTotalPrice();
      this.getTotalNum();
    }
    // app.globalData.totalNum = this.data.totalNum;
    // console.log(app.globalData.carts);
    // console.log(app.globalData.totalNum);
  },

  /**
   * 购物车全选事件
   */
  selectAll(e) {
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;
    let carts = this.data.carts;

    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus;
    }
    this.setData({
      selectAllStatus: selectAllStatus,
      isSelected: selectAllStatus,
      carts: carts
    });
    this.getTotalPrice();
  },

  /**
   * 绑定加数量事件
   */
  addCount(e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = Number(carts[index].num);
    num = num + 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    app.globalData.carts = this.data.carts;
    this.getTotalPrice();
    this.getTotalNum();
  },

  /**
   * 绑定减数量事件
   */
  minusCount(e) {
    const index = e.currentTarget.dataset.index;
    const obj = e.currentTarget.dataset.obj;
    let carts = this.data.carts;
    let num = Number(carts[index].num);
    if(num <= 1){
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    app.globalData.carts = this.data.carts;
    this.getTotalPrice();
    this.getTotalNum();
  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    for(let i = 0; i<carts.length; i++) {         // 循环列表得到每个数据
      if(carts[i].selected) {                     // 判断选中才会计算价格
        total += carts[i].num * carts[i].price;   // 所有价格加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalPrice: total.toFixed(2)
    });
  },
  getTotalNum() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    var num;
    for(let i = 0; i<carts.length; i++) {         // 循环列表得到每个数据
      if(carts[i].selected) {
        if(carts[i].unit == '0'){
          num = (carts[i].num/Number(carts[i].bzsl)).toFixed(2);
        }else{
          num = Number(carts[i].num);
        }                     // 判断选中才会计算数量
        total += Number(num);                    // 所有数量加起来
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalNum: total.toFixed(2)
    });
  }

})