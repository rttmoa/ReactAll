var require = meteorInstall({"app":{"cors":{"server":{"cors.coffee":function module(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// app/cors/server/cors.coffee                                                                            //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var cors;
cors = require("cors");
WebApp.rawConnectHandlers.use(function (req, res, next) {
  var buf, ref;

  if (req._body) {
    return next();
  }

  if (req.headers['transfer-encoding'] === void 0 && isNaN(req.headers['content-length'])) {
    return next();
  }

  if ((ref = req.headers['content-type']) !== '' && ref !== void 0) {
    return next();
  }

  buf = '';
  req.setEncoding('utf8');
  req.on('data', function (chunk) {
    return buf += chunk;
  });
  return req.on('end', function () {
    var err;

    if ((typeof Steedos !== "undefined" && Steedos !== null ? Steedos.debugLevel : void 0) != null && Steedos.debugLevel === 'debug') {
      console.log('[request]'.green, req.method, req.url, '\nheaders ->', req.headers, '\nbody ->', buf);
    }

    try {
      req.body = JSON.parse(buf);
    } catch (error) {
      err = error;
      req.body = buf;
    }

    req._body = true;
    return next();
  });
});
WebApp.rawConnectHandlers.use(cors({
  origin: true,
  credentials: true
}));
WebApp.rawConnectHandlers.use(function (req, res, next) {
  var method, setHeader;
  method = req.method && req.method.toUpperCase && req.method.toUpperCase();
  setHeader = res.setHeader;

  res.setHeader = function (key, val) {
    if (key.toLowerCase() === 'access-control-allow-origin' && val === 'http://meteor.local') {
      return;
    }

    return setHeader.apply(this, arguments);
  };

  return next();
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"tailwind.config.js":function module(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                        //
// tailwind.config.js                                                                                     //
//                                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                          //
!function (module1) {
  /** @type {import('tailwindcss').Config} */
  module.exports = {
    corePlugins: {
      preflight: false
    },
    content: ['./app/**/*.{html,js}', './packages/**/*.{html,js}', './client/**/*.{html,js}', './imports/**/*.{html,js}'],
    theme: {
      extend: {}
    },
    plugins: []
  };
}.call(this, module);
////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},{
  "extensions": [
    ".js",
    ".json",
    ".mjs",
    ".jsx",
    ".coffee"
  ]
});

require("/app/cors/server/cors.coffee");
require("/tailwind.config.js");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvYXBwL2NvcnMvc2VydmVyL2NvcnMuY29mZmVlIiwibWV0ZW9yOi8v8J+Su2FwcC90YWlsd2luZC5jb25maWcuanMiXSwibmFtZXMiOlsiY29ycyIsInJlcXVpcmUiLCJXZWJBcHAiLCJyYXdDb25uZWN0SGFuZGxlcnMiLCJ1c2UiLCJyZXEiLCJyZXMiLCJuZXh0IiwiYnVmIiwicmVmIiwiX2JvZHkiLCJoZWFkZXJzIiwiaXNOYU4iLCJzZXRFbmNvZGluZyIsIm9uIiwiY2h1bmsiLCJlcnIiLCJTdGVlZG9zIiwiZGVidWdMZXZlbCIsImNvbnNvbGUiLCJsb2ciLCJncmVlbiIsIm1ldGhvZCIsInVybCIsImJvZHkiLCJKU09OIiwicGFyc2UiLCJlcnJvciIsIm9yaWdpbiIsImNyZWRlbnRpYWxzIiwic2V0SGVhZGVyIiwidG9VcHBlckNhc2UiLCJrZXkiLCJ2YWwiLCJ0b0xvd2VyQ2FzZSIsImFwcGx5IiwiYXJndW1lbnRzIiwibW9kdWxlIiwiZXhwb3J0cyIsImNvcmVQbHVnaW5zIiwicHJlZmxpZ2h0IiwiY29udGVudCIsInRoZW1lIiwiZXh0ZW5kIiwicGx1Z2lucyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EsSUFBQUEsSUFBQTtBQUFBQSxPQUFPQyxRQUFRLE1BQVIsQ0FBUDtBQUdBQyxPQUFPQyxrQkFBUCxDQUEwQkMsR0FBMUIsQ0FBOEIsVUFBQ0MsR0FBRCxFQUFNQyxHQUFOLEVBQVdDLElBQVg7QUFDN0IsTUFBQUMsR0FBQSxFQUFBQyxHQUFBOztBQUFBLE1BQUdKLElBQUlLLEtBQVA7QUFDQyxXQUFPSCxNQUFQO0FBRUM7O0FBQUYsTUFBR0YsSUFBSU0sT0FBSixDQUFZLG1CQUFaLE1BQW9DLE1BQXBDLElBQWtEQyxNQUFNUCxJQUFJTSxPQUFKLENBQVksZ0JBQVosQ0FBTixDQUFyRDtBQUNDLFdBQU9KLE1BQVA7QUFFQzs7QUFBRixPQUFBRSxNQUFHSixJQUFJTSxPQUFKLENBQVksY0FBWixDQUFILE1BQXVDLEVBQXZDLElBQUdGLFFBQXdDLE1BQTNDO0FBQ0MsV0FBT0YsTUFBUDtBQUVDOztBQUFGQyxRQUFNLEVBQU47QUFDQUgsTUFBSVEsV0FBSixDQUFnQixNQUFoQjtBQUNBUixNQUFJUyxFQUFKLENBQU8sTUFBUCxFQUFlLFVBQUNDLEtBQUQ7QUFFWixXQUZ1QlAsT0FBT08sS0FFOUI7QUFGSDtBQUlDLFNBSERWLElBQUlTLEVBQUosQ0FBTyxLQUFQLEVBQWM7QUFDYixRQUFBRSxHQUFBOztBQUFBLFFBQUcsUUFBQUMsT0FBQSxvQkFBQUEsWUFBQSxPQUFBQSxRQUFBQyxVQUFBLHNCQUF5QkQsUUFBUUMsVUFBUixLQUFzQixPQUFsRDtBQUNDQyxjQUFRQyxHQUFSLENBQVksWUFBWUMsS0FBeEIsRUFBK0JoQixJQUFJaUIsTUFBbkMsRUFBMkNqQixJQUFJa0IsR0FBL0MsRUFBb0QsY0FBcEQsRUFBb0VsQixJQUFJTSxPQUF4RSxFQUFpRixXQUFqRixFQUE4RkgsR0FBOUY7QUFLRTs7QUFISDtBQUNDSCxVQUFJbUIsSUFBSixHQUFXQyxLQUFLQyxLQUFMLENBQVdsQixHQUFYLENBQVg7QUFERCxhQUFBbUIsS0FBQTtBQUVNWCxZQUFBVyxLQUFBO0FBQ0x0QixVQUFJbUIsSUFBSixHQUFXaEIsR0FBWDtBQU1FOztBQUpISCxRQUFJSyxLQUFKLEdBQVksSUFBWjtBQU1FLFdBTEZILE1BS0U7QUFmSCxJQUdDO0FBaEJGO0FBeUJBTCxPQUFPQyxrQkFBUCxDQUEwQkMsR0FBMUIsQ0FBOEJKLEtBQUs7QUFBQzRCLFVBQVEsSUFBVDtBQUFlQyxlQUFhO0FBQTVCLENBQUwsQ0FBOUI7QUFFQTNCLE9BQU9DLGtCQUFQLENBQTBCQyxHQUExQixDQUE4QixVQUFDQyxHQUFELEVBQU1DLEdBQU4sRUFBV0MsSUFBWDtBQUU3QixNQUFBZSxNQUFBLEVBQUFRLFNBQUE7QUFBQVIsV0FBU2pCLElBQUlpQixNQUFKLElBQWNqQixJQUFJaUIsTUFBSixDQUFXUyxXQUF6QixJQUF3QzFCLElBQUlpQixNQUFKLENBQVdTLFdBQVgsRUFBakQ7QUFHQUQsY0FBWXhCLElBQUl3QixTQUFoQjs7QUFDQXhCLE1BQUl3QixTQUFKLEdBQWdCLFVBQUNFLEdBQUQsRUFBTUMsR0FBTjtBQUNmLFFBQUdELElBQUlFLFdBQUosT0FBcUIsNkJBQXJCLElBQXVERCxRQUFPLHFCQUFqRTtBQUNDO0FBU0U7O0FBUkgsV0FBT0gsVUFBVUssS0FBVixDQUFnQixJQUFoQixFQUFtQkMsU0FBbkIsQ0FBUDtBQUhlLEdBQWhCOztBQUtBLFNBQU83QixNQUFQO0FBWEQsRzs7Ozs7Ozs7Ozs7O0FDL0JBO0FBQ0E4QixRQUFNLENBQUNDLE9BQVAsR0FBaUI7QUFDZkMsZUFBVyxFQUFFO0FBQ1hDLGVBQVMsRUFBRTtBQURBLEtBREU7QUFJZkMsV0FBTyxFQUFFLENBQ1Asc0JBRE8sRUFFUCwyQkFGTyxFQUdQLHlCQUhPLEVBSVAsMEJBSk8sQ0FKTTtBQVVmQyxTQUFLLEVBQUU7QUFDTEMsWUFBTSxFQUFFO0FBREgsS0FWUTtBQWFmQyxXQUFPLEVBQUU7QUFiTSxHQUFqQiIsImZpbGUiOiIvYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIyBBZGRpbmcgQ09SUyBoZWFkZXJzIHNvIHdlIGNhbiB1c2UgQ0ROcyBmb3Igc3RhdGljIGNvbnRlbnRcbmNvcnMgPSByZXF1aXJlKFwiY29yc1wiKTtcblxuIyBUcnkgdG8gcGFyc2UgYWxsIHJlcXVlc3QgYm9kaWVzIGFzIEpTT05cbldlYkFwcC5yYXdDb25uZWN0SGFuZGxlcnMudXNlIChyZXEsIHJlcywgbmV4dCkgLT5cblx0aWYgcmVxLl9ib2R5XG5cdFx0cmV0dXJuIG5leHQoKVxuXG5cdGlmIHJlcS5oZWFkZXJzWyd0cmFuc2Zlci1lbmNvZGluZyddIGlzIHVuZGVmaW5lZCBhbmQgaXNOYU4ocmVxLmhlYWRlcnNbJ2NvbnRlbnQtbGVuZ3RoJ10pXG5cdFx0cmV0dXJuIG5leHQoKVxuXG5cdGlmIHJlcS5oZWFkZXJzWydjb250ZW50LXR5cGUnXSBub3QgaW4gWycnLCB1bmRlZmluZWRdXG5cdFx0cmV0dXJuIG5leHQoKVxuXG5cdGJ1ZiA9ICcnXG5cdHJlcS5zZXRFbmNvZGluZygndXRmOCcpXG5cdHJlcS5vbiAnZGF0YScsIChjaHVuaykgLT4gYnVmICs9IGNodW5rXG5cdHJlcS5vbiAnZW5kJywgLT5cblx0XHRpZiBTdGVlZG9zPy5kZWJ1Z0xldmVsPyBhbmQgU3RlZWRvcy5kZWJ1Z0xldmVsIGlzICdkZWJ1Zydcblx0XHRcdGNvbnNvbGUubG9nICdbcmVxdWVzdF0nLmdyZWVuLCByZXEubWV0aG9kLCByZXEudXJsLCAnXFxuaGVhZGVycyAtPicsIHJlcS5oZWFkZXJzLCAnXFxuYm9keSAtPicsIGJ1ZlxuXG5cdFx0dHJ5XG5cdFx0XHRyZXEuYm9keSA9IEpTT04ucGFyc2UoYnVmKVxuXHRcdGNhdGNoIGVyclxuXHRcdFx0cmVxLmJvZHkgPSBidWZcblxuXHRcdHJlcS5fYm9keSA9IHRydWVcblx0XHRuZXh0KClcblxuV2ViQXBwLnJhd0Nvbm5lY3RIYW5kbGVycy51c2UoY29ycyh7b3JpZ2luOiB0cnVlLCBjcmVkZW50aWFsczogdHJ1ZX0pKTtcblxuV2ViQXBwLnJhd0Nvbm5lY3RIYW5kbGVycy51c2UgKHJlcSwgcmVzLCBuZXh0KSAtPlxuXHQjaWYgL15cXC8oYXBpfF90aW1lc3luY3xzb2NranN8dGFwLWkxOG4pKFxcL3wkKS8udGVzdCByZXEudXJsXG5cdG1ldGhvZCA9IHJlcS5tZXRob2QgJiYgcmVxLm1ldGhvZC50b1VwcGVyQ2FzZSAmJiByZXEubWV0aG9kLnRvVXBwZXJDYXNlKCk7XG5cblx0IyBCbG9jayBuZXh0IGhhbmRsZXJzIHRvIG92ZXJyaWRlIENPUlMgd2l0aCB2YWx1ZSBodHRwOi8vbWV0ZW9yLmxvY2FsXG5cdHNldEhlYWRlciA9IHJlcy5zZXRIZWFkZXJcblx0cmVzLnNldEhlYWRlciA9IChrZXksIHZhbCkgLT5cblx0XHRpZiBrZXkudG9Mb3dlckNhc2UoKSBpcyAnYWNjZXNzLWNvbnRyb2wtYWxsb3ctb3JpZ2luJyBhbmQgdmFsIGlzICdodHRwOi8vbWV0ZW9yLmxvY2FsJ1xuXHRcdFx0cmV0dXJuXG5cdFx0cmV0dXJuIHNldEhlYWRlci5hcHBseSBALCBhcmd1bWVudHNcblxuXHRyZXR1cm4gbmV4dCgpXG5cbiMgX3N0YXRpY0ZpbGVzTWlkZGxld2FyZSA9IFdlYkFwcEludGVybmFscy5zdGF0aWNGaWxlc01pZGRsZXdhcmVcbiMgV2ViQXBwSW50ZXJuYWxzLl9zdGF0aWNGaWxlc01pZGRsZXdhcmUgPSAoc3RhdGljRmlsZXMsIHJlcSwgcmVzLCBuZXh0KSAtPlxuIyBcdHJlcy5zZXRIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiwgXCIqXCIpXG4jIFx0X3N0YXRpY0ZpbGVzTWlkZGxld2FyZShzdGF0aWNGaWxlcywgcmVxLCByZXMsIG5leHQpXG5cblxuIiwiLyoqIEB0eXBlIHtpbXBvcnQoJ3RhaWx3aW5kY3NzJykuQ29uZmlnfSAqL1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNvcmVQbHVnaW5zOiB7XG4gICAgcHJlZmxpZ2h0OiBmYWxzZSxcbiAgfSxcbiAgY29udGVudDogW1xuICAgICcuL2FwcC8qKi8qLntodG1sLGpzfScsXG4gICAgJy4vcGFja2FnZXMvKiovKi57aHRtbCxqc30nLFxuICAgICcuL2NsaWVudC8qKi8qLntodG1sLGpzfScsXG4gICAgJy4vaW1wb3J0cy8qKi8qLntodG1sLGpzfScsXG4gIF0sXG4gIHRoZW1lOiB7XG4gICAgZXh0ZW5kOiB7fSxcbiAgfSxcbiAgcGx1Z2luczogW10sXG59XG4iXX0=
