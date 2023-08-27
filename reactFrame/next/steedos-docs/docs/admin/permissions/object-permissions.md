---
sidebar_position: 5
---

# Object Permissions

Object permissions specify the base-level access users have to create, read, edit, and delete records for each object. You can manage object permissions in permission sets and profiles.

The following permissions specify the access that users have to objects.

PERMISSION | DESCRIPTION
-- | -- 
Read | Users can only view records of this type.
Create | Users can read and create records.
Edit | Users can read and update records. 
Delete | Users can read, edit, and delete records.
View All | Users can view all records associated with this object, regardless of sharing settings.
Modify All | Users can read, edit, delete, transfer, and approve all records associated with this object, regardless of sharing settings.


<!-- 

## 对象权限

华炎魔方权限引擎是基于权限集来计算用户对每一个对象的相关权限的，所以我们首先需要配置的就是对象权限以便实现对象级的权限控制。

在简档和权限集里，都可以设置对象权限，还可以直接在对象设置界面直接配置该对象的对象权限。 我们推荐在”设置“应用中进入”公司设置→简档/权限集“界面，找到并进入要设置对象权限的简档或权限集记录详细界面，在”对象权限“子表中新建或编辑某条对象权限记录来配置对象权限。

以下权限功能描述将基于我们假设已经创建了一个名为”合同管理员“的权限集，并且需要为该权限集下的用户配置”合同“对象权限。

### 增删改查

在对象权限记录的新建或编辑界面可以设置指定简档或权限集下的用户对该对象的基本操作权限。

* **允许查看** 勾选后，该权限集下的用户可以但仅限于查看所有者为自己合同记录。
* **允许创建** 勾选后，该权限集下的用户可以创建合同记录。
* **允许编辑** 勾选后，该权限集下的用户可以但仅限于编辑所有者为自己合同记录。
* **允许删除** 勾选后，该权限集下的用户可以但仅限于删除所有者为自己合同记录。
* **查看所有记录** 勾选后，该权限集下的用户可以查看所有的合同记录。
* **修改所有记录** 勾选后，该权限集下的用户可以编辑和删除所有的合同记录。

用户创建记录时，记录所有者字段值默认为当前登录用户，即默认情况下记录创建人就是记录所有者，也就是说默认情况下，除非用户有查看或修改所有记录权限，否则他最多只能查看或编辑自己创建的记录。

### 列表视图权限

在对象权限记录的新建或编辑界面可以设置指定简档或权限集下的用户禁止查看该对象下的某些列表视图。

* **禁用列表视图** 选择希望禁用的列表视图，表示该权限集下的用户在合同对象列表上将看不到被禁用的列表视图选项。

### 附件权限

我们可以在对象设置界面勾选”允许上传附件“开关来放开对象的上传附件功能，该功能放开后，用户就可以在合同记录详细界面的附件子表上上传附件了。

在较早版本的华炎魔方中，放开合同对象的附件功能后，用户是否可以在合同记录详细界面上传、修改及删除附件取决于用户是否有附件所属主表记录，也就是当前合同记录的修改权限。

现在我们增强了这部分权限功能，可以在对象权限记录的新建或编辑界面配置更多与附件功能相关的权限。

* **允许查看附件** 勾选后，该权限集下的用户只可以在合同记录详细界面查看自己上传的附件。
* **允许创建附件** 勾选后，该权限集下的用户可以在合同记录详细界面上传附件。
* **允许修改附件** 勾选后，该权限集下的用户只可以在合同记录详细界面修改自己上传的附件信息。
* **允许删除附件** 勾选后，该权限集下的用户只可以在合同记录详细界面删除自己上传的附件。
* **查看所有附件** 勾选后，该权限集下的用户只可以在合同记录详细界面查看所有附件。
* **修改所有附件** 勾选后，该权限集下的用户只可以在合同记录详细界面修改所有附件。


--->