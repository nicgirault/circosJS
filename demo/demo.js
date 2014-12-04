// var width = 720,
// height = 720,
// outerRadius= Math.min(width, height) / 2 - 10,
// innerRadius = outerRadius - 24,
// pi = Math.PI;
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
var heatmap = [
    {
        parent: 'chr2',
        data: [
            {start: 1, end: 10000000, value: 0},
            {start: 10000001, end: 20000000, value: 1},
            {start: 20000001, end: 30000000, value: 2},
            {start: 30000001, end: 40000000, value: 3},
            {start: 40000001, end: 50000000, value: 4},
            {start: 50000001, end: 60000000, value: 5},
            {start: 60000001, end: 70000000, value: 6},
            {start: 70000001, end: 80000000, value: 7},
            {start: 80000001, end: 90000000, value: 8},
            {start: 90000001, end: 100000000, value: 9},
            {start: 100000001, end: 110000000, value: 8},
            {start: 110000001, end: 120000000, value: 7},
            {start: 120000001, end: 130000000, value: 6},
            {start: 130000001, end: 140000000, value: 5},
            {start: 140000001, end: 150000000, value: 4},
            {start: 150000001, end: 160000000, value: 3},
            {start: 160000001, end: 170000000, value: 2},
            {start: 170000001, end: 180000000, value: 1},
            {start: 180000001, end: 190000000, value: 0},
            {start: 190000001, end: 200000000, value: 1},
        ]
    },
    
];
    

// //just thinking
// var circos = new circosJS({
//     width: 500,
//     height: 500,
//     container: '#chart'
// });

// // var circos2 = new circosJS(d3);
// // circos2.increment
// // circos2.increment

// circos.layout(
//     {
//         innerRadius: 200,
//         outerRadius: 250
//     },
//     karyotype
// );
// circos.heatmap(
//     'track1',
//     {
//         innerRadius: 160,
//         outerRadius: 195,
//         colorPalette: 'RdYlGn',
//         colorRange: 9,
//         min: 0, //todo
//         max: 0 //todo
//     },
//     heatmap
// );

// circosJS.test();
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
