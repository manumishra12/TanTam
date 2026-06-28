import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Landing } from './pages/Landing'
import { About } from './pages/About'
import { Categories } from './pages/Categories'
import { Occasions } from './pages/Occasions'
import { Diwali } from './pages/Diwali'
import { Solutions } from './pages/Solutions'
import { Experiential } from './pages/Experiential'
import { Products } from './pages/Products'
import { ProductDetail } from './pages/ProductDetail'
import { Enquiry } from './pages/Enquiry'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/occasions" element={<Occasions />} />
          <Route path="/diwali" element={<Diwali />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/experiential" element={<Experiential />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="*" element={<Landing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
