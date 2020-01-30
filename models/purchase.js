let item = require('./item');

module.exports = function Purchase(data){
    this.id = data[1];
    this.items = [];
    this.salesmanName = data[3];
    this.salesman = null;//to be filled later on by the parser
    
    //process raw items
    let rawItems = data[2]
                    .replace('[', '')
                    .replace(']', '');

    let rawItemsSplit = rawItems.split(',');
    for(let i = 0; i < rawItemsSplit.length; i ++){
        let rawItem = rawItemsSplit[i];
        this.items.push(new item(rawItem));
    }
}