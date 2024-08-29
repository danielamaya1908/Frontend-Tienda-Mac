import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Home.module.css';
import Footer from '../Footer/Footer';
import appleImage from '../../img/publicidad1.png';
import SubNavbar from '../SubNavbar/SubNavbar';

const Home = () => {
  const [homeProducts, setHomeProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [productImages, setProductImages] = useState({});
  const [newProductImages, setNewProductImages] = useState({});
  const [featuredProductImages, setFeaturedProductImages] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [currentNewPage, setCurrentNewPage] = useState(0);
  const [currentFeaturedPage, setCurrentFeaturedPage] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const productsPerPageAccessories = 8;
  const productsPerPageNew = 4;
  const productsPerPageFeatured = 9;

  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        const responses = await Promise.all([
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20TV/subcategory/Controles%20remotos'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20MagSafe'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Audífonos/subcategory/Audífonos%20de%20cable'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Adaptadores/subcategory/Adaptador%20VGA'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Adaptadores/subcategory/Adaptador%20de%20audio'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20computación/subcategory/Mouse'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cable%20de%20carga%20magnetica'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20de%20coche%20con%204%20puertos%20USB'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20de%202%20puertos%20USB%20para%20Coche%20+%20Cable%20Lightning%20a%20USB'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20de%20coche%20USB%20+%20cable%20lightning'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20de%20carro%20de%202%20puertos%20con%20cable%20usb-a%20con%20conector%20lightning'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20dual-USB-A%20para%20coche'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20de%20coche%20dual%20USB-C+%20USB-A'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20Universal%20para%20coche'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Soporte%20de%20viaje%20para%20el%20cable%20de%20carga%20y%20el%20%20Apple%20Watch'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Base%20de%20carga%202%20en%201%20para%20iPhone%20y%20Apple%20Watch'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20de%20carro%20+%20cable%20lightning%20a%20USB'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20Clip%20de%20puerto%20Lightning%20a%20USB'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cable%20de%20carga%20USB-A%20a%20Lightning'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cable%20de%20carga%20USB-C%20a%20Lightning'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cable%20de%20carga%20USB%20con%20Adaptador%20Lightning'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20de%20pared'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20de%20carro%20+%20cable%20lightning'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20de%20pared%20de%20puerto%20USB'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20de%20coche%20con%20doble%20puerto%20USB-A'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Cargador%20de%204%20puertos'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Base%20de%20carga%20para%20iPhone%20y%20apple%20watch'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Soporte%20de%20carga%20inalámbrica%20para%20teléfonos'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20video/subcategory/Adaptador%20USB-C%20a%20HDMI'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Bateria%20Portátil'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga/subcategory/Batería%20externa,%20inalámbrica%20y%20magnética%20con%20soporte'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga%20y%20navegación/subcategory/Soporte%20de%20carga%20para%20teléfono%20móvil%20+%20Navegación%20para%20automóvil'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga%20para%20apple%20watch%20y%20iPhone/subcategory/Bateria%20portátil'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Cables%20de%20Audio%20y%20Video/subcategory/Cable%20HD-HDMI'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20deportivos/subcategory/Brazalete%20deportivo%20+%20Estuche%20de%20seguridad'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20deportivos/subcategory/Banda%20de%20mano%20protectora%20para%20iPhone'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20deportivos/subcategory/Brazalete%20deportivo%20para%20iPhone'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20Audio%20o%20Sonido/subcategory/Audífonos%20para%20niños'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carro/subcategory/Soporte%20de%20carro%20para%20teléfono%20móvil'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Cables%20de%20imagen/subcategory/Adaptador%20Mini%20Displayport%20a%20VGA'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Cables%20de%20imagen/subcategory/Adaptador%20usb-c%20a%20Vga'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20reloj/subcategory/Protector%20de%20pantalla%20para%20Apple%20Watch'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20Grabación%20y%20soporte%20de%20teléfono/subcategory/Soporte%20magnético%20girable%20para%20grabación'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20Audio%20o%20Sonido/subcategory/Cable%20de%20audio%20con%20conector%20lightning'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20Audio%20o%20Sonido/subcategory/Distribuidor%20de%20audio'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga%20y%20transferencia%20de%20datos/subcategory/Cable%20USB-C%20a%20USB-C'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga%20y%20transferencia%20de%20datos/subcategory/Llavero%20con%20puerto%20lightning%20a%20USB'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga%20y%20transferencia%20de%20datos/subcategory/Cable%20Lightning%20a%20USB-C'),
          axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Accesorios%20de%20carga%20y%20transferencia%20de%20datos/subcategory/Cable%20USB-C%20a%20Lightning')
        ]);

        const products = responses.flatMap(response => response.data);
        setHomeProducts(products);

        products.forEach(async (product) => {
          try {
            const imageResponse = await axios.get(`https://backend-tienda-mac-production.up.railway.app/products/${product.id}/images`);
            const imageFileNames = imageResponse.data;
            const imageUrls = imageFileNames.map(fileName => `https://backend-tienda-mac-production.up.railway.app/images/${fileName}`);
            setProductImages(prevState => ({ ...prevState, [product.id]: imageUrls }));
          } catch (error) {
            console.error(`Error getting images for product ${product.id}:`, error);
          }
        });
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchHomeProducts();
  }, []);

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const response = await axios.get('https://backend-tienda-mac-production.up.railway.app/products/recent');
        const newProducts = response.data;
        setNewProducts(newProducts);

        newProducts.forEach(async (product) => {
          try {
            const imageResponse = await axios.get(`https://backend-tienda-mac-production.up.railway.app/products/${product.id}/images`);
            const imageFileNames = imageResponse.data;
            const imageUrls = imageFileNames.map(fileName => `https://backend-tienda-mac-production.up.railway.app/images/${fileName}`);
            setNewProductImages(prevState => ({ ...prevState, [product.id]: imageUrls }));
          } catch (error) {
            console.error(`Error getting images for new product ${product.id}:`, error);
          }
        });
      } catch (error) {
        console.error('Error fetching new products:', error);
      }
    };

    fetchNewProducts();
  }, []);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('https://backend-tienda-mac-production.up.railway.app/products/category/Smartphones/subcategory/iPhone');
        const products = response.data;
        setFeaturedProducts(products);

        products.forEach(async (product) => {
          try {
            const imageResponse = await axios.get(`https://backend-tienda-mac-production.up.railway.app/products/${product.id}/images`);
            const imageFileNames = imageResponse.data;
            const imageUrls = imageFileNames.map(fileName => `https://backend-tienda-mac-production.up.railway.app/images/${fileName}`);
            setFeaturedProductImages(prevState => ({ ...prevState, [product.id]: imageUrls }));
          } catch (error) {
            console.error(`Error getting images for featured product ${product.id}:`, error);
          }
        });
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const nextPage = () => {
    setCurrentPage((prevPage) =>
      (prevPage + 1) % Math.ceil(homeProducts.length / productsPerPageAccessories)
    );
  };

  const prevPage = () => {
    setCurrentPage((prevPage) =>
      (prevPage - 1 + Math.ceil(homeProducts.length / productsPerPageAccessories)) %
      Math.ceil(homeProducts.length / productsPerPageAccessories)
    );
  };

  const nextNewPage = () => {
    setCurrentNewPage((prevPage) =>
      (prevPage + 1) % Math.ceil(newProducts.length / productsPerPageNew)
    );
  };

  const prevNewPage = () => {
    setCurrentNewPage((prevPage) =>
      (prevPage - 1 + Math.ceil(newProducts.length / productsPerPageNew)) %
      Math.ceil(newProducts.length / productsPerPageNew)
    );
  };

  const nextFeaturedPage = () => {
    setCurrentFeaturedPage((prevPage) =>
      (prevPage + 1) % Math.ceil(featuredProducts.length / productsPerPageFeatured)
    );
  };

  const prevFeaturedPage = () => {
    setCurrentFeaturedPage((prevPage) =>
      (prevPage - 1 + Math.ceil(featuredProducts.length / productsPerPageFeatured)) %
      Math.ceil(featuredProducts.length / productsPerPageFeatured)
    );
  };

  return (
    <div className={styles.homeContainer}>
    <img src={appleImage} alt="Apple" className={`img-fluid ${styles.customImg}`} />  
    <div className="container-fluid">
    <div className="text-center my-4">
          <h2>Productos Más Recientes</h2>
        </div>
    <div className="col-12">
<div className="d-flex align-items-center justify-content-between mb-3">
  <button className="btn btn-primary rounded-circle" onClick={prevNewPage}>&lt;</button>
  <div className="row g-2 flex-grow-1 mx-2 justify-content-center">
    {/* Productos (4 por página) */}
    {newProducts.slice(currentNewPage * 4, currentNewPage * 4 + 4).map((product) => (
      <div key={product.id} className="col-11 col-sm-3 col-md-3">
        <div className="card h-100 border-0 card-custom-bg d-flex flex-column">
          <div className="d-flex align-items-center justify-content-center" style={{ height: '150px', overflow: 'hidden' }}>
            <img src={newProductImages[product.id]?.[0]} className="card-img-top img-fluid" alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          </div>
          <div className="card-body text-center flex-grow-1 d-flex flex-column justify-content-between p-2">
            <h6 className="card-title text-truncate" style={{ fontSize: '1rem' }}>{product.name}</h6>
            <p className="card-text text-truncate" style={{ fontSize: '0.875rem' }}>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(product.price)}</p>
            <a href={`/detalle-producto/${product.id}`} className="btn btn-primary mt-2">
              Comprar
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>
  <button className="btn btn-primary rounded-circle" onClick={nextNewPage}>&gt;</button>
</div>
</div>
<br/>

      {/* Sección "Productos Destacados" */}
      <div>
    <SubNavbar />
    </div>
    <br/>
      <div className="col-12">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <button className="btn btn-primary rounded-circle" onClick={prevFeaturedPage}>&lt;</button>
            <div className="row g-2 flex-grow-1 mx-3">
              {/* Productos (4 arriba y 4 abajo) */}
              {featuredProducts.slice(currentFeaturedPage * productsPerPageFeatured, currentFeaturedPage * productsPerPageFeatured + 8).map((product) => (
                <div key={product.id} className="col-12 col-sm-6 col-md-3">
                  <div className="card h-100 border-0 card-custom-bg d-flex flex-column">
                    <div className="d-flex align-items-center justify-content-center" style={{ height: '150px', overflow: 'hidden' }}>
                      <img src={featuredProductImages[product.id]?.[0]} className="card-img-top img-fluid" alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    </div>
                    <div className="card-body text-center flex-grow-1 d-flex flex-column justify-content-between p-2">
                    <h6 className="card-title text-truncate" style={{ fontSize: '1.25rem' }}>{product.name}</h6>
                    <p className="card-text text-truncate" style={{ fontSize: '1rem' }}>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(product.price)}</p>
                      <a href={`/detalle-producto/${product.id}`} className="btn btn-primary mt-2">
                        Comprar
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-primary rounded-circle" onClick={nextFeaturedPage}>&gt;</button>
          </div>
      </div>
      <br/>
      {/* Sección "Accesorios" */}
          <div className="text-center my-4">
          <h2>Accesorios</h2>
        </div>
      <div className="col-12">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <button className="btn btn-primary rounded-circle" style={{ width: '36px', height: '36px', padding: '0' }} onClick={prevPage}>&lt;</button>
        <div className="row g-2 flex-grow-1 mx-2 justify-content-center">
          {homeProducts.slice(currentPage * 4, (currentPage + 1) * 4).map((product) => (
            <div key={product.id} className="col-10 col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 border-0 bg-light d-flex flex-column" style={{ maxWidth: '300px', margin: '0' }}>
                <div className="card-img-container" style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <img src={productImages[product.id]?.[0]} className="card-img-top img-fluid" alt={product.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
                <div className="card-body text-center d-flex flex-column justify-content-between p-2">
                  <h6 className="card-title text-truncate" style={{ fontSize: '1.25rem', margin: '0' }}>{product.name}</h6>
                  <p className="card-text text-truncate" style={{ fontSize: '1rem', margin: '0' }}>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(product.price)}</p>
                  <a href={`/detalle-producto/${product.id}`} className="btn btn-primary mt-2">Comprar</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-primary rounded-circle" style={{ width: '36px', height: '36px', padding: '0' }} onClick={nextPage}>&gt;</button>
      </div>
    </div>
    <br/>

     </div>
    <Footer />
  </div>
);
};

export default Home;