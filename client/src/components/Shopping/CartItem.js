const CartItem = ({data, delFromCart}) => {
    let {id, name, price, quantity} = data
 return (
    <div style={{borderBottom:"thin solid gray"}}>
        <h4>{name}</h4>
        <h5>${price} x {quantity} = ${price*quantity}</h5>
        <button onClick={()=> delFromCart(id)}>Delete One</button>
        <br>
        </br>
        <button onClick={()=> delFromCart(id, true)}>Delete All</button>
        <br>
        </br>
        <br>
        </br>
    </div>
 );    
};

export default CartItem;