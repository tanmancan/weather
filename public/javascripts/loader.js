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

        var icons = ['a', 'b', 'c', 'd', 'e'],
            randIcon = icons[Math.floor(Math.random() * icons.length)];

        // Fallback
        if (!reqAnimFrame) {
            // if no animation exists
        } else {
            // timer
            function step(timestamp) {
            	var steps = Math.round(timestamp);
                var elRotate = window.getComputedStyle(iconHolder, null),
                    elMatrix;

                elMatrix = elRotate.getPropertyValue('transform');

                var values = elMatrix.split('(')[1],
                    values = values.split(')')[0],
                    values = values.split(',');

                var a = values[0];
                var b = values[1];
                var c = values[2];
                var d = values[3];


                if (steps <= 4000) {
                	console.log(steps);
                	console.log(counter);
                	console.log(a, c);
                	if (steps >= counter) {
                		console.log('red');
                        iconHolder.style.background = "red";
                        iconFront.setAttribute('id', icons[iconCounter]);
                        iconBack.setAttribute('id', icons[iconCounter]);

                        if (iconCounter < 4) {
                            iconCounter++;
                        } else {
                            iconCounter = 0;
                        }
                    	counter += 2000;

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
