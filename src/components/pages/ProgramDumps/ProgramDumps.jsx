import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as vega from 'vega';

import appConstants from 'appConstants';
import ProgramDumpsLineChart from './ProgramDumpsLineChart';
import './ProgramDumps.css';

class ProgramDumps extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chartsWidth: 0,
            signalContext: null
        }
    }

    getData = () => {
        const { data } = this.props;
        let dataSet = [];
        let timeDelta = 0;

        if (data && data.x && data.y) {
            for (var i = 0; i < data.x.length; i++) {
                dataSet.push({
                    x: (data.x[i] + timeDelta),
                    y: data.y[i]
                })
            }
        }
        return dataSet;
    }

    getChartsWidth(showRightPanel) {
        let chartsWidth = window.innerWidth - 530;
        if (!showRightPanel) {
            chartsWidth = chartsWidth + appConstants.RIGHT_PANEL_FULL_WIDTH;
        }
        return chartsWidth;
    }

    onBrushChange = (context) => {
        this.setState({
            signalContext: context
        });
    }

    componentDidMount() {
        this.props.addCustomContent({
            sortOptionHidden: true
        });
    }

    // componentWillReceiveProps() is invoked before a mounted component receives new props. 
    // If you need to update the state in response to prop changes (for example, to reset it), 
    // you may compare this.props and nextProps and perform state transitions using this.setState() in this method.
    componentWillReceiveProps(nextProps) {
        let chartsWidth = this.getChartsWidth(nextProps.showRightPanel);
        this.setState({
            chartsWidth: chartsWidth
        });
    }

    render() {    
        const lineDataSet = this.getData();

        if (Object.keys(this.props.data.timeValues).length !== 0) {
            return (
                <div className='ProgramDumps-ChartContainer'>
                    <div className='ProgramDumps-ChartCard'>
                        <span className='ProgramDumps-ChartTitle'>{this.props.data.title}</span>
                        {
                            lineDataSet && lineDataSet.length ?
                            <ProgramDumpsLineChart 
                                lineData={lineDataSet}
                                chartWidth={this.state.chartsWidth}
                                signalContext={this.state.signalContext}
                                brushChange={this.onBrushChange}/> : null
                        }
                    </div>
                </div>
            );
        } else {
            return (
                <div className='ProgramDumps-EmptyContainer'>
                    <p>No records exist for the selected date(s) and filter(s).</p>
                </div>
            )
        }
    }
}

export default ProgramDumps;