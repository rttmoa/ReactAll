---
sidebar_position: 5
---
# Object Relationships

Create relationships to link objects with each other, so that when your users view records, they can also see related data. For example, link a custom object called Bugs to cases to track product defects that are associated with customer cases.

You can define different types of relationships by creating custom relationship fields on an object. Before you begin creating relationships, determine the type of relationship that suits your needs.

Different types of relationships between objects in Steedos determine how they handle data deletion, sharing, and required fields in page layouts. Let’s review the types of relationships.

## Master-detail

Closely links objects together such that the master record controls certain behaviors of the detail and subdetail record. For example, you can define a two-object master-detail relationship, such as Account—Expense Report that extends the relationship to subdetail records, such as Account—Expense Report—Expense Line Item. You can then perform operations across the master—detail—subdetail relationship.

Behaviors of master-detail relationships:

- Deleting a detail record and leaves the master record intact; deleting a master record also deletes related detail and subdetail records. 
<!-- - By default, records can’t be reparented in master-detail relationships. Administrators can, however, allow child records in master-detail relationships on custom objects to be reparented to different parent records by selecting the Allow reparenting option in the master-detail relationship definition. -->
- The Owner field on the detail and subdetail records is automatically set to the owner of the master record. 
<!-- - Detail and subdetail records inherit security settings and permissions from the master record. You can’t set permissions on the detail record independently. -->
- The master-detail relationship field (which is the field linking the objects) is required on the page layout of the detail and subdetail records.
- The master object can be a standard object, such as Account or Opportunity, or a custom object.
- Each custom object can have up to two master-detail relationships.
<!-- - The Related To entry can’t be changed after you save the relationship. -->
<!-- - A profile or a permission set can have an entity, such as Account, with a master-detail relationship. A broken permission dependency exists if the child entity has permissions that the parent should have. Steedos updates the parent entity for a broken permission dependency on the first save action for the profile or permission set. -->

## Lookup

Links two objects together. Lookup relationships are similar to master-detail relationships, except they don’t support sharing or roll-up summary fields. With a lookup relationship, you can:

- Link two different objects.
- Link an object with itself . For example, link a custom object called Bug with itself to show how two different bugs are related to the same problem.

When you create a lookup relationship, you can set these options:

- Make the lookup field required for saving a record, requiring it on the corresponding page layout as well.
- If the lookup field is optional, you can specify one of three behaviors to occur if the lookup record is deleted:
  - Clear the value of this field: This is the default. Clearing the field is a good choice when the field doesn’t have to contain a value from the associated lookup record.
  - Don’t allow deletion of the lookup record that’s part of a lookup relationship: If you have dependencies built on the lookup relationship, such as a workflow rule, this option doesn’t allow the lookup record to be deleted.
  - Delete this record also: Available only if a custom object contains the lookup relationship, not if it’s contained by a standard object. However, the lookup object can be either standard or custom. Choose when the lookup field and its associated record are tightly coupled and you want to completely delete related data. For example, say that you have an expense report record with a lookup relationship to individual expense records. When you delete the report, you probably want to delete all the expense records, too.

When you define a lookup relationship, you can include a lookup field on the page layouts for that object and create a related list on the associated object's page layouts. For example, if you have a custom object called PTO Requests and you want your users to link a PTO request with the employee submitting the request, create a lookup relationship from the PTO Request custom object with the user object.

If the parent record in a lookup relationship is deleted, the field history tracking for the child record doesn't record the deletion. For example, if a parent account is deleted, the Account History related list for the child account doesn’t show the deletion.

When you delete an object used by a lookup field, delete the field, too. use Setup in the UI to delete the field first. Otherwise, the object can’t be deleted.