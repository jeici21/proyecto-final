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
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
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
        <div className="contact-container">
            <h1>Nuestra ubicación</h1>
            <div className="contact-row">
                <div className="contact-col1">
                    <h2>Contáctanos:</h2>
                    <form onSubmit={(e) => { onSubmitHandler(e); }} className="contact-form">
                        <input type="text" required placeholder="Nombres" value={nombre}
                            onChange={(e) => { onChangeHandler("nombre", e.target.value); }} />
                        <input type="text" required placeholder="Apellidos" value={apellido}
                            onChange={(e) => { onChangeHandler("apellido", e.target.value); }} />
                        <input type="email" required placeholder="Correo electrónico" value={email}
                            onChange={(e) => { onChangeHandler("email", e.target.value); }} />
                        <input type="text" required placeholder="Asunto" value={asunto}
                            onChange={(e) => { onChangeHandler("asunto", e.target.value); }} />
                        <textarea id="textarea" required placeholder="Escriba su mensaje..." value={textarea}
                            onChange={(e) => { onChangeHandler("textarea", e.target.value); }}>
                        </textarea>
                        <button type="submit">Enviar mensaje</button>
                    </form>
                </div>
                <div className="contact-col2">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.797523579702!2d-78.47663845039307!3d-0.18499463546593084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d59080303a2eb1%3A0x523b5f69ac3065dd!2sKruger%20Corp!5e0!3m2!1ses-419!2sec!4v1675739142115!5m2!1ses-419!2sec"
                        width="90%" height={mapHeight} allowfullscreen loading="lazy" title="Ubicación"
                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
    );
}

export default Contact;