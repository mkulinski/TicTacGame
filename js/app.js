document.addEventListener("DOMContentLoaded", function() {

    document.querySelector("#tile1").addEventListener("click", function () {
        var theDropDown = document.querySelector("#tile1");
        theDropDown.classList.toggle("x");

    });

});