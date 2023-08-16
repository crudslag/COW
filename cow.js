//
//  COW.js
//
//  Created by CRUDSLAG.
//
//  WTFPL. Good Luck.

const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

window.onload = function () {
  next();
  setTimeout(function () {
    run();
  }, "1000");
};

function run() {
  subscribe();
  shortcutConfigure();
}

async function shortcutConfigure() {
  new MutationObserver((_) => {
    changed();
  }).observe(document.body, {
    attributes: true,
    attributeFilter: ["class", "style"],
  });

  document.onkeydown = function (_) {
    changed();
  };
}

async function changed() {
  await sleep(500);
  console.log(
    "mutationObserver",
    document.querySelector("#modal-inner-iframe").contentDocument
  );
  document.querySelector("#modal-inner-iframe").contentDocument.onkeydown =
    function (e) {
      console.log(e);
      if (e.ctrlKey && e.code === "Enter") {
        // Einen Bericht einreichen
        iframeClickEventQuerySelector("#evaluate-btn");
        iframeClickEventQuerySelector("#sure-btn");
      } else if (e.code === "KeyN") {
        // næst
        next();
        subscribe();
      }
    };
}

async function iframeClickEventQuerySelector(q) {
  let element = null;
  for (let i = 0; i < 9; i++) {
    element = document
      .querySelector("#modal-inner-iframe")
      .contentDocument.querySelector(q);
    console.log(element);
    if (element !== null) {
      break;
    }
    await sleep(500);
  }
  element.click();
}

async function subscribe() {
  console.log("subscribed!");
  let video = null;
  for (let i = 0; i < 19; i++) {
    video = document
      .querySelector("#modal-inner-iframe")
      .contentDocument.querySelector("#video-player");
    console.log(video);
    if (video !== null) {
      break;
    }
    await sleep(500);
  }
  video.volume = 0;
  video.addEventListener(
    "ended",
    function () {
      console.log("DONE!");
      setTimeout(function () {
        next();
      }, "1000");
      setTimeout(function () {
        subscribe();
      }, "3000");
    },
    false
  );
}

function next() {
  const caps = document
    .getElementsByClassName("u-list")[0]
    .getElementsByTagName("li");

  let lastIndex = 0;
  for (const item in caps) {
    const cl = caps[item].classList;
    if (!cl.contains("good")) {
      if (cl.contains("movie") && !cl.contains("supplement")) {
        break;
      }
    }
    lastIndex += 1;
  }

  caps[lastIndex].querySelector("a").click();
}
