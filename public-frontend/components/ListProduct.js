import {
    CardBody, Card,
    CardTitle, CardSubtitle,
    Button,
} from "reactstrap"
export default ({ products }) => {
    return (
        <>
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
        </>
    )
}