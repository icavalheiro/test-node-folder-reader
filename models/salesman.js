module.exports = function Salesman(data){
    this.cpf = data[1];
    this.name = data[2];
    this.salary = parseFloat(data[3]);
    this.sales = [];//to be filled up later by the parser
}