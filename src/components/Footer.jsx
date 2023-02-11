import { NavLink } from "react-router-dom";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-dark" id="tempaltemo_footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 pt-5">
                        <h2 className="h2 border-bottom pb-3 border-light logo">Supermercados KMarket</h2>
                        <ul className="list-unstyled text-light footer-link-list">
                            <li>
                                <i className="fas fa-map-marker-alt fa-fw"></i>
                                Ecuador
                            </li>
                            <li>
                                <i className="fa fa-phone fa-fw"></i>
                                <a className="text-decoration-none" href="#">042-987-543</a>
                            </li>
                            <li>
                                <i className="fa fa-envelope fa-fw"></i>
                                <a className="text-decoration-none" href="#">KMarket@Kruger.com</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4 pt-5">
                        <h2 className="h2 text-light border-bottom pb-3 border-light">Productos</h2>
                        <ul className="list-unstyled text-light footer-link-list">
                            <li><a className="text-decoration-none" href="#">Embutidos</a></li>
                            <li><a className="text-decoration-none" href="#">Ropa</a></li>
                            <li><a className="text-decoration-none" href="#">Zapatos</a></li>
                            <li><a className="text-decoration-none" href="#">Golosinas</a></li>
                            <li><a className="text-decoration-none" href="#">Electrodomésticos</a></li>
                            <li><a className="text-decoration-none" href="#">Limpieza</a></li>
                            <li><a className="text-decoration-none" href="#">Lácteos</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4 pt-5">
                        <h2 className="h2 text-light border-bottom pb-3 border-light">Más Información</h2>
                        <ul className="list-unstyled text-light footer-link-list">
                            <li>
                                <NavLink to="/" activeclassname="active" exact="true" className="text-decoration-none">
                                    Inicio
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/about" activeclassname="active" exact="true" className="text-decoration-none">
                                    Acerca de
                                </NavLink>
                            </li>
{/*                             <li>
                                <NavLink activeclassname="active" className="text-decoration-none"
                                    to="https://goo.gl/maps/DzG5vJjFAcaZSGRD8">
                                    Ubicaciones
                                </NavLink>
                            </li> */}
                            <li><a className="text-decoration-none" href="#">FAQs</a></li>
                            <li>
                                <NavLink to="/contact" activeclassname="active" exact="true" className="text-decoration-none">
                                    Contacto
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row text-light mb-4">
                    <div className="col-12 mb-3">
                        <div className="w-100 my-3 border-top border-light"></div>
                    </div>
                    <div className="col-auto me-auto">
                        <ul className="list-inline text-left footer-icons">
                            <li className="list-inline-item border border-light rounded-circle text-center">
                                <a className="text-light text-decoration-none" target="_blank" href="#">
                                    <i className="fab fa-facebook-f fa-lg fa-fw"></i>
                                </a>
                            </li>
                            <li className="list-inline-item border border-light rounded-circle text-center">
                                <a className="text-light text-decoration-none" target="_blank" href="#">
                                    <i className="fab fa-instagram fa-lg fa-fw"></i>
                                </a>
                            </li>
                            <li className="list-inline-item border border-light rounded-circle text-center">
                                <a className="text-light text-decoration-none" target="_blank" href="#">
                                    <i className="fab fa-twitter fa-lg fa-fw"></i>
                                </a>
                            </li>
                            <li className="list-inline-item border border-light rounded-circle text-center">
                                <a className="text-light text-decoration-none" target="_blank" href="#">
                                    <i className="fab fa-linkedin fa-lg fa-fw"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
{/*                     <div className="col-auto">
                        <label className="sr-only" htmlFor="subscribeEmail">Correo electrónico</label>
                        <div className="input-group mb-2">
                            <input type="text" className="form-control bg-dark border-light" id="subscribeEmail"
                                placeholder="Correo electrónico" />
                            <div className="input-group-text btn-success text-light">Suscripción</div>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="w-100 bg-black py-3">
                <div className="container">
                    <div className="row pt-2">
                        <div className="col-12">
                            <p className="text-left text-light">
                                Copyright &copy; {year} KMarket Corporation
                                | Designed by <a rel="sponsored" href="#" target="_blank">KMarket</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;