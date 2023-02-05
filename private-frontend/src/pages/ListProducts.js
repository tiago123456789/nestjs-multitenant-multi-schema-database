import {
    Button, CardBody, Card,
    CardTitle, CardSubtitle, Row
} from "reactstrap"
import { useContext, useEffect } from "react"
import AuthContext from "../contexts/AuthContext"
import ProductContext from "../contexts/ProductContext"

export default () => {
    const { logout } = useContext(AuthContext)
    const { products, getProducts } = useContext(ProductContext)

    useEffect(() => {
        if (products.length == 0) {
            getProducts()
        }
    }, [])


    return (
        <>
            <Button color="danger" onClick={() => logout()}>Logout</Button><br />
            <h1>Products</h1><br />
            <Row>
                {
                    products.map(product => {
                        return (
                            <Card className="col-md-3 mb-4" style={{ margin: "5px" }}>
                                <img
                                    alt={product.name}
                                    src={product.image}
                                />
                                <CardBody >
                                    <CardTitle tag="h5">
                                        {product.name}
                                    </CardTitle>
                                    <CardSubtitle
                                        className="mb-2 text-muted"
                                        tag="h6"
                                    >
                                        R$ {product.price}
                                    </CardSubtitle>
                                    <Button>
                                        Comprar
                              </Button>
                                </CardBody>
                            </Card>

                        )
                    })
                }
            </Row>

        </>
    )
}