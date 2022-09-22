import p5 from "p5";
import { EColor } from "./colors";

export type NodeLookup = { [key: string]: Node }

export class Graph {
    constructor() {
        this._lookup = { }
    }
        
    private _lookup: NodeLookup
    public get lookup(): NodeLookup {return this._lookup; }
    public get nodes() : Node[] { return Object.values(this._lookup) }
    public get edges() : Edge[] {
        const edges: Edge[] = []
        this.nodes.forEach(node => {
            node.connections.forEach(edge => edges.push({ from: node, to: edge }))
        })
        return edges;
    }

    public createNode = (id: string): Node => {
        const n = new Node(id);
        this._lookup[id] = n;
        return n;
    }
    
    public adjacencyMatrix = (): { matrix: string[][], string: string, table: HTMLTableElement } => {
        const matrix: Array<string[]> = []
        const nodes = this.nodes;

        // Build matrix
        nodes.forEach(x => {
            matrix.push([])
            nodes.forEach(y => matrix[matrix.length - 1].push(x.connections.includes(y) ? '1' : '0') )
        })

        // Extend matrix with row / col node id labels
        let stringMatrix = [ ["", ...nodes.map(n => n.id) ] ];
        matrix.forEach((row, i) => stringMatrix.push([nodes[i].id, ...row]) )

        // Build a string representation of the matrix
        const len = Math.max(...(stringMatrix.flat().map(el => el.length))) + 2; 
        const string = stringMatrix
            .map(row => row.map(item => item.padEnd(len, ' ')))
            .map(row => row.join('')).join('\n')
            
        // Build a html representation of the matrix
        const table = document.createElement("table");

        stringMatrix.map((row, rowIndex) => {
            const tr = document.createElement("tr");

            row.forEach((cell, cellIndex) => {
                const isHeaderCell = rowIndex == 0 ? true : cellIndex == 0 ? true : false;
                const hasEdges = !isHeaderCell && parseFloat(cell) > 0;

                const tc = document.createElement(isHeaderCell ? 'th' : 'td');
                tc.innerHTML = hasEdges ? '<font color="red">' + cell + "</font>" : isHeaderCell ? '<b>' + cell + '</b>' : cell;

                tr.appendChild(tc);
            })

            table.appendChild(tr);
        })

        return { matrix, string, table }
    }

    public distributeNodes = (p: p5): void => {
        const WIDTH_START = p.width * 0.25
        const WIDTH_END = p.width * 0.75
        const HEIGHT_START = p.height * 0.25
        const HEIGHT_END = p.height * 0.75

        const nodes = this.nodes;
        const edges = this.edges;

        const width = WIDTH_END - WIDTH_START
        const height = WIDTH_END - WIDTH_START

        type GraphScore = { edgeScore: number, nodeScore: number }
        type Distribution = { nodePositions: p5.Vector[], graphScore: GraphScore }

        const doesOverlap = (c1: p5.Vector, c2: p5.Vector, r: number): boolean => {
            if (c1 === null || c2 === null) 
                return false;
            const dist = Math.sqrt(Math.pow(c1.x - c2.x, 2) + Math.pow(c1.y - c2.y, 2)) + 2*r
            return dist < r; // For padding
        }

        const ccw = (v1: p5.Vector, v2: p5.Vector, v3: p5.Vector): boolean => 
            (v3.y - v1.y) * (v2.x - v1.x) > (v2.y - v1.y) * (v3.x - v1.x)
        const doIntersect = (a1: p5.Vector, a2: p5.Vector, b1: p5.Vector, b2: p5.Vector): boolean =>
            ccw(a1, b1, b2) != ccw(a2, b1, b2) && ccw(a1, a2, b1) != ccw(a1, a2, b2)

        const graphDistributionScore = (): GraphScore => {
            let edgePenalty = 1 / (edges.length * edges.length - edges.length)
            
            const result = { edgeScore: 1, nodeScore: 1 }

            // Appraise edge layout. Intersections are bad
            edges.forEach(edge => {
                edges.forEach(testEdge => {
                    if (edge !== testEdge) {
                        result.edgeScore -= doIntersect(edge.from.pos, edge.to.pos, testEdge.from.pos, testEdge.to.pos) ? edgePenalty : 0
                    }
                })
            })

            const isLandscape = width > height;

            // Appraise x spread. Smaller is better (Depends on the aspect ratio)
            const xMax = Math.min(...nodes.map(n => n.pos.x));
            const xMin = Math.max(...nodes.map(n => n.pos.x));
            const widthScore = isLandscape ? 1 - (width / (xMax - xMin)) : (width / (xMax - xMin))

            // Appraise y spread. Bigger is better (Depends on the aspect ratio)
            const yMax = Math.min(...nodes.map(n => n.pos.y));
            const yMin = Math.max(...nodes.map(n => n.pos.y));
            const heightScore = isLandscape ? (height / (yMax - yMin)) : 1 - (height / (yMax - yMin))

            result.nodeScore = widthScore * 0.5 + heightScore * 0.5
            return result;
        }

        const randomVector = () => p.createVector(
            p.random(WIDTH_START, WIDTH_END), 
            p.random(HEIGHT_START, HEIGHT_END));

        const distributions: Distribution[] = []

        // Generate a number of distributions
        for (let i = 0; i < 1e5; i++) {
            const distribution: Distribution = { nodePositions: [], graphScore: null }

            // Assign positions
            nodes.forEach(node => {
                let pos: p5.Vector;
                do { pos = randomVector(); }
                while (nodes.some(node => doesOverlap(node.pos, pos, Node.radius)))
                distribution.nodePositions.push(pos);
                node.pos = pos;
            })
    
            distribution.graphScore = graphDistributionScore()
            distributions.push(distribution)
        }

        // Select the one with best edge score (least intersections)
        const bestEdgeScore = Math.max(...distributions.map(dist => dist.graphScore.edgeScore));
        const candidates = distributions.filter(dist => dist.graphScore.edgeScore == bestEdgeScore)

        // Select the candidate with best node scope
        const bestCandidateNodeScore = Math.max(...candidates.map(dist => dist.graphScore.nodeScore))
        const winner = candidates.find(cand => cand.graphScore.nodeScore == bestCandidateNodeScore);

        console.log(Math.max(...distributions.map(dist => dist.graphScore.edgeScore)))

        // Set positions
        winner.nodePositions.forEach((pos, i) => {
            nodes[i].pos = pos
        })
    }

    public render = (p: p5): void => {
        p.fill(Node.fillColor);
        p.stroke(Node.strokeColor);
        p.strokeWeight(2);
        p.textAlign(p.CENTER, p.CENTER);

        const nodes = this.nodes;

        // Draw Edges first, then nodes, then labels
        nodes.forEach(node => node.connections.forEach(edge => p.line(node.pos.x, node.pos.y, edge.pos.x, edge.pos.y)))

        nodes.forEach(node => p.circle(node.pos.x, node.pos.y, Node.radius * 2))

        p.stroke(0);
        p.strokeWeight(0);
        p.fill(Node.strokeColor);

        nodes.forEach(node => p.text(node.id, node.pos.x, node.pos.y))

    }
}

interface Edge {
    from: Node;
    to: Node
}

class Node {
    // Drawing related Props
    public static radius: number = 10;
    public static fillColor: EColor = EColor.wetAsphalt;
    public static strokeColor: EColor = EColor.greenSea;

    private _pos : p5.Vector = null;
    public get pos() : p5.Vector { return this._pos; }
    public set pos(v : p5.Vector) { this._pos = v; }
    // End of drawing related Props

    private _id: string;
    public get id(): string { return this._id; }

    private _connections: Node[];
    public get connections(): Node[] { return this._connections; }

    public get degree(): number { return this._connections.length; }
    
    constructor(id: string) {
        if (id.length != 1)
            throw new Error(`id ('${id}') argument must be of length 1`)

        this._id = id;
        this._connections = []
    }

    public edgeList = (): { array: { [key: string]: string}[], string: string, table: HTMLTableElement } => {
        // Collect edges
        const edges = this._connections.map(node => [ this, node ] )
        const array = edges.map(edge => { return { [edge[0].id]: edge[1].id }})

        // Build a string representation of the edge list
        const string = edges.map(edge => `${edge[0].id} - ${edge[1].id}\n`).join('')

        // Build a html (table) representation of the edge list
        console.assert(edges.every(edge => edge[0].id == edges[0][0].id), "Edges should start with the same node id")
        const table = document.createElement('table');
        const headerRow = document.createElement('tr');
        
        headerRow.innerHTML = `<th></th><th><b>${edges[0][0].id}</b></th>`
        table.appendChild(headerRow)
        edges.forEach((edge, i) => {
            const tr = document.createElement('tr');
            const th = document.createElement('th');
            const td = document.createElement('td');

            th.innerHTML = `<b>${i}</b>`
            td.innerHTML = edge[1].id
            tr.appendChild(th);
            tr.appendChild(td);

            table.appendChild(tr);
        });

        return { array, string, table }
    }

    public directed = (to: Node) => {
        this._connections.push(to);
    }

    public undirected = (to: Node) => {
        this.directed(to);
        to.connections.push(this);
    }
}