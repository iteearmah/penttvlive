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

var page = new tabris.Page({
  title: "PentTV",
  topLevel: true
});
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
    title: title,
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
