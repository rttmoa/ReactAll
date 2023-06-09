if (!CLOUDAWS)
  return;

const path = require('path');

// We use the official aws sdk


var validS3ServiceParamKeys = [
  'endpoint',
  'accessKeyId',
  'secretAccessKey',
  'sessionToken',
  'credentials',
  'credentialProvider',
  'region',
  'maxRetries',
  'maxRedirects',
  'sslEnabled',
  'paramValidation',
  'computeChecksums',
  's3ForcePathStyle',
  'httpOptions',
  'apiVersion',
  'apiVersions',
  'logger',
  'signatureVersion'
];
var validS3PutParamKeys = [
  'ACL',
  'Body',
  'Bucket',
  'CacheControl',
  'ContentDisposition',
  'ContentEncoding',
  'ContentLanguage',
  'ContentLength',
  'ContentMD5',
  'ContentType',
  'Expires',
  'GrantFullControl',
  'GrantRead',
  'GrantReadACP',
  'GrantWriteACP',
  'Key',
  'Metadata',
  'ServerSideEncryption',
  'StorageClass',
  'WebsiteRedirectLocation'
];

/**
 * @public
 * @constructor
 * @param {String} name - The store name
 * @param {Object} options
 * @param {String} options.region - Bucket region
 * @param {String} options.steedosBucket - Bucket name
 * @param {String} [options.accessKeyId] - AWS IAM key; required if not set in environment variables
 * @param {String} [options.secretAccessKey] - AWS IAM secret; required if not set in environment variables
 * @param {String} [options.ACL='private'] - ACL for objects when putting
 * @param {String} [options.folder='/'] - Which folder (key prefix) in the bucket to use
 * @param {Function} [options.beforeSave] - Function to run before saving a file from the server. The context of the function will be the `FS.File` instance we're saving. The function may alter its properties.
 * @param {Number} [options.maxTries=5] - Max times to attempt saving a file
 * @returns {FS.StorageAdapter} An instance of FS.StorageAdapter.
 *
 * Creates an S3 store instance on the server. Inherits from FS.StorageAdapter
 * type.
 */
FS.Store.STEEDOSCLOUD = function (name, opts) {
  var self = this;
  if (!(self instanceof FS.Store.STEEDOSCLOUD))
    throw new Error('FS.Store.STEEDOSCLOUD missing keyword "new"');

  opts = opts || {};
  var options = {
    ...opts
  }
  options.s3ForcePathStyle = true;

  // Determine which folder (key prefix) in the bucket to use
  var folder = options.folder;
  if (typeof folder === "string" && folder.length) {
    if (folder.slice(0, 1) === "/") {
      folder = folder.slice(1);
    }
    if (folder.slice(-1) !== "/") {
      folder += "/";
    }
  } else {
    folder = "";
  }

  var steedosBucket = options.steedosBucket || 's3-kong-servie';
  var bucket = options.bucket;
  if (!bucket)
    throw new Error('FS.Store.STEEDOSCLOUD you must specify the "bucket" option');

  // 拼接folder
  options.folder = path.join(bucket, folder, '/');
  folder = options.folder;
  delete options.bucket;

  var defaultAcl = options.ACL || 'private';

  var SteedosApiKey = options.secretAccessKey;

  // Remove serviceParams from SA options
  // options = _.omit(options, validS3ServiceParamKeys);

  var serviceParams = FS.Utility.extend({
    Bucket: steedosBucket,
    region: null, //required
    accessKeyId: null, //required
    secretAccessKey: null, //required
    ACL: defaultAcl
  }, options);

  // Whitelist serviceParams, else aws-sdk throws an error
  // XXX: I've commented this at the moment... It stopped things from working
  // we have to check up on this
  // serviceParams = _.pick(serviceParams, validS3ServiceParamKeys);

  // Create S3 service
  var S3 = new CLOUDAWS.S3(serviceParams);

  return new FS.StorageAdapter(name, options, {
    typeName: 'storage.s3',
    fileKey: function (fileObj) {
      // Lookup the copy
      var info = fileObj && fileObj._getInfo(name);
      // If the store and key is found return the key
      if (info && info.key) return info.key;

      var filename = fileObj.name();
      var filenameInStore = fileObj.name({
        store: name
      });

      // If no store key found we resolve / generate a key
      return fileObj.collectionName + '/' + fileObj.collectionName + "-" + fileObj._id + '-' + (filenameInStore || filename);
    },
    createReadStream: function (fileKey, options) {
      // console.log('S3.createReadStream...........: ', fileKey, options);

      return S3.createReadStream({
        Bucket: steedosBucket,
        Key: folder + fileKey,
      }, {}, SteedosApiKey);

    },
    // Comment to documentation: Set options.ContentLength otherwise the
    // indirect stream will be used creating extra overhead on the filesystem.
    // An easy way if the data is not transformed is to set the
    // options.ContentLength = fileObj.size ...
    createWriteStream: function (fileKey, options) {
      options = options || {};

      if (options.contentType) {
        options.ContentType = options.contentType;
      }

      // We dont support array of aliases
      delete options.aliases;
      // We dont support contentType
      delete options.contentType;
      // We dont support metadata use Metadata?
      delete options.metadata;

      // Set options
      var options = FS.Utility.extend({
        Bucket: steedosBucket,
        Key: folder + fileKey,
        fileKey: fileKey,
        ACL: defaultAcl,
      }, options);
      // console.log('S3.createWriteStream...........: ', options);
      return S3.createWriteStream(options, {}, SteedosApiKey);
    },
    remove: function (fileKey, callback) {
      // console.log('S3.deleteObject...........: ', fileKey);

      var deleteObjectReq = S3.deleteObject({
        Bucket: steedosBucket,
        Key: folder + fileKey,
      });

      deleteObjectReq.on('build', function () {
        deleteObjectReq.httpRequest.headers['apikey'] = SteedosApiKey;
      });
      deleteObjectReq.send(function (error) {
        callback(error, !error);
      });


      // callback(null, true);
    },
    watch: function () {
      throw new Error("S3 storage adapter does not support the sync option");
    }
  });
};