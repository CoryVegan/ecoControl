var systems_units = {
    bhkw_workload: '%',
    bhkw_electrical_power: 'kW',
    bhkw_thermal_power: 'kW',
    bhkw_total_gas_consumption: 'kWh',
    hs_level: '%',
    plb_workload: '%',
    plb_thermal_power: 'kW',
    plb_total_gas_consumption: 'kWh',
    thermal_consumption: 'kW'
};

var series_data = [{
    name: 'bhkw_workload',
    data: [],
    tooltip: {
        valueSuffix: ' %'
    }
},
{
    name: 'plb_workload',
    data: [],
    tooltip: {
        valueSuffix: ' %'
    }
},
{
    name: 'hs_level',
    data: [],
    tooltip: {
        valueSuffix: ' %'
    }
},
{
    name: 'thermal_consumption',
    data: [],
    tooltip: {
        valueSuffix: ' kW'
    }
}];

$(function(){
    $.get( "./static/img/simulation.svg", function( data ) {
        var svg_item = document.importNode(data.documentElement,true);
        $("#simulation_scheme").append(svg_item);
    }, "xml");

    $.getJSON( "./api/settings/", function( data ) {
        $.each(data, function(key, value) {
            $("#form_" + key).val(value);
        });
    }).done(function(){
        $.getJSON( "./api/data/", function( data ) {
            for (var i = 0; i < data['time'].length; i++) {
                var timestamp = get_timestamp(data['time'][i]);
                series_data[0]['data'].push([timestamp, parseFloat(data['bhkw_workload'][i])]);
                series_data[1]['data'].push([timestamp, parseFloat(data['plb_workload'][i])]);
                series_data[2]['data'].push([timestamp, parseFloat(data['hs_level'][i])]);
                series_data[3]['data'].push([timestamp, parseFloat(data['thermal_consumption'][i])]);
            };
        }).done(function(){
            initialize_diagram();
            setInterval(function(){
                refresh()
            }, 2000);
        });
    });

    $("#settings").submit(function( event ){
        $.post( "./api/set/", $( "#settings" ).serialize(), function( data ) {
            $("#settings_button").removeClass("btn-primary");
            $("#settings_button").addClass("btn-success");
            $.each(data, function(key, value) {
                $("#form_" + key).val(value);
            });
            setTimeout(function(){
                $("#settings_button").removeClass("btn-success");
                $("#settings_button").addClass("btn-primary");
            }, 500);
        });
        event.preventDefault();
    });
});

function refresh(){
    $.getJSON( "./api/data/", function( data ) {
        update_scheme(data);
        update_diagram(data);
    });
}

function update_scheme(data){
    $.each(data, function(key, value) {
        value = value[value.length-1];
        var item = $('#' + key);
        if (item.length) {
            if(key == "time"){
                item.text(format_date(new Date(parseFloat(value) * 1000)));
            }else{
                item.text(value + " " + systems_units[key]);
            }
        }
    });
}

function update_diagram(data){
    var chart = $('#simulation_diagram').highcharts();

    for (var i = 0; i < data['time'].length; i++) {
        var timestamp = get_timestamp(data['time'][i]);
        chart.series[0].addPoint([timestamp, parseFloat(data['bhkw_workload'][i])]);
        chart.series[1].addPoint([timestamp, parseFloat(data['plb_workload'][i])]);
        chart.series[2].addPoint([timestamp, parseFloat(data['hs_level'][i])]);
        chart.series[3].addPoint([timestamp, parseFloat(data['thermal_consumption'][i])]);
    };

    chart.redraw();
}

function format_date(date){
    date = date.toString();
    return date.substring(0, date.length - 15);
}

function get_timestamp(string){
    return new Date(parseFloat(string) * 1000).getTime();
}

function initialize_diagram(){
    Highcharts.setOptions({
        global : {
            useUTC : false
        }
    });
    
    // Create the chart
    $('#simulation_diagram').highcharts('StockChart', {
        rangeSelector: {
            buttons: [{
                count: 1,
                type: 'hour',
                text: '1H'
            }, {
                count: 6,
                type: 'hour',
                text: '6H'
            }, {
                count: 12,
                type: 'hour',
                text: '12H'
            }, {
                count: 1,
                type: 'day',
                text: '1D'
            }, {
                count: 7,
                type: 'day',
                text: '7D'
            }, {
                type: 'all',
                text: 'All'
            }],
            selected: 0
        },
        
        title : {
            text : 'Live simulation data'
        },

        yAxis: {
            min: 0
        },
        
        tooltip : {
            valueDecimals : 2
        },

        plotOptions: {
            series: {
                marker: {
                    enabled: false
                },
                lineWidth: 1,
            }
        },
        
        series : series_data,

        credits: {
            enabled: false
        }
    });
}