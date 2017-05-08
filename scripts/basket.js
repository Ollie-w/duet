var products = document.querySelectorAll(".product");
for (let i = 0; i < products.length; i++) {
products[i].addEventListener("click", function(e) {
    if (e.target.classList.contains("remove-btn")) {
        this.classList.add("vanish");
}
})
} 
for (let i = 0; i < products.length; i++) {
products[i].addEventListener("transitionend", function(event) {
  if (event.propertyName === "opacity") {
      this.classList.add("collapse");
  }
})  
}
for (let i = 0; i < products.length; i++) {
products[i].addEventListener("transitionend", function(event) {
  if (event.propertyName === "max-height") {
      this.remove();
  }
})  
}