import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
    root: {
        maxWidth: 400,
        margin: '0 auto'
    },
    card: {
        minWidth: 150,
        maxWidth: 400,
        marginBottom: theme.spacing.unit * 2,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

class CurrencyWidget extends React.Component {
    state = {
        currencies: [
            {
                name: 'EUR',
                value: '4.234',
                symbol: '€'
            },
            {
                name: 'GBP',
                value: '5.346',
                symbol: '£'
            },
            {
                name: 'USD',
                value: '3.842',
                symbol: '$'
            },
            {
                name: 'YEN',
                value: '2.832',
                symbol: '¥'
            }
        ]
    };

    render() {
        const {classes} = this.props;
        // const bull = <span className={classes.bullet}>•</span>;
        return (
            <Grid container spacing={24} justify={'center'} className={classes.root}>
                <Grid item xs={12} container justify={'center'}>
                    <Typography variant={'h5'} align={'center'}>
                        Current exchange rates
                    </Typography>
                </Grid>
                {this.state.currencies.map((curr, i) => (
                    <Grid item xs={12} sm={6} container key={i}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    PLN to {curr.name}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    {curr.value} {curr.symbol}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        );
    }

    componentDidMount() {

    }
}


export default withStyles(styles)(CurrencyWidget);