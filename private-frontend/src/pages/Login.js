import {
    Button, Form,
    Input, Label
} from "reactstrap"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import AuthContext from "../contexts/AuthContext"


export default () => {
    const navigator = useNavigate()
    const [domain, setDomain] = useState("")
    const { authenticate } = useContext(AuthContext)

    const login = async (event) => {
        event.preventDefault()
        await authenticate(domain);
        setDomain("")
        navigator("/admin/products")
    }

    return (
        <>
            <Form>
                <Label>Domain:</Label>
                <Input
                    value={domain}
                    onChange={(event) => setDomain(event.target.value)}
                    className="mb-1"
                />
                <Button color="primary" onClick={login}>Login</Button>
            </Form>
        </>
    )
}
