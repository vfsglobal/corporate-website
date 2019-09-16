(function () {
    'use strict';

    //stores the version of IE browser; if browser is not an IE then null will be stored; even for IE 11 null will be stored
    var IE_version = (function () {
        var appVersion = navigator.appVersion,
            MSIEIndex = appVersion.indexOf("MSIE");

        if (MSIEIndex !== -1)
            return parseInt($.trim(appVersion.substring(MSIEIndex + "MSIE".length, appVersion.indexOf(".", MSIEIndex))));
        
        return null;
    })();

    //if there is error in Vue then window will not have an Vue as global object (Vue is supported in IE 9 and above)
    //below condition means Vue is defined and (browser is not IE (== null) or IE version is greater than 10) then browser is compatible and will not show browser compatibility message
    if (window.Vue && (IE_version == null || IE_version > 10))
        return;

    //if above condition is false that means browser is not compatible and override entire body with browser compatibility message
    document.body.innerHTML = '<div class="browser_unsupport padv_big">\
        <img src="../assets/images/vfs-global-logo.png" alt="VFS Global Logo" class="marb_normal main_logo" />\
        <h1 class="main_big_heading marb_normal">Upgrade browser to see Website</h1>\
        <p class="marb_normal">You are seeing this page because you are using an unsupported browser.<br>\
            Make sure you are using the most recent version of your browser. <br>\
            Currently we support the following browsers.</p>\
        <ul class="browser_list clearfix">\
            <li><div class="browser_wrapper"><div class="chrome"></div></div> <span>Chrome</span></li>\
            <li><div class="browser_wrapper"><div class="firefox"></div></div> <span>Firefox</span></li>\
            <li><div class="browser_wrapper"><div class="safari"></div></div> <span>Safari</span></li>\
            <li><div class="browser_wrapper"><div class="edge"></div></div> <span>Edge</span></li>\
            <li><div class="browser_wrapper"><div class="ie"></div></div> <span>Internet Explorer <br>(11 and above)</span></li>\
        </ul>\
    </div>';
})();