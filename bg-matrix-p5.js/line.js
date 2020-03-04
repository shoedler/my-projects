const CONTENT_AMOUNT = 100;
const BLANKS = CONTENT_AMOUNT / 4;
// const CONTENT = ["1", "0"];
// const CONTENT = ["//", "||", "\\"]
const CONTENT = ["𓀀", "𓀍", "𓂇", "𓂕" , "𓁻", "𓁲"] /* https://de.wikipedia.org/wiki/Unicodeblock_%C3%84gyptische_Hieroglyphen */
const PADDING = 1.2;
const MIN_Z = 5;
const MAX_Z = 20;

class line
{
  constructor(x)
  {
    this.x = x;
    this.z = random(MIN_Z, MAX_Z);
    this.content = [];

    let col_rb = map(this.z, MIN_Z, MAX_Z, 5, 80);
    let col_g  = map(this.z, MIN_Z, MAX_Z, 150, 255);
    this.color = [col_rb, col_g, col_rb];

    /* fill content array with random content */
    for (let i = 0; i < CONTENT_AMOUNT; i++)
    {
      let j = Math.round(random(0, CONTENT.length));
      this.content.push(CONTENT[j]);
    }

    /* add empty strings to array */
    for (let l = 0; l < BLANKS; l++)
    {
      this.content.push(" ");
    }

    /* set random starting point of array */
    let start = ceil(random(0, this.content.length - 1));
    for (let y = 0; y < start; y++)
    {
      this.content.unshift(this.content.pop());
    }
  }

  update()
  {
    fill(this.color);
    textSize(this.z);

    /* display text */
    for (let i = 0; i < this.content.length; i++)
    {
      text(this.content[i], this.x, (this.z * i * PADDING));
    }

    /* move last item of content to front */
    this.content.unshift(this.content.pop());
  }
}
