import { NavLink } from "react-router-dom";

const MonthCategories = () => {
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
        <div className="floating col-12 col-md-4 p-5 mt-3">
          <a href="#?">
            <img
              src="https://therichpost.com/wp-content/uploads/2021/05/category_img_01.jpg"
              className="rounded-circle img-fluid border"
              alt=""
            />
          </a>
          <h5 className="text-center mt-3 mb-3">Relojes</h5>
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
        <div className="floating col-12 col-md-4 p-5 mt-3">
          <a href="#?">
            <img
              src="https://therichpost.com/wp-content/uploads/2021/05/category_img_02.jpg"
              className="rounded-circle img-fluid border"
              alt=""
            />
          </a>
          <h2 className="h5 text-center mt-3 mb-3">Zapatos</h2>
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
        <div className="floating col-12 col-md-4 p-5 mt-3">
          <a href="#?">
            <img
              src="https://therichpost.com/wp-content/uploads/2021/05/category_img_03.jpg"
              className="rounded-circle img-fluid border"
              alt=""
            />
          </a>
          <h2 className="h5 text-center mt-3 mb-3">Accessorios</h2>
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
      </div>
    </section>
  );
};

export default MonthCategories;
