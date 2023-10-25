/*
 * @Author: baozhoutao@steedos.com
 * @Date: 2022-03-28 09:35:34
 * @LastEditors: sunhaolin@hotoa.com
 * @LastEditTime: 2023-03-05 16:47:05
 * @Description: 
 */
module.exports = {
  listenTo: 'objects',

  createDefaultRecordView: function (object_name, record_id, item_element) {
    if(object_name === 'objects' && this.record && this.record.record){
      const objectApiName = this.record.record.name;
      $("body").addClass("loading");
      const res = Steedos.authRequest(`/service/api/@${objectApiName}/defUiSchema`, { type: 'post', async: false});
      $("body").removeClass("loading");
      if(res.error){
        toastr.error(res.error);
      }else{
        toastr.success(t("Added successfully"));
      }
      FlowRouter.reload();
    }
  },
  createDefaultRecordViewVisible: function(object_name, record_id, record_permissions){
    if(!Creator.isSpaceAdmin()){
        return false
    }
    return true;
  }
}