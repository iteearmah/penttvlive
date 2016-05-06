exports.getNewsList=function (json_url,image_size,margin,targt_page,detail_page){
      
      
     /* var topStoryComposite = new tabris.Composite({
      left: 0, right: 0,top:0,
      id: "topStoryComposite",
      }).appendTo(targt_page);

      var topStoryImage = new tabris.ImageView({
        left: 0, top: 0, right: 0,
        scaleMode: "fill"
      }).appendTo(topStoryComposite);

      var topStoryTitle = tabris.create("TextView", {
            layoutData: {top: [topStoryImage,0], left: 0, right:0,height:50},
            markupEnabled: true,
            background: "#F0E600",
            font: "12px Arial, sans-serif",
            textColor: "#000",
            title: 'Loading...'
      }).appendTo(topStoryComposite);*/

      //End of top story
     var newsList = tabris.create("CollectionView", {
        layoutData: {left:0, right: 0, bottom: 50,top :[targt_page,2]},
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
				  fetch_newslist(newsList,json_url,'news_list');
			}).appendTo(targt_page);
		fetch_newslist(newsList,json_url,'news_list');

    newsList.on("select", function(target, value) {
       var newsDetailPage=detail_page.news_readPage(value);
        newsDetailPage.set('title',value.title+' - News');
        newsDetailPage.open();
    });
}

function fetch_newslist(view,json_url,key)
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
          load_news(view,data,key);
          /*load_topNews(data,key,topStoryImage,topStoryTitle);*/
          },error: function(data, errorThrown)
          {
             console.log('news not fetched'+errorThrown);
          }
  });
}

function load_news(view,newsData,key)
{
  newsitems=JSON.parse(localStorage.getItem(key));
    view.set({
      items: newsitems,
      refreshIndicator: true,
      refreshMessage: ""
    });
  
  newsitems=newsData;
  setTimeout(function() {
    view.set({
      items: newsitems,
      refreshIndicator: false,
      refreshMessage: "loading..."
    });
  }, 3000);
}

function load_topNews(newsData,key,topStoryImage,topStoryTitle)
{
  newsitems=JSON.parse(localStorage.getItem(key));
  newsitems=newsData;
  topStoryImage.set("image", {src: newsitems[0].image});
  topStoryTitle.set("title", "<b>"+newsitems[0].title+"</b>");
  console.log(newsitems[0].title);
}