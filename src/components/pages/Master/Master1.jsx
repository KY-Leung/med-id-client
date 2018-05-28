import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux'

function mapStateToProps(state) {
    return {
        // allSystems: state.user.data.systems,
        // allTags: state.tags.data,
    }
}

function mapDisaptchToProps() {
    return {
        // updateRightPanelSystems,
        // updateRightPanelDate,
    }
}

class Master extends Component {

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) { 
    }

    render() {
        // return (

        // )
    }
}

export default connect(mapStateToProps, mapDisaptchToProps)(Master);