$(function () {

    // 左侧柱状图
    var echarts_left = echarts.init(document.querySelector(".echarts_left"));

    // 指定图表的配置项和数据
    var option1 = {
        title: {
            text: '2018年注册人数'
        },
        tooltip: {},
        legend: {
            data: ['人数', '销量']
        },
        xAxis: {
            data: ["1月", "2月", "3月", "4月", "5月", "6月"]
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [234, 520, 336, 600, 190, 420]
        }, {
            name: '销量',
            type: 'bar',
            data: [434, 320, 536, 567, 490, 220]
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    echarts_left.setOption(option1);


    // 右侧饼状图
    var echarts_right = echarts.init(document.querySelector(".echarts_right"));
    option2 = {
        title: {
            text: '热门品牌销售',
            subtext: '2018年11月',
            x: 'center',
            textStyle: {
                fontSize: 20,
                color: "#e92322"
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克', '阿迪', '老北京', '安踏', '361']
        },
        series: [{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [{
                    value: 335,
                    name: '耐克'
                },
                {
                    value: 310,
                    name: '阿迪'
                },
                {
                    value: 234,
                    name: '老北京'
                },
                {
                    value: 135,
                    name: '安踏'
                },
                {
                    value: 548,
                    name: '361'
                }
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    echarts_right.setOption(option2);



})