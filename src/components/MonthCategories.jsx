import { NavLink } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
const MonthCategories = () => {

  const ProductUrl = "http://localhost:8080/product";
  const CategoryUrl = "http://localhost:8080/category";
  const [dataCategory, setDataCategory] = useState([]);// Datos de categorías
  const [productImages, setProductImages] = useState({}); // Imágenes de productos
  const [products, setProducts] = useState([]);
  // CObtener todos los Category


// Obtener datos de categorías
  const peticionGetCategory = async () => {
    await axios.get(CategoryUrl)
      .then(response => {
        setDataCategory((response.data).slice(0, 3));
      }).catch(error => {
        console.log(error);
      })
  }

    // Obtener datos de productos
    const peticionGetProducts = async () => {
      await axios.get(ProductUrl)
        .then(response => {
          setProducts(response.data);
        }).catch(error => {
          console.log(error);
        })
    }

  // Obtener imágenes de productos
const peticionGetProductImages = async () => {
  const productData = await axios.get(ProductUrl)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });

  const images = {};

  productData.forEach(product => {
    images[product.id] = product.img;
  });

  setProductImages(images);
};

// Seleccionar una imagen aleatoria de la categoría
const getRandomCategoryImage = (category) => {
  const productsInCategory = products.filter(product => product.productCategory.name === category);
  const randomProduct = productsInCategory[Math.floor(Math.random() * productsInCategory.length)];
  //return productImages[randomProduct.id];
  return randomProduct ? productImages[randomProduct.id] : null;
};

// Obtener datos de categorías y de productos al cargar el componente
useEffect(() => {
  peticionGetCategory();
  peticionGetProducts();
  peticionGetProductImages();
}, []);
  return (
    <section className="container py-5"
    //     style={{
    // background: "url(./background.svg) center",


    //     }}
    >
      <div className="row text-center pt-3">
        <div className="col-lg-6 m-auto">
          <h1 className="h1">Categorías del Mes</h1>
          <p>
            Los siguientes productos han sido los más adquiridos por nuestros
            clientes. ¡Puede darles un vistazo y obtenerlos si le parecen
            atractivos!
          </p>
        </div>
      </div>
      <div className="row">
        {dataCategory.map((result) => {
          return (
            <div className="floating col-12 col-md-4 p-5 mt-3" key={result.id} >
              <a href="#?">
                <img
                  src={getRandomCategoryImage(result.name)} alt={result.name}
                  className="rounded-circle img-fluid border"
                />
              </a>
              <h5 className="text-center mt-3 mb-3">{result.name}</h5>
              <p className="text-center">
                <NavLink
                  to="/shop"
                  activeclassname="active"
                  exact="true"
                  className="btn-login btn btn-success"
                >
                  Ir a la tienda
                </NavLink>
              </p>
            </div>
          );
        })}

      </div>
    </section>
  );
};

export default MonthCategories;
