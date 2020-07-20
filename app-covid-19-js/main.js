let renderer = null;
const w = window.innerWidth;
const h = window.innerHeight;

/* According to https://api.covid19api.com/ */
const requestOptions = { method: 'GET', redirect: 'follow' };

/* Valid 'cases' according to https://api.covid19api.com/ */
const caseTypes = [
    {
        case: 'confirmed',
        color: 'rgba(054, 162, 235, 1)',
        backColor: 'rgba(054, 162, 235, 0.2)'
    },
    {
        case: 'deaths',
        color: 'rgba(255, 099, 132, 1)',
        backColor: 'rgba(255, 099, 132, 0.2)'
    },
    {
        case: 'recovered',
        color: 'rgba(255, 206, 086, 1)',
        backColor: 'rgba(255, 206, 086, 0.2)'
    }    
]


function setup()
{
    renderer = createCanvas(w, h * 0.9);
    renderer.background(53);
    noLoop();
    run()
}


let run = async() =>
{
    window.ch = await CountryStatsCOVID19.build('switzerland');
    console.log(ch);
}

class CountryStatsCOVID19
{
    constructor(datasets)
    {
        /* ChartJS required properties */
        this.data = {datasets: datasets};
        this.type = 'line';
        this.options = 
        {
            scales:
            {
                yAxes: [{ 
                            ticks: { beginAtZero: true },
                            type: 'logarithmic'
                        }],
                xAxes: [{
                            type: 'time', 
                            time: {
                                displayFormats: {
                                    day: 'MMM D'
                                }
                            }
                        }]
            }
        };

        /* Create new ChartJS Chart */ 
        this.chart = new Chart(renderer.canvas, this);
    }

    static build = async(countrySlug) =>
    {
        /* Get COVID 19 API responses for all available Case Types accepted by the API */
        let datasets = [];
        for (let caseType of caseTypes)
        {
            /* Get API Response */
            let response = (await get(`https://api.covid19api.com/total/country/${countrySlug}/status/${caseType.case}`));

            /* Create ChartJS compatible Dataset from each API response */

            /* Each Datapoint for ChartJS consists of an Object which has a x and a y property.
            If the 'Cases' amount is 0, the we don't want to create a Datapoint */
            let datapoints = [];

            response.forEach(entry => 
            {
                if (entry.Cases != 0)
                {                    
                    datapoints.push(
                    { 
                        x: entry.Date, 
                        y: entry.Cases
                    });
                }
            });

            datasets.push(
                new ChartJSDataset(
                    caseType.case, 
                    response,
                    `${response[0].Country} COVID-19 ${response[0].Status} cases`,
                    caseType.backColor,
                    caseType.color,
                    1,
                    datapoints
                )
            );
        }

       return new CountryStatsCOVID19(datasets);
    }
}

class ChartJSDataset
{
    constructor(id, raw, label, backgroundColor, borderColor, borderWidth, data)
    {
        this.id = id; 
        this.raw = raw;

        /* ChartJS relevant properties */
        this.label = label;
        this.backgroundColor = backgroundColor;
        this.borderColor = borderColor;
        this.borderWidth = borderWidth;
        this.data = data;
    }
}


let get = async(request) =>
{
    let response;
        
    try 
    {
        response = await fetch(request, requestOptions);
    } 
    catch (error) 
    {
        throw error;
    }

    let text = await response.text();

    let obj = JSON.parse(text);   

    return obj
}
