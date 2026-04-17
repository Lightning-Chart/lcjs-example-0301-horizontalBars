window.lcjsSmallView = window.devicePixelRatio >= 2
if (!window.__lcjsDebugOverlay) {
    window.__lcjsDebugOverlay = document.createElement('div')
    window.__lcjsDebugOverlay.style.cssText = 'position:fixed;top:10px;left:10px;background:rgba(0,0,0,0.7);color:#fff;padding:4px 8px;z-index:99999;font:12px monospace;pointer-events:none'
    const attach = () => { if (document.body && !window.__lcjsDebugOverlay.parentNode) document.body.appendChild(window.__lcjsDebugOverlay) }
    attach()
    setInterval(() => {
        attach()
        window.__lcjsDebugOverlay.textContent = window.innerWidth + 'x' + window.innerHeight + ' dpr=' + window.devicePixelRatio + ' small=' + window.lcjsSmallView
    }, 500)
}
/**
 * Example of a horizontal BarChart with LightningChart JS.
 */
const lcjs = require('@lightningchart/lcjs')
const { lightningChart, BarChartTypes, BarChartSorting, AxisScrollStrategies, Themes } = lcjs

const lc = lightningChart({
            resourcesBaseUrl: new URL(document.head.baseURI).origin + new URL(document.head.baseURI).pathname + 'resources/',
        })
const barChart = lc
    .BarChart({
        legend: { visible: false },
        type: BarChartTypes.Horizontal,
        theme: (() => {
    const t = Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined
    return t && window.lcjsSmallView ? lcjs.scaleTheme(t, 0.5) : t
})(),
textRenderer: window.lcjsSmallView ? lcjs.htmlTextRenderer : undefined,
    })
    .setTitle('Global temperatures')
    .setSorting(BarChartSorting.Descending)
    .setPadding({ left: 20, right: 25, top: 0, bottom: 10 })

barChart.valueAxis.setTitle('Temperature').setUnits('°C').setInterval({ end: 35 }).setScrollStrategy(AxisScrollStrategies.expansion)

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
