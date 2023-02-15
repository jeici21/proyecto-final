import { useEffect, useState } from "react";

const Contact = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [asunto, setAsunto] = useState("");
  const [textarea, setTextarea] = useState("");
  const [mapHeight, setMapHeight] = useState(0);

  useEffect(() => {
    function handleResize() {
      setMapHeight(window.innerHeight * 0.9);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onChangeHandler = (fieldName, value) => {
    switch (fieldName) {
      case "nombre":
        setNombre(value);
        break;
      case "apellido":
        setApellido(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "asunto":
        setAsunto(value);
        break;
      case "textarea":
        setTextarea(value);
        break;
      default:
        break;
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    alert("Gracias por escribirnos.");
    setNombre("");
    setApellido("");
    setEmail("");
    setAsunto("");
    setTextarea("");
  };

  return (
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="wrapper">
          <div class="contact_main_container row no-gutters mb-5">
            <div class="col-md-7">
              <div class="contact-wrap w-100 p-md-5 p-4">
                <h3 class="mb-4">Contact Us</h3>
                <div id="form-message-warning" class="mb-4"></div>
                <div id="form-message-success" class="mb-4">
                  Your message was sent, thank you!
                </div>
                <form
                  method="POST"
                  id="contactForm"
                  name="contactForm"
                  class="contactForm"
                >
                  <div class="row"  >
                    <div class="col-md-6">
                      <div class="form-group" >
                        <label class="label" for="name" >
                          Full Name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          name="name"
                          id="name"
                          placeholder="Name"
                          style={{marginTop: "10px"}}

                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="label" for="email">
                          Email Address
                        </label>
                        <input
                          type="email"
                          class="form-control"
                          name="email"
                          id="email"
                          placeholder="Email"
                          style={{marginTop: "10px"}}

                        />
                      </div>
                    </div>
                    <div class="col-md-12"  style={{marginTop: "30px"}}>
                      <div class="form-group">
                        <label class="label" for="subject">
                          Subject
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          name="subject"
                          id="subject"
                          placeholder="Subject"
                          style={{marginTop: "10px"}}
                        />
                      </div>
                    </div>
                    <div class="col-md-12"  style={{marginTop: "30px"}}>
                      <div class="form-group">
                        <label class="label" for="#">
                          Message
                        </label>
                        <textarea
                          name="message"
                          class="form-control"
                          id="message"
                          cols="30"
                          rows="4"
                          placeholder="Message"
                          style={{marginTop: "10px"}}

                        ></textarea>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group">
                        <input
                          type="submit"
                          value="Send Message"
                          class="btn-login btn"
                          style={{marginTop: "30px"}}

                        />
                        <div class="submitting"></div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="container_map col-md-5 d-flex align-items-stretch">
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
