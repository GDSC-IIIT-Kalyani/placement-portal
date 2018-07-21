<<<<<<< HEAD
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


||||||| merged common ancestors
var txt = document.getElementById("typewriter").innerHTML;
var speed = 30;
var j=0;

function typeWriter() {
  if (j < txt.length) {
    document.getElementById("typewriter").innerHTML += txt.charAt(j);
    j++;
    setTimeout(typeWriter, speed);
  }
}

window.onload = function(){
  document.getElementById("typewriter").innerHTML = " ";
  typeWriter();
};
=======
var tagsBoxes = {
    el: [],
    data: [],
    init: function() {
        this.el = document.getElementsByClassName('tagsbox');
    },
    indexOf: function (val) {
        for (var i=0; i<this.el.length; i++) {
            if (this.el.item(i) === val)
                return i;
        }
        return -1;    
    },
    addTag: function (obj) {
        var box = obj.parentElement.parentElement;
        if (box) {
            var el_index = this.indexOf(box);
            if (el_index > -1) {
                var value = box.querySelector('input[type="textbox"]').value;
                console.log(value);
                if (value) {
                    if (!this.data[el_index])
                        this.data[el_index] = [];
                    this.data[el_index].push(value);
                    var tagContainer = box.getElementsByClassName('tags-container')[0];
                    console.log(tagContainer);
                    var newTag = document.createElement('div');
                    newTag.setAttribute("data-tagname", value);
                    newTag.style = "margin: 3px 3px; display: inline-block; padding: 5px 10px; \
                    background-color: rgb(24, 46, 82); color: white;";
                    newTag.innerHTML = value + '&nbsp;&nbsp;<a href="javascript:void(0)" onclick="tagsBoxes.removeTag(this)"><i class="fas fa-times"></i></a>';
                    tagContainer.appendChild(newTag);
                }
            }
        }
    },
    removeTag: function(obj) {
        var box = obj.parentElement.parentElement.parentElement;
        if (box) {
            var el_index = this.indexOf(box);
            if (el_index > -1) {
                var tag = obj.parentElement;
                var value = tag.getAttribute("data-tagname");
                var index = this.data[el_index].indexOf(value);
                this.data[el_index].splice(index, 1);
                obj.parentElement.parentElement.removeChild(obj.parentElement);
            }
        }
    },
    getTags: function (element) {
        var el_index = this.indexOf(element);
        if ( el_index > -1) {
            return this.data[el_index];
        }
        return null;
    },
};

tagsBoxes.init();

function companySignUp() {
    var data = { 
        "name" : document.getElementById('company-name').value,
        "email" : document.getElementById('company-email').value,
        "skills" : tagsBoxes.getTags(document.getElementById('company-skills')),
        "ctc" : parseInt(document.getElementById('company-ctc').value),
        "jobs" : parseInt(document.getElementById('company-jobs').value),
        "positions": tagsBoxes.getTags(document.getElementById('company-positions')),
    };
    console.log(data);
    $.ajax('company_signup.php', {
        "method" : "POST",
        "data": { "data" : JSON.stringify(data) },
        "success": function(data, status, xhr) {
            alert(xhr.responseText);
        },
    });
  /*  var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText);
        }
    }
    xhr.open('POST','company_signup.php');
    console.log(JSON.stringify(data));
    xhr.send(JSON.stringify(data));*/

}

>>>>>>> f7b00c0cd6ef0fc9269665fc607b37815c3a2092
