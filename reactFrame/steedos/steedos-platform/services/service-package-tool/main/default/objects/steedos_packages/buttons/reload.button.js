module.exports = {
    reload: function (object_name, record_id) {
        toastr.info('重新加载中，请稍后...', null, {timeOut: false});
        const record = Creator.odata.get(object_name,record_id);
        //TODO nodeID
        Steedos.authRequest(Steedos.absoluteUrl('/api/nodes/reload'), {type: 'post', async: false, data: JSON.stringify({
                module: record.name,
                nodeID: record.node_id
            }),
            success: function(){
                setTimeout(function(){
                    if (FlowRouter.current().params.record_id) {
                        SteedosUI.reloadRecord(object_name, record_id)
                    }
                    toastr.clear();
                    toastr.success('已重新加载');
                    FlowRouter.reload()
                }, 1000 * 5)
            },
            error: function(XMLHttpRequest){
                toastr.clear();
                toastr.error(XMLHttpRequest.responseJSON.error);
            }
        })
    },
    reloadVisible: function (object_name,record_id) {
        const record = Creator.odata.get(object_name,record_id);
        if(record.status === 'enable'){
            return true;
        }
        return false
    }
}