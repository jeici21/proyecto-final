import { useState } from "react";

const Contact = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [asunto, setAsunto] = useState("");
  const [textarea, setTextarea] = useState("");
  //const [mapHeight, setMapHeight] = useState(0);

  /* useEffect(() => {
    function handleResize() {
      setMapHeight(window.innerHeight * 0.9);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); */

  const onChangeHandler = (fieldName, value) => {
    const setters = {
      nombre: setNombre,
      email: setEmail,
      asunto: setAsunto,
      textarea: setTextarea
    };
  
    const setter = setters[fieldName];
    if (setter) {
      setter(value);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    alert("Gracias por escribirnos.");
    setNombre("");
    setEmail("");
    setAsunto("");
    setTextarea("");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-12">
        <div className="wrapper">
          <div className="contact_main_container row no-gutters mb-5">
            <div className="col-md-5 ">
              <div className="contact-wrap w-100 p-md-3 p-2 border rounded">
                <h3 className="mb-2">Contact Us</h3>
                <div id="form-message-warning" className="mb-2"></div>
                <div id="form-message-success" className="mb-2">
                  Your message was sent, thank you!
                </div>
                <form onSubmit={(e) => { onSubmitHandler(e); }}
                  method="POST"
                  id="contactForm"
                  name="contactForm"
                  className="contactForm"
                >
                  <div className="row"  >
                    <div className="col-md-6">
                      <div className="form-group" >
                        <label className="label" for="name" >
                          Full Name
                        </label>
                        <input value={nombre} onChange={(e) => { onChangeHandler("nombre", e.target.value); }}
                          type="text" 
                          className="form-control p-1 my-1"
                          name="name"
                          id="name"
                          placeholder="Name"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="label" for="email">
                          Email Address
                        </label>
                        <input value={email} onChange={(e) => { onChangeHandler("email", e.target.value); }}
                          type="email" required
                          className="form-control p-1 my-1"
                          name="email"
                          id="email"
                          placeholder="Email"

                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="label" for="subject">
                          Subject
                        </label>
                        <input value={asunto} onChange={(e) => { onChangeHandler("asunto", e.target.value); }}
                          type="text" required
                          className="form-control p-1 my-1"
                          name="subject"
                          id="subject"
                          placeholder="Subject"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="label" for="#">
                          Message
                        </label>
                        <textarea value={textarea} onChange={(e) => { onChangeHandler("textarea", e.target.value); }}
                          name="message" required
                          className="form-control p-1 my-1"
                          id="message"
                          cols="30"
                          rows="4"
                          placeholder="Message" />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input id="contact-submit"
                          type="submit"
                          value="Send Message"
                          className="btn-login btn"
                        />
                        <div className="submitting"></div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="container_map col-md-5 d-flex align-items-stretch">
              <div className="container_map" id="map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.797523579702!2d-78.47663845039307!3d-0.18499463546593084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59080303a2eb1%3A0x523b5f69ac3065dd!2sKruger%20Corp!5e0!3m2!1ses-419!2sec!4v1675739142115!5m2!1ses-419!2sec"
                  className="contact_map"
                  allowfullscreen
                  loading="lazy"
                  title="Ubicación"
                  referrerpolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
