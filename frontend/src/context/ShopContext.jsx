import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = 'Ksh';
    const delivery_fee = 200;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});

    const addToCart = (itemId) => {
        setCartItems(prevCartItems => {
            const cartData = { ...prevCartItems };
            cartData[itemId] = (cartData[itemId] || 0) + 1;
            
            // Show success toast
            toast.success("Item added to cart!", {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
            return cartData;
        });
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            try {
                if (cartItems[item] > 0) {
                    totalCount += cartItems[item];
                }
            } catch (error) {
                console.error("Error in getCartCount:", error);
            }
        }
        return totalCount;
    };

    const updateQuantity = async (itemId, quantity) => {
        let cartData = { ...cartItems };
        cartData[itemId] = quantity;
        setCartItems(cartData);
    };

    const value = {
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
            <ToastContainer />
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;

