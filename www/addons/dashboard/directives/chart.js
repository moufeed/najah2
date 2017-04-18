angular.module('mm.addons.dashboard')
    .directive('barChart', function() {
        return {
            restrict: 'A',
            scope: {
                performance: '=',
            },
            link: function(scope, element, attrs) {
                scope.$watch('performance', function(performance) {
                    if (scope.performance) {
                        var data = [];
                        var idnumber = [];
                        var courses = [];

                        for (var i = 0; i < scope.performance.data.length; i++) {
                            data[i] = scope.performance.data[i];
                        }

                        for (var i = 0; i < scope.performance.idnumbers.length; i++) {
                            idnumber[i] = scope.performance.idnumbers[i];
                            courses.push(scope.performance.idnumbers[i]);
                        }

                        if (data[0].length < 10) {
                            for (var c = data[0].length; c < 14; c++) {
                                data[0][c] = [c, 0, 0];
                            }
                        }

                        var barData = [];

                        if (data.length == 1) {
                            barData.push({
                                data: data[0],
                                label: '',
                                bars: {
                                    show: true,
                                    barWidth: 0.24,
                                    order: 1,
                                    lineWidth: 0,
                                    fillColor: '#8BC34A'
                                }

                            });
                        } else if (data.length == 2) {
                            barData.push({
                                data: data[0],
                                label: '',
                                bars: {
                                    show: true,
                                    barWidth: 0.24,
                                    order: 1,
                                    lineWidth: 0,
                                    fillColor: '#c1ab1a'
                                }
                            });


                            barData.push({
                                data: data[1],
                                label: '',
                                bars: {
                                    show: true,
                                    barWidth: 0.24,
                                    order: 2,
                                    lineWidth: 0,
                                    fillColor: '#8BC34A'
                                }
                            });
                        }

                        /* Let's create the chart */
                        $.plot($(element), barData, {
                            grid: {
                                borderWidth: 1,
                                borderColor: '#eee',
                                show: true,
                                hoverable: true,
                                clickable: true
                            },
                            yaxis: {
                                min: 0,
                                max: 100,
                                tickColor: '#eee',
                                tickDecimals: 0,
                                font: {
                                    lineHeight: 13,
                                    style: "normal",
                                    color: "#9f9f9f",
                                },
                                shadowSize: 0
                            },
                            xaxis: {
                                tickColor: '#fff',
                                tickDecimals: 0,
                                font: {
                                    lineHeight: 13,
                                    style: "normal",
                                    color: "#9f9f9f"
                                },
                                shadowSize: 0,
                            },
                            legend: {
                                container: '.flc-bar',
                                backgroundOpacity: 0.5,
                                noColumns: 0,
                                backgroundColor: "white",
                                lineWidth: 0
                            }
                        });

                        if ($(".flot-chart")[0]) {
                            $(".flot-chart").bind("plothover", function(event, pos, item) {

                                if (item) {
                                    var x = item.dataIndex;
                                    y = item.datapoint[1];
                                    var courseidnumber = courses[item.seriesIndex][x];
                                    $(".flot-tooltip").html(courseidnumber + " : %" + y).css({ top: item.pageY + 5, left: item.pageX + 5 }).show();
                                } else {
                                    $(".flot-tooltip").hide();
                                }
                            });

                            $("<div class='flot-tooltip' class='chart-tooltip'></div>").appendTo("body");
                        }
                    }
                    if (scope.performance) {
                        var data = [];
                        var idnumber = [];
                        var courses = [];

                        for (var i = 0; i < scope.performance.data.length; i++) {
                            data[i] = scope.performance.data[i];
                        }

                        for (var i = 0; i < scope.performance.idnumbers.length; i++) {
                            idnumber[i] = scope.performance.idnumbers[i];
                            courses.push(scope.performance.idnumbers[i]);
                        }

                        if (data[0].length < 10) {
                            for (var c = data[0].length; c < 14; c++) {
                                data[0][c] = [c, 0, 0];
                            }
                        }

                        var barData = [];

                        if (data.length == 1) {
                            barData.push({
                                data: data[0],
                                label: '',
                                bars: {
                                    show: true,
                                    barWidth: 0.24,
                                    order: 1,
                                    lineWidth: 0,
                                    fillColor: '#8BC34A'
                                }

                            });
                        } else if (data.length == 2) {
                            barData.push({
                                data: data[0],
                                label: '',
                                bars: {
                                    show: true,
                                    barWidth: 0.24,
                                    order: 1,
                                    lineWidth: 0,
                                    fillColor: '#c1ab1a'
                                }
                            });


                            barData.push({
                                data: data[1],
                                label: '',
                                bars: {
                                    show: true,
                                    barWidth: 0.24,
                                    order: 2,
                                    lineWidth: 0,
                                    fillColor: '#8BC34A'
                                }
                            });
                        }

                        /* Let's create the chart */
                        $.plot($(element), barData, {
                            grid: {
                                borderWidth: 1,
                                borderColor: '#eee',
                                show: true,
                                hoverable: true,
                                clickable: true
                            },
                            yaxis: {
                                min: 0,
                                max: 100,
                                tickColor: '#eee',
                                tickDecimals: 0,
                                font: {
                                    lineHeight: 13,
                                    style: "normal",
                                    color: "#9f9f9f",
                                },
                                shadowSize: 0
                            },
                            xaxis: {
                                tickColor: '#fff',
                                tickDecimals: 0,
                                font: {
                                    lineHeight: 13,
                                    style: "normal",
                                    color: "#9f9f9f"
                                },
                                shadowSize: 0,
                            },
                            legend: {
                                container: '.flc-bar',
                                backgroundOpacity: 0.5,
                                noColumns: 0,
                                backgroundColor: "white",
                                lineWidth: 0
                            }
                        });

                        if ($(".flot-chart")[0]) {
                            $(".flot-chart").bind("plothover", function(event, pos, item) {

                                if (item) {
                                    var x = item.dataIndex;
                                    y = item.datapoint[1];
                                    var courseidnumber = courses[item.seriesIndex][x];
                                    $(".flot-tooltip").html(courseidnumber + " : %" + y).css({ top: item.pageY + 5, left: item.pageX + 5 }).show();
                                } else {
                                    $(".flot-tooltip").hide();
                                }
                            });

                            $("<div class='flot-tooltip' class='chart-tooltip'></div>").appendTo("body");
                        }
                    }
                });
            }
        }
    });

angular.module('mm.addons.dashboard')
    .directive('pieDonutStu', function() {
        return {
            restrict: 'A',
            scope: {
                chartAttendence: '='
            },
            link: function(scope, element, attrs) {
                scope.$watch('chartAttendence', function(chartAttendence) {
                    if (chartAttendence) {
                        var pieData = [
                            { data: chartAttendence.present, color: '#8BC34A', label: 'present' },
                            { data: chartAttendence.absent, color: '#F44336', label: 'ABSENT' },
                            { data: chartAttendence.late, color: '#FFEB3B', label: 'LATE' },
                            { data: chartAttendence.excused, color: '#03A9F4', label: 'EXCUSED' }
                        ];

                        /* Pie Chart */

                        if ($('#pie-chart')[0]) {
                            $.plot('#pie-chart', pieData, {
                                series: {
                                    pie: {
                                        show: true,
                                        stroke: {
                                            width: 2
                                        }
                                    }
                                },
                                legend: {
                                    show: false
                                },
                                grid: {
                                    hoverable: true,
                                    clickable: true
                                },
                                tooltip: true,
                                tooltipOpts: {
                                    content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
                                    shifts: {
                                        x: 20,
                                        y: 0
                                    },
                                    defaultTheme: false,
                                    cssClass: 'flot-tooltip'
                                }

                            });
                        }


                        /* Donut Chart */

                        if ($('#donut-chart')[0]) {
                            $.plot('#donut-chart', pieData, {
                                series: {
                                    pie: {
                                        innerRadius: 0.5,
                                        show: true,
                                        stroke: {
                                            width: 2,
                                        },
                                    },
                                },
                                legend: {
                                    container: '.flc-donut',
                                    backgroundOpacity: 0.5,
                                    noColumns: 0,
                                    backgroundColor: "white",
                                    lineWidth: 0
                                },
                                grid: {
                                    hoverable: true,
                                    clickable: true
                                },
                                tooltip: true,
                                tooltipOpts: {
                                    content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
                                    shifts: {
                                        x: 20,
                                        y: 0
                                    },
                                    defaultTheme: false,
                                    cssClass: 'flot-tooltip'
                                }

                            });
                        }
                    }
                });

            }
        };
    })