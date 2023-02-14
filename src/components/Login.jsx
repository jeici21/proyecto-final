import { useState } from "react";
import { connect } from "react-redux";
import { authenticate, authFailure, authSuccess } from "../redux/authActions";
import { userLogin, UserSave } from "../api/authenticationService";
import { Alert, Spinner } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";

const Login = ({ loading, error, ...props }) => {
  const [values, setValues] = useState({
    userName: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.authenticate();

    userLogin(values)
      .then((response) => {
        console.log("response", response);
        if (response.status === 200) {
          props.setUser(response.data);
          localStorage.setItem("currentUser", JSON.stringify(response.data));
          navigate("/shop");
        } else {
          props.loginFailure("Something Wrong! Please Try Again");
        }
      })
      .catch((err) => {
        if (err && err.response) {
          switch (err.response.status) {
            case 401:
              console.log("401 status");
              props.loginFailure("Authentication Failed. Bad Credentials");
              break;
            default:
              props.loginFailure("Something Wrong! Please Try Again");
          }
        } else {
          props.loginFailure("Something Wrong! Please Try Again");
          console.log(err);
        }
      });
    //console.log("Loading again",loading);
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
          roleCode: "ADMIN",
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
        <section className="h-100">
          <div className="container h-100">
            <div className="row justify-content-md-center h-100">
              <div className="card-wrapper">
                <div className="card fat">
                  <div className="card-body">
                    <h4 className="card-title">Login</h4>
                    <form
                      className="my-login-validation"
                      onSubmit={handleSubmit}
                      noValidate={false}
                      style={{display:"flex",alignItems:"center", justifyContent:"center", gap:"1em", flexDirection:"column"}}


                    >
                      <div className="form-group">
                        <label htmlFor="email">User Name</label>
                        <input
                          id="username"
                          type="text"
                          className="form-control"
                          minLength={5}
                          value={values.userName}
                          onChange={handleChange}
                          name="userName"
                          required
                        />
                        <div className="invalid-feedback">
                          UserId is invalid
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          id="password"
                          type="password"
                          className="form-control"
                          minLength={8}
                          value={values.password}
                          onChange={handleChange}
                          name="password"
                          required
                        />
                        <a href="forgot.html" className="float-right">
                          Forgot Password?
                        </a>
                        <div className="invalid-feedback">
                          Password is required
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="custom-control">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="customCheck1"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck1"
                          >
                            Remember me
                          </label>
                        </div>
                      </div>

                      <div className="form-group m-0 " style={{width: "100%", display:"flex",alignItems:"center", justifyContent:"center"}}>
                        <button
                          type="submit"
                          className="btn-login btn btn-primary btn-lg"
                          style={{width: "50%"}}
                        >
                          Login
                          {loading && (
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          )}
                          {/* <ClipLoader
                                        //css={override}
                                        size={20}
                                        color={"#123abc"}
                                        loading={loading}
                                        /> */}
                        </button>
                      </div>
                    </form>
                    <div className="d-flex gap-1 justify-content-center mt-1">
                      <div>Don't have an account?</div>
                      <a
                        href="#"
                        className="text-decoration-none fw-semibold"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        data-bs-whatever="@mdo"
                      >
                        Registrar{" "}
                      </a>
                    </div>
                    {error && (
                      <Alert className="login-alert" variant="danger">
                        {error}
                      </Alert>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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
                  <input type="text" className="form-control" id="nombres" />
                </div>
                <div className="form-group">
                  <label for="apellidos">Apellidos:</label>
                  <input type="text" className="form-control" id="apellidos" />
                </div>
                <div className="form-group">
                  <label for="usuario">Usuario:</label>
                  <input type="text" className="form-control" id="usuario" />
                </div>
                <div className="form-group">
                  <label for="contraseña">Contraseña:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="contraseña"
                  />
                </div>
                <div className="form-group">
                  <label for="email">Email:</label>
                  <input type="email" className="form-control" id="email" />
                </div>
                <div className="form-group">
                  <label for="telefono">Teléfono:</label>
                  <input type="text" className="form-control" id="telefono" />
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>

                  <button
                    type="submit"
                    className="btn-login btn btn-primary"
                    data-bs-dismiss="modal"
                  >
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
