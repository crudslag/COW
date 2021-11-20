//
//  COW.js
//
//  Created by CRUDSLAG.
//
//  WTFPL. Good Luck.

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

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

async function subscribe() {
    console.log("subscribed!");
    let video = null
    for (let i = 0; i < 9; i++) {
        video = document.querySelector("#modal-inner-iframe").contentDocument.querySelector("#video-player");
        console.log(video)
        if (video !== null) {
            break;
        }
        await sleep(500);
    }
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
