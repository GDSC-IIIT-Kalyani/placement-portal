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