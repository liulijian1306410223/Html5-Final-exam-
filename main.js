function turnon(){
  var p=document.getElementById("up");
  var h1=document.getElementById("on");
  p.style.display="block";
h1.onclick=turnup;
}
function turnup(){
  var p=document.getElementById("up")
  var h1=document.getElementById("on");
  p.style.display="none";
  h1.onclick=turnon;
}
window.onload=function(){
  document.getElementById("on").onclick=turnon;
}





function addloadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function (){
            oldonload();
            func();
        };
    }
}

function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}


function checkDom() {
    if (!document.createElement  || !document.getElementsByTagName || !document.createTextNode || !document.getElementById) {
        return false;
    } else {
        return true;
    };
};

function preparePlaceholder(check) {
    if (!check) {
        return false;
    };
    if (!document.getElementById("imagegallery")) {
        return false;
    }
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("src", "meta/5.jpg");
    placeholder.setAttribute("alt", "我的图片库");
    var description = document.createElement("p");
    description.setAttribute("id", "description");
    var destext = document.createTextNode("选择一张图片");
    description.appendChild(destext);
    var gallery = document.getElementById("imagegallery");
    insertAfter(placeholder, gallery);
    insertAfter(description, placeholder);
}


function prepareGallery(check) {
    if (!check) {
        return false;
    }
    if (!document.getElementById("imagegallery")) {
        return false;
    }
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    for( var i = 0; i <links.length; i++) {
        links[i].onclick = function() {
            return showPic(this);
        }
        //links[i].onkeypress = links[i].onclick;
    }
}


function showPic(whichpic) {
    if (!document.getElementById("placeholder")) {
        return true;
    };
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src", source);
    if (!document.getElementById("description")) {
        return false;
    }
    if (whichpic.getAttribute("title")) {
        var text = whichpic.getAttribute("title");
    } else {
        var text = "";
    }
    var description = document.getElementById("description");
    if (description.firstChild.nodeType == 3) {
        description.firstChild.nodeValue = text;
    }
    return false;
}

var check;

addloadEvent(function() {
    check = checkDom();
    preparePlaceholder(check);
});

addloadEvent(function() {
    prepareGallery(check);
});