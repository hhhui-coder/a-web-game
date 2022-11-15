//else if (right && up) {
//    plane.x += plane.speed;
//    plane.y -= plane.speed;
//}
var left = false,
    right = false,
    up = false,
    down = false;
window.addEventListener('keydown', function (e) {

    // console.log(e)
    var key = e.keyCode || e.width || e.charCode;
    switch (key) {
 
        case 38://上
            up = true;
            break;
        case 40://下
            down = true;
            break;
  
    }

}, false)

window.addEventListener('keyup', function (e) {
    var key = e.keyCode || e.width || e.charCode;
    switch (key) {
     
        case 38:
            up = false;
            break;
        case 40:
            down = false;
            break;
        
    }
}, false)

if(up){
    plane.y -= plane.speed;
}else if(down){
    plane.y += plane.speed;
}