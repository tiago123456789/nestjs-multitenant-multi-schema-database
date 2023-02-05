import { createContext, useContext, useState } from "react";
import AuthContext from "./AuthContext";
import * as api from "./../services/api"

const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
    const { accessToken } = useContext(AuthContext)
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        const products = await api.get("admin/products", accessToken)
        setProducts(products)
    }

        return (
        <ProductContext.Provider value={{ getProducts, products }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContext;