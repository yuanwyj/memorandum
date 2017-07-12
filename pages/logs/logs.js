//logs.js
var Bmob = require('../../utils/bmob.js')
Page({
  data: {
    even: [],
    evennam: '',
    objectId: '',
    isend: null,
    detail: ''
  },
  // 事项变为完成状态
  changeEven() {
    let that = this;
    let objectId = that.data.objectId             //获得事项objectID
    let Even = Bmob.Object.extend("even");
    let query = new Bmob.Query(Even);
    console.log( typeof !that.data.isend);
    // 这个 id 是要修改条目的 id，你在
    // 这个存储并成功时可以获取到，请看前面的文档
    query.get(objectId, {
      success: function (result) {
        // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
        result.set('isend', !that.data.isend);
        result.save();
        that.setData({
          isend: !that.data.isend
        })
        // The object was retrieved successfully.
      },
      error: function (object, error) {
        console.log("qwerqweqwer");
      }
    });
  },
  //添加备忘
  addDetail( e ) {
    let that = this;
    let detail = e.detail.value;
    let objectId = that.data.objectId;             //获得事项objectID
    let Even = Bmob.Object.extend("even");
    let query = new Bmob.Query(Even);
    // 这个 id 是要修改条目的 id，你在
    // 这个存储并成功时可以获取到，请看前面的文档
    query.get(objectId, {
      success: function (result) {
        // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
        result.set('detail', detail);
        result.save();
        // The object was retrieved successfully.
      },
      error: function (object, error) {

      }
    });
  },
  onLoad: function (option) {
    let that = this;
    let objectId = option.objectId;             //获得事项objectID
    let Even = Bmob.Object.extend("even");
    let query = new Bmob.Query(Even);

    that.setData({
      objectId: objectId
    });
    // 这个 id 是要修改条目的 id，你在
    // 这个存储并成功时可以获取到，请看前面的文档
    query.get(objectId, {
      success: function (result) {
        // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
        // result.set('isend', true);
        // result.save();
        // that.finishEven();
        // that.unfinishEven();
        // The object was retrieved successfully.
        let evenname = result.get("evenname");
        let isend = result.get("isend");
        let detail = result.get("detail");
        that.setData({
          evenname: evenname,
          isend: isend,
          detail: detail
        })
        console.log(that.data.even)
      },
      error: function (object, error) {

      }
    });   
  }
})
