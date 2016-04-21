var IMAGE_PATH='src/images/';
var PAGE_MARGIN = 16;
var page = new tabris.Page({
  title: "PentTV Live",
  topLevel: true
});
var drawer = new tabris.Drawer();
tabris.ui.set("background", "#0032D5");

var tabFolder = tabris.create("TabFolder", {
  left: 0, top: 0, right: 0, bottom: 0,
  background: "#0032D5",
  textColor: "white",
  elevation: 4
}).appendTo(page);
 
var createTab = function(title, image) {
  var tabObj=tabris.create("Tab", {
    title: title,
    image: {src: image},
    background: "#ccc"
  }).appendTo(tabFolder);
  return tabObj;
};

var tvTab=createTab('TV',IMAGE_PATH+'widescreen-tv-48.png');
var tvnewsTab=createTab('News',IMAGE_PATH+'news-48.png');

/*new tabris.Video({
  layoutData: {left: 0, right: 0, top: 0, bottom: 0},
  url: "http://peach.themazzone.com/durian/movies/sintel-1280-stereo.mp4"
}).appendTo(tvTab);*/
var my_media = new Media();
my_media.playVideo('http://peach.themazzone.com/durian/movies/sintel-1280-stereo.mp4');
my_media.play();
page.open();
