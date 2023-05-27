clone = require('clone')

baseBooleanPermissionPropNames = ["allowCreate", "allowDelete", "allowEdit", "allowRead", "modifyAllRecords", "viewAllRecords", "modifyCompanyRecords", "viewCompanyRecords", 
	"allowReadFiles", "allowEditFiles", "allowCreateFiles", "allowDeleteFiles", "viewAllFiles", "modifyAllFiles"] 
otherPermissionPropNames = ["disabled_list_views", "disabled_actions", "unreadable_fields", "uneditable_fields", "unrelated_objects", "uneditable_related_list"]
permissionPropNames = _.union baseBooleanPermissionPropNames, otherPermissionPropNames

Creator.getPermissions = (object_name, spaceId, userId)->
	if Meteor.isClient
		if !object_name
			object_name = Session.get("object_name")
		obj = Creator.getObject(object_name)
		if !obj
			return
		return obj.permissions.get()
	else if Meteor.isServer
		Creator.getObjectPermissions(spaceId, userId, object_name)

Creator.getRecordPermissions = (object_name, record, userId, spaceId)->
	if !object_name and Meteor.isClient
		object_name = Session.get("object_name")

	if !spaceId and Meteor.isClient
		spaceId = Session.get("spaceId")
	
	# 附件权限不再与其父记录编辑配置关联
	# if record and object_name == "cms_files" and Meteor.isClient
	# 	# 如果是cms_files附件，则权限取其父记录权限
	# 	if object_name == Session.get('object_name')
	# 		# 当前处于cms_files附件详细界面
	# 		object_name = record.parent['reference_to._o'];
	# 		record_id = record.parent._id;
	# 	else 
	# 		# 当前处于cms_files附件的父记录界面
	# 		object_name = Session.get('object_name');
	# 		record_id = Session.get("record_id");
	# 	object_fields_keys = _.keys(Creator.getObject(object_name, spaceId)?.fields or {}) || [];
	# 	select = _.intersection(object_fields_keys, ['owner', 'company_id', 'company_ids', 'locked']) || [];
	# 	if select.length > 0
	# 		record = Creator.getObjectRecord(object_name, record_id, select.join(','));
	# 	else
	# 		record = null;

	permissions = _.clone(Creator.getPermissions(object_name, spaceId, userId))

	if record
		if !_.isEmpty(record.record_permissions)
			return record.record_permissions

		isOwner = record.owner == userId || record.owner?._id == userId

		if object_name == "cms_files"
			# 附件的查看所有修改所有权限与附件对象的viewAllRecords、modifyAllRecords无关，只与其主表记录的viewAllFiles和modifyAllFiles有关
			# 如果是cms_files附件，则权限需要额外考虑其父对象上关于附件的权限配置
			masterObjectName = record.parent['reference_to._o'];
			masterRecordPerm = Creator.getPermissions(masterObjectName, spaceId, userId)
			permissions.allowCreate = permissions.allowCreate && masterRecordPerm.allowCreateFiles
			permissions.allowEdit = permissions.allowEdit && masterRecordPerm.allowEditFiles
			permissions.allowDelete = permissions.allowDelete && masterRecordPerm.allowDeleteFiles
			if !masterRecordPerm.modifyAllFiles and !isOwner
				permissions.allowEdit = false
				permissions.allowDelete = false
			permissions.allowRead = permissions.allowRead && masterRecordPerm.allowReadFiles
			if !masterRecordPerm.viewAllFiles and !isOwner
				permissions.allowRead = false
		else
			if Meteor.isClient
				user_company_ids = Steedos.getUserCompanyIds()
			else
				user_company_ids = Creator.getUserCompanyIds(userId, spaceId)
			record_company_id = record?.company_id
			if record_company_id and _.isObject(record_company_id) and record_company_id._id
				# 因record_company_id是lookup类型，有可能dx控件会把它映射转为对应的object，所以这里取出其_id值
				record_company_id = record_company_id._id
			record_company_ids = record?.company_ids
			if record_company_ids and record_company_ids.length and _.isObject(record_company_ids[0])
				# 因record_company_ids是lookup类型，有可能dx控件会把它映射转为对应的[object]，所以这里取出其_id值
				record_company_ids = record_company_ids.map((n)-> n._id)
			record_company_ids = _.union(record_company_ids, [record_company_id])
			if !permissions.modifyAllRecords and !isOwner and !permissions.modifyCompanyRecords
				permissions.allowEdit = false
				permissions.allowDelete = false
			else if !permissions.modifyAllRecords and permissions.modifyCompanyRecords
				if record_company_ids and record_company_ids.length
					if user_company_ids and user_company_ids.length
						if !_.intersection(user_company_ids, record_company_ids).length
							# 记录的company_id/company_ids属性不在当前用户user_company_ids范围内时，认为无权修改
							permissions.allowEdit = false
							permissions.allowDelete = false
					else
						# 记录有company_id/company_ids属性，但是当前用户user_company_ids为空时，认为无权修改
						permissions.allowEdit = false
						permissions.allowDelete = false
			
			if record.locked and !permissions.modifyAllRecords
				permissions.allowEdit = false
				permissions.allowDelete = false

			if !permissions.viewAllRecords and !isOwner and !permissions.viewCompanyRecords
				permissions.allowRead = false
			else if !permissions.viewAllRecords and permissions.viewCompanyRecords
				if record_company_ids and record_company_ids.length
					if user_company_ids and user_company_ids.length
						if !_.intersection(user_company_ids, record_company_ids).length
							# 记录的company_id/company_ids属性不在当前用户user_company_ids范围内时，认为无权查看
							permissions.allowRead = false
					else
						# 记录有company_id属性，但是当前用户user_company_ids为空时，认为无权查看
						permissions.allowRead = false
	
	return permissions


# currentObjectName：当前主对象
# relatedListItem：Creator.getRelatedList(Session.get("object_name"), Session.get("record_id"))中取related_object_name对应的值
# currentRecord当前主对象的详细记录
if Meteor.isClient
	Creator.getRecordRelatedListPermissions = (currentObjectName, relatedListItem, currentRecord, userId, spaceId)->
		if !currentObjectName and Meteor.isClient
			currentObjectName = Session.get("object_name")

		if !relatedListItem
			console.error("relatedListItem must not be empty for the function Creator.getRecordRelatedListPermissions");
			return {}

		if !currentRecord and Meteor.isClient
			currentRecord = Creator.getObjectRecord()

		if !userId and Meteor.isClient
			userId = Meteor.userId()

		if !spaceId and Meteor.isClient
			spaceId = Session.get("spaceId")

		masterRecordPerm = Creator.getRecordPermissions(currentObjectName, currentRecord, userId, spaceId)
		relatedObjectPermissions = Creator.getPermissions(relatedListItem.object_name)
		result = _.clone relatedObjectPermissions

		if relatedListItem.is_file
			result.allowCreate = relatedObjectPermissions.allowCreate && masterRecordPerm.allowCreateFiles
			result.allowEdit = relatedObjectPermissions.allowEdit && masterRecordPerm.allowEditFiles
		else
			write_requires_master_read = relatedListItem.write_requires_master_read || false
			masterAllow = false
			if write_requires_master_read == true
				masterAllow = masterRecordPerm.allowRead
			else if write_requires_master_read == false
				masterAllow = masterRecordPerm.allowEdit

			uneditable_related_list = Creator.getRecordSafeRelatedList(currentRecord, currentObjectName)
			isRelateObjectUneditable = uneditable_related_list.indexOf(relatedListItem.object_name) > -1

			result.allowCreate = masterAllow && relatedObjectPermissions.allowCreate && !isRelateObjectUneditable
			result.allowEdit = masterAllow && relatedObjectPermissions.allowEdit && !isRelateObjectUneditable
		return result

if Meteor.isServer

	Creator.getAllPermissions = (spaceId, userId) ->
		permissions =
			objects: {}
			assigned_apps: []
		###
		权限集说明:
		内置权限集-admin,user,member,guest,workflow_admin,organization_admin
		自定义权限集-数据库中新建的除内置权限集以外的其他权限集
		特定用户集合权限集（即users属性不可配置）-admin,user,member,guest
		可配置用户集合权限集（即users属性可配置）-workflow_admin,organization_admin以及自定义权限集
		###

		isSpaceAdmin = false
		spaceUser = null
		if userId
			isSpaceAdmin = Creator.isSpaceAdmin(spaceId, userId)
			spaceUser = Creator.getCollection("space_users").findOne({ space: spaceId, user: userId }, { fields: { profile: 1 } })

		psetsAdmin = Creator.getCollection("permission_set").findOne({space: spaceId, name: 'admin'}, {fields:{_id:1, assigned_apps:1}}) || null
		psetsUser = Creator.getCollection("permission_set").findOne({space: spaceId, name: 'user'}, {fields:{_id:1, assigned_apps:1}}) || null
		psetsMember = Creator.getCollection("permission_set").findOne({space: spaceId, name: 'member'}, {fields:{_id:1, assigned_apps:1}}) || null
		psetsGuest = Creator.getCollection("permission_set").findOne({space: spaceId, name: 'guest'}, {fields:{_id:1, assigned_apps:1}}) || null

		psetsSupplier = Creator.getCollection("permission_set").findOne({space: spaceId, name: 'supplier'}, {fields:{_id:1, assigned_apps:1}}) || null
		psetsCustomer = Creator.getCollection("permission_set").findOne({space: spaceId, name: 'customer'}, {fields:{_id:1, assigned_apps:1}}) || null
		if spaceUser && spaceUser.profile
			psetsCurrent = Creator.getCollection("permission_set").find({space: spaceId, $or: [{users: userId}, {name: spaceUser.profile}]}, {fields:{_id:1, assigned_apps:1, name:1}}).fetch()
		else
			psetsCurrent = Creator.getCollection("permission_set").find({users: userId, space: spaceId}, {fields:{_id:1, assigned_apps:1, name:1}}).fetch()

		psetsAdmin_pos = null
		psetsUser_pos = null
		psetsMember_pos = null
		psetsGuest_pos = null
		psetsCurrent_pos = null
		psetsSupplier_pos = null
		psetsCustomer_pos = null

		if psetsAdmin?._id
			psetsAdmin_pos = Creator.getCollection("permission_objects").find({permission_set_id: psetsAdmin._id}, {fields: {created: 0, modified: 0, created_by: 0, modified_by: 0}}).fetch()
		if psetsUser?._id
			psetsUser_pos = Creator.getCollection("permission_objects").find({permission_set_id: psetsUser._id}, {fields: {created: 0, modified: 0, created_by: 0, modified_by: 0}}).fetch()
		if psetsMember?._id
			psetsMember_pos = Creator.getCollection("permission_objects").find({permission_set_id: psetsMember._id}, {fields: {created: 0, modified: 0, created_by: 0, modified_by: 0}}).fetch()
		if psetsGuest?._id
			psetsGuest_pos = Creator.getCollection("permission_objects").find({permission_set_id: psetsGuest._id}, {fields: {created: 0, modified: 0, created_by: 0, modified_by: 0}}).fetch()
		if psetsSupplier?._id
			psetsSupplier_pos = Creator.getCollection("permission_objects").find({permission_set_id: psetsSupplier._id}, {fields: {created: 0, modified: 0, created_by: 0, modified_by: 0}}).fetch()
		if psetsCustomer?._id
			psetsCustomer_pos = Creator.getCollection("permission_objects").find({permission_set_id: psetsCustomer._id}, {fields: {created: 0, modified: 0, created_by: 0, modified_by: 0}}).fetch()

		if psetsCurrent.length > 0
			set_ids = _.pluck psetsCurrent, "_id"
			psetsCurrent_pos = Creator.getCollection("permission_objects").find({permission_set_id: {$in: set_ids}}).fetch()
			psetsCurrentNames = _.pluck psetsCurrent, "name"
		psets = {
			psetsAdmin, 
			psetsUser, 
			psetsCurrent, 
			psetsMember, 
			psetsGuest,
			psetsSupplier,
			psetsCustomer,
			isSpaceAdmin,
			spaceUser, 
			psetsAdmin_pos, 
			psetsUser_pos, 
			psetsMember_pos, 
			psetsGuest_pos,
			psetsSupplier_pos,
			psetsCustomer_pos,
			psetsCurrent_pos
		}
		permissions.assigned_apps = Creator.getAssignedApps.bind(psets)(spaceId, userId)
		permissions.assigned_menus = Creator.getAssignedMenus.bind(psets)(spaceId, userId)
		permissions.user_permission_sets = psetsCurrentNames
		_i = 0
		_.each Creator.objectsByName, (object, object_name)->
			_i++
			if !_.has(object, 'space') || !object.space || object.space == spaceId
				if !_.has(object, 'in_development') || object.in_development == '0' || (object.in_development != '0' && isSpaceAdmin)
					permissions.objects[object_name] = Creator.convertObject(clone(Creator.Objects[object_name]), spaceId)
					permissions.objects[object_name]["permissions"] = Creator.getObjectPermissions.bind(psets)(spaceId, userId, object_name)
		return permissions

	unionPlus = (array, other) ->
		if !array and !other
			return undefined
		if !array
			array = []
		if !other
			other = []
		return _.union(array, other)

	intersectionPlus = (array, other) ->
		if !array and !other
			return undefined
		if !array
			array = []
		if !other
			other = []
		return _.intersection(array, other)

	extendPermissionProps = (target, props) ->
		propNames = permissionPropNames
		filesProNames = 
		if props
			_.each propNames, (propName) ->
				target[propName] = props[propName]

			# target.allowCreate = props.allowCreate
			# target.allowDelete = props.allowDelete
			# target.allowEdit = props.allowEdit
			# target.allowRead = props.allowRead
			# target.modifyAllRecords = props.modifyAllRecords
			# target.viewAllRecords = props.viewAllRecords
			# target.modifyCompanyRecords = props.modifyCompanyRecords
			# target.viewCompanyRecords = props.viewCompanyRecords
			# target.disabled_list_views = props.disabled_list_views
			# target.disabled_actions = props.disabled_actions
			# target.unreadable_fields = props.unreadable_fields
			# target.uneditable_fields = props.uneditable_fields
			# target.unrelated_objects = props.unrelated_objects
			# target.uneditable_related_list = props.uneditable_related_list

	overlayBaseBooleanPermissionProps = (target, props) ->
		propNames = baseBooleanPermissionPropNames
		_.each propNames, (propName) ->
			if props[propName]
				target[propName] = true
		
		# if po.allowRead
		# 	permissions.allowRead = true
		# if po.allowCreate
		# 	permissions.allowCreate = true
		# if po.allowEdit
		# 	permissions.allowEdit = true
		# if po.allowDelete
		# 	permissions.allowDelete = true
		# if po.modifyAllRecords
		# 	permissions.modifyAllRecords = true
		# if po.viewAllRecords
		# 	permissions.viewAllRecords = true
		# if po.modifyCompanyRecords
		# 	permissions.modifyCompanyRecords = true
		# if po.viewCompanyRecords
		# 	permissions.viewCompanyRecords = true


	Creator.getAssignedApps = (spaceId, userId)->
		psetsAdmin = this.psetsAdmin || Creator.getCollection("permission_set").findOne({space: spaceId, name: 'admin'}, {fields:{_id:1, assigned_apps:1}})
		psetsUser = this.psetsUser || Creator.getCollection("permission_set").findOne({space: spaceId, name: 'user'}, {fields:{_id:1, assigned_apps:1}})
		psetsSupplier = this.psetsMember || Creator.getCollection("permission_set").findOne({space: spaceId, name: 'supplier'}, {fields:{_id:1, assigned_apps:1}})
		psetsCustomer = this.psetsGuest || Creator.getCollection("permission_set").findOne({space: spaceId, name: 'customer'}, {fields:{_id:1, assigned_apps:1}})
		# psetsMember = this.psetsMember || Creator.getCollection("permission_set").findOne({space: spaceId, name: 'member'}, {fields:{_id:1, assigned_apps:1}})
		# psetsGuest = this.psetsGuest || Creator.getCollection("permission_set").findOne({space: spaceId, name: 'guest'}, {fields:{_id:1, assigned_apps:1}})
		spaceUser = null;
		if userId
			spaceUser = Creator.getCollection("space_users").findOne({ space: spaceId, user: userId }, { fields: { profile: 1 } })
		if spaceUser && spaceUser.profile
			psets = Creator.getCollection("permission_set").find({space: spaceId, $or: [{users: userId}, {name: spaceUser.profile}]}, {fields:{_id:1, assigned_apps:1, name:1}}).fetch()
		else
			psets = Creator.getCollection("permission_set").find({users: userId, space: spaceId}, {fields:{_id:1, assigned_apps:1, name:1}}).fetch()
		isSpaceAdmin = if _.isBoolean(this.isSpaceAdmin) then this.isSpaceAdmin else Creator.isSpaceAdmin(spaceId, userId)
		apps = []
		if isSpaceAdmin
			return []
		else
			userProfile = Creator.getCollection("space_users").findOne({space: spaceId, user: userId}, {fields: {profile: 1}})?.profile
			psetBase = psetsUser
			if userProfile
				if userProfile == 'supplier'
					psetBase = psetsSupplier
				else if userProfile == 'customer'
					psetBase = psetsCustomer
			if psetBase?.assigned_apps?.length
				apps = _.union apps, psetBase.assigned_apps
			else
				# user权限集中的assigned_apps表示所有用户具有的apps权限，为空则表示有所有apps权限，不需要作权限判断了
				return []
			_.each psets, (pset)->
				if !pset.assigned_apps
					return
				if pset.name == "admin" ||  pset.name == "user" || pset.name == 'supplier' || pset.name == 'customer'
					# 这里之所以要排除admin/user，是因为这两个权限集是所有权限集中users属性无效的权限集，特指工作区管理员和所有用户
					return
				apps = _.union apps, pset.assigned_apps
			return _.without(_.uniq(apps),undefined,null)

	Creator.getAssignedMenus = (spaceId, userId)->
		psets =  this.psetsCurrent || Creator.getCollection("permission_set").find({users: userId, space: spaceId}, {fields:{_id:1, assigned_apps:1, name:1}}).fetch()
		isSpaceAdmin = if _.isBoolean(this.isSpaceAdmin) then this.isSpaceAdmin else Creator.isSpaceAdmin(spaceId, userId)
		adminMenus = Creator.Apps.admin?.admin_menus
		# 如果没有admin菜单说明不需要相关功能，直接返回空
		unless adminMenus
			return []
		aboutMenu = adminMenus.find (n) ->
			n._id == 'about'
		adminMenus = adminMenus.filter (n) ->
			n._id != 'about'
		otherMenuApps = _.sortBy _.filter(_.values(Creator.Apps), (n) ->
			return n.admin_menus and n._id != 'admin'
		), 'sort'
		otherMenus = _.flatten(_.pluck(otherMenuApps, "admin_menus"))
		# 菜单有三部分组成，设置APP菜单、其他APP菜单以及about菜单
		allMenus = _.union(adminMenus, otherMenus, [aboutMenu])
		if isSpaceAdmin
			# 工作区管理员有全部菜单功能
			result = allMenus
		else
			userProfile = Creator.getCollection("space_users").findOne({space: spaceId, user: userId}, {fields: {profile: 1}})?.profile || 'user'
			currentPsetNames = psets.map (n) ->
				return n.name
			menus = allMenus.filter (menu)->
				psetsMenu = menu.permission_sets
				# 如果普通用户有权限，则直接返回true
				if psetsMenu && psetsMenu.indexOf(userProfile) > -1
					return true
				# 否则取当前用户的权限集与menu菜单要求的权限集对比，如果交集大于1个则返回true
				return _.intersection(currentPsetNames, psetsMenu).length
			result = menus
		
		return _.sortBy(result,"sort")

	findOne_permission_object = (permission_objects, object_name, permission_set_id)->

		if _.isNull(permission_objects)
			return null
		if _.isArray(permission_objects)
			return _.find permission_objects, (po)->
					return po.object_name == object_name
		return Creator.getCollection("permission_objects").findOne({object_name: object_name, permission_set_id: permission_set_id})

	find_permission_object = (permission_objects, object_name, permission_set_ids)->
		if _.isNull(permission_objects)
			return null
		if _.isArray(permission_objects)
			return _.filter permission_objects, (po)->
				return po.object_name == object_name
		Creator.getCollection("permission_objects").find({object_name: object_name, permission_set_id: {$in: permission_set_ids}}).fetch()

	unionPermissionObjects = (pos, object, psets)->
		# 把db及yml中的permission_objects合并，优先取db中的
		result = []
		_.each object.permission_set, (ops, ops_key)->
			# 把yml中除了特定用户集合权限集"admin", "user", "member", "guest"外的其他对象权限先存入result
			# if ["admin", "user", "member", "guest", "workflow_admin", "organization_admin"].indexOf(ops_key) < 0
			if ["admin", "user", "member", "guest"].indexOf(ops_key) < 0
				currentPset = psets.find (pset)-> return pset.name == ops_key
				if currentPset
					tempOps = _.clone(ops) || {}
					tempOps.permission_set_id = currentPset._id
					tempOps.object_name = object.object_name
					result.push tempOps
		if result.length
			pos.forEach (po)->
				repeatIndex = 0
				repeatPo = result.find((item, index)-> repeatIndex = index;return item.permission_set_id == po.permission_set_id)
				# 如果yml中已经存在po，则替换为数据库中的po，反之则把数据库中的po直接累加进去
				if repeatPo
					result[repeatIndex] = po
				else
					result.push po
			return result
		else
			return pos

	Creator.getObjectPermissions = (spaceId, userId, object_name)->
		permissions = {}
		object = Creator.getObject(object_name, spaceId)

		if spaceId is 'guest' || object_name == "users"
			permissions = _.clone(object.permission_set.guest) || {}
			Creator.processPermissions permissions
			return permissions
		psetsAdmin = if _.isNull(this.psetsAdmin) or this.psetsAdmin then this.psetsAdmin else Creator.getCollection("permission_set").findOne({space: spaceId, name: 'admin'}, {fields:{_id:1}})
		psetsUser = if _.isNull(this.psetsUser) or this.psetsUser then this.psetsUser else Creator.getCollection("permission_set").findOne({space: spaceId, name: 'user'}, {fields:{_id:1}})
		psetsMember = if _.isNull(this.psetsMember) or this.psetsMember then this.psetsMember else Creator.getCollection("permission_set").findOne({space: spaceId, name: 'member'}, {fields:{_id:1}})
		psetsGuest = if _.isNull(this.psetsGuest) or this.psetsGuest then this.psetsGuest else Creator.getCollection("permission_set").findOne({space: spaceId, name: 'guest'}, {fields:{_id:1}})

		psetsSupplier = if _.isNull(this.psetsSupplier) or this.psetsSupplier then this.psetsSupplier else Creator.getCollection("permission_set").findOne({space: spaceId, name: 'supplier'}, {fields:{_id:1}})
		psetsCustomer = if _.isNull(this.psetsCustomer) or this.psetsCustomer then this.psetsCustomer else Creator.getCollection("permission_set").findOne({space: spaceId, name: 'customer'}, {fields:{_id:1}})
		psets = this.psetsCurrent;
		if !psets
			spaceUser = null;
			if userId
				spaceUser = Creator.getCollection("space_users").findOne({ space: spaceId, user: userId }, { fields: { profile: 1 } })
			if spaceUser && spaceUser.profile
				psets = Creator.getCollection("permission_set").find({space: spaceId, $or: [{users: userId}, {name: spaceUser.profile}]}, {fields:{_id:1, assigned_apps:1, name:1}}).fetch()
			else
				psets = Creator.getCollection("permission_set").find({users: userId, space: spaceId}, {fields:{_id:1, assigned_apps:1, name:1}}).fetch()
		isSpaceAdmin = if _.isBoolean(this.isSpaceAdmin) then this.isSpaceAdmin else Creator.isSpaceAdmin(spaceId, userId)

		psetsAdmin_pos = this.psetsAdmin_pos
		psetsUser_pos = this.psetsUser_pos
		psetsMember_pos = this.psetsMember_pos
		psetsGuest_pos = this.psetsGuest_pos

		psetsSupplier_pos = this.psetsSupplier_pos
		psetsCustomer_pos = this.psetsCustomer_pos

		psetsCurrent_pos = this.psetsCurrent_pos

		opsetAdmin = _.clone(object.permission_set.admin) || {}
		opsetUser = _.clone(object.permission_set.user) || {}
		opsetMember = _.clone(object.permission_set.member) || {}
		opsetGuest = _.clone(object.permission_set.guest) || {}

		opsetSupplier = _.clone(object.permission_set.supplier) || {}
		opsetCustomer = _.clone(object.permission_set.customer) || {}

		# sharedListViews = Creator.getCollection('object_listviews').find({space: spaceId, object_name: object_name, shared: true}, {fields:{_id:1}}).fetch()
		# sharedListViews = _.pluck(sharedListViews,"_id")
		# if sharedListViews.length
		# 	unless opsetAdmin.list_views
		# 		opsetAdmin.list_views = []
		# 	opsetAdmin.list_views = _.union opsetAdmin.list_views, sharedListViews
		# 	unless opsetUser.list_views
		# 		opsetUser.list_views = []
		# 	opsetUser.list_views = _.union opsetUser.list_views, sharedListViews
		# 数据库中如果配置了默认的admin/user权限集设置，应该覆盖代码中admin/user的权限集设置
		if psetsAdmin
			posAdmin = findOne_permission_object(psetsAdmin_pos, object_name, psetsAdmin._id)
			extendPermissionProps opsetAdmin, posAdmin
		if psetsUser
			posUser = findOne_permission_object(psetsUser_pos, object_name, psetsUser._id)
			extendPermissionProps opsetUser, posUser
		if psetsMember
			posMember = findOne_permission_object(psetsMember_pos, object_name, psetsMember._id)
			extendPermissionProps opsetMember, posMember
		if psetsGuest
			posGuest = findOne_permission_object(psetsGuest_pos, object_name, psetsGuest._id)
			extendPermissionProps opsetGuest, posGuest
		if psetsSupplier
			posSupplier = findOne_permission_object(psetsSupplier_pos, object_name, psetsSupplier._id);
			extendPermissionProps opsetSupplier, posSupplier
		if psetsCustomer
			posCustomer = findOne_permission_object(psetsCustomer_pos, object_name, psetsCustomer._id);
			extendPermissionProps opsetCustomer, posCustomer

		if !userId
			permissions = opsetAdmin
		else
			if isSpaceAdmin
				permissions = opsetAdmin
			else
				if spaceId is 'common'
					permissions = opsetUser
				else
					spaceUser = if _.isNull(this.spaceUser) or this.spaceUser then this.spaceUser else Creator.getCollection("space_users").findOne({ space: spaceId, user: userId }, { fields: { profile: 1 } })
					if spaceUser
						prof = spaceUser.profile
						if prof
							if prof is 'user'
								permissions = opsetUser
							else if prof is 'member'
								permissions = opsetMember
							else if prof is 'guest'
								permissions = opsetGuest
							else if prof is 'supplier'
								permissions = opsetSupplier
							else if prof is 'customer'
								permissions = opsetCustomer
						else # 没有profile则认为是user权限
							permissions = opsetUser
					else
						permissions = opsetGuest
		if psets.length > 0
			set_ids = _.pluck psets, "_id"
			pos = find_permission_object(psetsCurrent_pos, object_name, set_ids)
			pos = unionPermissionObjects(pos, object, psets)
			_.each pos, (po)->
				if po.permission_set_id == psetsAdmin?._id or 
				po.permission_set_id == psetsUser?._id or 
				po.permission_set_id == psetsMember?._id or 
				po.permission_set_id == psetsGuest?._id or
				po.permission_set_id == psetsSupplier?._id or
				po.permission_set_id == psetsCustomer?._id
					# 默认的admin/user权限值只实行上面的默认值覆盖，不做算法判断
					return
				if _.isEmpty(permissions)
					permissions = po
				overlayBaseBooleanPermissionProps permissions, po

				permissions.disabled_list_views = intersectionPlus(permissions.disabled_list_views, po.disabled_list_views)
				permissions.disabled_actions = intersectionPlus(permissions.disabled_actions, po.disabled_actions)
				permissions.unreadable_fields = intersectionPlus(permissions.unreadable_fields, po.unreadable_fields)
				permissions.uneditable_fields = intersectionPlus(permissions.uneditable_fields, po.uneditable_fields)
				permissions.unrelated_objects = intersectionPlus(permissions.unrelated_objects, po.unrelated_objects)
				permissions.uneditable_related_list = intersectionPlus(permissions.uneditable_related_list, po.uneditable_related_list)
		
		if object.is_view
			permissions.allowCreate = false
			permissions.allowEdit = false
			permissions.allowDelete = false
			permissions.modifyAllRecords = false
			permissions.modifyCompanyRecords = false
			permissions.disabled_actions = []
		Creator.processPermissions permissions

		if object.permission_set.owner
			permissions.owner = object.permission_set.owner
		return permissions


	# Creator.initPermissions = (object_name) ->

		# # 应该把计算出来的
		# Creator.Collections[object_name].allow
		# 	insert: (userId, doc) ->
		# 		if !userId
		# 			return false
		# 		if !doc.space
		# 			return false
	    	# 		permissions = Creator.getObjectPermissions(doc.space, userId, object_name)
		# 		if !permissions.allowCreate
		# 			return false

		# 		return true
		# 	update: (userId, doc) ->
		# 		if !userId
		# 			return false
		# 		if !doc.space
		# 			return false
		# 		permissions = Creator.getObjectPermissions(doc.space, userId, object_name)
		# 		if !permissions.allowEdit
		# 			return false
		# 		return true
		# 	remove: (userId, doc) ->
		# 		if !userId
		# 			return false
		# 		if !doc.space
		# 			return false
		# 		permissions = Creator.getObjectPermissions(doc.space, userId, object_name)
		# 		if !permissions.allowDelete
		# 			return false
		# 		return true

	Meteor.methods
		# Calculate Permissions on Server
		"creator.object_permissions": (spaceId)->
			return Creator.getAllPermissions(spaceId, this.userId)
