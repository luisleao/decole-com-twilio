const db = [
    {
        phoneNumber: process.env.MY_PHONE_NUMBER,
        status: 'saiu_entrega',
        orderStatus: 'Saiu para entrega',
        deliveryDate: '25/06/2021',
        orderItem: 'Tênis Twilio Vermelho',
        orderNumber:123456
    },
    {
        phoneNumber: process.env.MY_PHONE_NUMBER,
        status: 'fila_despacho',
        orderStatus: 'Em fila para despacho',
        deliveryDate: '25/06/2021',
        orderItem: 'Twilio Casual Cinza',
        orderNumber:654321
    }
]


function getOrderByPhoneNumber(number) {
    const order = db.find(order => order.phoneNumber === number);
    return order;
}

exports.getOrderByPhoneNumber = getOrderByPhoneNumber

function getOrderByOrderNumber(number) {
    const order = db.find(order => order.orderNumber == number);
    return order;
}

exports.getOrderByOrderNumber = getOrderByOrderNumber


function getOrdersByStatus(status) {
    const orders = db.filter(order => order.status == status);
    return orders;
}

exports.getOrdersByStatus = getOrdersByStatus
