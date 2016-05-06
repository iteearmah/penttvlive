var fetchedNewsJson=[];

function getfetchedNewsJson(url)
{
	var json=[];
	var xhr = new tabris.XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === xhr.DONE) {
     json=xhr.responseText;
     getJsonData(json);
    }
  };
  xhr.open("GET", url);
  xhr.send();
  console.log(json);
  return json;
}

function getJsonData(json)
{
	console.log(json);
	fetchedNewsJson=json;
}
exports.newsItems=function ()
{
/*	var newsitems = [
  ["Women’s director pays maiden visit to assin foso area",  "women4-300x170.jpg", "2 days ago"],
  ["Instill discipline wherever you find yourself – Pastor Bonney tells men", "rel_pent27.gif","2 days ago"]
].map(function(element) {
  return {title: element[0], image: element[1], period: element[2]};
});*/
return fetchedNewsJson;
}


