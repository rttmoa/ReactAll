---
sidebar_position: 1
---

# Field Types

Steedos supports many different field types. Pick the right type, or convert an existing one.

When you have data that doesn’t match any of the standard fields, your administrator can create a custom field for that data. For example, use a Middle Name field for contacts.

The first step in creating a custom field is choosing the type of the field. This table includes a description of each custom field type. 



TYPE | DESCRIPTION
-- | --
Auto Number | Automatically assigns a unique number to each record. The maximum length of any auto-number field is 30 characters, 20 of which are reserved for prefix or suffix text. 
Checkbox | Allows users to check a box, indicating a true or false attribute of a record. When using a checkbox field for a report or list view filter, use “True” for checked values and “False” for unchecked values. The Data Import Wizard and the weekly export tool use “1” for checked values and “0” for unchecked values.
Currency | Allows users to enter a currency amount. The system automatically formats the field as a currency amount. This formatting is useful if you export data to a spreadsheet application. Steedos uses the round-half-to-even tie-breaking rule for currency fields. For example, 23.5 becomes 24, 22.5 becomes 22, −22.5 becomes −22, and −23.5 becomes −24.Values lose precision after 15 decimal places.
Date | Allows users to enter a date or pick a date from a popup calendar. In reports, you can limit the data by specific dates using any custom date field.
Date/Time | Allows users to enter a date or pick a date from a popup calendar and enter a time of day. .
Email | Allows users to enter an email address of up to 80 characters, which is validated to ensure proper format. If this field is specified for contacts or leads, users can choose the address when clicking Send an Email.You can't use custom email addresses for mass emails or list emails.Emails sent to a record's custom email address fields aren't logged against that record.This field can be encrypted using Shield Platform Encryption.
Formula | Allows users to automatically calculate values based on other values or fields such as merge fields. Steedos uses the round half up tie-breaking rule for numbers in formula fields. For example, 12.345 becomes 12.35 and −12.345 becomes −12.35.
Lookup Relationship | Creates a relationship between two records so you can associate them with each other. For example, opportunities have a lookup relationship with cases that lets you associate a particular case with an opportunity.On a standard or custom object, a lookup relationship creates a field that allows users to click a lookup icon and select another record from a window. On the parent record, you can display a related list to show all the records that are linked to it.
Master-Detail Relationship | Creates a relationship between records where the master record controls certain behaviors of the detail record such as record deletion and security. 
Number | Allows users to enter any number. This number is treated as a real number and any leading zeros are removed.Steedos uses the round half up tie-breaking rule for number fields. For example, 12.345 becomes 12.35 and −12.345 becomes −12.34.Steedos rounds numbers referenced in merge fields according to the user’s locale, not the number of decimal spaces specified in the number field configuration.
Percent | Allows users to enter a percentage number as a decimal—for example, 0.10. The system automatically converts the decimal to a percentage—for example, 10%Values lose precision after 15 decimal places. Also, if you enter a value with more than 15 decimal places and add a percent sign to the number, a runtime error occurs.
Picklist | Lets users select a single value from a list that you define.
Picklist (Multi-select) | Allows users to select more than one picklist value from a list that you define. These fields display each value separated by a semicolon.
Roll-Up Summary | Automatically displays the record count of related records or calculates the sum, minimum, or maximum value of related records. The records must be directly related to the selected record and on the detail side of a custom master-detail relationship with the object that contains the roll-up summary field. For example, a custom field called “Total Number of Guests” displays the number of guest custom object records in the Guests related list. 
Text | Allows users to enter any combination of letters, numbers, or symbols. You can set a maximum length, up to 255 characters.This field can be encrypted using Shield Platform Encryption.
Text Area | Allows users to enter up to 255 characters that display on separate lines similar to a Description field.
Text Area (Long) | Allows users to enter up to 131,072 characters that display on separate lines similar to a Description field. You can set the length of this field type to a lower limit, if desired. Any length from 256 to 131,072 characters is allowed. The default is 32,768 characters. Every time you press Enter within a long text area field, a line break, and a return character are added to the text. These two characters count toward the 131,072 character limit. This data type isn’t available for activities or products on opportunities. The first 999 characters in a standard rich text area or a long text area are displayed in a report. For custom fields, only the first 255 characters are displayed. If you download the report as Details Only, the entire field is available.This field can be encrypted using Shield Platform Encryption.
Text Area (Rich) | With the use of a toolbar, users can format the field content and add images and hyperlinks. The toolbar allows the user to undo, redo, bold, italicize, underline, strike-out, add a hyperlink, upload or link to an image, modify alignment, add a numbered or non-numbered list, indent, and outdent. The maximum field size is 131,072 characters, inclusive of all the formatting and HTML tags. The first 999 characters in a standard rich text area or a long text area are displayed in a report. For custom fields, only the first 255 characters are displayed. If you download the report as Details Only, the entire field is available. The maximum size for uploaded images is 1 MB. Only gif, jpeg, and png file types are supported. 
Time | Allows users to enter a time of day, including hours, minutes, second, and milliseconds. Append a “Z” at the end to denote Greenwich Mean Time (GMT).17:30:45.125, 17:30:45, 17:30, and 17:30:45Z are all examples of valid entries. The time displays in a 12-hour notation with AM or PM. The displayed time depends on the Locale setting on the Company Information page in Setup.
URL | Allows users to enter up to 255 characters of any valid website address. Only the first 50 characters are displayed on the record detail pages. 
