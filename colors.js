(function ( $ ) {
    $.colorShifter = function( options, callback ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            hexColor: "556b2f",
            steps: 10
        }, options );

        var colorsToReturn = [];

        var toRGB = function (/* String */ color) {
            if( /^#?([A-Fa-f0-9]{3})$/.exec(color) ) {
                var b=color.replace('#',''), color='';
                if (3 == b.length) { // hex multiplier
                    $(b.split('')).each(function (i, c){color+=(c+c);});
                }
            }

        	var regex = /^#?([A-Fa-f0-9]{6})$/.exec(color);
        	if(!regex) {
        		return callback('Invalid hex color');
        	}
			var num = parseInt(regex[1], 16);
			return [num >> 16, num >> 8 & 255, num & 255];
		};

		var toHex = function (/* Number */ red, /* Number */ green, /* Number */ blue) {
			if(isNaN(red) || red < 0 || red > 255) { return callback('Invalid RGB value'); }
			if(isNaN(green) || green < 0 || green > 255) { return callback('Invalid RGB value'); }
			if(isNaN(blue) || blue < 0 || blue > 255) { return callback('Invalid RGB value'); }

			return ((blue | green << 8 | red << 16) | 1 << 24).toString(16).slice(1);
		};
 
		var rgb = toRGB(settings.hexColor);
		var max = 0;
		var min = 255;
		for(var i in rgb) {
			if(rgb[i] >= max) { 
				max = rgb[i];
			}
			if(rgb[i] <= min) { 
				min = rgb[i];
			}
		}

		var ratio = [
			rgb[0]/max,
			rgb[1]/max,
			rgb[2]/max,
		];

		var maxColor = [
			Math.floor(255*ratio[0]),
			Math.floor(255*ratio[1]),
			Math.floor(255*ratio[2])
		];

		var minColor = [
			Math.floor((255-min)*ratio[0]),
			Math.floor((255-min)*ratio[1]),
			Math.floor((255-min)*ratio[2])
		];

		var minColor = [0,0,0];

		var maxIncrements = [
			(maxColor[0]-minColor[0])/(settings.steps/2),
			(maxColor[1]-minColor[1])/(settings.steps/2),
			(maxColor[2]-minColor[2])/(settings.steps/2)
		]

		var minIncrements = [
			(255-maxColor[0])/(settings.steps/2),
			(255-maxColor[1])/(settings.steps/2),
			(255-maxColor[2])/(settings.steps/2)
		];

		for(var i = 0; i < settings.steps/2; i++) {
			var newColor = [
				Math.floor(minColor[0]+maxIncrements[0]*i),
				Math.floor(minColor[1]+maxIncrements[1]*i),
				Math.floor(minColor[2]+maxIncrements[2]*i)
			];
			var hex = toHex(newColor[0], newColor[1], newColor[2]);
			colorsToReturn.push('#'+hex);
		}
		for(var i = 1; i < (settings.steps/2)+1; i++) {
			var newColor = [
				Math.min(255,Math.floor(maxColor[0]+minIncrements[0]*i)),
				Math.min(255,Math.floor(maxColor[1]+minIncrements[1]*i)),
				Math.min(255,Math.floor(maxColor[2]+minIncrements[2]*i))
			];
			var hex = toHex(newColor[0], newColor[1], newColor[2]);
			colorsToReturn.push('#'+hex);
		}

		return callback(null,colorsToReturn);
    };
}( jQuery ));