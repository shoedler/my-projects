let MC;

let timer;

function setup() 
{
    createCanvas(window.innerWidth, window.innerHeight);
    textFont('Consolas');

    MC = new Machine();
}

function draw()
{
    background(53);
    MC.render();
    MC.move();
}


class Machine
{
    constructor()
    {
        this.slotSize = 100;
        this.slotPadding = 5;
        this.slots = 5*5;

        this.X = 0;     /* Current X Pos */
        this.Y = 0;     /* Current Y Pos */
        this.XT = 0;    /* Target X Pos  */
        this.YT = 0;    /* Target Y Pos  */
        this.XR = 0;    /* Rest X Travel */
        this.YR = 0;    /* Rest Y Travel */

        this.feedRate = 0; /* mm / minute */
    }

    command = (command) =>
    {
        const pattern = /G53\s*(X|Y)\s*(-?\d*\.\d*|-?\d*)\s*F\s*(\d*\.\d*|\d*)/;

        let match = pattern.exec(command);
        console.log(match);
        
        if (!match) 
        {
            console.error("Command is illegal");
            return;
        }
        else
        {
            this[`${match[1]}T`] = parseFloat(match[2], 100);
            this.feedRate = parseFloat(match[3], 100);
        }
    }

    move = () =>
    {
        let sec = frameRate() / 60; /* Attempt to sync the movement to the framerate */
        let stepSize = this.feedRate / (sec * 60);

        this.XR = this.XT - this.X;
        this.YR = this.YT - this.Y;

        let XDir = this.XR > 0 ? 1 : -1;
        if (abs(this.XR) > abs(stepSize))
        {
            this.X += stepSize * XDir;
        }
        else 
        {
            this.X += this.XR /* Effectively moving it to this.XT... */
        }

        let YDir = this.YR > 0 ? 1 : -1;
        if (abs(this.YR) > abs(stepSize))
        {
            this.Y += stepSize * YDir
        }
        else
        {
            this.Y += this.YR;
        }
    }

    render = () =>
    {
        let slotAmount = sqrt(this.slots);
        let edgeLength = slotAmount * (this.slotSize + this.slotPadding) + this.slotPadding;
        
        push();

        translate(this.slotSize * 2, this.slotSize * 2);

        this.renderDRO();
        this.renderSlots(slotAmount, edgeLength);
        this.renderTool();  
        this.renderSecondaryGuides(edgeLength);
        this.renderPrimaryGuides(edgeLength);

        pop();
    }

    renderDRO = () =>
    {
        const size = 20;
        fill(255);
        noStroke();
        textSize(size);
        text(`X:  ${this.X.toFixed(3).pad('0', 3)}`, -this.slotSize * 1.5, -this.slotSize * 1.5);
        text(`Y:  ${this.Y.toFixed(3)}`, -this.slotSize * 1.5, -this.slotSize * 1.5 + size);
        fill(150);
        text(`XR: ${this.XR.toFixed(3)}`, -this.slotSize * 1.5, -this.slotSize * 1.5 + size * 2);
        text(`YR: ${this.YR.toFixed(3)}`, -this.slotSize * 1.5, -this.slotSize * 1.5 + size * 3);
    }

    renderTool = () =>
    {
        fill(40);
        ellipse(this.X, this.Y, 20, 20);
        fill(255, 255, 0);
        ellipse(this.X, this.Y, 2, 2);
    }

    renderPrimaryGuides = (edgeLength) =>
    {
        const spacing = 100;
        let amount = Math.floor(edgeLength / spacing)

        stroke(255, 100, 100, 100);
        for (let i = 0; i <= amount; i++)
        {
            line(i * spacing, -spacing, i * spacing, edgeLength + spacing);
            line(-spacing, i * spacing, edgeLength + spacing, i * spacing);
        }
        
        textSize(12);
        noStroke();
        fill(255, 100, 100, 100);
        textAlign(CENTER, BOTTOM);
        for (let i = 0; i <= amount; i++) { text(`X ${i * spacing}`, i * spacing, -spacing); }
        textAlign(RIGHT, CENTER);
        for (let i = 0; i <= amount; i++) { text(`Y ${i * spacing} `, -spacing, i * spacing); }

    }

    renderSecondaryGuides = (edgeLength) =>
    {
        const spacing2 = 5;
        let amount = Math.ceil(edgeLength / spacing2);
        
        stroke(100, 100, 100, 70);
        for (let i = 0; i <= amount; i++) 
        {
            line(i * spacing2, -spacing2, i * spacing2, edgeLength + spacing2);
            line(-spacing2, i * spacing2, edgeLength + spacing2, i * spacing2);
        }
    }

    renderSlots = (slotAmount, edgeLength) =>
    {
        noStroke();
        fill(200);
        for (let i = 0; i <= slotAmount; i++)
        {
            rect(i * (this.slotSize + this.slotPadding), 0, this.slotPadding, edgeLength);
            rect(0, i * (this.slotSize + this.slotPadding), edgeLength, this.slotPadding);
        }
    }
}

COMBAK
String.prototype.pad = function (padString, length) 
{
    let str = this;
    let dec = str.indexOf(".");

    let len = dec == -1 ? str.length : dec
    while (len < length)
        str = padString + str;
    return str;
}