/*
 * @Author: yinlianghui@steedos.com
 * @Date: 2022-07-22 09:50:56
 * @LastEditors: baozhoutao@steedos.com
 * @LastEditTime: 2023-02-27 14:00:17
 * @Description: 
 */
(function () {
  var analyticsConfig = Meteor.settings.public.analytics;
  if(analyticsConfig && (analyticsConfig.enabled === false || analyticsConfig.enabled === "false")){
    return;
  }
  try {
    var defaultId = "phc_Hs5rJpeE5JK3GdR3NWOf75TvjEcnYShmBxNU2Y942HB";
    var defaultApiHost = "https://posthog.steedos.cn";
    var posthogConfig = analyticsConfig && analyticsConfig.posthog || { id: defaultId, api_host: defaultApiHost };
    if (!posthogConfig) {
      return;
    }
    var posthogId = posthogConfig.id || defaultId;
    var posthogHost = posthogConfig.api_host || defaultApiHost;
    var scriptPosthog = $(`<script>
        !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
        posthog.init('${posthogId}',{api_host:'${posthogHost}'})
      </script>`);
    $("head").append(scriptPosthog);
  } catch (error) {
    console.log(error);
  }
  try {
    Meteor.startup(function () {
      if (!window.posthog.capture || !window.posthog.group) {
        return;
      }
      Tracker.autorun(function () {
        if (Creator.bootstrapLoaded.get()) {
          var user = Creator.USER_CONTEXT.user;
          window.posthog.identify(user.userId);
          // 分组统计需要升级付费
          var release = Creator && Creator.Plugins && Creator.Plugins["@steedos/core"] && Creator.Plugins["@steedos/core"]['version']
          window.posthog.group('space', 'id:' + user.space._id, {
            name: user.space.name,
            release: release
          });
          window.posthog.people.set({
            id: user.userId,
            name: user.space.name + '/' + user.name,
            spaceId: user.space._id,
            spaceName: user.space.name,
            release: release
          });
        }
      });
      Tracker.autorun(function () {
        FlowRouter.watchPathChange();
        if (FlowRouter.current().path) {
          setTimeout(function(){
            window.posthog.capture('$pageview', {
              path: FlowRouter.current().path,
              app: FlowRouter.current().params.app_id,
              object: FlowRouter.current().params.object_name
            });
          }, 200);
        }
      });
    })
  } catch (error) {
    console.log(error);
  }
})();