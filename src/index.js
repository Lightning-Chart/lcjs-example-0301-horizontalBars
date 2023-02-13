/*
 * LightningChartJS example for rendering a 'Simple horizontal bar chart'.
 */
// Import LightningChartJS
const lcjs = require('@arction/lcjs')

// Extract required parts from LightningChartJS.
const {
    lightningChart,
    SolidFill,
    SolidLine,
    ColorRGBA,
    emptyLine,
    emptyFill,
    AxisTickStrategies,
    AutoCursorModes,
    UIOrigins,
    UIElementBuilders,
    Themes,
} = lcjs

const lc = lightningChart()

// Define an interface for creating horizontal bars.
let barChart
{
    barChart = (options) => {
        // flat red fill style for positive bars
        const flatRedStyle = new SolidFill().setColor(ColorRGBA(242, 67, 79))
        // flat blue fill style for negative bars
        const flatBlueStyle = new SolidFill().setColor(ColorRGBA(42, 171, 240))

        let y = 0
        const figureThickness = 10
        const figureGap = figureThickness * 0.5
        const bars = []

        // Create a XY-Chart and add a RectSeries to it for rendering rectangles.
        const chart = lc
            .ChartXY(options)
            .setTitle('Mass memory production increases in 2018')
            .setAutoCursorMode(AutoCursorModes.onHover)
            // Disable mouse interactions (e.g. zooming and panning) of plotting area
            .setMouseInteractions(false)
            .setPadding({ right: 20 })

        // Bar series represented with rectangles.
        const rectangles = chart.addRectangleSeries()

        // cursor
        //#region
        // Show band using Rectangle series.
        const band = chart
            .addRectangleSeries()
            .setMouseInteractions(false)
            .setCursorEnabled(false)
            .add({ x: 0, y: 0, width: 0, height: 0 })
            .setFillStyle(new SolidFill().setColor(ColorRGBA(255, 255, 255, 50)))
            .setStrokeStyle(emptyLine)
            .setVisible(false)
        // Modify AutoCursor.
        chart.setAutoCursor((cursor) =>
            cursor
                .setResultTableAutoTextStyle(true)
                .setPointMarkerVisible(false)
                .setTickMarkerXVisible(false)
                .setTickMarkerYVisible(false)
                .setGridStrokeXStyle(emptyLine)
                .setGridStrokeYStyle(emptyLine)
                .setResultTable((table) => {
                    table.setOrigin(UIOrigins.CenterBottom)
                }),
        )
        // Change how marker displays its information.
        rectangles.setCursorResultTableFormatter((builder, series, figure) => {
            // Find cached entry for the figure.
            const entry = bars.find((bar) => bar.rect == figure).entry
            // Parse result table content from values of 'entry'.
            return builder.addRow('Month: ' + entry.category).addRow('Value: ' + String(entry.value))
        })
        //#endregion

        // X-axis of the series
        const axisX = chart
            .getDefaultAxisX()
            .setMouseInteractions(false)
            .setInterval({ start: -100, end: 100, stopAxisAfter: false })
            .setTitle('%')

        // Y-axis of the series
        const axisY = chart
            .getDefaultAxisY()
            .setMouseInteractions(false)
            .setScrollStrategy(undefined)
            // Disable default ticks.
            .setTickStrategy(AxisTickStrategies.Empty)

        //Add middle line
        const constantLine = axisX.addConstantLine()
        constantLine
            .setValue(0)
            .setMouseInteractions(false)
            .setStrokeStyle(new SolidLine({ thickness: 2, fillStyle: new SolidFill({ color: ColorRGBA(125, 125, 125) }) }))

        /**
         * Add multiple bars.
         * @param entries Add multiple bars data.
         */
        const addValues = (entries) => {
            for (const entry of entries) {
                bars.push(add(entry))
            }
        }
        /**
         * Add single bar.
         * @param entry Add a single bar data.
         */
        const addValue = (entry) => {
            bars.push(add(entry))
        }
        /**
         * Construct bar to draw.
         * @param entry Single bar data.
         */
        const add = (entry) => {
            // Create rect dimensions.
            const rectDimensions = {
                x: 0,
                y: y - figureThickness,
                width: entry.value,
                height: figureThickness,
            }
            // Add rect to the series.
            const rect = rectangles.add(rectDimensions)
            // Set individual color for the bar.
            rect.setFillStyle(entry.value > 0 ? flatRedStyle : flatBlueStyle).setStrokeStyle(emptyLine)

            // Show cursor band when mouse is above figure.
            rect.onMouseEnter(() => {
                const dimensions = rect.getDimensionsPositionAndSize()
                // Show band.
                band.setDimensions({
                    x: rect.scale.x.getInnerStart(),
                    y: dimensions.y - figureGap * 0.5,
                    width: rect.scale.x.getInnerInterval(),
                    height: dimensions.height + figureGap,
                }).setVisible(true)
            })
            rect.onMouseLeave(() => {
                band.setVisible(false)
            })

            // Set view manually.
            axisY.setInterval({
                start: -(figureThickness + figureGap),
                end: y + figureGap,
                stopAxisAfter: false,
            })

            // Add custom tick, more like categorical axis.
            axisY
                .addCustomTick()
                .setValue(y - figureGap)
                .setGridStrokeLength(0)
                .setTextFormatter((_) => entry.category)
                .setMarker((marker) => marker.setTextFillStyle(new SolidFill({ color: ColorRGBA(170, 170, 170) })))
            y += figureThickness + figureGap
            // Return data-structure with both original 'entry' and the rectangle figure that represents it.
            return {
                entry,
                rect,
            }
        }

        // Return public methods of a bar chart interface.
        return {
            addValue,
            addValues,
        }
    }
}

// Use bar chart interface to construct series.
const chart = barChart({
    // theme: Themes.darkGold
})
// Add multiple bars at once.
chart.addValues([
    { category: 'Jan', value: 20 },
    { category: 'Feb', value: -30 },
    { category: 'Mar', value: -100 },
    { category: 'Apr', value: 100 },
    { category: 'May', value: -75 },
    { category: 'Jun', value: 80 },
    { category: 'Jul', value: -100 },
    { category: 'Aug', value: 35 },
    { category: 'Sep', value: -50 },
    { category: 'Oct', value: 100 },
    { category: 'Nov', value: 5 },
    { category: 'Dec', value: 15 },
])
