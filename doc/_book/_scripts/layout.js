var instance = new circosJS({
    container:"#chart",
    width: 400,
    height: 400
});

instance.layout(
    {
        innerRadius: 170,
        outerRadius: 200,
        labels: {
            display: true,
            size: '12px',
            radialOffset: 12
        },
        ticks: {
            display: false
        }
    },
    layout_data
);

instance.render();
