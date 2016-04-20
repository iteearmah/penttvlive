var page = new tabris.Page({
  title: "Pent TV Live",
  topLevel: true
});
tabris.ui.set("background", "#0032D5");
var button = new tabris.Button({
  text: "Native Widgets",
  layoutData: {centerX: 0, top: 100}
}).appendTo(page);

var label = new tabris.TextView({
  font: "24px",
  layoutData: {centerX: 0, top: [button, 50]}
}).appendTo(page);

button.on("select", function() {
  label.set("text", "Pent TV Live Rock!");
});

page.open();