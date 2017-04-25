   var refineBtn = document.querySelector(".sub-categories-btn");
    var sidebar = document.querySelector(".sidebar");
    var sidebarTitle = document.querySelector(".sidebar-title");
    var titleText = sidebarTitle.textContent;
    refineBtn.addEventListener("click", function() {
        sidebar.classList.add("sidebar-showing");
        sidebarTitle.textContent = "Sub-categories";
        document.querySelector("body").style.position = "fixed";
    })

    var closeSidebarBtn = document.querySelector(".close-sidebar");
    closeSidebarBtn.addEventListener("click", function() {
        sidebar.classList.remove("sidebar-showing");
        sidebarTitle.textContent = titleText;
        document.querySelector("body").style.position = "relative";
    })