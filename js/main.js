/*var pizza = [59];

var myConfig = {
  "type":"pie3d",
  "title":{
    "text":"Placement"
  },
  "tooltip": {
      "text": "On %t, node %node-index is positioned at %kt (X) and %vt (Y)."
  },
  "series":[
    {"values":[12],
      "text":""},
    {"values":[1],
      "text":""},
    {"values":[1],
      "text":""},
    {"values":[32],
      "text":""},
    {"values":[44],
      "text":""},
    {"values":[2],
      "text":""}
  ]
};
 
zingchart.render({ 
  id : 'myChart', 
  data : myConfig, 
  height: 400, 
}); */


$(document).ready(function(){
  var ctx = $("#mycanvas").get(0).getContext("2d");
  // pie chart data
  // sum of values = 360

  var data = [
    {
      value: 12,
      color: "cornflowerblue",
      highlight: "lightskyblue",
      label: "Qualified for GATE-2018"
    },
    {
      value: 1,
      color: "Chocolate",
      highlight: "papayawhip",
      label: "Qualified for CAT-2018"
    },
    {
      value: 32,
      color: "darkorange",
      highlight: "orange",
      label: "Total Students Selected"
    },
        {
      value: 44,
      color: "#9B59B6",
      highlight: "#5B2C6F",
      label: "Total Job Offers"
    },
        {
      value: 2,
      color: "#F4D03F",
      highlight: "#B7950B",
      label: "Higher Studies"
    }
  ];
  //draw
  var piechart = new Chart(ctx).Pie(data);



});


