var removeButtons = Array.from(document.querySelectorAll(".remove-btn"));
var products = document.querySelectorAll(".product");

/*
var products = Array.from(document.querySelectorAll(".product"));

products.forEach(function(element) {
element.addEventListener("click", function(e) {
    console.log(this);
if (e.target.classList.contains("remove-btn")) {
    $(this).remove();
}    
})
})


$(".product").on("click", ".remove-btn", function() {
     $(this).remove();
}) 

for (let i = 0; i < products.length; i++) {
products[i].addEventListener("click", function(e) {
    if (e.target.classList.contains("remove-btn")) {
        console.log(this);
    $(this).remove();
}
})
}*/

$(".remove-btn").on("click", function() {
    $(this).closest(".product").remove();
})