({/*
	generateChart : function(component, event, helper) {
        var chartdata = {
            labels: ['New Loan', 'Remaining on Current'],
            datasets: [
                {
                    label:'',
                    barPercentage: 0.2,
                    barThickness: 3,
                    maxBarThickness: 8,
                    minBarLength: 2,
                    data: [568713.15, 765354.8],
                    borderWidth: 4,
                    borderColor: [
                        '#ff6384',
                        '#36a2eb'
                    ],
                    backgroundColor: [
                        '#fea6b8',
                        '#94CEF5'
                    ],
                }
                
             
            ]
        }
        //Get the context of the canvas element we want to select
        var ctx = component.find("barchart").getElement();
        var barChart = new Chart(ctx ,{
            type: 'bar',
            data: chartdata,
            options: {
                title:{
                    display: true,
                    text: 'Keep Making Your Current Payment'
                },
                tooltips: {
                 callbacks: {
                    label: function(t, d) {
                       var xLabel = d.datasets[t.datasetIndex].label;
                       var yLabel = t.yLabel >= 1000 ? '$' + t.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '$' + t.yLabel;
                       return xLabel + ': ' + yLabel;
                    }
                 }
     		 },
                legend: {
                    display: false
                },
                responsive: true,
            	scales: {
                scaleLabels: {fontSize: 30
                            },
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        callback: function(value, index, values){
                            return  '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        }
                    }
                }]
    },
            }
        });
    }*/
})