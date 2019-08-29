const app = getApp()
var api = "https://junke.applinzi.com/miniapp/ajaxSearchGoods.php";
let timeId = null;
Page({
    data: {
        history: [],
        hot: [],
        result: [
            {
                id: 1,
                url: '../details/details',
                thumb: '/image/s4.png',
                title: '瓜子 100g',
                price: 0.01
            },
            {
                id: 2,
                url: '../details/details',
                thumb: '/image/s5.png',
                title: '新鲜芹菜 500g',
                price: 0.02
            }
        ],
        showKeywords: false,
        keywords: [],
        value: '',
        showResult: false,
    },
    cancelSearch() {
        this.setData({
            showResult: false,
            showKeywords: false,
            value: ''
        })
    },
    searchInput(e) {
        const self = this;
        if(!e.detail.value){
            self.setData({
                showKeywords: false
            })
        }else{
            if(!self.data.showKeywords){
                /*timeId && clearTimeout(timeId);
                timeId = setTimeout(() => {
                    this.setData({
                        showKeywords: true
                    })
                }, 1000)*/
                console.log(e.detail.value);
                wx.request({
                  url: api + "/?id=" +e.detail.value,
                  data: {},
                  header: {
                    'content-type': 'json' // 默认值,用默认值application/json不行
                  },
                  success(res) {
                    wx.hideToast();
                    self.setData({
                        //showKeywords: true,
                        keywords: res.data,
                        showResult: true                     
                    });
                    console.log(res.data);       
                  }
                });
            }
        }
    },
    keywordHandle(e) {
        const text = e.target.dataset.text;
        this.setData({
            value: text,
            showKeywords: false,
            showResult: true
        })
        this.historyHandle(text);
    },
    historyHandle(value) {
        let history = this.data.history;
        const idx = history.indexOf(value);
        if (idx === -1) {
            // 搜索记录只保留8个
            if (history.length > 7) {
                history.pop();
            }
        } else {
            history.splice(idx, 1);
        }
        history.unshift(value);
        wx.setStorageSync('history', JSON.stringify(history));
        this.setData({
            history
        });
    },
    onLoad() {
        const history = wx.getStorageSync('history');
        if (history) {
            this.setData({
                history: JSON.parse(history)
            })
            console.log(this.data.history);
        }
    }
})