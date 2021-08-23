const cartProductList = [
    {id: 1, price: 1, description: 'Zapatos', brand: 'Nike'},
    {id: 1, price: 1, description: 'Zapatos', brand: 'Nike'},
    {id: 1, price: 1, description: 'Zapatos', brand: 'Nike'},
    {id: 2, price: 1, description: 'Zapatos', brand: 'Nike'},
    {id: 2, price: 1, description: 'Zapatos', brand: 'Nike'},
    {id: 2, price: 1, description: 'Zapatos', brand: 'Nike'},
   
]

const a = [{id:1, marca:'gato'},{id:1, marca:'gato'},{id:1, marca:'gato'}]

//Funcion para listar los elementos seleccionados en la compra totalizados
const reduceCartProductsSelected = itemsList =>{
    let result = []
    itemsList.map(item=>{
        let idx = result.findIndex(i => i.id === item.id)
        let it = item
        idx > -1 ? result[idx].cant++ : result.push({...it, cant: 1})
    })
    console.log(JSON.stringify(result))
    return result
}

//function cuenta precio total de la compra
const cartTotalAmount = cartItems =>{ 
    return cartItems.reduce( (acc, item) => acc + item.price*item.cant, 0)
}

//function cuenta precio total de la compra
const cartTotalItems = cartItems =>{ 
    return cartItems.reduce( (acc, item) => acc + item.cant, 0)
}

export {reduceCartProductsSelected, cartTotalAmount, cartTotalItems }

// console.time('1')
// console.log(cartTotalAmount(reduceCartProductsSelected(cartProductList)))
// console.timeEnd('1')

// console.time('s')
// console.log(reduceCartProductsSelected([...a, {id:1, marca:'gato'}]))
// console.timeEnd('s')