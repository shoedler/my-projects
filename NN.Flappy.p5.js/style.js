
function styleElements() {
  paceSlider.style('width', String(round(window.innerWidth / 5)) + 'px');

  saveButton.style('width', String(round(window.innerWidth / 4)) + 'px');
  saveButton.style('font-family', 'consolas');
  saveButton.style('color', mainColor);
  saveButton.style('border-color', mainColor);
  saveButton.style('border-width', '1px');
  saveButton.style('background-color', 'rgba(0,0,0,0)');

  loadButton.style('width', String(round(window.innerWidth / 4)) + 'px');
  loadButton.style('font-family', 'consolas');
  loadButton.style('color', mainColor);
  loadButton.style('border-color', mainColor);
  loadButton.style('border-width', '1px');
  loadButton.style('background-color', 'rgba(0,0,0,0)');

  loadURLInput.style('width', String(round(window.innerWidth / 4)) + 'px');
  loadURLInput.style('font-family', 'consolas');
  loadURLInput.style('color', mainColor);
  loadURLInput.style('border-color', mainColor);
  loadURLInput.style('border-width', '1px');
  loadURLInput.style('background-color', 'rgba(0,0,0,0)');
  loadURLInput.style('border-style', 'dotted');
}
