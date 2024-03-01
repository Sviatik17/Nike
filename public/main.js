

let db = [
    {
        id: 1,
        name: 'Nike Air',
        price: '$180,00',
        oldPrice:'$289,00',
        img:'./img/nike-air.png',
        backgroundColor:'rgba(77, 184, 95, 0.836)'
    },
    {
        id: 2,
        name: 'Air Jordan',
        price: '$199,00',
        oldPrice:'$289,00',
        img:'./img/air-jordan.png',
        backgroundColor:'rgba(252, 234, 194, 0.836)'
    },
    {
        id: 3,
        name: 'Nike Netro',
        price: '$135,00',
        oldPrice:'$289,00',
        img:'./img/nike-netro.png',
        backgroundColor:'rgba(252, 208, 114, 0.836)'
        
    },
    {
        id: 4,
        name: 'Air Spain',
        price: '$149,00',
        oldPrice:'$199,00',
        img:'./img/air-spain.png',
        backgroundColor:'rgba(0, 217, 255, 0.836)'
    }
];

let sliderItmes=[
    {
        id:1,
        bgcolor:'#FFE2B5',
        color:'#F5CF94',
        text:'Hot'
    },
    {
        id:2,
        bgcolor:'#FFDC62',
        color:'#fccb1c',
        text:'Wet'
    },
    {
        id:3,
        bgcolor:'#D3FBD9',
        color:'#bdfcc6',
        text:'Cold'
    },
];



for (let el of db) {
    $('.productContainer').append(`<div class="productItem">
     <div class="imgBlock" id="bg${el.id}">  <img class="itemImg" src="${el.img}"> </div>  
        <h4>${el.name}</h4>
        <div class="priceBlock">
        <p class="newPrice">${el.price}</p> 
        <p class="oldPrice">${el.oldPrice}</p> 
        </div>
         <div class="colorsBlock">
         <div class="colorsBtn">Colors</div>
         <div class="colors">
         <div class="colorItem" id="black"></div>
         <div class="colorItem" id="red"></div>
         <div class="colorItem" id="orange"></div>
         <div class="colorItem" id="yellow"></div>
         <div class="colorItem" id="green"></div>
         </div>
          </div>
        <button class="addItem" id="${el.id}"> <img src="./img/addCart.png">Add to cart</button>
    </div>`);
    $(`#bg${el.id}`).css('backgroundColor',`${el.backgroundColor}`)
}


let cartList = [];
$('.addItem').click((e) => {

    for (let el of db) {
        if (el.id == e.target.id) {
            cartList.push(el);
        }
    }

    $('.cartCounter').css('display','flex');
    $('.cartCounter').text(cartList.length);
    showCartInner(cartList);
})
let clickCounter=0;

$('#cart').click(function(){
    clickCounter++;
    if(clickCounter%2==0){
        $('.cartPopup').hide(500)
    }else{
        $('.cartPopup').show(500)
    }
})  

function showCartInner(cartList) {
    $('.cartPopupContainer').empty();
    for (let el of cartList) {
        $('.cartPopupContainer').append(`<div>${el.name}</div>`);
    }
}


$('#confirmBtn').click((e) => {
    if(cartList.length>0){
    let data = {
        list: cartList,
        name: $('#username').val(),
        phone: $('#phone').val(),
        time:Date.now()
    }

    axios.post('http://localhost:3000/save-order', data)
    .then(res=>{
        if(res.status==200){
            showNotification('Дані збережено', 'rgba(72, 226, 141, 0.848)')
            $('#username').val('');
            $('#phone').val('');
            showCartInner([]);


        }
    })
}else{
    showNotification('Товар не обрано', 'rgba(72, 226, 141, 0.848)')
}
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

function showNotification(text,color){
    $('.notificationPopup').css('display','flex');
    $('.notificationPopup').text(text);
    $('.notificationPopup').css('background-color',color);
    setTimeout(()=>{$('.notificationPopup').css('display','none')},3000)

}

function playSlider(){
    let slide=0;
    setInterval(function(){
            $('.sliderContainer').css('background-color',sliderItmes[slide].bgcolor);
            $('.rightText').text(sliderItmes[slide].text);
            $('.rightText').css('color',sliderItmes[slide].color);
            if(slide<sliderItmes.length-1){
                slide++
                
            }else{
                slide=0;
            }
            console.log(slide)
        },5000)   
   
}

playSlider()



