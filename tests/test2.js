const csv = require("csv-parser");
const fs = require("fs");

const filePath = './NSE.csv'; // Replace with the actual path to your CSV file

const results = [];

fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
        if (
            data.instrument_type === 'OPTIDX' &&
            data.exchange === 'NSE_FO' &&
            data.tradingsymbol.startsWith('BANKNIFTY') &&
            data.expiry === '2023-12-13' &&
            data.last_price > 15
        ) {
            results.push(data);
        }
    })
    .on('end', () => {
        console.log('Matching rows:', results);
    });