var utils=require("./utils.js");
var drawerModule=require("./drawer.js");
var featuredNews=require("./featurednews.js");
var newsSection=require("./newssection.js");
var newsDetails=require("./news-details.js");

var newsItems=utils.newsItems();
var IMAGE_PATH='src/images/';
var PAGE_MARGIN = 16;
var IMAGE_SIZE = 120;
var MARGIN = 12;
var MARGIN_LARGE = 24;
var FEATURED_NEWS_URL='http://penttvlive.com/wp-api/json/featured_news.json';
var NEWS_URL='http://penttvlive.com/wp-api/json/news.json';
//navigator.splashscreen.show();
var page = new tabris.Page({
  title: "PentTV",
  topLevel: true
});
var a = new tabris.Page({

});
/* // Android customization
    cordova.plugins.backgroundMode.setDefaults({ text:'Doing heavy tasks.'});
    // Enable background mode
    cordova.plugins.backgroundMode.enable();

    // Called when background mode has been activated
    cordova.plugins.backgroundMode.onactivate = function () {
        setTimeout(function () {
            console.log('background');
            // Modify the currently displayed notification
            cordova.plugins.backgroundMode.configure({
                text:'Running in background for more than 5s now.'
            });
        }, 5000);
    }
cordova.plugins.backgroundMode.ondeactivate = function() {
  console.log('background deactivated');
}*/

/*
tabris.app.on("pause", function() {
   cordova.plugins.backgroundMode.setDefaults({ text:'Doing heavy tasks.'});
   cordova.plugins.backgroundMode.enable();
    // Enable background mode
   
});
tabris.app.on("resume", function() {
console.log('background deactivated');
cordova.plugins.backgroundMode.disable();
});*/
//cordova.plugins.backgroundMode.enable();
/*cordova.plugins.backgroundMode.ondeactivate = function () {
  console.log('Here');
}*/
tabris.app.on("pause", function() {
   
    setTimeout(function(){ 
    cordova.plugins.notification.badge.configure({ title: '%d news feeds available' });
    cordova.plugins.notification.badge.configure({ smallIcon: 'ic_action_star' });
    cordova.plugins.notification.badge.configure({ autoClear: true });
    cordova.plugins.notification.badge.set(update_count);
    navigator.notification.beep(1);

    }, 3000);
    
});

admob.initAdmob("ca-app-pub-3282562808664310/2431822278","ca-app-pub-3282562808664310/5267537477");
admob.showBanner(admob.BannerSize.BANNER,admob.Position.BOTTOM_CENTER);
/*var drawer = new tabris.Drawer();
drawer.append(new tabris.PageSelector());*/

/*var drawerImage = tabris.create("ImageView", {
   image: IMAGE_PATH+'ppeett.jpg',
  scaleMode: "fill",
  layoutData: {left: 0, right: 0, top: 0, height: 200}
}).appendTo(drawer);*/
//drawerModule.leftSlideMenu(drawerImage,drawer);
tabris.ui.set("background", "#0032D5");

var tabFolder = tabris.create("TabFolder", {
  left: 0, top: 0, right: 0, bottom: 0,
  background: "#0032D5",
  textColor: "white",
   paging: true,
  elevation: 4
}).appendTo(page);
 
var createTab = function(title, image) {
  var tabObj=tabris.create("Tab", {
    image: {src: image},
    background: "#fff"
  }).appendTo(tabFolder);
  return tabObj;
};

var tvTab=createTab('TV',IMAGE_PATH+'widescreen-tv-48.png');
var tvNewsTab=createTab('News',IMAGE_PATH+'news-48.png');

var tvPlayerArea = new tabris.Composite({
  layoutData: {left: 0, top:0, right: 0, bottom: "50%"},
  background: "#000"
}).appendTo(tvTab);

var featuredNewsArea = new tabris.Composite({
  layoutData: {left: 0, top:[tvPlayerArea,0], right: 0, bottom: 0},
  background: "#fff"
}).appendTo(tvTab);


/**
 * Get the homepage featured news
 */
featuredNews.getfeaturedNews(FEATURED_NEWS_URL,IMAGE_SIZE,MARGIN,featuredNewsArea,newsDetails);
newsSection.getNewsList(NEWS_URL,IMAGE_SIZE,MARGIN,tvNewsTab,newsDetails);
var webview = new tabris.WebView({
	url: "http://penttvlive.com/app.video.html?"+new Date().getTime(),
  layoutData: {left: 0, top:0, right: 0, bottom: 0}
}).appendTo(tvPlayerArea);


/*new tabris.Video({
  layoutData: {left: 0, right: 0, top: 0, bottom: 0},
  url: "http://peach.themazzone.com/durian/movies/sintel-1280-stereo.mp4"
}).appendTo(tvTab);*/
//window.plugins.streamingMedia.playVideo('rtmp://edge2.tikilive.com:1935/unrestricted_tikilive/41915?i=YXBwTmFtZT1VbnJlc3RyaWN0ZWQmY0lEPTQxOTE1JmNOYW1lPVBlbnQrVFYrTGl2ZSZvSUQ9MTQ5ODY3Jm9OYW1lPXBlbnR0dmFkbWlu/0Bm7VxnMvO8k');

page.open();
navigator.splashscreen.hide();