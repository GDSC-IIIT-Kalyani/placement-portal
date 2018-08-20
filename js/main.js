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
    },
    {
      value: 40,
      color: "#008000",
      highlight: "#ADFF2F",
      label: "Total Registered"
    }
  ];
  //draw
  var piechart = new Chart(ctx, {
	type: 'doughnut',
			data: {
				datasets: [{
					data: [
						12,
						1,
                        32,
                        44,
                        2,
                        40,
					],
					backgroundColor: [
                        "cornflowerblue",
                        "Chocolate",
                        "darkorange",
                        "#F4D03F",
                        "#008000",
                        "#5B2C6F",
                    ],
                    sd: [
                        "lightskyblue",
                        "papayawhip",
                        "orange",
                        "#5B2C6F",
                        "#B7950B",
                        "#ADFF2F",
                    ],
					label: 'Placement Statistics'
				}],
				labels: [
					"Qualified for GATE-2018",
					"Qualified for CAT-2018",
					"Total Students Selected",
					"Total Job Offers",
                    "Higher Studies",
                    "Total Registered",
				]
			},
			options: {
				responsive: true,
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: 'Placement Statistics'
				},
				animation: {
					animateScale: true,
					animateRotate: true
				}
			},
    }
);

});

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
                var placeholders = box.querySelectorAll('.tag.placeholder');
                console.log(placeholders);
                for (var i=0; i < placeholders.length; i++) {
                    placeholders[i].style['display'] = 'none';
                }
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
                    background-color: rgb(24, 46, 82); color: white;border-radius: 6px;";
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

/* Implementation for tabs */
function switchToTabPane(el, index) {
    var container = el.parentElement.parentElement;
    var tabPanes = container.querySelectorAll(".tab-content .tab-pane");
    for(var i=0; i<tabPanes.length; i++) {
        tabPanes[i].style['display'] = 'none';
    }
    container.querySelector(".tab-content .tab-pane[data-paneid='" + String(index) + "']").style["display"] = "block";
    var tabnavs = el.parentElement.querySelectorAll('.tab')
    for (var i=0; i<tabnavs.length; i++) {
        tabnavs[i].classList.remove("active");
    }
    el.classList.add('active');
}

function closeForm() {
    document.querySelector('.complete-page-overlay').classList.add("hidden");
    var forms = document.querySelectorAll('.form-box');
    for (var i=0; i<forms.length; i++) {
        forms[i].style['display'] = 'none';
    }
}

function showLoginForm() {
    document.querySelector('.complete-page-overlay').classList.remove("hidden");
    document.querySelector('.complete-page-overlay .form-box.login-box').style['display'] = "block";
    console.log("done");
}

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
}

/* Smooth internal link scroll */
$(document).ready(function(){
  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 700, function(){
        window.location.hash = hash;
      });
    }
  });
});

