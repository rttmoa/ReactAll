AutoForm.addInputType("coreform-multiSelect", {
  template: "afCheckboxGroupInlineSteedos",
  valueIsArray: true,
  valueIn: function (val, atts) {
    if (typeof val === "string")
      return val ? val.split(",") : [];
    else
      return val
  },
  valueOut: function () {
    var val = [];
    this.find('input[type=checkbox]').each(function () {
      if ($(this).is(":checked")) {
        val.push($(this).val());
      }
    });
    return val;
  },
  contextAdjust: function (context) {
    var itemAtts = _.omit(context.atts);

    // build items list
    context.items = [];

    // Add all defined options
    _.each(context.selectOptions, function(opt) {
      context.items.push({
        name: context.name,
        label: opt.label,
        value: opt.value,
        // _id must be included because it is a special property that
        // #each uses to track unique list items when adding and removing them
        // See https://github.com/meteor/meteor/issues/2174
        _id: opt.value,
        selected: (_.contains(context.value, opt.value)),
        atts: itemAtts
      });
    });

    return context;
  }
});

Template.afCheckboxGroupInlineSteedos.helpers({
  atts: function selectedAttsAdjust() {
    var atts = _.clone(this.atts);
    if (this.selected) {
      atts.checked = "";
    }
    // remove data-schema-key attribute because we put it
    // on the entire group
    delete atts["data-schema-key"];
    return atts;
  },
  dsk: function dsk() {
    return {
      "data-schema-key": this.atts["data-schema-key"]
    };
  },
  isReadOnly: function isReadOnly() {
    var atts = _.clone(this.atts);
    if(atts.hasOwnProperty("disabled") || atts.hasOwnProperty("readonly")){
      return true;
    }
    return false;
  },
  readonlyLabel: function readonlyLabel() {
    var value = this.value;
    var labels = [];
    this.selectOptions.forEach(function(item){
      if(value.indexOf(item.value) > -1){
        labels.push(item.label);
      }
    });
    return labels.join(",");
  }
});
