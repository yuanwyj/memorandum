//index.js
//获取应用实例
var Bmob = require('../../utils/bmob.js')
var app = getApp()
Page({
  data: {
    finishEven: [],                                 // 已完成事项列表
    unfinishEven: [],                               // 未完成事项列表
    userInfo: {},
    isShow: false,
    showbtn: '显示已完成事项',
    evenName: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 添加事项处理函数
  addEvent: function( e ) {
      // Bmob操作添加一个事项
    let that = this
    let Even = Bmob.Object.extend("even");
    let evens = new Even();
    evens.set( "evenname", e.detail.value );
    evens.set( "isend", false );
    evens.set( "detail", '' );
    //添加数据，第一个入口参数是null
    evens.save(null, {
      success: function (result) {
        // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
        that.finishEven();
        that.unfinishEven();
        that.setData({
          evenName: ''
        })
      },
      error: function (result, error) {
        // 添加失败
        console.log('创建日记失败');

      }
    });
  },
  // 添加事项详细信息
  addDetail(event) {
    let objectId = event.target.dataset.objectid;
    wx.navigateTo({
      url: '../logs/logs?objectId='+objectId,
    })
  },

  // 事项变为完成状态
  changeEven( event ) {
    let that = this;
    let objectId = event.target.dataset.objectid;             //获得事项objectID
    let Even = Bmob.Object.extend("even");
    let query = new Bmob.Query(Even);

    // 这个 id 是要修改条目的 id，你在
    // 这个存储并成功时可以获取到，请看前面的文档
    query.get( objectId, {
      success: function (result) {
        // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
        result.set('isend', true);
        result.save();
        that.finishEven();
        that.unfinishEven();
        // The object was retrieved successfully.
      },
      error: function (object, error) {

      }
    });    
  },
  // 未完成事件
  unfinishEven() {
    let that = this;
    let Even = Bmob.Object.extend("even");  
    let query = new Bmob.Query(Even); 
    query.equalTo("isend", false);  
    query.find({
      success: function (result) {
        that.setData({
          unfinishEven: result
        })
      }
    })
  },
  //已完成事件
  finishEven() {
    let that = this;
    let Even = Bmob.Object.extend("even");
    let query = new Bmob.Query(Even);
    query.equalTo("isend", true);
    query.find({
      success: function (result) {
        that.setData({
          finishEven: result
        })
      }
    })   
  },
  //删除事项
  delEven( event ) {  
    let that = this;
    let objectId = event.target.dataset.id;
    let query = new Bmob.Query('even');
    query.equalTo("objectId", objectId);
    query.find().then(function (todos) {
      return Bmob.Object.destroyAll(todos);
    }).then(function (todos) {
      
      // 删除成功
      that.finishEven();
    }, function (error) {
      // 异常处理
    });
  },
  //控制是否显示已完成文件
  showFinish() {
    let that = this;
    if(that.data.isShow == false ) {
      that.setData({
        showbtn: '隐藏已完成任务'
      })
    } else {
      that.setData({
        showbtn: '显示已完成任务'
      })
    }
    that.setData({
      isShow: !that.data.isShow
    })
  },
  addbtn() {
    this.setData({
      focus: true
    })
  },
  
  onLoad: function () {
    var that = this
    that.finishEven();
    that.unfinishEven();
  },
  onShow: function() {
    var that = this
    that.finishEven();
    that.unfinishEven();    
  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
