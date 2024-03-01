axios.get('http://localhost:3000/getorders')
.then(res=>{
    console.log(res.data);

    for(let el of res.data){
        let goods='';
        for(let item of el.list){
            goods +=item.name+'';
        }
        console.log(el);
        let date = new Date(el.time);
    $('.orderContainer').append(`<div class='orderItem'>
<h3 class="orderItemInner">${el.name}</h3>
<div class="orderItemInner orderItemInner">${el.phone}</div>
<div class="productContainer">${goods}</div>
<div class="orderItemInner">
<div>${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</div>
<div>${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}</div>
</div>
<button class="orderItemInner" id="delete${el.time}">Delete</button>
</div>`)

    }
})

$('.wrap').click(function(e){
    if((e.target.id).substring(0,6)=='delete'){
        let ID=(e.target.id).substring(6)
        

        axios.post('http://localhost:3000/delete-order',{id:ID})
        .then(res=>{
            console.log(res);
            window.location.reload();
        })
    }
})