let db = [
    {
        id: 1,
        name: 'Nike Air',
        price: 180
    },
    {
        id: 2,
        name: 'Air Jordan',
        price: 199
    },
    {
        id: 3,
        name: 'Nike Netro',
        price: 135
    },
    {
        id: 4,
        name: 'Air Spain',
        price: 149
    }
];


for (let el of db) {
    $('.productContainer').append(`<div class="productItem">
        <h3>${el.name}</h3>
        <p>${el.price}</p>
        <button class="addItem" id="${el.id}">Add to cart</button>
    </div>`);
}


let cartList = [];
$('.addItem').click((e) => {

    for (let el of db) {
        if (el.id == e.target.id) {
            cartList.push(el);
        }
    }

    $('#cart').text(`Cart: ${cartList.length}`);
    showCartInner(cartList);
})

function showCartInner(cartList) {
    $('.cartPopupContainer').empty();
    for (let el of cartList) {
        $('.cartPopupContainer').append(`<div>${el.name}</div>`);
    }
}


$('#confirmBtn').click((e) => {
    let data = {
        list: cartList,
        name: $('#username').val(),
        phone: $('#phone').val(),
    }

    axios.post('http://localhost:3000/save-order', data)
})


function getOrders(){
    let res=[];
    axios.get('http://localhost:3000/getorders')
    .then(data=>{
        let orders=data.data;
        for(let i=0;i<orders.length;i++){
            if(orders[i] != ''){
                res.push(orders[i]);
            }
        }
        console.log(JSON.parse(res[1]));
    })
}
getOrders();