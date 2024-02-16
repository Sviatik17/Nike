axios.get('http://localhost:3000/getorders')
.then(res=>{
    console.log(res.data);

    for(let el of res.data)
    $('.orderContainer').append(`<div class='orderItem'>
<h3>${el.name}</h3>
<div>${el.phone}</div>
</div>`)
})