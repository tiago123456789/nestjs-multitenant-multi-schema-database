import {
    Button, Form,
    Input, Label
} from "reactstrap"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import AuthContext from "../contexts/AuthContext"


export default () => {
    const navigator = useNavigate()
    const [name, setName] = useState("")
    const { authenticate } = useContext(AuthContext)

    const login = async (event) => {
        event.preventDefault()
        await authenticate(name);
        setName("")
        navigator("/admin/products")
    }

    return (
        <>
            <Form>
                <Label>Name:</Label>
                <Input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="mb-1"
                />
                <Button color="primary" onClick={login}>Login</Button>
            </Form>
        </>
    )
}
