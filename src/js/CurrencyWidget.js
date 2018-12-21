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
        maxWidth: 600,
        margin: '0 auto'
    },
    card: {
        width: 250,
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
                name: 'PLN',
                value: '4.234',
                symbol: 'PLN'
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
                name: 'CHF',
                value: '2.832',
                symbol: 'CHF'
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
                        Current EUR exchange rates
                    </Typography>
                </Grid>
                {this.state.currencies.map((curr, i) => (
                    <Grid item xs={12} sm={6} container key={i}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    EUR to {curr.name}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    1 EUR  = {(1 / Number(curr.value)).toFixed(3)} {curr.symbol}
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    1 {curr.symbol} = {(Number(curr.value)).toFixed(3)} EUR
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        );
    }

    componentDidMount() {
        const latestRates = 'http://data.fixer.io/api/latest?access_key=1c14981dc32f0556533851fd411f76c4&format=1';
        const ratesFromApi = [];
        fetch(latestRates).then(r => r.json()).then(data => console.log(data.rates));
        fetch(latestRates).then(r => r.json()).then(data => {
            ratesFromApi.push(data.rates.PLN, data.rates.GBP, data.rates.USD, data.rates.CHF);
            this.setState({
                currencies: [
                    {
                        name: 'PLN',
                        value: ratesFromApi[0],
                        symbol: 'PLN'
                    },
                    {
                        name: 'GBP',
                        value: ratesFromApi[1],
                        symbol: '£'
                    },
                    {
                        name: 'USD',
                        value: ratesFromApi[2],
                        symbol: '$'
                    },
                    {
                        name: 'CHF',
                        value: ratesFromApi[3],
                        symbol: 'CHF'
                    }
                ]
            })
        });

    }
}


export default withStyles(styles)(CurrencyWidget);