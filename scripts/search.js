  var refineBtn = document.querySelector(".refine-results-btn");
   var sidebar = document.querySelector(".sidebar");
   var sidebarTitle = document.querySelector(".sidebar-title");
   refineBtn.addEventListener("click", function() {
       sidebar.classList.add("sidebar-showing");
       sidebarTitle.textContent = "Refine results by category";
       document.querySelector("body").style.position = "fixed";
   })

    var closeSidebarBtn = document.querySelector(".close-sidebar");
   closeSidebarBtn.addEventListener("click", function() {
       sidebar.classList.remove("sidebar-showing");
       sidebarTitle.textContent = "REFINE RESULTS";
       document.querySelector("body").style.position = "relative";
   });