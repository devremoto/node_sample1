var http= require('http');

var config={
    hostname:'localhost',
    port:3000,
    path:'/produtos',
    method:'post',
    headers:{
        'Accept':'application/json',
        'Content-type':'application/json'
    }
}

var client=http.request(config,function(res){
    console.log(res.statusCode);
    res.on('data',function(body){
        console.log("corpo:"+body);
    })
})

var produto={
    titulo:'mais um livro',
    descricao:'mais um livro mesmo',
    preco:10
}

client.end(JSON.stringify(produto));