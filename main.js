
// draw charts

function drawChart1() {
    // width and height of the SVG
    const width = window.innerWidth;
    const height = window.innerHeight;
    const margin = 50;

    //create an svg with width and height
    var svg = d3.select("#grid-chart-one")
        .append("svg")
        .attr("width", width)
        .attr("height", height)

    //1 row and 4 columns for 4.4k cars
    var numRows = 1;
    var numCols = 4;

    //x and y axis scales
    var y = d3.scaleBand()
        .domain(d3.range(numRows))
        .range([0,height - margin]);

    var x = d3.scaleBand()
        .domain(d3.range(numCols))
        .range([0,width - margin]);

    //the data is just an array of numbers for each cell in the grid
    var data = d3.range(numCols*numRows);

    //container to hold the grid
    var container = svg.append("g")
        // .attr("transform", "translate(50,20)");
        .attr("transform", "translate(" + width/8 + "," + height/2 + ")");

    container
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("id", function(d){return "id"+d;})
        .attr("cx", function(d){return x(d%numCols);})
        .attr("cy", function(d){return y(Math.floor(d/numCols));})
        .attr("r", 5)
}

function drawChart2() {
    // width and height of the SVG
    const width = window.innerWidth;
    const height = 500;
    const margin = 50;

    //create an svg with width and height
    var svg = d3.select("#grid-chart-two")
        .append("svg")
        .attr("width", width - margin)
        .attr("height", height - margin)

    //11 rows and 40 columns for 440k 
    var numRows = 11;
    var numCols = 40;

    //x and y axis scales
    var y = d3.scaleBand()
        .domain(d3.range(numRows))
        .range([0,height - margin]);

    var x = d3.scaleBand()
        .domain(d3.range(numCols))
        .range([0, width - margin]);

    //the data is just an array of numbers for each cell in the grid
    var data = d3.range(numCols*numRows);

    //container to hold the grid
    // move it
    var container = svg
        .append("g")
        // .attr("transform", "translate(50,20)");
        .attr('transform', `translate(${margin} ${margin})`)

    container
        .selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("id", function(d){return "id"+d;})
        .attr("cx", function(d){return x(d%numCols);})
        .transition()
        .attr("cy", function(d){return y(Math.floor(d/numCols));})
        .attr("r", 5)

}


function drawChart3() {
    // width and height of the SVG
    const width = window.innerWidth;
    const height = 1500;
    const margin = 50;

    //create an svg with width and height
    var svg = d3.select("#grid-chart-three")
        .append("svg")
        .attr("width", width - margin)
        .attr("height", height - margin)

    //1050 rows and 40 columns for 42000k
    var numRows = 40;
    var numCols = 1050;

    //x and y axis scales
    var y = d3.scaleBand()
        .domain(d3.range(numRows))
        .range([0, height - margin]);

    var x = d3.scaleBand()
        .domain(d3.range(numCols))
        .range([0, width - margin]);

    //the data is just an array of numbers for each cell in the grid
    var data = d3.range(numCols*numRows);

    //container to hold the grid
    // move it
    var container = svg.append("g")
        .attr("transform", "translate(50,20)");

    container.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("id", function(d){return "id"+d;})
        .attr("cx", function(d){return x(d%numCols);})
        .transition()
        .attr("cy", function(d){return y(Math.floor(d/numCols));})
        .attr("r", 5)

}


// create our scrollama instance and call it scroller
const scroll = scrollama();

// this function shows the element passed to it by setting opacity to 1 or another value we specify
function show(selector, opacity = 1) {
    d3.selectAll(selector)
        .transition()
        .duration(100)
        .attr("opacity", opacity)
}
// this function hides the element passed to it by setting opacity to 0
function hide(selector) {
    d3.selectAll(selector)
        .transition()
        // .duration(200)
        .attr("opacity", 0)
}

// setup the scroller with some options
// ".step" means any items with a class of "step"
// offset is where on the page each step gets triggered
// 0.5 is the middle of the page
// debug gives us guides on the page that help us while we are working on this
scroll.setup({
    step: ".step",
    offset: 0.75,
    debug: false
})
    // the function that fires every time a new step activates
    .onStepEnter((response) => {
        // this log helps us keep track of where we are while we are building the scrolly
        console.log("step triggered: " + response.index);
        
        // a series of if statements to run different pieces of code for different steps
        if (response.index === 0) {
            // inside each step, let's provide instructions for everything that needs to happen
            console.log('hello')
            hide("#grid-container-one")
            hide("#grid-container-two")
            hide("#grid-container-three")

        } else if (response.index === 1) {
            drawChart1()
            show("#grid-container-one")
            hide("#grid-container-two")
            hide("#grid-container-three")

        } else if (response.index === 2) {
            drawChart2()
            hide("#grid-container-one")
            show("#grid-container-two")
            hide("#grid-container-three")

        } else if (response.index === 3) {
            drawChart3()
            hide("#grid-container-one")
            hide("#grid-container-two")
            show("#grid-container-three")
        } 
    });