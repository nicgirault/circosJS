var width = 720,
height = 720,
outerRadius = Math.min(width, height) / 2 - 10,
innerRadius = outerRadius - 24,
pi = Math.PI;

var karyotype = [
    {len: 249250621, color: 'rgb(153,102,0)', label: 'chr1'},
    {len: 243199373, color: 'rgb(102,102,0)', label: 'chr2'},
    {len: 198022430, color: 'rgb(153,153,30)', label: 'chr3'},
    {len: 191154276, color: 'rgb(204,0,0)', label: 'chr4'},
    {len: 180915260, color: 'rgb(255,0,0)', label: 'chr5'},
    {len: 171115067, color: 'rgb(255,0,204)', label: 'chr6'},
    {len: 159138663, color: 'rgb(255,204,204)', label: 'chr7'},
    {len: 146364022, color: 'rgb(255,153,0)', label: 'chr8'},
    {len: 141213431, color: 'rgb(255,204,0)', label: 'chr9'},
    {len: 135534747, color: 'rgb(255,255,0)', label: 'chr10'},
    {len: 135006516, color: 'rgb(204,255,0)', label: 'chr11'},
    {len: 133851895, color: 'rgb(0,255,0)', label: 'chr12'},
    {len: 115169878, color: 'rgb(53,128,0)', label: 'chr13'},
    {len: 107349540, color: 'rgb(0,0,204)', label: 'chr14'},
    {len: 102531392, color: 'rgb(102,153,255)', label: 'chr5'},
    {len: 90354753, color: 'rgb(153,204,255)', label: 'chr16'},
    {len: 81195210, color: 'rgb(0,255,255)', label: 'chr17'},
    {len: 78077248, color: 'rgb(204,255,255)', label: 'chr18'},
    {len: 59128983, color: 'rgb(153,0,204)', label: 'chr19'},
    {len: 63025520, color: 'rgb(204,51,255)', label: 'chr20'},
    {len: 48129895, color: 'rgb(204,153,255)', label: 'chr21'},
    {len: 51304566, color: 'rgb(102,102,102)', label: 'chr22'},
    {len: 155270560, color: 'rgb(153,153,153)', label: 'chrX'},
    {len: 59373566, color: 'rgb(204,204,204)', label: 'chrY'},
];
var layoutChart = layout()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .labelPosition('center')
    .labelRadialOffset(25)
    .gap(0.05).gapUnit('rad');
    // .data(karyotype);
d3.select('#chart')
    .selectAll('svg')
    .data([karyotype])
    .enter()
    .append('svg')
        .attr("width", width)
        .attr("height", height)
    .call(layoutChart);


