$(document).ready(function () {
  var ctx = $("#mycanvas").get(0).getContext("2d");
  // pie chart data

  //draw
  var piechart = new Chart(ctx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [75, 63, 113, 34, 84, 2, 12, 1, 1],
          backgroundColor: [
            "#008000",
            "darkorange",
            "#E05194",
            "#9B59B6",
            "brown",
            "#F4D03F",
            "cornflowerblue",
            "chocolate",
            "red",
          ],
          label: "Placement Statistics-2021",
        },
      ],
      labels: [
        "Total Students Registered",
        "Total Students Selected",
        "Total Job Offers",
        "Students with multiple job offers",
        "% of students selected",
        "Higher Studies",
        "Qualified for GATE-2021",
        "Qualified for CAT-2021",
        "Qualified for BARC",
      ],
    },
    options: {
      responsive: true,
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Placement Statistics-2021",
      },
      animation: {
        animateScale: true,
        animateRotate: true,
      },
    },
  });
});

let mybutton = document.getElementById("btn-back-to-top");
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
mybutton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

var tagsBoxes = {
  el: [],
  data: [],
  init: function () {
    this.el = document.getElementsByClassName("tagsbox");
  },
  indexOf: function (val) {
    for (var i = 0; i < this.el.length; i++) {
      if (this.el.item(i) === val) return i;
    }
    return -1;
  },
  addTag: function (obj) {
    var box = obj.parentElement.parentElement;
    if (box) {
      var el_index = this.indexOf(box);
      if (el_index > -1) {
        var placeholders = box.querySelectorAll(".tag.placeholder");
        console.log(placeholders);
        for (var i = 0; i < placeholders.length; i++) {
          placeholders[i].style["display"] = "none";
        }
        var value = box.querySelector('input[type="textbox"]').value;
        console.log(value);
        if (value) {
          if (!this.data[el_index]) this.data[el_index] = [];
          this.data[el_index].push(value);
          var tagContainer = box.getElementsByClassName("tags-container")[0];
          console.log(tagContainer);
          var newTag = document.createElement("div");
          newTag.setAttribute("data-tagname", value);
          newTag.style =
            "margin: 3px 3px; display: inline-block; padding: 5px 10px; \
                    background-color: rgb(24, 46, 82); color: white;border-radius: 6px;";
          newTag.innerHTML =
            value +
            '&nbsp;&nbsp;<a href="javascript:void(0)" onclick="tagsBoxes.removeTag(this)"><i class="fas fa-times"></i></a>';
          tagContainer.appendChild(newTag);
        }
      }
    }
  },
  removeTag: function (obj) {
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
    if (el_index > -1) {
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
  for (var i = 0; i < tabPanes.length; i++) {
    tabPanes[i].style["display"] = "none";
  }
  container.querySelector(
    ".tab-content .tab-pane[data-paneid='" + String(index) + "']"
  ).style["display"] = "block";
  var tabnavs = el.parentElement.querySelectorAll(".tab");
  for (var i = 0; i < tabnavs.length; i++) {
    tabnavs[i].classList.remove("active");
  }
  el.classList.add("active");
}

function closeForm() {
  document.querySelector(".complete-page-overlay").classList.add("hidden");
  var forms = document.querySelectorAll(".form-box");
  for (var i = 0; i < forms.length; i++) {
    forms[i].style["display"] = "none";
  }
}

function showLoginForm() {
  document.querySelector(".complete-page-overlay").classList.remove("hidden");
  document.querySelector(".complete-page-overlay .form-box.login-box").style[
    "display"
  ] = "block";
  console.log("done");
}

function companySignUp() {
  var data = {
    name: document.getElementById("company-name").value,
    email: document.getElementById("company-email").value,
    skills: tagsBoxes.getTags(document.getElementById("company-skills")),
    ctc: parseInt(document.getElementById("company-ctc").value),
    jobs: parseInt(document.getElementById("company-jobs").value),
    positions: tagsBoxes.getTags(document.getElementById("company-positions")),
  };
  console.log(data);
  $.ajax("company_signup.php", {
    method: "POST",
    data: { data: JSON.stringify(data) },
    success: function (data, status, xhr) {
      alert(xhr.responseText);
    },
  });
}

/* Smooth internal link scroll */
$(document).ready(function () {
  $("a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        700,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });
});

// hamburger application

$("#nav-mobile a").click(() => {
  $(".header-hamburgerrr").addClass("hamburgerrr-active");
});

$("#mobile-menu a").click(() => {
  $(".header-hamburgerrr").removeClass("hamburgerrr-active");
});

$(".header-hamburgerrr").click(() => {
  $("#mobile-menu").css("display", "none");
  $(".header-hamburgerrr").removeClass("hamburgerrr-active");
});
