// The globals object will be accessible to the build plugin, the server and
// the client

/* eslint no-unused-vars: 0 */

// globals = {
// 	fallback_language: 'en',
// 	langauges_tags_regex: '[a-z]{2,3}(?:-[a-zA-Z]{4})?(?:-[A-Z]{2,3})?',
// 	project_translations_domain: 'project',
// 	browser_path: '/tap-i18n',
// 	debug: false,
// };

TAPi18n = {};

TAPi18n.__ = function(a){
	return a;
};

TAPi18n.setLanguage = function(lng){
	console.log('TAPi18n.setLanguage', lng);
};

TAPi18n.getLanguage = function(){
	console.log('TAPi18n.getLanguage');
};
