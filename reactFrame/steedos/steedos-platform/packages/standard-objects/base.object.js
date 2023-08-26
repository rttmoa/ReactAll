module.exports = {
    extend: 'base',
    actions: {
        standard_query: {
            label: "Search",
            visible: function () {
                return Steedos.StandardObjects.Base.Actions.standard_query.visible.apply(this, arguments)
            },
            on: "list",
            todo: "standard_query"
        },
        standard_new: {
            label: "New",
            visible: function (object_name) {
                return Steedos.StandardObjects.Base.Actions.standard_new.visible.apply(this, arguments)
            },
            on: "list",
            todo: "standard_new"
        },
        standard_open_view: {
            label: "Open",
            sort: -1,
            visible: function (object_name, record_id, record_permissions) {
                return true;
            },
            on: "list_item",
            todo: "standard_open_view"
        },
        standard_edit: {
            label: "Edit",
            sort: 0,
            visible: function (object_name, record_id, record_permissions) {
                return Steedos.StandardObjects.Base.Actions.standard_edit.visible.apply(this, arguments)
            },
            on: "record",
            todo: "standard_edit"
        },
        standard_delete: {
            label: "Delete",
            visible: function (object_name, record_id, record_permissions) {
                return Steedos.StandardObjects.Base.Actions.standard_delete.visible.apply(this, arguments)
            },
            on: "record_more",
            todo: "standard_delete"
        },
        standard_delete_many: {
            label: "Delete",
            visible: function (object_name, record_id, record_permissions) {
                return Steedos.StandardObjects.Base.Actions.standard_delete_many.visible.apply(this, arguments)
            },
            on: "list",
            todo: function () {
                return Steedos.StandardObjects.Base.Actions.standard_delete_many.todo.apply(this, arguments)
            }
        },
        standard_approve: {
            label: "Initiate Approval",
            visible: function (object_name, record_id, record_permissions) {
                return Steedos.StandardObjects.Base.Actions.standard_approve.visible.apply(this, arguments)
            },
            on: "record_only",
            todo: function () {
                return Steedos.StandardObjects.Base.Actions.standard_approve.todo.apply(this, arguments)
            }
        },
        standard_view_instance: {
            label: "View Instance",
            visible: function (object_name, record_id, record_permissions) {
                return Steedos.StandardObjects.Base.Actions.standard_view_instance.visible.apply(this, arguments)
            },
            on: "record_only",
            todo: function () {
                return Steedos.StandardObjects.Base.Actions.standard_view_instance.todo.apply(this, arguments)
            }
        },
        standard_follow: {
            label: "Follow",
            visible: function (object_name, record_id, record_permissions) {
                return Steedos.StandardObjects.Base.Actions.standard_follow.visible.apply(this, arguments)
            },
            on: "list",
            todo: function () {
                return Steedos.StandardObjects.Base.Actions.standard_follow.todo.apply(this, arguments)
            }
        },
        standard_submit_for_approval: {
            visible: function (object_name, record_id) {
                return Steedos.StandardObjects.Base.Actions.standard_submit_for_approval.visible.apply(this, arguments)
            },
            on: "record_only",
            type: 'amis_button',
            amis_schema: {
                "type": "service",
                "body": [
                    {
                        "type": "button",
                        "label": "提请审批",
                        "id": "u:standard_submit_for_approval",
                        "onEvent": {
                            "click": {
                                "actions": [
                                    {
                                        "actionType": "dialog",
                                        "dialog": {
                                            "type": "dialog",
                                            "title": "提交待审核",
                                            "body": [
                                                {
                                                    "type": "form",
                                                    "id": "u:1eb06e6962d8",
                                                    "title": "表单",
                                                    "body": [
                                                        {
                                                            "type": "steedos-field",
                                                            "id": "u:9f4486c22f52",
                                                            "field": "{\n  \"label\": \"意见\",\n  \"name\": \"comment\",\n  \"type\": \"textarea\",\n  \"rows\": 3,\n  \"is_wide\": true\n}",
                                                            "name": "comment"
                                                        },
                                                        {
                                                            "type": "steedos-field",
                                                            "id": "u:9f4486c22f52",
                                                            "field": "{\n  \"label\": \"选择下一位批准人\",\n  \"name\": \"approver\",\n  \"type\": \"lookup\",\n  \"reference_to\": \"space_users\",\n  \"reference_to_field\": \"user\",\n  \"required\": true,\n  \"is_wide\": true\n}",
                                                            "name": "approver",
                                                            "placeholder": "",
                                                            "visibleOn": "${showApprover === true}"
                                                        }
                                                    ],
                                                    "wrapWithPanel": false,
                                                    "mode": "normal",
                                                    "api": {
                                                        "method": "post",
                                                        "url": "${context.rootUrl}/api/v4/process/submit/${objectName}/${recordId}",
                                                        "data": {
                                                            "&": "$$"
                                                        },
                                                        "requestAdaptor": "console.log(\"api\", api)\n\napi.data = {\n  comment: api.body.comment\n};\n\nif (api.body.approver) {\n  api.data.approver = api.body.approver;\n}\n\nreturn api;",
                                                        "adaptor": "console.log(\"payload====>\", payload);\npayload.data = {};\npayload.data.showApprover = payload.error === 'process_approval_error_needToChooseApprover'\n\nif (payload.state === 'FAILURE') {\n  if (payload.data.showApprover) {\n    payload.msg = \"请选择下一位批准人\";\n  } else { \n    payload.msg = window.t(payload.error)\n  }\n}\n\n\nreturn payload;",
                                                        "responseData": {
                                                            "&": "$$"
                                                        },
                                                        "headers": {
                                                            "Authorization": "Bearer ${context.tenantId},${context.authToken}"
                                                        }
                                                    },
                                                    "debug": false,
                                                    "onEvent": {
                                                        "submitSucc": {
                                                          "weight": 0,
                                                          "actions": [
                                                            {
                                                              "actionType": "custom",
                                                              "script": `
                                                                doAction({
                                                                    "actionType": "broadcast",
                                                                    "args": {
                                                                    "eventName": \`@data.changed.\${event.data.objectName}\`
                                                                    },
                                                                    "data": {
                                                                        "objectName": \`\${event.data.objectName}\`
                                                                    }
                                                                  });
                                                              `
                                                            }
                                                          ]
                                                        }
                                                    }
                                                }
                                            ],
                                            "id": "u:7a3f92e56805",
                                            "closeOnEsc": false,
                                            "closeOnOutside": false,
                                            "showCloseButton": true,
                                            "size": "md"
                                        }
                                    }
                                ],
                                "weight": 0
                            }
                        }
                    }
                ],
                "regions": [
                    "body"
                ],
                "data": {
                },
                "bodyClassName": "p-0",
                "id": "u:50444554a302"
            }
        }
    },
    triggers: {
        "before.insert.client.default": {
            on: "client",
            when: "before.insert",
            todo: function (userId, doc) {
                return doc.space = Session.get("spaceId");
            }
        }
    }
};