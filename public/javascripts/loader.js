window.onload = function() {
    var iconFront = document.getElementsByClassName('loading-icon-front')[0],
        iconBack = document.getElementsByClassName('loading-icon-back')[0],
        iconHolder = document.getElementById('i-h');

    // Animate icon change
    function changeIcons() {
        // Shimmy shimmy
        var reqAnimFrame = window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame,
            cancelAnimFrame = window.cancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.webkitCancelAnimationFrame,
            counter = 0,
            iconCounter = 0,
            rafReq;

        var icons = ['a', 'b', 'c', 'd', 'e'];

        // Fallback
        if (!reqAnimFrame) {
            // if no animation exists
        } else {
            // timer
            function step(timestamp) {
            	var steps = Math.ceil(timestamp/1000);
                if (steps <= 10000) {
                	if (steps >= counter && steps >= 1) {
                		if (!iconHolder.style.transform || iconHolder.style.transform === 'rotateY(0deg)') {
                			iconHolder.style.transform = 'rotateY(180deg)';
                        	iconBack.setAttribute('id', icons[iconCounter]);
                		}else {
                			iconHolder.style.transform = 'rotateY(0deg)'
                        	iconFront.setAttribute('id', icons[iconCounter]);
	                        if (iconCounter < 4) {
	                            iconCounter++;
	                        } else {
	                            iconCounter = 0;
	                        }
                		}

                    	counter += 2;
                	}else {
                	}

                    rafReq = reqAnimFrame(step);
                    
                } else {
                    cancelAnimFrame(rafReq);
                }
            }
            rafReq = reqAnimFrame(step);
        }

    }
    changeIcons();

}
