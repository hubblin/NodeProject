dragElement(document.getElementById("item"));

let isResizing = false;


//2020.11.09 임호균
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
      if(!isResizing){
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }}

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

//2020.11.10 임호균
//크기조절
const resizers = document.querySelectorAll(".resizer");
let currentResizer;
let el = document.getElementById("item");

for(let resizer of resizers){
    resizer.addEventListener('mousedown', mousedown);

    function mousedown(e){
        currentResizer = e.target;

        let prevX = e.clientX;
        let prevY = e.clientY;

        window.addEventListener('mousemove', mousemove);
        window.addEventListener('mouseup', mouseup);

        function mousemove(e){

            const rect = el.getBoundingClientRect();
            isResizing = true;
            if(currentResizer.classList.contains("se")){
                el.style.width = rect.width -(prevX - e.clientX) + "px";
                el.style.height = rect.height - (prevY - e.clientY) + "px";
            }else if(currentResizer.classList.contains("sw")){
                el.style.width = rect.width + (prevX - e.clientX) + "px";
                el.style.height = rect.height - (prevY - e.clientY) + "px";
                el.style.left = rect.left - (prevX - e.clientX) + "px";
            }else if(currentResizer.classList.contains("nw")){
                el.style.width = rect.width + (prevX - e.clientX) + "px";
                el.style.height = rect.height + (prevY - e.clientY) + "px";
                el.style.left = rect.left - (prevX - e.clientX) + "px";
                el.style.top = el.offsetTop - (prevY - e.clientY) + "px";
            }else if(currentResizer.classList.contains("ne")){
                el.style.width = rect.width - (prevX - e.clientX) + "px";
                el.style.height = rect.height + (prevY - e.clientY) + "px";
                el.style.top = el.offsetTop - (prevY - e.clientY) + "px";
            }

            prevX = e.clientX;
            prevY = e.clientY;
        }

        function mouseup(){
            window.removeEventListener('mousemove',mousemove);
            window.removeEventListener('mouseup',mouseup);
            isResizing = false;
        }
    }
}

//2020.11.10 임호균 회전
let ro = document.querySelector(".rotate");
ro.addEventListener('mousedown', mousedown2);

function mousedown2(){
    window.addEventListener('mousemove', mousemove2);
    window.addEventListener('mouseup', mouseup2);
    

    function mousemove2(){
        isResizing = true;
        let x = (el.getBoundingClientRect().left) + (el.clientWidth /2);
        console.log();
        let y = (el.getBoundingClientRect().top) + (el.clientHeight / 2);
        console.log(x +"아아아아"+ y);
        let radian = Math.atan2(event.pageX -x, event.pageY -y);
        console.log(radian)
        let rot = (radian * (180/Math.PI)*-1)+180;
        el.style.transform = "rotate(" + rot + "deg)"
    }

    function mouseup2(){
        window.removeEventListener('mousemove', mousemove2);
        window.removeEventListener('mouseup', mouseup2);
        isResizing = false;
    }
}
