Template.instance_view_wrapper.helpers 
	instanceId: ->
		return Session.get("instanceId")
	isNeedToShowInstance: ->
		if Steedos.subs["Instance"].ready() && Steedos.subs["instance_data"].ready()
			Session.set("instance_loading", false);
			# $("body").removeClass("loading")
			instance = WorkflowManager.getInstance()

			if !instance || !instance.traces
				return false;

			if instance.flow_version && instance.form_version
				flow_version = db.flow_versions.findOne({_id: instance.flow_version})

				form_version = db.form_versions.findOne({_id: instance.form_version})

				if !flow_version || !form_version
					return false;

			if instance
				if Session.get("box") == "inbox"
					if InstanceManager.isInbox()
						return true
					else
						FlowRouter.go("/workflow/space/" + Session.get("spaceId") + "/" + Session.get("box") + "/")
				else
					return true
			else # 订阅完成 instance 不存在，则认为instance 已经被删除
				FlowRouter.go("/workflow/space/" + Session.get("spaceId") + "/" + Session.get("box") + "/")
		return false
