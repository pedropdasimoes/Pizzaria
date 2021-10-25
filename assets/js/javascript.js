let cart = [];
let quantidade = 1;
let idPizza = 0;
let identifier = 0;
let cartIdent = 0;
let subtotal = 0;
let desconto = 0;
let total = 0;
let pizzaItemCart = 0;
let pizzaItemNew = 0;
let pizzaSizeName = 0;
let sizeName = 0;
let nomeCompleto = 0;

document.querySelector('.hamburguer a').addEventListener('click',(e)=>{
    e.preventDefault();
    document.querySelector('.divNav').style.top = '0px';
});
document.querySelector('.voltarMobile').addEventListener('click',(e)=>{
    e.preventDefault();     
    document.querySelector('.divNav').style.top = '-110%';
});
document.querySelector('.navMobileQM').addEventListener('click',(e)=>{
    e.preventDefault();
});
document.querySelector('.navMobilePM').addEventListener('click',(e)=>{
    e.preventDefault();
});
document.querySelector('.navMobileSA').addEventListener('click',(e)=>{
    e.preventDefault();
});
document.querySelector('.navMobileCO').addEventListener('click',(e)=>{
    e.preventDefault();
});

pizzaJson.map((item, index)=>{
    let pizzaItem = document.querySelector('.models .divPizza').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('a img').src = item.img;
    pizzaItem.querySelector('.divValor').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.divNomePizza').innerHTML = item.name;
    pizzaItem.querySelector('.divDescPizza').innerHTML = item.description;

    pizzaItem.querySelector('a').addEventListener('click',(e)=>{
        e.preventDefault();
        let key = e.target.closest('.divPizza').getAttribute('data-key');
        quantidade = 1;
        idPizza = key;

        document.querySelector('.divQuant').innerHTML = quantidade;
        document.querySelector('.divImgWindow img').src = pizzaJson[key].img;
        document.querySelector('.contentWindow h1').innerHTML = pizzaJson[key].name;
        document.querySelector('.contentWindow p').innerHTML = pizzaJson[key].description;
        document.querySelector('.divPriceBtn h3').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        document.querySelector('.selected').classList.remove('selected');
        document.querySelectorAll('.pizzaSize').forEach((size, sizeIndex)=>{
            if(sizeIndex == 2){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
        });
        document.querySelector('.divWindow').style.opacity = '0';
        document.querySelector('.divWindow').style.display = 'flex';
        setTimeout(()=>{
            document.querySelector('.divWindow').style.opacity = '1';
        }, 200);
    })
    document.querySelector('.pizzaArea').append(pizzaItem);
})

document.querySelector('.divCancel').addEventListener('click', (e)=>closeWindow());

document.querySelector('.divCancelMobile').addEventListener('click', (e)=>closeWindow());

function closeWindow(){
    document.querySelector('.divWindow').style.opacity = '0';
    setTimeout(()=>{        
        document.querySelector('.divWindow').style.display = 'none';
    }, 200);
}

document.querySelector('.btnPluse').addEventListener('click', (e)=>{
    quantidade++;
    document.querySelector('.divQuant').innerHTML = quantidade;
});

document.querySelector('.btnMinum').addEventListener('click', (e)=>{
    if(quantidade > 1){
        quantidade--;
    }
    document.querySelector('.divQuant').innerHTML = quantidade;
});

document.querySelectorAll('.pizzaSize').forEach((size, sizeIndex)=>{
    size.addEventListener('click', ()=>{
        document.querySelector('.selected').classList.remove('selected');
        size.classList.add('selected')
    });
});

document.querySelector('.divAddToCart').addEventListener('click',()=>{
    let size = document.querySelector('.selected').getAttribute('data-size');    
    identifier = pizzaJson[idPizza].id+'@'+size;
    cartIdent = cart.findIndex((item)=>item.identifier == identifier);
    if (cartIdent == -1){
        cart.push({
            identifier,
            id:pizzaJson[idPizza].id,
            size:parseInt(size),
            qt:quantidade
        });
    }else{
        cart[cartIdent].qt += quantidade;
    }

    updateCart();
    closeWindow();
});
document.querySelector('.divCart a').addEventListener('click',(e)=>{
    e.preventDefault();    
    document.querySelector('.pizzaPedida').innerHTML = '';
    subtotal = 0;
    desconto = 0;
    total = 0;
    document.querySelector('.h3Money').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        document.querySelector('.h3Desconto').innerHTML = `R$ ${desconto.toFixed(2)}`;
        document.querySelector('.h3ValueTotal').innerHTML = `R$ ${total.toFixed(2)}`;
    updateCart();
    document.querySelector('.cart').classList.remove('show');
    document.querySelector('.cart').classList.add('showCart');
});
document.querySelector('.voltarMobileCart').addEventListener('click',(e)=>{
    e.preventDefault();
    document.querySelector('.cart').classList.remove('showCart');
});

function updateCart(){
    document.querySelector('.divInputCart input').placeholder = cart.length;


    if(cart.length > 0){
        document.querySelector('.cart').classList.add('show');
        document.querySelector('main').classList.add('showMain');
        document.querySelector('.pizzaPedida').innerHTML = '';
    
        subtotal = 0;
        desconto = 0;
        total = 0;

        for(let i in cart){
            pizzaItemNew = pizzaJson.find((item)=>item.id == cart[i].id);
            pizzaItemCart = document.querySelector('.models .nomePizzaCart').cloneNode(true);
            subtotal += pizzaItemNew.price * cart[i].qt;
            console.log(subtotal);

            switch(cart[i].size){
                case 0:
                    sizeName = 'Pequena';
                    break;
                case 1:
                    sizeName = 'Média';
                    break;
                case 2:
                    sizeName = 'Grande';
                    break;
            }
            nomeCompleto = `${pizzaItemNew.name}: ${sizeName}`;

            pizzaItemCart.querySelector('.nomePizzaCart img').src = pizzaItemNew.img;
            pizzaItemCart.querySelector('.nomePizzaCart h3').innerHTML = nomeCompleto;
            pizzaItemCart.querySelector('.divQuantCart').innerHTML = cart[i].qt;
            pizzaItemCart.querySelector('.btnMinumCart').addEventListener('click',()=>{
                if (cart[i].qt > 1){
                    cart[i].qt--;
                }else{
                    cart.splice(i, 1);
                }
                updateCart();
            });
            pizzaItemCart.querySelector('.btnPluseCart').addEventListener('click',()=>{
                cart[i].qt++;
                updateCart();
            });

            
            document.querySelector('.pizzaPedida').append(pizzaItemCart);
        }

        desconto = subtotal * 0.1;
        total = subtotal - desconto;    

        document.querySelector('.h3Money').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        document.querySelector('.h3Desconto').innerHTML = `R$ ${desconto.toFixed(2)}`;
        document.querySelector('.h3ValueTotal').innerHTML = `R$ ${total.toFixed(2)}`;

    }else{
        document.querySelector('.cart').classList.remove('show');
        document.querySelector('main').classList.remove('showMain');
        document.querySelector('.cart').classList.remove('showCart')
    }
}