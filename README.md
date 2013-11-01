color-shifter
=============

jQuery extension which takes in a base hex color code and generates N related color codes.
The generated color codes will smoothly transition from black to white, but will maintain the same hue as the original color value.

### Usage
```
$.colorShifter({ "hexColor":hex, "steps":steps},function(err,results) {
	if(err) {
		//handle errors here
	}
	else {
		for(var i in results) {
			//use color here
		}
	}
});

```

### Known Issues
* If you start with all black '000000' it won't generate anything but black.
* If you start with all white 'ffffff' it only generates half the scale correctly.
* All other tested colors seem to work