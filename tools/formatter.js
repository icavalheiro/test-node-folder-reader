module.exports = function(data){
    return data.clientCount + '\n' +
        data.salesmansCount + '\n' + 
        data.mostExpensivePurchaseId + '\n' +
        data.worstSalesman.name + '\n';
}