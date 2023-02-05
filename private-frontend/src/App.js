import {
  Container
} from "reactstrap"
import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "./components/Auth/ProtectedRoute"
import { ProductContextProvider } from "./contexts/ProductContext"
import Login from "./pages/Login"
import ListProducts from "./pages/ListProducts"


function App() {
  return (
    <Container>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/products" element={
          <ProductContextProvider>
            <ProtectedRoute component={ListProducts} />
          </ProductContextProvider>
        } />
      </Routes>
    </Container>
  );
}

export default App;
