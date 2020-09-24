
/*create Dropdown menu*/
function ddmenu() {
    var dropdownMenu = d3.select("#selDataset");
    d3.json("samples.json").then((incomingData) => {
        var names = incomingData.names;
        names.forEach((name) => {
            dropdownMenu
                .append("option")
                .text(name)
                .property("value", name);

        });
        barChart(name);
        bubChart(name);
        demoInfo(name);    
    });
}

/*create bar chart*/
function barChart(name) {
    d3.json("samples.json").then((incomingData) => {
        var samples = incomingData.samples;
        var selections = samples.filter(sample => sample.id == name);
        var selection = selections[0];

        var otu_ids = selection.otu_ids;
        var ids = otu_ids.slice(0, 10).map(otu => `OTU ${otu}`);
        var sample_values = selection.sample_values;
        var otu_labels = selection.otu_labels;

        var data = [
          {
            y: ids,
            x: sample_values.slice(0,10),
            text: otu_labels.slice(0,10),
            type:"bar",
            orientation:"h",
            }
        ];
        var layout = {
            title: "Top 10 Bacteria in Each Sample",
            margin: { t: 25, l: 75 }
          };
      
        Plotly.newPlot("bar", data, layout);

    });
};

/*create bubble chart*/
function bubChart(name) {
    d3.json("samples.json").then((incomingData) => {
        var samples = incomingData.samples;
        var selections = samples.filter(sample => sample.id == name);
        var selection = selections[0];

        var sample_values = selection.sample_values;
        var otu_labels = selection.otu_labels;
        var otu_ids = selection.otu_ids;

        var data = [
          {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
            }
          }
        ];
        var layout = {
            title: "Samples via Bubbles",
        };

        Plotly.newPlot("bubble", data, layout);
    });
}     

/*populate Demographic information*/
function demoInfo(name) {
    d3.json("samples.json").then((incomingData) => {
        var metadata = incomingData.metadata;
        var selections = metadata.filter(meta => meta.id == name);
        var selection = selections[0];

        var summary = d3.select("#sample-metadata");
        summary.html("");

        Object.entries(selection).forEach(([key, value]) => {
            console.log(`${key} : ${value}`);
            summary.append("h5").text(`${key} : ${value}`);
        });
    });
}

function optionChanged(name) {
    barChart(name);
    bubChart(name);
    demoInfo(name);
  }
  
  
ddmenu();

