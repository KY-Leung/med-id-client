import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Link } from 'react-router-dom'
import { StyledTitle, StyledContent } from '../../common/StyledText/StyledText';

import './Master.css';
import companyLogo from '../../../assets/images/company_logo.png';
import companyLogoWithText from '../../../assets/images/company_logo_with_text.png';

//Material-UI App bar
import 'typeface-roboto'
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import RandomIcon from '@material-ui/icons/Inbox';
import AccountCircle from '@material-ui/icons/AccountCircle';

const drawerWidth = 360;

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    backgroundColor: '#1C8DB1',
    width: `calc(100% - ${theme.spacing.unit * 9}px)`,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    marginTop: '64px',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    // padding: theme.spacing.unit * 3,
  },
});

class Master extends React.Component {
    state = {
        doctorId: window.location.pathname.substring(8,9),
        open: true,
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, theme } = this.props;
        const { doctorId } = this.state;

    return (
        <div className={classes.root}>
        <AppBar
            position="absolute"
            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
            <Toolbar disableGutters={!this.state.open}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={this.handleDrawerOpen}
                    className={classNames(classes.menuButton, this.state.open && classes.hide)}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
        <Drawer
            variant="permanent"
            classes={{
                paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
        >   
            { this.state.open && 
                <div className='Master-TopLeftContainer'>
                    <div className='Master-CompanyLogoContainer' >
                        <img style={{ height: '80px', width: '80px' }} src={companyLogo} />
                        <StyledTitle fontSize='18px' style={{ color: '#024B6E' }}> G Canyon Urgent Care </StyledTitle>
                        <StyledContent fontSize='14px' style={{ color: '#024B6E', marginTop: '18px'}}> G Canyon Urgent Care Patient Dashboard </StyledContent>  
                    </div>
                    <div>
                        <div className={classes.toolbar}>
                            <IconButton onClick={this.handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </div>
                    </div>  
                </div>
            }
            { !this.state.open &&
                <img style={{ height: '70px', width: '50px', margin: '30px 0px 30px 10px'}} src={companyLogoWithText} />
            }
            <List component="nav">
                <ListItem button component={Link} to={'/doctor/' + doctorId + '/overview'}>
                    <ListItemIcon>
                        {/* Overview SVG here */}
                        <RandomIcon />
                    </ListItemIcon>
                    <ListItemText primary="Overview" />
                </ListItem>
                <ListItem button component={Link} to={'/doctor/' + doctorId + '/consultation-schedule'}>
                    <ListItemIcon>
                        {/* Consultation Schedule SVG here */}
                        <RandomIcon />
                    </ListItemIcon>
                    <ListItemText primary="Consultation Schedule" />
                </ListItem>
                <ListItem button component={Link} to='/patient'>
                    <ListItemIcon>
                        {/* Account SVG here */}
                        <RandomIcon />
                    </ListItemIcon>
                    <ListItemText primary="Account" />
                </ListItem>
            </List>
        </Drawer>
        <main className={classes.content}>
            {this.props.children}
        </main>
      </div>
    );
  }
}

Master.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Master);