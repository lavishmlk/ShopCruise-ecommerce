import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      //   const item = state.products.find(
      //     (product) => product.id === action.payload.id
      //   );
      // Check if Item is in cart already
      //here product is mainly id jo cartActions me pass ki hai
      //HUM CARTiTEMS KO TRAVERSE KAR RHE HAI x.product ke through aur action.payload wo products hai jo hum cart me add karwana chahte hai agar dono match kar gye to matlab exist karta hai
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          // ab hum cartItems ko traverse kar rhe hai ek ek item cart me check karenge jiski bhi id humare item ki id se match kar jaegi use humari item se replace kar denge warna x aise ka aise hi rehne denge remember hum quantity increase hi kar rhe bas replace kar rhe hai
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          // return a new cardItems array with the previous products spread and add the new item matlab ek new array create karlia jisme purani items to thi hi saath me nai item bhi add kardi to pehle 1 size ka array tha ab 2 size ka ho jaega jisme 0 index aur 1 index dono pe alag products ki details hongi
          //YE ITEMS isi carditems wle array me store ho jaegi
          //.cardItems isliye karna padta hai kyunki cardItems humara state me hi to hai upar jo initial state pass ki hai parameters me

          cartItems: [...state.cartItems, item],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
        //YAHAN DOUBT AYA THA KI action.payload KYU LIKHA AUR action.payload.product kyu nhi likha kyunki humne CART_REMOVE_ITEM ke action me payload ke andar id hi pass ki hai khali
        // remember ye product id hai humne id ko hi product variable me assign kiya hai
      };

    default:
      return state;
  }
};
