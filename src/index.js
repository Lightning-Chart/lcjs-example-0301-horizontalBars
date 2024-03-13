/**
 * Example of a horizontal BarChart with LightningChart JS.
 */
const lcjs = require('@arction/lcjs')
const { lightningChart, BarChartTypes, BarChartSorting, AxisScrollStrategies, Themes } = lcjs

const lc = lightningChart()
const barChart = lc
    .BarChart({
        type: BarChartTypes.Horizontal,
        theme: Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined
    })
    .setTitle('Global temperatures')
    .setSorting(BarChartSorting.Descending)

barChart.valueAxis.setTitle('Temperature °C').setInterval({ end: 35 }).setScrollStrategy(AxisScrollStrategies.expansion)

const data = [
    { category: 'Helsinki', value: 19.1 },
    { category: 'New York', value: 20.6 },
    { category: 'London', value: 16.6 },
    { category: 'Tokyo', value: 26.5 },
    { category: 'Oslo', value: 16.3 },
    { category: 'Barcelona', value: 23.7 },
    { category: 'Berlin', value: 18.0 },
    { category: 'Chicago', value: 21.4 },
    { category: 'Beijing', value: 22.4 },
    { category: 'Kathmandu', value: 29.8 },
    { category: 'Kyiv', value: 23.4 },
    { category: 'Singapore', value: 32.6 },
    { category: 'Stockholm', value: 17.2 },
    { category: 'Budapest', value: 21.8 },
    { category: 'Tallinn', value: 21.0 },
]
barChart.setData(data)
