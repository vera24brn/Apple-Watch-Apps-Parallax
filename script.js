//this code creates a parallax effect with an augmented UI. 
//The UI elements respond to mouse movement, 
//and the render function ensures smooth transitions in the element positions, creating an interactive and visually appealing experience.

const parallax = document.getElementById("parallax"); //This variable stores a reference to the HTML element with the ID "parallax."
const rect = parallax.getBoundingClientRect(); // It calculates the position and dimensions of the "parallax" element using getBoundingClientRect()
const icons = document.getElementsByClassName("ui")[0]; //It stores a reference to the first element with the class "ui."
const iconsRect = icons.getBoundingClientRect(); // Similar to rect, it calculates the position and dimensions of the "ui" element.

// parallax effect and an augmented UI with icons that respond to mouse movement

var pos = {
    x:0,
    y:0
};
var mousePos = {
    x: 0,
    y:0
}
var iconPos = {
    x: 0,
    y:0
}
var iconDesiredPos = {
    x: 0,
    y:0
}

// Mouse Movement Event Listener
// This code adds an event listener to the "parallax" element for the "pointermove" event, 
// It updates the mousePos object with the current mouse coordinates relative to the "parallax" element.
parallax.addEventListener("pointermove", function (e) {
    mousePos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
      
    iconDesiredPos = {
      x: (e.clientX - window.innerWidth / 2) - iconsRect.left,
      y: (e.clientY - window.innerHeight / 2) - iconsRect.top
    }
  });

  //Rendering Function
  //is a function that updates the position and styling, we use the easing function to smooth the transition between the current and desired positions.
function render(){
    pos.x += easing(pos.x, mousePos.x, 0.01);
    pos.y += easing(pos.y, mousePos.y, 0.01);
    parallax.style.transformOrigin = `${pos.x}px ${pos.y}px`;
    parallax.style.transform = `scale(1.25)`; //The transformation of the "parallax" element includes scaling it by 1.25.

    iconPos.x += easing(iconPos.x, iconDesiredPos.x / -10, 0.01);
    iconPos.y += easing(iconPos.y, iconDesiredPos.y / -10, 0.01);
    icons.style.transform = `translateX(${iconPos.x}px) translateY(${iconPos.y}px)`; //The transformation of the "ui" element involves translating it based on the calculated iconPos.

    requestAnimationFrame(render); //The function then calls itself using requestAnimationFrame to create a smooth animation loop
}
render();

//Easing Function calculates a smoothed value between two positions (a and b) based on a specified speed.
function easing(a, b, speed){
    return (b-a) * speed;
}