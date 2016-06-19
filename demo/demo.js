var layout_data = [
  { "len": 31, "color": "#8dd3c7", "label": "January", "id": "january" },
  { "len": 28, "color": "#ffffb3", "label": "February", "id": "february" },
  { "len": 31, "color": "#bebada", "label": "March", "id": "march" },
  { "len": 30, "color": "#fb8072", "label": "April", "id": "april" },
  { "len": 31, "color": "#80b1d3", "label": "May", "id": "may" },
  { "len": 30, "color": "#fdb462", "label": "June", "id": "june" },
  { "len": 31, "color": "#b3de69", "label": "July", "id": "july" },
  { "len": 31, "color": "#fccde5", "label": "August", "id": "august" },
  { "len": 30, "color": "#d9d9d9", "label": "September", "id": "september" },
  { "len": 31, "color": "#bc80bd", "label": "October", "id": "october" },
  { "len": 30, "color": "#ccebc5", "label": "November", "id": "november" },
  { "len": 31, "color": "#ffed6f", "label": "December", "id": "december" }
];
var heatmap = [
  {
    parent: "chr1",
    data: [
      {start:1, end:10000000, value:0},
      {start:10000001, end:20000000, value:1},
      {start:20000001, end:30000000, value:2},
      {start:30000001, end:40000000, value:3},
      {start:40000001, end:50000000, value:4},
      {start:50000001, end:60000000, value:5},
      {start:60000001, end:70000000, value:6},
      {start:70000001, end:80000000, value:7},
      {start:80000001, end:90000000, value:8},
      {start:90000001, end:100000000, value:9},
      {start:100000001, end:110000000, value:9},
      {start:110000001, end:120000000, value:8},
      {start:120000001, end:130000000, value:7},
      {start:130000001, end:140000000, value:6},
      {start:140000001, end:150000000, value:5},
      {start:150000001, end:160000000, value:4},
      {start:160000001, end:170000000, value:3},
      {start:170000001, end:180000000, value:2},
      {start:180000001, end:190000000, value:1},
      {start:190000001, end:200000000, value:0},
      {start:200000001, end:210000000, value:0},
      {start:210000001, end:220000000, value:1},
      {start:220000001, end:230000000, value:2},
      {start:230000001, end:240000000, value:3},
      {start:240000001, end:249250621, value:3}
    ]
  },
  {
    parent: "chr2",
    data: [
      {start:1, end:10000000, value:4},
      {start:10000001, end:20000000, value:5},
      {start:20000001, end:30000000, value:6},
      {start:30000001, end:40000000, value:7},
      {start:40000001, end:50000000, value:8},
      {start:50000001, end:60000000, value:9},
      {start:60000001, end:70000000, value:9},
      {start:70000001, end:80000000, value:8},
      {start:80000001, end:90000000, value:7},
      {start:90000001, end:100000000, value:6},
      {start:100000001, end:110000000, value:5},
      {start:110000001, end:120000000, value:4},
      {start:120000001, end:130000000, value:3},
      {start:130000001, end:140000000, value:2},
      {start:140000001, end:150000000, value:1},
      {start:150000001, end:160000000, value:0},
      {start:160000001, end:170000000, value:0},
      {start:170000001, end:180000000, value:1},
      {start:180000001, end:190000000, value:2},
      {start:190000001, end:200000000, value:3},
      {start:200000001, end:210000000, value:4},
      {start:210000001, end:220000000, value:5},
      {start:220000001, end:230000000, value:6},
      {start:230000001, end:240000000, value:7},
      {start:240000001, end:243199373, value:7}
    ]
  },
  {
    parent: "chr3",
    data: [
      {start:1, end:10000000, value:8},
      {start:10000001, end:20000000, value:9},
      {start:20000001, end:30000000, value:9},
      {start:30000001, end:40000000, value:8},
      {start:40000001, end:50000000, value:7},
      {start:50000001, end:60000000, value:6},
      {start:60000001, end:70000000, value:5},
      {start:70000001, end:80000000, value:4},
      {start:80000001, end:90000000, value:3},
      {start:90000001, end:100000000, value:2},
      {start:100000001, end:110000000, value:1},
      {start:110000001, end:120000000, value:0},
      {start:120000001, end:130000000, value:0},
      {start:130000001, end:140000000, value:1},
      {start:140000001, end:150000000, value:2},
      {start:150000001, end:160000000, value:3},
      {start:160000001, end:170000000, value:4},
      {start:170000001, end:180000000, value:5},
      {start:180000001, end:190000000, value:6},
      {start:190000001, end:198022430, value:6}
    ]
  },
  {
    parent: "chr4",
    data: [
      {start:1, end:10000000, value:7},
      {start:10000001, end:20000000, value:8},
      {start:20000001, end:30000000, value:9},
      {start:30000001, end:40000000, value:9},
      {start:40000001, end:50000000, value:8},
      {start:50000001, end:60000000, value:7},
      {start:60000001, end:70000000, value:6},
      {start:70000001, end:80000000, value:5},
      {start:80000001, end:90000000, value:4},
      {start:90000001, end:100000000, value:3},
      {start:100000001, end:110000000, value:2},
      {start:110000001, end:120000000, value:1},
      {start:120000001, end:130000000, value:0},
      {start:130000001, end:140000000, value:0},
      {start:140000001, end:150000000, value:1},
      {start:150000001, end:160000000, value:2},
      {start:160000001, end:170000000, value:3},
      {start:170000001, end:180000000, value:4},
      {start:180000001, end:190000000, value:5},
      {start:190000001, end:191154276, value:5}
    ]
  },
  {
    parent: "chr5",
    data: [
      {start:1, end:10000000, value:6},
      {start:10000001, end:20000000, value:7},
      {start:20000001, end:30000000, value:8},
      {start:30000001, end:40000000, value:9},
      {start:40000001, end:50000000, value:9},
      {start:50000001, end:60000000, value:8},
      {start:60000001, end:70000000, value:7},
      {start:70000001, end:80000000, value:6},
      {start:80000001, end:90000000, value:5},
      {start:90000001, end:100000000, value:4},
      {start:100000001, end:110000000, value:3},
      {start:110000001, end:120000000, value:2},
      {start:120000001, end:130000000, value:1},
      {start:130000001, end:140000000, value:0},
      {start:140000001, end:150000000, value:0},
      {start:150000001, end:160000000, value:1},
      {start:160000001, end:170000000, value:2},
      {start:170000001, end:180000000, value:3},
      {start:180000001, end:180915260, value:3}
    ]
  },
  {
    parent: "chr6",
    data: [
      {start:1, end:10000000, value:4},
      {start:10000001, end:20000000, value:5},
      {start:20000001, end:30000000, value:6},
      {start:30000001, end:40000000, value:7},
      {start:40000001, end:50000000, value:8},
      {start:50000001, end:60000000, value:9},
      {start:60000001, end:70000000, value:9},
      {start:70000001, end:80000000, value:8},
      {start:80000001, end:90000000, value:7},
      {start:90000001, end:100000000, value:6},
      {start:100000001, end:110000000, value:5},
      {start:110000001, end:120000000, value:4},
      {start:120000001, end:130000000, value:3},
      {start:130000001, end:140000000, value:2},
      {start:140000001, end:150000000, value:1},
      {start:150000001, end:160000000, value:0},
      {start:160000001, end:170000000, value:0},
      {start:170000001, end:171115067, value:0}
    ]
  },
  {
    parent: "chr7",
    data: [
      {start:1, end:10000000, value:1},
      {start:10000001, end:20000000, value:2},
      {start:20000001, end:30000000, value:3},
      {start:30000001, end:40000000, value:4},
      {start:40000001, end:50000000, value:5},
      {start:50000001, end:60000000, value:6},
      {start:60000001, end:70000000, value:7},
      {start:70000001, end:80000000, value:8},
      {start:80000001, end:90000000, value:9},
      {start:90000001, end:100000000, value:9},
      {start:100000001, end:110000000, value:8},
      {start:110000001, end:120000000, value:7},
      {start:120000001, end:130000000, value:6},
      {start:130000001, end:140000000, value:5},
      {start:140000001, end:150000000, value:4},
      {start:150000001, end:159138663, value:4}
    ]
  },
  {
    parent: "chr8",
    data: [
      {start:1, end:10000000, value:3},
      {start:10000001, end:20000000, value:2},
      {start:20000001, end:30000000, value:1},
      {start:30000001, end:40000000, value:0},
      {start:40000001, end:50000000, value:0},
      {start:50000001, end:60000000, value:1},
      {start:60000001, end:70000000, value:2},
      {start:70000001, end:80000000, value:3},
      {start:80000001, end:90000000, value:4},
      {start:90000001, end:100000000, value:5},
      {start:100000001, end:110000000, value:6},
      {start:110000001, end:120000000, value:7},
      {start:120000001, end:130000000, value:8},
      {start:130000001, end:140000000, value:9},
      {start:140000001, end:146364022, value:9}
    ]
  },
  {
    parent: "chr9",
    data: [
      {start:1, end:10000000, value:9},
      {start:10000001, end:20000000, value:8},
      {start:20000001, end:30000000, value:7},
      {start:30000001, end:40000000, value:6},
      {start:40000001, end:50000000, value:5},
      {start:50000001, end:60000000, value:4},
      {start:60000001, end:70000000, value:3},
      {start:70000001, end:80000000, value:2},
      {start:80000001, end:90000000, value:1},
      {start:90000001, end:100000000, value:0},
      {start:100000001, end:110000000, value:0},
      {start:110000001, end:120000000, value:1},
      {start:120000001, end:130000000, value:2},
      {start:130000001, end:140000000, value:3},
      {start:140000001, end:141213431, value:3}
    ]
  },
  {
    parent: "chr10",
    data: [
      {start:1, end:10000000, value:4},
      {start:10000001, end:20000000, value:5},
      {start:20000001, end:30000000, value:6},
      {start:30000001, end:40000000, value:7},
      {start:40000001, end:50000000, value:8},
      {start:50000001, end:60000000, value:9},
      {start:60000001, end:70000000, value:9},
      {start:70000001, end:80000000, value:8},
      {start:80000001, end:90000000, value:7},
      {start:90000001, end:100000000, value:6},
      {start:100000001, end:110000000, value:5},
      {start:110000001, end:120000000, value:4},
      {start:120000001, end:130000000, value:3},
      {start:130000001, end:135534747, value:3}
    ]
  },
  {
    parent: "chr11",
    data: [
      {start:1, end:10000000, value:2},
      {start:10000001, end:20000000, value:1},
      {start:20000001, end:30000000, value:0},
      {start:30000001, end:40000000, value:0},
      {start:40000001, end:50000000, value:1},
      {start:50000001, end:60000000, value:2},
      {start:60000001, end:70000000, value:3},
      {start:70000001, end:80000000, value:4},
      {start:80000001, end:90000000, value:5},
      {start:90000001, end:100000000, value:6},
      {start:100000001, end:110000000, value:7},
      {start:110000001, end:120000000, value:8},
      {start:120000001, end:130000000, value:9},
      {start:130000001, end:135006516, value:9}
    ]
  },
  {
    parent: "chr12",
    data: [
      {start:1, end:10000000, value:9},
      {start:10000001, end:20000000, value:8},
      {start:20000001, end:30000000, value:7},
      {start:30000001, end:40000000, value:6},
      {start:40000001, end:50000000, value:5},
      {start:50000001, end:60000000, value:4},
      {start:60000001, end:70000000, value:3},
      {start:70000001, end:80000000, value:2},
      {start:80000001, end:90000000, value:1},
      {start:90000001, end:100000000, value:0},
      {start:100000001, end:110000000, value:0},
      {start:110000001, end:120000000, value:1},
      {start:120000001, end:130000000, value:2},
      {start:130000001, end:133851895, value:2}
    ]
  },
  {
    parent: "chr13",
    data: [
      {start:1, end:10000000, value:3},
      {start:10000001, end:20000000, value:4},
      {start:20000001, end:30000000, value:5},
      {start:30000001, end:40000000, value:6},
      {start:40000001, end:50000000, value:7},
      {start:50000001, end:60000000, value:8},
      {start:60000001, end:70000000, value:9},
      {start:70000001, end:80000000, value:9},
      {start:80000001, end:90000000, value:8},
      {start:90000001, end:100000000, value:7},
      {start:100000001, end:110000000, value:6},
      {start:110000001, end:115169878, value:6}
    ]
  },
  {
    parent: "chr14",
    data: [
      {start:1, end:10000000, value:5},
      {start:10000001, end:20000000, value:4},
      {start:20000001, end:30000000, value:3},
      {start:30000001, end:40000000, value:2},
      {start:40000001, end:50000000, value:1},
      {start:50000001, end:60000000, value:0},
      {start:60000001, end:70000000, value:0},
      {start:70000001, end:80000000, value:1},
      {start:80000001, end:90000000, value:2},
      {start:90000001, end:100000000, value:3},
      {start:100000001, end:107349540, value:3}
    ]
  },
  {
    parent: "chr15",
    data: [
      {start:1, end:10000000, value:4},
      {start:10000001, end:20000000, value:5},
      {start:20000001, end:30000000, value:6},
      {start:30000001, end:40000000, value:7},
      {start:40000001, end:50000000, value:8},
      {start:50000001, end:60000000, value:9},
      {start:60000001, end:70000000, value:9},
      {start:70000001, end:80000000, value:8},
      {start:80000001, end:90000000, value:7},
      {start:90000001, end:100000000, value:6},
      {start:100000001, end:102531392, value:6}
    ]
  },
  {
    parent: "chr16",
    data: [
      {start:1, end:10000000, value:5},
      {start:10000001, end:20000000, value:4},
      {start:20000001, end:30000000, value:3},
      {start:30000001, end:40000000, value:2},
      {start:40000001, end:50000000, value:1},
      {start:50000001, end:60000000, value:0},
      {start:60000001, end:70000000, value:0},
      {start:70000001, end:80000000, value:1},
      {start:80000001, end:90000000, value:2},
      {start:90000001, end:90354753, value:2}
    ]
  },
  {
    parent: "chr17",
    data: [
      {start:1, end:10000000, value:3},
      {start:10000001, end:20000000, value:4},
      {start:20000001, end:30000000, value:5},
      {start:30000001, end:40000000, value:6},
      {start:40000001, end:50000000, value:7},
      {start:50000001, end:60000000, value:8},
      {start:60000001, end:70000000, value:9},
      {start:70000001, end:80000000, value:9},
      {start:80000001, end:81195210, value:9}
    ]
  },
  {
    parent: "chr18",
    data: [
      {start:1, end:10000000, value:8},
      {start:10000001, end:20000000, value:7},
      {start:20000001, end:30000000, value:6},
      {start:30000001, end:40000000, value:5},
      {start:40000001, end:50000000, value:4},
      {start:50000001, end:60000000, value:3},
      {start:60000001, end:70000000, value:2},
      {start:70000001, end:78077248, value:2}
    ]
  },
  {
    parent: "chr19",
    data: [
      {start:1, end:10000000, value:1},
      {start:10000001, end:20000000, value:0},
      {start:20000001, end:30000000, value:0},
      {start:30000001, end:40000000, value:1},
      {start:40000001, end:50000000, value:2},
      {start:50000001, end:59128983, value:2}
    ]
  },
  {
    parent: "chr20",
    data: [
      {start:1, end:10000000, value:3},
      {start:10000001, end:20000000, value:4},
      {start:20000001, end:30000000, value:5},
      {start:30000001, end:40000000, value:6},
      {start:40000001, end:50000000, value:7},
      {start:50000001, end:60000000, value:8},
      {start:60000001, end:63025520, value:8}
    ]
  },
  {
    parent: "chr21",
    data: [
      {start:1, end:10000000, value:9},
      {start:10000001, end:20000000, value:9},
      {start:20000001, end:30000000, value:8},
      {start:30000001, end:40000000, value:7},
      {start:40000001, end:48129895, value:7}
    ]
  },
  {
    parent: "chr22",
    data: [
      {start:1, end:10000000, value:6},
      {start:10000001, end:20000000, value:5},
      {start:20000001, end:30000000, value:4},
      {start:30000001, end:40000000, value:3},
      {start:40000001, end:50000000, value:2},
      {start:50000001, end:51304566, value:2}
    ]
  },
  {
    parent: "chrX",
    data: [
      {start:1, end:10000000, value:1},
      {start:10000001, end:20000000, value:0},
      {start:20000001, end:30000000, value:0},
      {start:30000001, end:40000000, value:1},
      {start:40000001, end:50000000, value:2},
      {start:50000001, end:60000000, value:3},
      {start:60000001, end:70000000, value:4},
      {start:70000001, end:80000000, value:5},
      {start:80000001, end:90000000, value:6},
      {start:90000001, end:100000000, value:7},
      {start:100000001, end:110000000, value:8},
      {start:110000001, end:120000000, value:9},
      {start:120000001, end:130000000, value:9},
      {start:130000001, end:140000000, value:8},
      {start:140000001, end:150000000, value:7},
      {start:150000001, end:155270560, value:7}
    ]
  },
  {
    parent: "chrY",
    data: [
      {start:1, end:10000000, value:6},
      {start:10000001, end:20000000, value:5},
      {start:20000001, end:30000000, value:4},
      {start:30000001, end:40000000, value:3},
      {start:40000001, end:50000000, value:2},
      {start:50000001, end:59373566, value:2}
    ]
  },
]

links = [
  ['january', 1, 10, 'february', 20, 25, 0],
  ['november', 1, 10, 'february', 3, 7, 0],
  ['october', 1, 10, 'march', 20, 25, 10],
  ['december', 1, 10, 'april', 20, 25, 10],
  ['december', 13, 20, 'august', 20, 25, 10]
];
linkRules = [
  {
    parameter: 'color',
    value: 'red',
    condition: function(datum, i){
      return datum.source.id == 'december'
    }
  },
  {
    parameter: 'opacity',
    value: 0.2,
    condition: function(datum, i){
      return datum.target.id == 'february'
    }
  }
];

scatter = [
  ['january', 1, 6],
  ['january', 2, 2],
  ['january', 3, 4],
  ['january', 4, 1],
  ['january', 5, 3],
  ['january', 6, 6],
  ['january', 7, 5],
  ['january', 8, 4],
  ['january', 9, 6],
  ['february', 1, 6],
  ['february', 2, 3],
  ['february', 3, 4],
  ['february', 4, 2],
  ['february', 5, 6],
  ['february', 6, 5]
]

stack = [
  ['january', 1, 10, 8],
  ['january', 1, 20, 7],
  ['january', 11, 23, 3],
  ['january', 2, 20, 4],
  ['january', 19, 25, 5],
  ['january', 21, 25, 6]
]

heatmap = [
  ['january', 'a', 2,3],
  ['january', 1, 4,2],
  ['january', 5, 10,10],
  ['january', 11, 15,13],
  ['february', 1, 28,3],
  ['march', 1, 2,3],
  ['march', 1, 2,3]
];

highlight = [
  ['january', 1, 2,'blue'],
  ['january', 1, 4,'red'],
  ['january', 5, 10,'green'],
  ['january', 11, 15,'yellow'],
  ['february', 1, 28,'grey'],
  ['march', 1, 2,'purple'],
  ['march', 1, 2,'black']
];

var circos = new circosJS({
  container: '#chart'
});

var rules = [
  {parameter: 'glyph_strokeColor', value: 'blue', condition: function(datum){ return datum.value > 5;}}
]

var backgrounds = [
  {start: 0, end: 0.5, color: '#d3d3d3', opacity: 1},
  {start: 0.5, end: 1, color: '#333333', opacity: 0.5, parent: ['february', 'april']}
]

var stack_rules = [
  // {parameter: 'color', value: 'red', condition: function(parent, datum, layer_id){ return (datum.end - datum.start > 8);}},
  // {parameter: 'color', value: 'blue', condition: function(parent, datum, layer_id){ return (layer_id > 2);}}
  // {parameter: 'usePalette', value: true, condition: function(parent, datum, layer_id){ return (layer_id > 2);}}
]

backgrounds2 = [
  {start: 0, end: 0.5, color: '#d3d3d3'},
  {start: 0.5, end: 0.8, color: '#fdbb84', opacity: 0.8},
  {start: 0.8, end: 1, color: '#e34a33', parent: ['january', 'february']},
  {start: 0.8, end: 1, color: '#2c7fb8', parent: 'march'}
];

text = [
  ['january', 10, 'toto'],
  ['february', 3, 'titi'],
  ['may', 25, 'tuti']
]

circos
  .layout(
    {
      ticks: {display: true},
      onClick: function(){console.log('You clicked on the layout layer!');}
    },
    layout_data
  )
  // .text('text1', {innerRadius: 180, style: {'font-size': '50px', 'font-family': 'Arial'}}, text)
  .heatmap('h1', {
    tooltipContent: function(d){
      return 'From ' + d.start + ' to ' + d.end + ' ' + d.block_id + ': ' + d.value;
    }
  }, heatmap)
  // .histogram('hist1', {innerRadius: 200, outerRadius: 220, axes: {display: true}}, heatmap)
  // .scatter('c1', {innerRadius: 150, outerRadius: 200, glyph: {shape: 'cross', size: 50, fill: true}}, scatter)
  // .line('line1', {innerRadius: 150, outerRadius: 200, interpolation: 'cardinal'}, scatter)
  .chord('l1', {usePalette: false, color: 'blue',
    tooltipContent: function(d){
      return d.source.id + ' -> ' + d.target.id + ': ' + d.value;
    }
  }, links, linkRules)
  // .stack('stack1', {thickness: 10, usePalette: true, margin: 0, direction: 'out', innerRadius: 150, outerRadius: 240, axes: {display: true}}, stack)
  // .stack('stack1', {thickness: 10, usePalette: true, margin: 0, direction: 'out', innerRadius: 150, outerRadius: 240}, stack)
  // .line('line2', {innerRadius:100, outerRadius: 200}, [], {}, backgrounds2)
  .highlight('highlight1', {
    innerRadius: 100, outerRadius: 200, opacity: 1
  }, highlight)
  .render();

// circos.removeTracks(['l1'])
// circos.removeTracks('stack1')
// circos.removeTracks()
  // .render(['layout', 'h1']);
