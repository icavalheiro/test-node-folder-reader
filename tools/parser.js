let client = require('../models/client');
let purchase = require('../models/purchase');
let salesman = require('../models/salesman');

module.exports = function(data){
    let parsedClients = [];
    let parsedPurchases = [];
    let parsedSalesmans = [];

    //process line by line
    let lines = data.split('\n');
    for(let i =0; i < lines.length; i ++){
        let line = lines[i];

        //get the line columns and decide how to map it to an object
        let columns = line.split('ç');
        switch(columns[0]){
            case '001':
                parsedSalesmans.push(new salesman(columns));
                break;
            case '002':
                parsedClients.push(new client(columns));
                break;
            case '003':
                parsedPurchases.push(new purchase(columns));
                break;
            default:
                break;
        }
    }

    //add the salesperson as a reference to the purchases
    //and the purchase reference to the salesman
    for(let i = 0; i < parsedPurchases.length; i ++){
        let purchase = parsedPurchases[i];
        let salesmanName = purchase.salesmanName.toLowerCase();

        //try to find a matching salesperson
        for(let j = 0; j < parsedSalesmans.length; j ++){
            let salesman = parsedSalesmans[j];
            let name = salesman.name.toLowerCase();
            if(name.startsWith(salesmanName)){
                //Found! :D
                purchase.salesman = salesman;
                salesman.sales.push(purchase);
                break;
            }
        }
    }

    return {
        clients: parsedClients,
        purchases: parsedPurchases,
        salesmans: parsedSalesmans
    }
}