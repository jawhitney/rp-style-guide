var rpApp = rpApp || {};
rpApp.red = '#CB333B';
rpApp.blue = '#00A3E0';
rpApp.gray = '#AAADAF';
rpApp.chartHeight = 650;
rpApp.yAxis = 'Average % Change (all sending domains)';
rpApp.defaultStyle = {
    fontFamily: 'adelle-sans, sans-serif',
    letterSpacing: '.015rem',
    fontWeight: 'normal',
};
rpApp.getColors = function() {
    return [
        rpApp.blue,
        Highcharts.color(rpApp.blue).brighten(0.025).get(),
        Highcharts.color(rpApp.blue).brighten(0.05).get(),
        Highcharts.color(rpApp.blue).brighten(0.075).get(),
        Highcharts.color(rpApp.blue).brighten(0.1).get(),
        Highcharts.color(rpApp.blue).brighten(0.125).get(),
        Highcharts.color(rpApp.blue).brighten(0.15).get(),
        Highcharts.color(rpApp.blue).brighten(0.175).get(),
        Highcharts.color(rpApp.blue).brighten(0.2).get(),
        Highcharts.color(rpApp.blue).brighten(0.225).get(),
        Highcharts.color(rpApp.blue).brighten(0.25).get(),
        Highcharts.color(rpApp.blue).brighten(0.275).get(),
        Highcharts.color(rpApp.blue).brighten(0.3).get(),
        Highcharts.color(rpApp.blue).brighten(0.325).get(),
        Highcharts.color(rpApp.blue).brighten(0.35).get(),
        Highcharts.color(rpApp.blue).brighten(0.375).get(),
        rpApp.gray,
        rpApp.red,
    ];
};

rpApp.getChartParams = function(type, measure, date) {
    date = date || null;

    var data = rpApp.measureData[measure],
        subtitle = rpApp.measures[measure].description,
        xAxis = {
            categories: rpApp.dates,
            labels: {
                style: rpApp.defaultStyle,
                useHTML: true,
                formatter: function () {
                    return '<a href="#" onClick="return rpApp.xAxisClick(\'' + this.value + '\',\'' + measure + '\');">' +
                        rpApp.datesFriendly[this.value] + '<i class="ml-1 fas fa-angle-right"></i></a>';
                }
            },
        };

    if (type === 'column') {
        data = rpApp.dateData[date][measure];
        subtitle = null;
        xAxis = {
            labels: {
                enabled: false,
            },
        };
    }

    return {
        chart: {
            height: rpApp.chartHeight,
            type: type,
            style: rpApp.defaultStyle,
            backgroundColor: 'transparent',
        },
        colors: rpApp.getColors(),
        series: data,
        plotOptions: {
            series: {
                animation: {
                    duration: 2000
                }
            }
        },
        title: {
            text: null,
        },
        subtitle: {
            text: subtitle,
        },
        xAxis: xAxis,
        yAxis: {
            title: {
                text: rpApp.yAxis,
            },
            labels : {
                style: rpApp.defaultStyle,
            },
        },
        legend: {
            itemStyle: rpApp.defaultStyle,
        },
    };
};

rpApp.getDateChart = function(id, date, measure) {
    Highcharts.chart(id, rpApp.getChartParams('column', measure, date));
};

rpApp.getMeasureChart = function(measure) {
    return Highcharts.chart('measure_chart', rpApp.getChartParams('spline', measure));
};

rpApp.xAxisClick = function(date, measure) {
    $('#dateModal').modal('show');
    document.getElementById('dateTitle').innerHTML = rpApp.measures[measure]['friendly_name'] + ' - ' + rpApp.datesFriendly[date] + '<br/><small>' + rpApp.measures[measure].description + '</small>';
    rpApp.getDateChart('dateChart', date, measure);
    return false;
};

(function() {
    rpApp.charts = {};

    document.addEventListener('DOMContentLoaded', function() {
        rpApp.charts[rpApp.measures['subscriber_count']] = rpApp.getMeasureChart('subscriber_count');
    });

    [].slice.call(document.querySelectorAll('.efp-trigger')).forEach(function(trigger) {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('measureChartTitle').innerHTML = trigger.dataset.friendlyName;
            rpApp.charts[rpApp.measures[trigger.dataset.measure]] = rpApp.getMeasureChart(trigger.dataset.measure);
        });
    });
})();
