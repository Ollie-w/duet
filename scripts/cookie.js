var cookie

function acceptedCookie() {
    if (!localStorage.getItem("cookies")) {
cookie = document.createElement("div")
cookie.classList.add("cookie-monster")
cookie.innerHTML = 'Our website uses cookies. By using our website you agree to our use of cookies in accordance with our cookie policy. See our <a href="privacypolicy.html">privacy policy</a> for more information.<BUTTON type="button">I understand</BUTTON>'
placetoputbefore.before(cookie)
var cookiebutton = cookie.getElementsByTagName("button")[0];
cookiebutton.addEventListener("click", disappearCookie);
    }
}
window.addEventListener("load", acceptedCookie)

var frames = [
    {opacity: 1, transform: 'scale(1)'},
    {opacity: 0, transform: 'scale(0)'}
]

var options = {
    duration: 350,
    iterations: 1,
    fill: 'both',
    easing: 'cubic-bezier(0,-0.75,1,1)'
}


var placetoputbefore = document.body.querySelector("script")



function disappearCookie() {
    cookieAnimation = cookie.animate(frames, options);
    cookieAnimation.onfinish = function() {
    cookie.remove();
    localStorage.setItem("cookies", "accepted!")
}
}

