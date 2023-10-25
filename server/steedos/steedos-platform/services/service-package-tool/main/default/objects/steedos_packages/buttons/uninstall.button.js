module.exports = {
    uninstall: function (object_name, record_id) {
        const record = Creator.odata.get(object_name,record_id);
        const nodesSelect = Steedos.PackageRegistry.getNodesSelect();
        swal({
            title: `卸载`,
            text: `确定要卸载${record.name}?${nodesSelect}`,
            html: true,
            showCancelButton: true,
            confirmButtonText: '卸载',
            cancelButtonText: TAPi18n.__('Cancel')
        }, function (option) {
            if (option) {
                toastr.info('卸载中，请稍后...', null, {timeOut: false});
                Steedos.authRequest(Steedos.absoluteUrl('/api/nodes/uninstall'), {type: 'post', async: false, data: JSON.stringify({
                        module: record.name,
                        nodeID: window.$("#steedos_package_main_node").val()
                    }),
                    success: function(){
                        setTimeout(function(){
                            if (FlowRouter.current().params.record_id) {
                                return FlowRouter.go("/app/admin/steedos_packages/grid/all")
                            }
                            toastr.clear();
                            toastr.success('已卸载');
                            FlowRouter.reload()
                        }, 1000 * 10)
                    },
                    error: function(XMLHttpRequest){
                        toastr.clear();
                        toastr.error(XMLHttpRequest.responseJSON.error);
                    }
                })
            }
        })
    },
    uninstallVisible: function (object_name,record_id) {
        const record = Creator.odata.get(object_name,record_id);
        if(record.local){
            return false;
        }
        if(record.status){
            return true;
        }
        return false
    }
}