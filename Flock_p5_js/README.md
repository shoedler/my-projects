# Wordpress Implementation
### Avada
Upload .js File(s) to your ```http://www.yoursite.any/wp-content/your-theme/js/my_script.js``` folder

Admin Dashboard > Avada > Theme Options > Advanced > "Space before </head>" and add the following:

```<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/p5.min.js"></script>```

```<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/addons/p5.dom.min.js"></script>```

```<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.7.2/addons/p5.sound.min.js"></script>```

In your page, add the following:

And then your custom script, pointing to your folder
```<script src="http://www.yoursite.any/wp-content/themes/your-theme/js/my_sketch.js"></script>```
