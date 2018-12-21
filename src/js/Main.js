import React from 'react';
import CurrencyWidget from "./CurrencyWidget";

const Main = () => {
    const apiKey = '1c14981dc32f0556533851fd411f76c4';
    const latestRates = 'http://data.fixer.io/api/latest?access_key=1c14981dc32f0556533851fd411f76c4&format=1';

    // fetch(latestRates).then(r => r.json()).then(data => console.log(data.rates.PLN));
    return (
        <CurrencyWidget/>
    );
};

export default Main;
