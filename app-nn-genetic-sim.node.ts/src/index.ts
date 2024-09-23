import { Environment } from "./simulation/environment";

(() => {
  document.addEventListener("DOMContentLoaded", (_) => {
    const canvas = document.getElementById("sketch") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    const environment = new Environment(800, 600, ctx);

    environment.init();

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < 500; i++) environment.update();
      environment.render();
      requestAnimationFrame(animate);
    }

    animate();
  });
})();
