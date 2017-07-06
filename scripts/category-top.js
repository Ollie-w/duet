   var refineBtn = document.querySelector(".sub-categories-btn");
    var sidebar = document.querySelector(".sidebar");
    var sidebarTitle = document.querySelector(".sidebar-title");
    var titleText = sidebarTitle.textContent;
    refineBtn.addEventListener("click", function() {
        sidebar.classList.add("sidebar-showing");
        sidebarTitle.textContent = "Sub-categories";
        document.querySelector("body").style.position = "fixed";
    })

    var closeSidebarBtn = document.querySelector(".sidebar-title-container .close-sidebar");
    closeSidebarBtn.addEventListener("click", function() {
        sidebar.classList.remove("sidebar-showing");
        sidebarTitle.textContent = titleText;
        document.querySelector("body").style.position = "relative";
    })




    function isAboveTheFold(img) {
        var elemOffset = function(elem) {
            var offset = elem.offsetTop;
            while (elem = elem.offsetParent) {
                offset += elem.offsetTop;
            }
            return offset;
        }
        var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        var imgOffset = elemOffset(img);
        return ((imgOffset >= 0) && (imgOffset <= viewportHeight));
    }

    function loadImages(policy) {
        var images = document.querySelectorAll("img");
        for (var i = 0; i < images.length; ++i) {
            var img = images[i];
            if (!policy.loadAll && !isAboveTheFold(img))
            continue;
            
            if (!img.src && img.getAttribute("data-src"))
            img.src = img.getAttribute("data-src");
        }
    }

    loadImages({loadAll: false});

    window.addEventListener("load", function() {
        loadImages({loadAll: true});
    })
