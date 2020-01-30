module.exports = function Item(data){
    let split = data.split('-');
    this.id = split[0];
    this.quantity = parseFloat(split[1]);
    this.price = parseFloat(split[2]);
    this.total = this.price * this.quantity;
}