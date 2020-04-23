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
    MC.run();
    
}


class Machine
{
    constructor()
    {
        this.slotSize = 95;
        this.slotPadding = 5;
        this.slots = 5*5;

        this.commandBuffer = [];

        this.state = false;
        
        this.X = 0;  /* Current X Pos */
        this.Y = 0;  /* Current Y Pos */
        this.XT = 0; /* Target X Pos  */
        this.YT = 0; /* Target Y Pos  */
        this.XR = 0; /* Rest X Travel */
        this.YR = 0; /* Rest Y Travel */

        this.XF = 0; /* X Feedrate in mm / minute */
        this.YF = 0; /* Y Feedrate in mm / minute */
    }

    command = (command) =>
    {
        const pattern = /G53\s*(X|Y)\s*(-?\d*\.\d*|-?\d*)\s*F\s*(\d*\.\d*|\d*)/;

        let match = pattern.exec(command);

        if (!match) 
        {
            console.error("Command is illegal");
            return;
        }
        else
        {
            let c = {};
            c[`${match[1]}T`] = parseFloat(match[2], 100);
            c[`${match[1]}F`] = parseFloat(match[3], 100)
            this.commandBuffer.push(c);
            
            // this[`${match[1]}T`] = parseFloat(match[2], 100);
            // this[`${match[1]}F`] = parseFloat(match[3], 100);
        }
    }

    run = () =>
    {
        this.state = this.XR != 0 || this.YR != 0;

        if (!this.state)
        {
            if (this.commandBuffer.length > 0)
            {
                let c = this.commandBuffer[0];
                
                this[Object.keys(c)[0]] = c[Object.keys(c)[0]];
                this[Object.keys(c)[1]] = c[Object.keys(c)[1]];

                this.commandBuffer.splice(0, 1);
            }
        }

        let sec = frameRate() / 60; /* Attempt to sync the movement to the framerate */

        let xStep = this.XF / (sec * 60);
        let yStep = this.YF / (sec * 60);

        this.XR = this.XT - this.X;
        this.YR = this.YT - this.Y;

        let xDir = this.XR > 0 ? 1 : -1;
        if (abs(this.XR) > abs(xStep)) { this.X += xStep * xDir; }
        else                           { this.X += this.XR; }

        let yDir = this.YR > 0 ? 1 : -1;
        if (abs(this.YR) > abs(yStep)) { this.Y += yStep * yDir; }
        else                           { this.Y += this.YR; }
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
        const size = 18;
        let state = this.state ? 'processing...' : 'idle';

        fill(255);
        noStroke();
        textSize(size);
        text(`X:  ${toDRO(this.X, 3, 3)}`, -this.slotSize * 1.5, -this.slotSize * 1.5);
        text(`Y:  ${toDRO(this.Y, 3, 3)}`, -this.slotSize * 1.5, -this.slotSize * 1.5 + size);
        fill(150);
        text(`XR: ${toDRO(this.XR, 3, 3)}`, -this.slotSize * 1.5, -this.slotSize * 1.5 + size * 2);
        text(`YR: ${toDRO(this.YR, 3, 3)}`, -this.slotSize * 1.5, -this.slotSize * 1.5 + size * 3);
        
        text(state, -this.slotSize * 1.5, -this.slotSize * 1.5 + size * 5);
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


let toDRO = (number, leadingZeros, decimalPlaces) =>
{
    const delimiter = ".";
    const zero = "0";

    let str = number.toFixed(decimalPlaces);

    let pre = str.indexOf(delimiter);

    if (pre >= leadingZeros) return str;

    return zero.repeat(leadingZeros - pre) + str;
}


