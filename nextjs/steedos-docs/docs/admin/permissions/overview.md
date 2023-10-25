---
title: Control Who Sees What
sidebar_position: 1
---

Steedos data sharing lets you expose specific data sets to individuals and groups of users. Permission sets, permission set groups, and profiles provide object-level and field-level security by controlling access. Record-level sharing settings, user roles, and sharing rules control the individual records that users can view and edit.

![权限引擎 示意图](https://console.steedos.cn/api/files/images/hiRT2YQZYjKPvqL6o "权限引擎 示意图")

### Object-Level Security (Permission Sets and Profiles)

Object-level security—or object permissions—provide the bluntest way to control data access. You can prevent a user from seeing, creating, editing, or deleting any instance of a particular object type, such as a lead or opportunity, by using object permissions. You can hide tabs and objects from selected users, so that they don’t even know that type of data exists.

You can specify object permissions in permission sets and profiles. Permission sets and profiles are collections of settings and permissions that determine what a user can do in the application. The settings are similar to a group in a Windows network, where the members of the group have the same folder permissions and access to the same software.

Typically, profiles are defined by a user’s job function, such as Salesforce admin or sales representative. You can assign one profile to many users, but you can assign only one profile per user. You can use permission sets to grant more permissions and access settings to users. Now it’s easier to manage users’ permissions and access because you can assign multiple permission sets to a single user.

### Field-Level Security (Permission Sets and Profiles)

Sometimes you want users to have access to an object while limiting their access to individual fields in that object. Field-level security—or field permissions—control whether a user can see, edit, and delete the value for a particular field on an object. You can protect sensitive fields without hiding the entire object. You also can control field permissions in permission sets and profiles.

Field permissions control the visibility of fields in any part of the app, including related lists, list views, reports, and search results. To ensure that a user can’t access a particular field, use field permissions. No other settings provide as much protection for a field. Page layouts only control the visibility of fields on detail and edit pages.

### Record-Level Security (Sharing)

After setting object- and field-level access permissions, you can configure access settings for records. Record-level security lets you give users access to some object records, but not others. Every record is owned by a user or a queue. The owner has full access to the record. In a hierarchy, users higher in the hierarchy always have the same access to users below them in the hierarchy. This access applies to records owned by users and records shared with them.

#### Sharing rules

With sharing rules you can make automatic exceptions to organization-wide sharing settings for sets of users. Use sharing rules to give these users access to records they don’t own or can’t normally see. Sharing rules, like role hierarchies, are only used to give more users access to records—they can’t be stricter than your organization-wide default settings.

#### Restriction rules

When a restriction rule is applied to a user, the data that they had read access to via your sharing settings is further scoped to only records matching the record criteria that you set. This behavior is similar to how you can filter results in a list view or report, except that it’s permanent.

#### Trigger managed permissions

If sharing rules and manual sharing don’t provide the required control, you can use trigger managed sharing. trigger managed sharing allows developers to programmatically share custom objects.
