module.exports = {
  download: function (object_name, record_id) {
    var file, fileId, ref;
    file = this.record;
    fileId = file != null ? (ref = file.versions) != null ? ref[0] : void 0 : void 0;
    var downloadProps ={
      download_url: Steedos.absoluteUrl("/api/files/files/" + fileId),
      file_name: file.name,
      file_size: file.size,
      object_name,
      record_id,
      file_id: fileId,
    }
    SteedosUI.downloadFile(downloadProps)
  },

  downloadVisible: function (object_name, record_id, record_permissions) {
    var fileRecord;
    if (object_name === Session.get('object_name')) {
      fileRecord = Creator.getObjectRecord();
      if (!fileRecord) {
        return false;
      }
    }
    return true;
  },

  online_preview: function (object_name, record_id) {
    var file, fileId, ref1, ref2, ref3, ref4, download_url, file_name;
    file = this.record;

    if (file != null ? file.versions : void 0) {
      fileId = file != null ? (ref1 = file.versions) != null ? ref1[0] : void 0 : void 0;
    } else {
      fileId = file != null ? (ref2 = file.__super) != null ? (ref3 = ref2.record) != null ? (ref4 = ref3.versions) != null ? ref4[0].value : void 0 : void 0 : void 0 : void 0;
    }
    
    download_url = window.location.origin + Steedos.absoluteUrl("/api/files/files/" + fileId + "/" + file.name);
    file_name = file.name;
    
    SteedosUI.previewFile({download_url, file_name, isPreviewButton:true});
  }
}