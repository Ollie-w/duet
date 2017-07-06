var startTime, endTime;
var gbMove = false;

window.addEventListener('touchstart',function(event) {
    startTime = new Date().getTime(); 
    gbMove = false;        
},false);

window.addEventListener('touchmove',function(event) {
  gbMove = true;
},false);

window.addEventListener('touchend',function(event) {
    endTime = new Date().getTime();
    if(!gbMove && (endTime-startTime)/1000 > 2)
        alert('tap hold event');
        this.dispatchEvent(longtap)      
},false);

function logger() {
    console.log("customized event happened!")
}
var longtap = new CustomEvent("longtap");
document.body.addEventListener("longtap", logger)