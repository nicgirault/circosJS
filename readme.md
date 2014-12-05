CircosJS
========

With CircosJS you can build fast and interactive circos graphs.
[Circos](http://circos.ca) graphs have been created by Martin Krzywinski.
In version 0.1, circosJS handles the layout... Next step is to handle layout labels and heatmap tracks.

Get started
-----------

In an html page, insert the circosJS library

    <script src='dist/circosJS.full.js'></script>
    <link rel='stylesheet' href='dist/circosJS.full.css'></link>

Then you can create a layout has followed:

    karyotype = [
        {len: 249250621, color: 'rgb(153,102,0)', label: '1', id: 'chr1'},
        {len: 243199373, color: 'rgb(102,102,0)', label: '2', id: 'chr2'},
        {len: 198022430, color: 'rgb(153,153,30)', label: '3', id: 'chr3'},
        {len: 191154276, color: 'rgb(204,0,0)', label: '4', id: 'chr4'},
        {len: 180915260, color: 'rgb(255,0,0)', label: '5', id: 'chr5'},
        {len: 171115067, color: 'rgb(255,0,204)', label: '6', id: 'chr6'},
        {len: 159138663, color: 'rgb(255,204,204)', label: '7', id: 'chr7'},
        {len: 146364022, color: 'rgb(255,153,0)', label: '8', id: 'chr8'},
        {len: 141213431, color: 'rgb(255,204,0)', label: '9', id: 'chr9'},
        {len: 135534747, color: 'rgb(255,255,0)', label: '10', id: 'chr10'},
        {len: 135006516, color: 'rgb(204,255,0)', label: '11', id: 'chr11'},
        {len: 133851895, color: 'rgb(0,255,0)', label: '12', id: 'chr12'},
        {len: 115169878, color: 'rgb(53,128,0)', label: '13', id: 'chr13'},
        {len: 107349540, color: 'rgb(0,0,204)', label: '14', id: 'chr14'},
        {len: 102531392, color: 'rgb(102,153,255)', label: '5', id: 'chr15'},
        {len: 90354753, color: 'rgb(153,204,255)', label: '16', id: 'chr16'},
        {len: 81195210, color: 'rgb(0,255,255)', label: '17', id: 'chr17'},
        {len: 78077248, color: 'rgb(204,255,255)', label: '18', id: 'chr18'},
        {len: 59128983, color: 'rgb(153,0,204)', label: '19', id: 'chr19'},
        {len: 63025520, color: 'rgb(204,51,255)', label: '20', id: 'chr20'},
        {len: 48129895, color: 'rgb(204,153,255)', label: '21', id: 'chr21'},
        {len: 51304566, color: 'rgb(102,102,102)', label: '22', id: 'chr22'},
        {len: 155270560, color: 'rgb(153,153,153)', label: 'X', id: 'chrX'},
        {len: 59373566, color: 'rgb(204,204,204)', label: 'Y', id: 'chrY'},
    ];
    var c = new circosJS.circos({
        width: 500,
        height: 500,
        container: '#chart'
    });
    var l = new circosJS.layout(
        {
            innerRadius: 200,
            outerRadius: 250
        },
        karyotype
    );
    c.layout(l).render();


Author
------
Nicolas Girault
nic.girault@gmail.com
