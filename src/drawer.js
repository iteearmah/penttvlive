exports.leftSlideMenu=function (drawerImage,target)
{
	var menuItems = [
  ["TV"],
  ["News"]
].map(function(element) {
  return {title: element[0]};
});
var menuItemsList = tabris.create("CollectionView", {
  layoutData: {left:0, right: 0, bottom: 0,top:[drawerImage,5]},
  items: menuItems,
  itemHeight: 45,
  initializeCell: function(cell) {
    var titleView = tabris.create("TextView", {
      layoutData: {top: 10, left: "10%"},
      markupEnabled: true,
      font: "17px"
    }).appendTo(cell);
    cell.on("change:item", function(widget, menuItems) {
      titleView.set("text", '<b>'+menuItems.title+'</b>');
    });
  }
}).on("select", function(target, value) {
  console.log("selected", value.title);
  if(value=='TV')
  {
  	tvTab.on("select", function(widget, tab) {
		  console.log(tab.get("title"));
		});
  }
  else if(value=='News')
  {
  		tvNewsTab.on("select", function(widget, tab) {
		  console.log(tab.get("title"));
		});
  }
  
}).appendTo(target);
}
