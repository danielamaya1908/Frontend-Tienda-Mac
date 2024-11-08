import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import LoginAdmin from './components/LoginAdmin/LoginAdmin';
import LoginUser from './components/Login/LoginUser';
import RegisterForm from './components/Login/RegisterForm';
import Product from './components/Product/Product';
import UserAdmin from './components/UserAdmin/UserAdmin';
import Client from './components/UserAdmin/UserList.jsx';
import BrandManagement from './components/Brand/Brands';
import Categories from './components/Category/Category';
import SubCategories from './components/SubCategories/SubCategories';
import Color from './components/Color/Color';
import Condition from './components/Condition/Condition';
import Capacity from './components/Capacity/Capacity';
import ProductDetail from './components/Product/ProductDetail';
import Iphone12 from './components/Product/iPhone/iPhone12';
import Iphone13pro from './components/Product/iPhone/iPhone13pro';
import Iphone13 from './components/Product/iPhone/Iphone13';
import Iphone14 from './components/Product/iPhone/iPhone14';
import Iphone14pro from './components/Product/iPhone/iPhone14pro';
import Iphone15pro from './components/Product/iPhone/iPhone15pro';
import Iphone15 from './components/Product/iPhone/iPhone15.jsx';
import Iphone16 from './components/Product/iPhone/iPhone16.jsx';
import Iphone16pro from './components/Product/iPhone/iPhone16pro.jsx';
import IphoneSE from './components/Product/iPhone/iPhoneSE';
import Iphone11 from './components/Product/iPhone/iPhone11';
import IphoneAll from './components/Product/iPhone/iPhoneAll';
import IphoneUsed from './components/Product/iPhone/iPhoneUsed';
import IpadAll from './components/Product/iPad/iPadAll';
import Ipad from './components/Product/iPad/iPad';
import Ipadmini from './components/Product/iPad/iPadMini';
import IpadAir from './components/Product/iPad/iPadAir';
import IpadPro from './components/Product/iPad/iPadPro';
import IpadUsed from './components/Product/iPad/iPadUsed';
import MacAll from './components/Product/Mac/MacAll';
import MacMini from './components/Product/Mac/MacMini';
import MacStudio from './components/Product/Mac/MacStudio';
import FormEquipo from './components/SoporteTecnico/FormEquipo';
import SoporteTecnico from './components/SoporteTecnico/SoporteTecnico';
import SoporteTecnicoCliente from './components/SoporteTecnico/SoporteTecnicoCliente';
import SoporteTecnicoClienteDetalle from './components/SoporteTecnico/SoporteTecnicoClienteDetalle';
import SoporteTecnicoDetalle from './components/SoporteTecnico/SoporteTecnicoDetalle';
import MacbookPro from './components/Product/Mac/MacbookPro';
import MacbookAir from './components/Product/Mac/MacbookAir';
import Imac from './components/Product/Mac/iMac';
import Zagg from './components/Product/Sonido/Zagg.jsx';
import MacUsed from './components/Product/Mac/MacUsed';
import Airpods from './components/Product/AirPods/Airpods';
import AirpodsPro from './components/Product/AirPods/AirpodsPro';
import AirpodsMax from './components/Product/AirPods/AirpodsMax';
import Airpods3gen from './components/Product/AirPods/Airpods(3gen)';
import Airpods2gen from './components/Product/AirPods/Airpods(2gen)';
import AirpodsUsed from './components/Product/AirPods/AirpodsUsed';
import AppleWatchUltra2 from './components/Product/AppleWatch/AppleWatchUltra2';
import AppleWatchUltra from './components/Product/AppleWatch/AppleWatchUltra';
import AppleWatchSeries7 from './components/Product/AppleWatch/AppleWatchSeries7';
import AppleWatchSeries8 from './components/Product/AppleWatch/AppleWatchSeries8';
import AppleWatchSeries9 from './components/Product/AppleWatch/AppleWatchSeries9';
import AppleWatchAll from './components/Product/AppleWatch/AppleWatchAll';
import AppleWatchSE from './components/Product/AppleWatch/AppleWatchSE';
import AppleWatchUsed from './components/Product/AppleWatch/AppleWatchUsed';
import AccesoriosParaTVyHogar from './components/Product/Accesorios/AccesoriosParaTVyHogar';
import AccesoriosAll from './components/Product/Accesorios/AccesoriosAll';
import AccesoriosParaAirpods from './components/Product/Accesorios/AccesoriosParaAirpods';
import AccesoriosParaMac from './components/Product/Accesorios/AccesoriosParaMac';
import AccesoriosParaWatch from './components/Product/Accesorios/AccesoriosParaWatch';
import AccesoriosParaiPad from './components/Product/Accesorios/AccesoriosParaiPad';
import AccesoriosParaiPhone from './components/Product/Accesorios/AccesoriosParaiPhone';
import DetalleProducto from './components/Product/DetalleProducto';
import SonidoAll from './components/Product/Sonido/SonidoAll';
import Jbl from './components/Product/Sonido/Jbl';
import Bose from './components/Product/Sonido/Bose';
import Harman from './components/Product/Sonido/Harman';
import AppleTV4k from './components/Product/AppleTV/AppleTV4k';
import AppleTVyHogar from './components/Product/AppleTV/AppleTVyHogar';
import LoNuevo from './components/SubNavbar/LoNuevo';
import Cart from './components/Cart/Cart';
import { CartProvider } from './context/CartContext';
import AppleWarranty from './components/Footer/GarantiaApple';
import FAQ from './components/Footer/FAQ';
import TermsAndConditions from './components/Footer/TermsAndConditions';
import PQRS from './components/Footer/PQRS';
import Ubicacion from './components/Footer/Ubicacion';
import QuienesSomos from './components/Footer/QuienesSomos';
import PaymentMethods from './components/Cart/PaymentMethods';
import PaymentConfirmation from './components/Cart/PaymentConfirmation';
import UserPurchases from './components/Login/UserPurchases.jsx';
import DetallesCuenta from './components/Login/DetallesCuenta.jsx';
import PurchaseAdmin from './components/UserAdmin/PurchaseAdmin.jsx';
import SearchResults from './components/NavBar/Search.jsx';
import WhatsAppButton from './WhatsAppButton.jsx';


function ProtectedRoute({ element, isLoggedIn }) {
  return isLoggedIn ? element : <Navigate to="/login" />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLoginUser, setShowLoginUser] = useState(false);

  const toggleRegister = () => {
    setShowRegister(!showRegister);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const closeLoginUser = () => {
    setShowLoginUser(false);
  };
  return (
    <Router>
      <WhatsAppButton />
      <CartProvider>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
          <Route path="/search" element={<SearchResults />} />
          <Route
            path="/7gP4mX!5vZwQj@n8rAe"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} element={<Dashboard />} />
            }
          />
          <Route
            path="/login"
            element={<LoginAdmin onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route
            path="/LoginUser"
            element={<LoginUser onLogin={handleLogin} onClose={closeLoginUser} />}
          />
          <Route
            path="/register"
            element={<RegisterForm onClose={toggleRegister} />}
          />
          <Route
            path="/product"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} element={<Product />} />
            }
          />
          <Route
            path="/admin/purchases"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} element={<PurchaseAdmin />} />
            }
          />
          <Route
            path="/useradmin"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} element={<UserAdmin />} />
            }
          />
          <Route
            path="/client"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} element={<Client />} />
            }
          />
          <Route
            path="/brands"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} element={<BrandManagement />} />
            }
          />
          <Route
            path="/categories"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} element={<Categories />} />
            }
          />
          <Route
            path="/subcategories"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} element={<SubCategories />} />
            }
          />
          <Route path="/payment-methods" element={<PaymentMethods />} />
          {<Route path="/payment-confirmation" element={<PaymentConfirmation />} />}
          <Route
            path="/colors"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} element={<Color />} />
            }
          />
          <Route
            path="/conditions"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} element={<Condition />} />
            }
          />
          <Route
            path="/capacities"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} element={<Capacity />} />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} element={<ProductDetail />} />
            }
          />
          <Route
            path="/soporte-tecnico"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} element={<SoporteTecnico />} />
            }
          />

          {/* Ruta protegida para SoporteTecnicoDetalle */}
          <Route
            path="/soporteTecnico/:id"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} element={<SoporteTecnicoDetalle />} />
            }
          />
          <Route path="/UserPurchases" element={<UserPurchases />} />
          <Route path="/detalles-cuenta" element={<DetallesCuenta />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/PQRS" element={<PQRS />} />
          <Route path="/QuienesSomos" element={<QuienesSomos />} />
          <Route path="/Ubicacion" element={<Ubicacion />} />
          <Route path="/soporte-tecnico-client" element={<SoporteTecnicoCliente />} />
          <Route path="/soportetecnicocliente/:id" element={<SoporteTecnicoClienteDetalle />} />
          <Route path="/warranty" element={<AppleWarranty />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/FormEquipo" element={<FormEquipo />} />
          <Route path="/iphone12" element={<Iphone12 />} />
          <Route path="/iphone13pro" element={<Iphone13pro />} />
          <Route path="/iphone13" element={<Iphone13 />} />
          <Route path="/iphone14pro" element={<Iphone14pro />} />
          <Route path="/iphone14" element={<Iphone14 />} />
          <Route path="/iphone15pro" element={<Iphone15pro />} />
          <Route path="/iphone15" element={<Iphone15 />} />
           <Route path="/zagg" element={<Zagg />} />
          <Route path="/iphone16pro" element={<Iphone16pro />} />
          <Route path="/iphone16" element={<Iphone16 />} />
          <Route path="/iphoneSE" element={<IphoneSE />} />
          <Route path="/iphone11" element={<Iphone11 />} />
          <Route path="/iphoneAll" element={<IphoneAll />} />
          <Route path="/iPhoneUsed" element={<IphoneUsed />} />
          <Route path="/ipadAll" element={<IpadAll />} />
          <Route path="/ipadPro" element={<IpadPro />} />
          <Route path="/ipadMini" element={<Ipadmini />} />
          <Route path="/ipad" element={<Ipad />} />
          <Route path="/ipadAir" element={<IpadAir />} />
          <Route path="/IpadUsed" element={<IpadUsed />} />
          <Route path="/macAll" element={<MacAll />} />
          <Route path="/MacMini" element={<MacMini />} />
          <Route path="/MacbookPro" element={<MacbookPro />} />
          {/* <Route path="/StudioDisplaysl" element={<StudioDisplaysl />} /> */}
          <Route path="/imac" element={<Imac />} />
          <Route path="/MacUsed" element={<MacUsed />} />
          <Route path="/MacStudio" element={<MacStudio />} />
          <Route path="/MacbookAir" element={<MacbookAir />} />
          <Route path="/airpods" element={<Airpods />} />
          <Route path="/airpodspro" element={<AirpodsPro />} />
          <Route path="/airpodsmax" element={<AirpodsMax />} />
          <Route path="/airpods3gen" element={<Airpods3gen />} />
          <Route path="/airpods2gen" element={<Airpods2gen />} />
          <Route path="/airpodsUsed" element={<AirpodsUsed />} />
          <Route path="/AppleWatchUltra2" element={<AppleWatchUltra2 />} />
          <Route path="/AppleWatchUltra" element={<AppleWatchUltra />} />
          <Route path="/AppleWatchSeries7" element={<AppleWatchSeries7 />} />
          <Route path="/AppleWatchSeries8" element={<AppleWatchSeries8 />} />
          <Route path="/AppleWatchSeries9" element={<AppleWatchSeries9 />} />
          <Route path="/AppleWatchAll" element={<AppleWatchAll />} />
          <Route path="/AppleWatchUsed" element={<AppleWatchUsed />} />
          <Route path="/AppleWatchSE" element={<AppleWatchSE />} />
          <Route path="/AccesoriosParaTVyHogar" element={<AccesoriosParaTVyHogar />} />
          <Route path="/AccesoriosAll" element={<AccesoriosAll />} />
          <Route path="/AccesoriosParaiPhone" element={<AccesoriosParaiPhone />} />
          <Route path="/AccesoriosParaiPad" element={<AccesoriosParaiPad />} />
          <Route path="/AccesoriosParaWatch" element={<AccesoriosParaWatch />} />
          <Route path="/AccesoriosParaMac" element={<AccesoriosParaMac />} />
          <Route path="/AccesoriosParaAirpods" element={<AccesoriosParaAirpods />} />
          <Route path="/SonidoAll" element={<SonidoAll />} />
          <Route path="/Bose" element={<Bose />} />
          <Route path="/Harman" element={<Harman />} />
          <Route path="/Jbl" element={<Jbl />} />
          <Route path="/AppleTV4k" element={<AppleTV4k />} />
          <Route path="/AppleTVyHogar" element={<AppleTVyHogar />} />
          <Route path="/LoNuevo" element={<LoNuevo />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/detalle-producto/iphoneAll" element={<Navigate to="/iphoneAll" replace />} />
          <Route path="/detalle-producto/zagg" element={<Navigate to="/zagg" replace />} />
          <Route path="/detalle-producto/iphone15" element={<Navigate to="/iphone15" replace />} />
          <Route path="/detalle-producto/iphone15pro" element={<Navigate to="/iphone15pro" replace />} />
          <Route path="/detalle-producto/iphone16" element={<Navigate to="/iphone16" replace />} />
          <Route path="/detalle-producto/iphone16pro" element={<Navigate to="/iphone16pro" replace />} />
          <Route path="/detalle-producto/iphone14" element={<Navigate to="/iphone14" replace />} />
          <Route path="/detalle-producto/iphone14pro" element={<Navigate to="/iphone14pro" replace />} />
          <Route path="/detalle-producto/iphone13" element={<Navigate to="/iphone13" replace />} />
          <Route path="/detalle-producto/iphone13pro" element={<Navigate to="/iphone13pro" replace />} />
          <Route path="/detalle-producto/iphone12" element={<Navigate to="/iphone12" replace />} />
          <Route path="/detalle-producto/iphone11" element={<Navigate to="/iphone11" replace />} />
          <Route path="/detalle-producto/iphoneSE" element={<Navigate to="/iphoneSE" replace />} />
          <Route path="/detalle-producto/iPhoneUsed" element={<Navigate to="/iPhoneUsed" replace />} />
          <Route path="/detalle-producto/ipadAll" element={<Navigate to="/ipadAll" replace />} />
          <Route path="/detalle-producto/ipadPro" element={<Navigate to="/ipadPro" replace />} />
          <Route path="/detalle-producto/ipadMini" element={<Navigate to="/ipadMini" replace />} />
          <Route path="/detalle-producto/ipad" element={<Navigate to="/ipad" replace />} />
          <Route path="/detalle-producto/ipadAir" element={<Navigate to="/ipadAir" replace />} />
          <Route path="/detalle-producto/IpadUsed" element={<Navigate to="/IpadUsed" replace />} />
          <Route path="/detalle-producto/macAll" element={<Navigate to="/macAll" replace />} />
          <Route path="/detalle-producto/macbookAir" element={<Navigate to="/macbookAir" replace />} />
          <Route path="/detalle-producto/studioDisplay" element={<Navigate to="/studioDisplay" replace />} />
          <Route path="/detalle-producto/macStudio" element={<Navigate to="/macStudio" replace />} />
          <Route path="/detalle-producto/macMini" element={<Navigate to="/macMini" replace />} />
          <Route path="/detalle-producto/imac" element={<Navigate to="/imac" replace />} />
          <Route path="/detalle-producto/macUsed" element={<Navigate to="/macUsed" replace />} />
          <Route path="/detalle-producto/macbookPro" element={<Navigate to="/macbookPro" replace />} />
          <Route path="/detalle-producto/airpods" element={<Navigate to="/airpods" replace />} />
          <Route path="/detalle-producto/airpodsmax" element={<Navigate to="/airpodsmax" replace />} />
          <Route path="/detalle-producto/airpodspro" element={<Navigate to="/airpodspro" replace />} />
          <Route path="/detalle-producto/airpods3gen" element={<Navigate to="/airpods3gen" replace />} />
          <Route path="/detalle-producto/airpods2gen" element={<Navigate to="/airpods2gen" replace />} />
          <Route path="/detalle-producto/airpodsUsed" element={<Navigate to="/airpodsUsed" replace />} />
          <Route path="/detalle-producto/AppleWatchUltra2" element={<Navigate to="/AppleWatchUltra2" replace />} />
          <Route path="/detalle-producto/AppleWatchUltra" element={<Navigate to="/AppleWatchUltra" replace />} />
          <Route path="/detalle-producto/AppleWatchSE" element={<Navigate to="/AppleWatchSE" replace />} />
          <Route path="/detalle-producto/AppleWatchSeries7" element={<Navigate to="/AppleWatchSeries7" replace />} />
          <Route path="/detalle-producto/AppleWatchSeries8" element={<Navigate to="/AppleWatchSeries8" replace />} />
          <Route path="/detalle-producto/AppleWatchSeries9" element={<Navigate to="/AppleWatchSeries9" replace />} />
          <Route path="/detalle-producto/AppleWatchUsed" element={<Navigate to="/AppleWatchUsed" replace />} />
          <Route path="/detalle-producto/AppleWatchAll" element={<Navigate to="/AppleWatchAll" replace />} />
          <Route path="/detalle-producto/AccesoriosParaTVyHogar" element={<Navigate to="/AccesoriosParaTVyHogar" replace />} />
          <Route path="/detalle-producto/AccesoriosAll" element={<Navigate to="/AccesoriosAll" replace />} />
          <Route path="/detalle-producto/AccesoriosParaiPhone" element={<Navigate to="/AccesoriosParaiPhone" replace />} />
          <Route path="/detalle-producto/AccesoriosParaiPad" element={<Navigate to="/AccesoriosParaiPad" replace />} />
          <Route path="/detalle-producto/AccesoriosParaWatch" element={<Navigate to="/AccesoriosParaWatch" replace />} />
          <Route path="/detalle-producto/AccesoriosParaMac" element={<Navigate to="/AccesoriosParaMac" replace />} />
          <Route path="/detalle-producto/AccesoriosParaAirpods" element={<Navigate to="/AccesoriosParaAirpods" replace />} />
          <Route path="/detalle-producto/SonidoAll" element={<Navigate to="/SonidoAll" replace />} />
          <Route path="/detalle-producto/Jbl" element={<Navigate to="/Jbl" replace />} />
          <Route path="/detalle-producto/Harman" element={<Navigate to="/Harman" replace />} />
          <Route path="/detalle-producto/Bose" element={<Navigate to="/Bose" replace />} />
          <Route path="/detalle-producto/AppleTV4k" element={<Navigate to="/AppleTV4k" replace />} />
          <Route path="/detalle-producto/AppleTVyHogar" element={<Navigate to="/AppleTVyHogar" replace />} />
          <Route path="/detalle-producto/LoNuevo" element={<Navigate to="/LoNuevo" replace />} />
          <Route path="/detalle-producto/:id" element={<DetalleProducto />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
