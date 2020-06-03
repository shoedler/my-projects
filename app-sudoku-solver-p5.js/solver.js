let grid = [];

grid.push([5,3,0,0,7,0,0,0,0]);
grid.push([6,0,0,1,9,5,0,0,0]);
grid.push([0,9,8,0,0,0,0,6,0]);
grid.push([8,0,0,0,6,0,0,0,3]);
grid.push([4,0,0,8,0,3,0,0,1]);
grid.push([7,0,0,0,2,0,0,0,6]);
grid.push([0,6,0,0,0,0,2,8,0]);
grid.push([0,0,0,4,1,9,0,0,5]);
grid.push([0,0,0,0,8,0,0,7,9]);

const possible = (y, x, n) =>
{
    for (let i = 0; i < grid.length; i++) 
    {
        if (grid[y][i] == n) return false;
    }

    for (let i = 0; i < grid.length; i++) 
    {
        if (grid[i][x] == n) return false;
    }

    let x0 = Math.floor(x / 3) * 3;
    let y0 = Math.floor(y / 3) * 3;

    for (let i = 0; i < 3; i++) 
    {
        for (let j = 0; j < 3; j++) 
        {
            if (grid[y0 + i][x0 + 1] == n) return false;
        }
    }

    return true
}

const solve = () =>
{
    for (let y = 0; y < grid.length; y++) 
    {
        for (let x = 0; x < grid[y].length; x++) 
        {
            if (grid[y][x] == 0)
            {
                for (let n = 1; n < grid.length + 1; n++)
                {
                    if (possible(y, x, n))
                    {
                        grid[y][x] = n;
                        solve();
                        grid[y][x] = 0;
                    }
                }
                return;
            }
        }
    }
    print();
    prompt("More Solutions?");
}

const print = () =>
{
    console.log(" ");
    
    for (let y = 0; y < grid.length; y++) 
    {
        let c = "";
        for (let x = 0; x < grid[y].length; x++) 
        {
            c += grid[y][x] + "  ";
        }
        console.log(c);
    }
}

solve();