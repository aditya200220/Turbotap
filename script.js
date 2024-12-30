(function () {
    var baseIntervalTime = 250;
    var jitterInterval = 50;
    var positionJitter = 5;
    var currentX = 0;
    var currentY = 0;

    document.addEventListener("mousemove", function (event) {
        currentX = event.clientX;
        currentY = event.clientY;
    });

    function getRandomOffset(maxOffset) {
        return Math.floor(Math.random() * (maxOffset * 2 + 1)) - maxOffset;
    }

    function simulateClickAtPosition(x, y) {
        try {
            var targetElement = document.elementFromPoint(x, y);
            if (targetElement) {
                var mousedownEvent = new MouseEvent("mousedown", {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: x,
                    clientY: y,
                });
                targetElement.dispatchEvent(mousedownEvent);

                var mouseupEvent = new MouseEvent("mouseup", {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: x,
                    clientY: y,
                });
                targetElement.dispatchEvent(mouseupEvent);

                var clickEvent = new MouseEvent("click", {
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: x,
                    clientY: y,
                });
                targetElement.dispatchEvent(clickEvent);

                console.log(
                    "%cAditya | EBA",
                    "color: blue; font-size: 40px; font-weight: bold; text-shadow: 2px 2px 4px black;"
                );
                console.log(
                    `%cTriggered a click on target %c${targetElement.tagName} %cat (${x}, ${y})`,
                    "color: grey; font-size: 16px;",
                    "color: blue; font-weight: bold;",
                    "color: grey; font-size: 16px;"
                );
            } else {
                console.log(
                    "%cAditya | EBA",
                    "color: red; font-size: 40px; font-weight: bold; text-shadow: 2px 2px 4px black;"
                );
                console.warn(
                    `%cNo target found at (${x}, ${y}), skipping click`,
                    "color: red; font-size: 16px; font-weight: bold;"
                );
            }
        } catch (error) {
            console.error(
                "%cAditya | EBA: Click failed:",
                "color: red; font-size: 20px; font-weight: bold;",
                error
            );
        }
    }

    function humanLikeClick() {
        var jitteredX = currentX + getRandomOffset(positionJitter);
        var jitteredY = currentY + getRandomOffset(positionJitter);
        simulateClickAtPosition(jitteredX, jitteredY);
        var nextIntervalTime = baseIntervalTime + getRandomOffset(jitterInterval);
        setTimeout(humanLikeClick, Math.max(50, nextIntervalTime));
    }

    window.addEventListener("blur", function () {
        console.log(
            "%cAditya | EBA: Tab lost focus, but click simulation will continue.",
            "color: orange; font-size: 16px; font-weight: bold;"
        );
    });

    console.log(
        "%cAditya | EBA",
        "color: green; font-size: 50px; font-weight: bold; text-shadow: 3px 3px 6px black;"
    );
    console.log(
        "%cHuman-like clicking simulation started!",
        "color: grey; font-size: 16px; font-style: italic;"
    );

    humanLikeClick();
})();
