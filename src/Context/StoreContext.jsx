import { createContext, use, useEffect, useState } from "react";
import { food_list } from "../../assets/frontend_assets/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});

    const addToCart = (itemId) => {

        if (!cartItems[itemId]) {
            // console.log(itemId)
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }

    const getCartTotal = () => {
        let total = 0
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id == item)
                total += itemInfo.price * cartItems[item]
            }

        }
        return total
    }

    useEffect(() => {
        console.log(cartItems)
    }, [cartItems])


    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getCartTotal
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}

export default StoreContextProvider