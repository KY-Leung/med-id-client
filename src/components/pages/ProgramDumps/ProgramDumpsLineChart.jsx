import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as vega from 'vega';
import * as vegaTooltip from 'vega-tooltip';
import { getBrushControl } from 'utils/Utility';

import './ProgramDumps.css';

class ProgramDumpsLineChart extends Component {

    static propTypes = {
    };

    view = null;

    state = {
    };

    getToolTipConfig() {
        let options = {
            showAllFields: false,
            fields: [
                {
                    field: 'x',
                    title: 'Time',
                    formatType: 'time',
                    format: '%c'
                },
                {
                    field: 'y',
                    title: 'Value',
                    formatType: 'number'
                }
            ]
        };

        return options;
    }

    renderVega = (props) => {
        const spec = this.getSpec(props);

        let runtime = vega.parse(spec);
        this.view = new vega.View(runtime);

        this.view.logLevel(vega.Error)
            .initialize(this.lineChartContainerRef)
            .renderer('canvas');
        
        vegaTooltip.vega(this.view, this.getToolTipConfig());
        this.view.run();

        this.view.addSignalListener('brush', function (name, value) {
            if (props.brushChange) {
                props.brushChange({
                    key: this.props.chartId,
                    state: this.view.getState({
                        signals: function (name, operator) {
                            let allowedSignals = ['brush'];
                            return allowedSignals.indexOf(name) > -1;
                        },
                        data: function (name, value) {
                            let allowedData = ['brush', 'leftBorder', 'rightBorder'];
                            return allowedData.indexOf(name) > -1;
                        },
                        recurse: false
                    })
                });
            }
        }.bind(this));
    }

    getSpec(props) {
        return {
            $schema: 'https://vega.github.io/schema/vega/v3.0.json',
            width: this.getViewWidth(props),
            height: 286,
            padding: 5,
            data: this.getViewData(props),
            signals: this.getViewSignals(props),
            marks: [
                this.getDetailGroupMark(props),
                this.getSummaryGroupMark(props)      
            ]
        }
    }

    getViewWidth(props) {
        let width = props.chartWidth || this.lineChartContainerRef.clientWidth;
        return width - 30;
    }

    getViewData(props) {
        let timeDelta = 0;
        return [
            {
                name: 'lineData',
                values: props.lineData,
                transform: [
                    {
                        type: "filter",
                        expr: "datum['x'] != null && datum['y'] != null"
                    },
                    {
                        type: "formula",
                        as: "x",
                        expr: "(datum['x'] + " + timeDelta  + " )"
                    }
                ],
                on: [
                    { trigger: 'dataChanged', remove: true, insert: 'dataChanged' }
                ],
            }
        ];
    }

    getViewSignals(props) {
        return [
            { name: 'width', value: this.getViewWidth(props)},
            {
                name: 'detailHeight', value: 196
            },

            {
                name: 'deatailPadding', value: 50
            },

            {
                name: 'overviewHeight', value: 40
            },
            {
                name: 'overviewPosition',
                update: 'detailHeight + deatailPadding'
            },
            {
                name: 'chartHeight',
                update: 'detailHeight + deatailPadding + overviewHeight'
            },
            {
                name: 'detailDomain'
            },
            {
                name: 'cursor', value: 'default',
                on: [
                    {
                        events: '@brush:mousemove, [@brush:mousedown, window:mouseup] > window:mousemove!',
                        update: "'move'"
                    },
                    {
                        events: '@brush:mouseout, window:mouseup',
                        update: "'default'"
                    }
                ]
            },
            {
                name: 'brush', update: '[0, width]',
                on: [
                    {
                        events: '@overview:mousedown',
                        update: '[x(), x()]'
                    },
                    {
                        events: '[@overview:mousedown, window:mouseup] > window:mousemove',
                        update: '[brush[0], clamp(x(), 0, width)]'
                    },
                    {
                        events: { signal: 'delta' },
                        update: 'clampRange([anchor[0] + delta, anchor[1] + delta], 0, width)'
                    },
                    {
                        events: { 'signal': 'leftMove' },
                        update: 'clampRange([leftMove, rightMove], 0, width)'
                    },
                    {
                        events: { signal: 'rightMove' },
                        update: 'clampRange([leftMove, rightMove], 0, width)'
                    }
                ]
            },
            {
                name: 'anchor', value: null,
                on: [{ 'events': '@brush:mousedown', update: 'slice(brush)' }]
            },
            {
                name: 'xdown', value: 0,
                on: [{ 'events': '@brush:mousedown', 'update': 'x()' }]
            },
            {
                name: 'delta', value: 0,
                on: [
                    {
                        events: '[@brush:mousedown, window:mouseup] > window:mousemove',
                        update: 'x() - xdown'
                    }
                ]
            },
            {
                name: 'leftMove',
                value: 0,
                on: [
                    {
                        events: '[@leftBorder:mousedown, window:mouseup] > window:mousemove',
                        update: 'x()'
                    },
                    {
                        events: { 'signal': 'delta' },
                        update: 'clamp(anchor[0] + delta, 0, width)'
                    }
                ]
            },
            {
                name: 'rightMove',
                value: 0,
                on: [
                    {
                        events: '[@rightBorder:mousedown, window:mouseup] > window:mousemove',
                        update: 'x()'
                    },
                    {
                        events: { signal: 'delta' },
                        update: 'clamp(anchor[1] + delta, 0, width)'
                    }
                ]
            },
            {
                name: 'dataChanged',
                value: null,
                force: true
            }
        ]
    }

    getDetailGroupMark(props) {
        return {
            type: 'group',
            name: 'detail',
            encode: {
                enter: {
                    height: { signal: 'detailHeight' },
                },
                update: {
                    width: { signal: 'width' },
                }
            },
            scales: [
                {
                    name: 'xDetail',
                    type: 'time',
                    range: 'width',
                    domain: { data: 'lineData', field: 'x' },
                    domainRaw: { 'signal': 'detailDomain' },
                },
                {
                    name: 'yOverview',
                    type: 'linear',
                    range: [196, 10],
                    domain: { data: 'lineData', field: 'y' },
                    offset: 15,
                    zero: true,
                    nice: true,
                }
            ],
            axes: [
                { orient: "bottom", scale: "xDetail", domain: true, },
                { orient: "left", scale: "yOverview", titlePadding: 5, grid: true }
            ],
            marks: [
                {
                    type: 'group',
                    from: {
                        facet: {
                            name: 'series',
                            data: 'lineData',
                            groupby: 'group'
                        }
                    },
                    encode: {
                        enter: {
                            height: { field: { group: 'height' } },
                            clip: { 'value': true }
                        },
                        update: {
                            width: { signal: 'width' },
                        }
                    },
                    marks: [
                        {
                            type: 'line',
                            from: { data: 'series' },
                            encode: {
                                enter: {
                                    interpolate: { value: 'linear' },
                                    stroke: { value: "#5496D3" },
                                    strokeWidth: { value: 2 }
                                },
                                update: {
                                    x: { scale: 'xDetail', field: 'x' },
                                    y: { scale: 'yOverview', field: 'y' },
                                }
                            }
                        },
                        {
                            type: 'symbol',
                            from: { data: 'series' },
                            encode: {
                                enter: {
                                    shape: { value: 'circle' },
                                    fill: { value: 'white' },
                                    stroke: { value: "#5496D3" },
                                    strokeWidth: { value: 2 },
                                    size: { value: '100' }
                                },
                                update: {
                                    x: { scale: 'xDetail', field: 'x' },
                                    y: { scale: 'yOverview', field: 'y' },
                                }
                            }
                        }
                    ]
                }
            ]
        }
    }

    getSummaryGroupMark() {
        return {
            type: 'group',
            name: 'overview',
            encode: {
                enter: {
                    x: { value: 0 },
                    y: { signal: 'overviewPosition' },
                    height: { signal: 'overviewHeight' },
                    fill: { value: 'transparent' },
                    cursor: { value: 'crosshair' }
                },
                update: {
                    width: { signal: 'width' },
                }
            },
            signals: [
                {
                    name: 'detailDomain',
                    push: 'outer',
                    on: [
                        {
                            events: { 'signal': 'brush' },
                            update: "span(brush) ? invert('xOverview', brush) : null"
                        }
                    ]
                }
            ],
            scales: [
                {
                    name: 'xOverview',
                    type: 'time',
                    range: 'width',
                    round: true,
                    domain: { data: 'lineData', field: 'x' }
                },
                {
                    name: 'yOverview',
                    type: 'linear',
                    range: [{ signal: 'overviewHeight' }, 0],
                    domain: { data: 'lineData', field: 'y' },
                    zero: true
                },
            ],
            axes: [
                {
                    orient: 'bottom', scale: 'xOverview', grid: false,
                    labels: false, ticks: false
                }
            ],
            marks: [
                {
                    type: 'group',
                    from: {
                        facet: {
                            name: 'series',
                            data: 'lineData',
                            groupby: 'group'
                        }
                    },
                    encode: {
                        enter: {
                            height: { field: { group: 'height' } },
                            clip: { value: false }
                        },
                        update: {
                            width: { signal: 'width' }
                        }
                    },
                    marks: [
                        {
                            type: 'line',
                            from: { data: 'series' },
                            encode: {
                                enter: {
                                    interpolate: { value: 'linear' },
                                    strokeWidth: { value: 2 }
                                },
                                update: {
                                    x: { scale: 'xOverview', field: 'x' },
                                    y: { scale: 'yOverview', field: 'y' },
                                    stroke: { value: "#5496D3" },
                                }
                            }
                        },
                        getBrushControl('overviewHeight')
                    ]
                }
            ]
        }
    }

    render() {
        return (
             <div className='ProgramDumpsLineChart-ChartContainer' ref={(ref) => this.lineChartContainerRef = ref } />
        );
    }

    redrawVegaView = (props) => {
        while (this.lineChartContainerRef.firstChild) {
            this.lineChartContainerRef.removeChild(this.lineChartContainerRef.firstChild);
        }
        this.renderVega(props);
    }

    updateVega(props) {
        this.view.width(this.getViewWidth(this.props)).runAfter(function (view) {
            if (this.props.signalContext && this.props.chartId !== this.props.signalContext.key) {
                view.setState(this.props.signalContext.state);
            }
        }.bind(this));
    }

    updateData(nextProps) {
        if (nextProps.lineData !== this.props.lineData && nextProps.lineData.length > 0) {
            this.view.signal('dataChanged', nextProps.lineData)
            this.view.run();
        }
    }

    // componentDidMount() is invoked immediately after a component is mounted. 
    // Initialization that requires DOM nodes should go here. 
    // If you need to load data from a remote endpoint, this is a good place to instantiate the network request. 
    // Setting state in this method will trigger a re-rendering.
    componentDidMount() {
        this.renderVega(this.props);
    }

    // componentDidUpdate() is invoked immediately after updating occurs. This method is not called for the initial render.
    // Use this as an opportunity to operate on the DOM when the component has been updated. 
    // This is also a good place to do network requests as long as you compare the current props to previous props 
    // (e.g. a network request may not be necessary if the props have not changed).
    componentDidUpdate(nextProps, nextState) {
        this.updateVega(nextProps);
    }

    // componentWillReceiveProps() is invoked before a mounted component receives new props. 
    // If you need to update the state in response to prop changes (for example, to reset it), 
    // you may compare this.props and nextProps and perform state transitions using this.setState() in this method.
    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.chartWidth !== this.props.chartWidth) {
            this.redrawVegaView(nextProps)
            return
        };
        this.updateData(nextProps)
    }

}

export default ProgramDumpsLineChart;