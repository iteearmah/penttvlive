exports.getNewsList=function (json_url,image_size,margin,targt_page){

     var featuredNewsList = tabris.create("CollectionView", {
        layoutData: {left:0, right: 0, bottom: 0},
        refreshEnabled: true,
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
				}).on("refresh", function() {
				  load_news(featuredNewsList,'news_list',json_url);
			}).appendTo(targt_page);
		load_news(featuredNewsList,'news_list',json_url);
}

function fetch_newslist(json_url,targt_page,key)
{
	 var xhr = new tabris.XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === xhr.DONE) {
     newsItems_str=xhr.responseText;
     localStorage.setItem(key,newsItems_str);

    }
  };
  xhr.open("GET", json_url +'?'+ new Date().getTime());
  xhr.send();
  
  return localStorage.getItem(key);
}

function load_news(view,key,json_url)
{
  view.set({
      items: JSON.parse(localStorage.getItem(key)),
      refreshIndicator: true,
      refreshMessage: "loading..."
  });
	/*view.set({
    refreshIndicator: false,
    refreshMessage: "loading..."
  });*/
  newsitems=fetch_newslist(json_url,view,key);
  
  setTimeout(function() {
    view.set({
      items: JSON.parse(newsitems),
      refreshIndicator: false,
      refreshMessage: ""
    });
  }, 1000);
}