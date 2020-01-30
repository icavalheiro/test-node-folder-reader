module.exports = function(data){
    let clientCount = data.clients.length;
    let salesmansCount = data.salesmans.length;

    let mostExpensivePurchase;
    let mostExpensiveValue = 0;
    let reducer = (accumulator, val) => {
        return val.total + accumulator;
    };

    for(let i = 0; i < data.purchases.length; i ++){
        let purchase = data.purchases[i];
        let value = purchase.items.reduce(reducer, 0);
        if(value >= mostExpensiveValue){
            mostExpensivePurchase = purchase;
            mostExpensiveValue = value;
        }
    }

    //let create a list of how much each salesman
    //has in purchase value, so we can sort and
    //findout the worst one
    let salesmansValue = [];
    for(let i = 0; i < data.salesmans.length; i ++){
        let salesman = data.salesmans[i];
        let value = salesman.sales.reduce((acc, purchase) => purchase.items.reduce(reducer, 0), 0);
        salesmansValue.push({salesman, value});
    }

    salesmansValue.sort((x, y) => x.value - y.value);

    let worstSalesman = salesmansValue[0].salesman;

    return {
        clientCount,
        salesmansCount,
        mostExpensivePurchaseId: mostExpensivePurchase.id,
        worstSalesman,
    }
}