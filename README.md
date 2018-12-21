# Rules for new scripts using p5js
- *Scripts must be written using p5js's instance mode*
- *Script instances must have a unique sketch var such as
  *```const scriptname_sketch = function(p) {```* and *```var scriptname_canvas = new p5(scriptname_sketch, 'anim_scriptname');```* where *```scriptname```* is your literal script name*
- *Scripts must have a unique container identifier (ID) such as *```var scriptname_canvas = new p5(scriptname_sketch, 'anim_scriptname');```* where *```anim_scriptname```* is *```anim_```* plus your literal script name*

# Resources
1.  p5js instance mode: https://github.com/processing/p5.js/wiki/Global-and-instance-mode
2. Create jsdelivr link to github content https://stackoverflow.com/a/18049842

# Wordpress Implementation
### Using Avada
1. Get jsdelivr link to wanted js file (Point 2 in Resources)

2. On your server: server > wp-content > themes > your-theme > js
  create a new folder, which has the same name as the ```BG.``` folder from this repo. for example ```BG.5DCube.p5.js```

3. Upload the latest version of the ```style.css``` and ```index.html``` files.

4. In your Wordpress Dashboard: Page > your desired container > add a ```Code Block```:
  paste the code from ```SNIPPET.md``` to this codeblock. Make sure you edit the ```src``` part of the ```iframe``` to point to the
  ```index.html``` in the custom folder.

5. While you're at that container, edit your container (brush symbol) and add an entry under ```CSS ID``` for example: ```anim_scriptname```
  according to your chosen sketch f.e. ```var scriptname_canvas = new p5(scriptname_sketch, 'anim_scriptname');```

5. Done!

# Open points
Update flocking to the state of 5DCube
checkout http://www.joemckaystudio.com/multisketches/
