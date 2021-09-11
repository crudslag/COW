// cow.js
// Created by CRUDSLAG.

window.onload = function() {
    next()
    setTimeout(
        function () {
            run()
        },
        "1000"
    );
};


function run() {
    subscribe()
}

function subscribe() {
    console.log("subscribed!");
    const video = document.querySelector("#modal-inner-iframe").contentDocument.querySelector("#video-player")
    video.volume = 0;
    video.addEventListener("ended", function(){
		console.log("DONE!");
        setTimeout(
            function () {
                next();
            },
            "1000"
        );
        setTimeout(
            function () {
                subscribe();
            },
            "3000"
        );
    }, false);
}

function next() {
    const caps = document.getElementsByClassName("u-list")[0].getElementsByTagName("li"); 

    let lastIndex = 0
    for (const item in caps) { 
        const cl = caps[item].classList 
        if (!cl.contains("good")) {
            if (cl.contains("movie") && !cl.contains("supplement")) {
                break;
            }
        }
        lastIndex += 1
    }

    caps[lastIndex].querySelector("a").click()
}
