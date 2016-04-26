exports.getfeaturedNews=function (json_url,image_size,margin,featuredNewsArea){

     var featuredNewsList = tabris.create("CollectionView", {
        layoutData: {left:0, right: 0, bottom: 0},
        itemHeight: 120,
        initializeCell: function(cell) {
          var imageView = tabris.create("ImageView", {
            layoutData: {width: image_size,left:5,bottom:10,top:5},
            scaleMode:"fill",
          }).appendTo(cell);
          var titleView = tabris.create("TextView", {
            layoutData: {top: 0, left: [imageView, margin], right: 5,top:5},
            markupEnabled: true,
            font: "16px Arial, sans-serif",
            textColor: "#000",
          }).appendTo(cell);
           var periodView = tabris.create("TextView", {
            layoutData: {top: [titleView, 2],left: [imageView, margin], right: 5},
            markupEnabled: true
          }).appendTo(cell);
          cell.on("change:item", function(widget, newsItems) {
            imageView.set("image", {src: newsItems.image});
            titleView.set("text", '<b>'+newsItems.title+'</b>');
            periodView.set("text", '<small>'+newsItems.period+'</small>');
          });
        }
      }).on("select", function(target, value) {
        console.log("selected", value.title);
      }).appendTo(featuredNewsArea);
      //load_featurednews(featuredNewsList,'featured_newsdxvv3s',json_url);
      fetch_featuredNews(featuredNewsList,json_url,'featured_news_test4');
}

function fetch_featuredNews(view,json_url,key)
{
  var $ = require("./lib/jquery.js");
  var items = [];
  $.ajaxSetup({ cache:false });
  $.ajax({
    url: json_url,
    dataType: 'json',
    //timeout: 5000,
    success:  function (data) {
          localStorage.setItem(key,JSON.stringify(data));
          load_featurednews(view,data,key);
          },error: function(data, errorThrown)
          {
             console.log('news not fetched'+errorThrown);
          }
  });

}

function load_featurednews(view,featuredNewsData,key)
{
  console.log('OUT: '+JSON.stringify(featuredNewsData));
  featuredNewsData=JSON.parse(localStorage.getItem(key));
    view.set({
      items: featuredNewsData,
      refreshIndicator: true,
      refreshMessage: ""
    });
  
  featurednewsitems=featuredNewsData;
  setTimeout(function() {
    view.set({
      items: featurednewsitems,
      refreshIndicator: false,
      refreshMessage: "loading..."
    });
  }, 3000);
}