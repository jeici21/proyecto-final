import { useState, useContext } from "react";
import { connect } from "react-redux";
import { authenticate, authFailure, authSuccess } from "../redux/authActions";
import Context from "../../src/redux/controlUsuario/Context";
import { userLogin, UserSave } from "../api/authenticationService";
//import { Alert, Spinner } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import logo from "../images/K-Market-Campus.png";
const Login = ({ loading, error, ...props }) => {
  const [values, setValues] = useState({
    userName: "",
    password: "",
  });
  const { state, setState } = useContext(Context);
  const navigate = useNavigate();

  /* const loadUserInfo = async (token) => {
    const resp = await fetchUserData(token);
    //  setState({ ...state, data: resp });
    return resp ? resp : null;
  }; */

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    props.authenticate();

    const response = await userLogin(values);
    console.log(response);
    // setState(response.data);
    setState({ ...state, data: response.data });
    console.log("DATA desde login state " + state.roleDescription);
    if (response.status === 200) {
      localStorage.setItem("currentUser", JSON.stringify(response.data));

      navigate("/shop");
    } else {
      props.loginFailure("Something Wrong! Please Try Again");
    }
  };

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const handleChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };
  /*Registrarse */

  const handleSubmits = (event) => {
    event.preventDefault();
    const date = new Date();
    const isoDate = date.toISOString();
    const formData = {
      firstName: document.getElementById("nombres").value,
      lastName: document.getElementById("apellidos").value,
      userName: document.getElementById("usuario").value,
      password: document.getElementById("contraseña").value,
      email: document.getElementById("email").value,
      phoneNumber: document.getElementById("telefono").value,
      createdAt: isoDate,
      updatedAt: isoDate,
      enabled: true,
      authorities: [
        {
          roleCode: "USER",
          roleDescription: "Admin role",
        },
      ],
    };
    console.log(formData);

    UserSave(formData)
      .then((response) => {
        console.log("response", response);
        if (response.status === 200) {
          //   props.setUser(response.data);
          //       navigate("/shop");
          console.log("Ingresado Correctamente");
        } else {
          //    props.loginFailure("Something Wrong! Please Try Again");
        }
      })
      .catch((err) => {
        if (err && err.response) {
          switch (err.response.status) {
            case 401:
              console.log("401 status");
              //    props.loginFailure("Authentication Failed. Bad Credentials");
              break;
            default:
            //   props.loginFailure("Something Wrong! Please Try Again");
          }
        } else {
          //  props.loginFailure("Something Wrong! Please Try Again");
          console.log(err);
        }
      });
  };

  const [passwordType, setPasswordType] = useState('password');

  /* const togglePasswordVisibility = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  }; */


  return (
    <div className="login-page">
      {currentUser ? (
        <div class="card text-center">
          <div class="card-header"></div>
          <div class="card-body">
            <h5 class="card-title">Sesión Activa</h5>
            <p class="card-text">
              Solo puedes realizar compras si has iniciado sesión.
            </p>
            <button type="button" class="btn btn-info">
              {" "}
              <NavLink to="/shop">Ir a Comprar</NavLink>
            </button>
          </div>
        </div>
      ) : (
        <div className="row nosotros justify-content-center">
          <div class="col-md-4 d-flex flex-column justify-content-center align-items-center text-center">
            <img src={logo} alt="Descripción de tu imagen" class="mx-auto img-fluid" width="150PX" />
            <h2>Si tienes Whatsapp ya puedes comprar con Nosostros</h2>
            <p>
              "Únete a nuestra revolución de compras en línea y regístrate hoy
              mismo para acceder a productos exclusivos, descuentos únicos y una
              experiencia de compra en línea sin precedentes."
            </p>
          </div>

          <div className="col-md-6 d-flex justify-content-center align-items-center ">
            <div className="card p-0 m-4 col-md-6 bgbtn">
              <h4 className="card-title text-center mb-4">Iniciar Sesión</h4>
              <form onSubmit={handleSubmit} className="">
                <div className="form-group mb-3 ">
                  <label htmlFor="username" className="form-label">Usuario</label>
                  <input
                    id="username"
                    type="text"
                    className={`form-control ${values.userName ? 'is-valid' : 'is-invalid'}`}
                    minLength={5}
                    value={values.userName}
                    onChange={handleChange}
                    name="userName"
                    required
                  />
                  <div className="invalid-feedback">
                    Ingresa tu usuario
                  </div>
                </div>
                <div className="form-group mb-3 ">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <div className="input-group">
                    <input
                      id="password"
                      type={passwordType}
                      className={`form-control ${values.password ? 'is-valid' : 'is-invalid'}`}
                      minLength={8}
                      value={values.password}
                      onChange={handleChange}
                      name="password"
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary input-group-text"
                      onClick={() => setPasswordType(passwordType === 'password' ? 'text' : 'password')}
                    >
                      {passwordType === 'password' ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-slash"></i>}
                    </button>
                    <div className="invalid-feedback">
                      Ingresa tu contraseña
                    </div>
                  </div>
                </div>
                <div className="form-group mb-3">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                      name="rememberMe"
                      value={values.rememberMe}
                      onChange={handleChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="rememberMe"
                    >
                      Recuérdame
                    </label>
                  </div>
                </div>
                <div className="form-group d-grid gap-2 mb-3">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={loading}
                  >
                    {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                  </button>
                </div>
              </form>
              <div className="d-flex justify-content-center">
                <div>No tienes una cuenta?</div>
                <a
                  href="#?"
                  className="text-decoration-none fw-semibold ms-2"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  data-bs-whatever="@mdo"
                >
                  Regístrate
                </a>
              </div>
              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}
            </div>
          </div>

        </div>
      )}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Registrarse
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <form onSubmit={handleSubmits}>
              <div className="modal-body">
                <div className="form-group  ">
                  <label for="nombres">Nombres:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombres"
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="apellidos">Apellidos:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="apellidos"
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="usuario">Usuario:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="usuario"
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="contraseña">Contraseña:</label>
                  <input
                    required
                    type="password"
                    className="form-control"
                    id="contraseña"
                  />
                </div>
                <div className="form-group">
                  <label for="email">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label for="telefono">Teléfono:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="telefono"
                    required
                  />
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>

                  <button type="submit" className="btn-login btn btn-primary">
                    Guardar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  console.log("state ", auth);
  return {
    loading: auth.loading,
    error: auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: () => dispatch(authenticate()),
    setUser: (data) => dispatch(authSuccess(data)),
    loginFailure: (message) => dispatch(authFailure(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
