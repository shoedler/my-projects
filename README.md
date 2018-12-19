# Wordpress Implementation
### Avada
1. Upload .js File(s) to your ```http://www.yoursite.any/wp-content/your-theme/js/my_script.js``` folder

2. Admin Dashboard > Avada > Theme Options > Advanced > "Space before </head>" and add the following:

  ```<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.min.js"></script>```

  ```<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/addons/p5.dom.min.js"></script>```

  ```<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/addons/p5.sound.min.js"></script>```

3. Page > your desired container > add a ```Code Block```, with the following:

  ```<script src="http://www.yoursite.any/wp-content/themes/your-theme/js/my_sketch.js"></script>```

  While you're there, edit your container and add an entry under ```CSS ID``` for example: ```anim_my_sketch```

4. Make sure your ```my_sketch.js``` file uses p5js's instance mode: https://github.com/processing/p5.js/wiki/Global-and-instance-mode

  ```new p5(sketch, 'my_sketch.js');```

5. Done!
