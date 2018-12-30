import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const ExchangeRate = props => {
    // TODO: should this be separate component? or put it back to CurrencyWidget?
    let result;
    if (props.values.length > 0) {
        result = (
            <CardContent>
                <Typography className={props.title} color="textSecondary" gutterBottom>
                    EUR to {props.currency}
                </Typography>
                <Typography variant="h5" component="h2">
                    1 EUR = {(Number(props.values[props.i])).toFixed(3)} {props.currency}
                </Typography>
                <Typography variant="h5" component="h2">
                    1 {props.currency} = {(1 / Number(props.values[props.i])).toFixed(3)} EUR
                </Typography>
            </CardContent>
        );
    } else {
        result = <CircularProgress/>;
    }
    return result;
};

const styles = theme => ({
    root: {
        maxWidth: 1400,
        minWidth: 500,
        margin: '0 auto'
    },
    card: {
        width: 250,
        marginBottom: theme.spacing.unit * 2,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    cardTitle: {
        // width: '100%',
        padding: theme.spacing.unit * 1.5
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
            'PLN',
            'GBP',
            'USD',
            'CHF',
            'AUD',
            'HKD',
            'NOK',
            'SEK',
            'CAD',
            'DKK',
            'ILS',
            'NZD'
        ],
        values: []
    };

    // render() {
    //     const {classes} = this.props;
    //     // const bull = <span className={classes.bullet}>•</span>;
    //     return (
    //         <Grid container spacing={24} justify={'center'} className={classes.root}>
    //             <Grid item xs={12} container justify={'center'}>
    //                 <Typography variant={'h5'} align={'center'}>
    //                     Current EUR exchange rates
    //                 </Typography>
    //             </Grid>
    //             {this.state.currencies.map((curr, i) => (
    //                 <Grid item xs={12} sm={6} container key={i}>
    //                     <Card className={classes.card}>
    //                         <CardContent>
    //                             <Typography className={classes.title} color="textSecondary" gutterBottom>
    //                                 EUR to {curr.name}
    //                             </Typography>
    //                             <Typography variant="h5" component="h2">
    //                                 1 EUR  = {(Number(curr.value)).toFixed(3)} {curr.symbol}
    //                             </Typography>
    //                             <Typography variant="h5" component="h2">
    //                                 1 {curr.symbol} = {(1 / Number(curr.value)).toFixed(3)} EUR
    //                             </Typography>
    //                         </CardContent>
    //                     </Card>
    //                 </Grid>
    //             ))}
    //         </Grid>
    //     );
    // }

    render() {
        const {classes} = this.props;
        // const bull = <span className={classes.bullet}>•</span>;

        return (
            <Grid container spacing={24} justify={'center'} className={classes.root}>
                <Grid item xs={12} container justify={'center'}>
                    {/*<Typography variant={'h5'} align={'center'}>*/}
                    {/*Current EUR exchange rates*/}
                    {/*</Typography>*/}
                    <Card className={classes.cardTitle}>
                        <Typography variant={'h5'} align={'center'}>
                            Current EUR exchange rates
                        </Typography>
                    </Card>
                </Grid>
                {this.state.currencies.map((currency, i) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} container key={i}>
                        <Card className={classes.card}>
                            <ExchangeRate currency={currency} values={this.state.values} i={i} title={classes.title}/>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        );
    }

    componentDidMount() {
        // const latestRates = 'http://data.fixer.io/api/latest?access_key=1c14981dc32f0556533851fd411f76c4&format=1';
        // const ratesFromApi = [];
        // fetch(latestRates).then(r => r.json()).then(data => console.log(data.rates));
        // fetch(latestRates).then(r => r.json()).then(data => {
        //     ratesFromApi.push(data.rates.PLN, data.rates.GBP, data.rates.USD, data.rates.CHF);
        //     this.setState({
        //         currencies: [
        //             {
        //                 name: 'PLN',
        //                 value: ratesFromApi[0],
        //                 symbol: 'PLN'
        //             },
        //             {
        //                 name: 'GBP',
        //                 value: ratesFromApi[1],
        //                 symbol: '£'
        //             },
        //             {
        //                 name: 'USD',
        //                 value: ratesFromApi[2],
        //                 symbol: '$'
        //             },
        //             {
        //                 name: 'CHF',
        //                 value: ratesFromApi[3],
        //                 symbol: 'CHF'
        //             }
        //         ]
        //     });
        // });

        const latestRates = 'http://data.fixer.io/api/latest?access_key=1c14981dc32f0556533851fd411f76c4&format=1';
        const ratesFromApi = [];
        fetch(latestRates).then(r => r.json()).then(data => console.log(data.rates));
        fetch(latestRates).then(r => r.json()).then(data => {
            ratesFromApi.push(
                data.rates.PLN, data.rates.GBP, data.rates.USD,
                data.rates.CHF, data.rates.AUD, data.rates.HKD,
                data.rates.NOK, data.rates.SEK, data.rates.CAD,
                data.rates.DKK, data.rates.ILS, data.rates.NZD);
            this.setState({
                values: ratesFromApi
            });
        });

    }
}


export default withStyles(styles)(CurrencyWidget);