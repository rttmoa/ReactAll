---
sidebar_position: 3
---

# Auto Number Field

Automatically assigns a unique number to each record. The maximum length of any auto-number field is 30 characters, 20 of which are reserved for prefix or suffix text. 

## Auto-Number Formatting Examples

Use these examples when setting the display format for auto-number fields.

FORMAT | DISPLAYED VALUES
-- | --
{0} | 3 66 103
{000} | 003 066 103
Sample- {00000} | Sample- 00003 Sample- 00666 Sample- 10023
Value- {00} {MM} {DD} {YY} | Value- 03 12 02 04 Value- 76 03 03 04 Value- 123 11 09 04
PO #{0} {MM}-{DD}-{YY} | PO #12233 12-20-04 PO #25 06-07-04 PO #3 07-07-04

