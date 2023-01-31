import team1 from "../images/team1.jpg";
import team2 from "../images/team2.jpg";
import team3 from "../images/team3.jpg";
import { Github } from "react-bootstrap-icons";

const About = () => {
    return (
        <div className="about-container">
            <div className="about-section">
                <h1>About Us Page</h1>
                <p>Some text about who we are and what we do.</p>
                <p>Resize the browser window to see that this page is responsive by the way.</p>
            </div>

            <h2>Our Team</h2>
            <div className="row">
                <div className="column">
                    <div className="card">
                        <img src={team1} alt="Jorge" />
                        <div className="container">
                            <h2>Jorge Castro</h2>
                            <p className="title">Programmer</p>
                            <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                            <p>david92_jc@yahoo.es</p>
                            <p>
                                <a className="btn btn-success" href='https://github.com/jeici21'
                                    target="_blank" rel="noreferrer">
                                    <Github color="white" size={30}></Github>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="column">
                    <div className="card">
                        <img src={team2} alt="Luis" />
                        <div className="container">
                            <h2>Luis Anrrango</h2>
                            <p className="title">Programmer</p>
                            <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                            <p>luisitoylag@gmail.com</p>
                            <p>
                                <a className="btn btn-success" href='https://github.com/LuisRAnrrango'
                                    target="_blank" rel="noreferrer">
                                    <Github color="white" size={30}></Github>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="column">
                    <div className="card">
                        <img src={team3} alt="Ariel" />
                        <div className="container">
                            <h2>Ariel Piguave</h2>
                            <p className="title">Programmer</p>
                            <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                            <p>arielpiguave@gmail.com</p>
                            <p>
                                <a className="btn btn-success" href='https://github.com/Piguave'
                                    target="_blank" rel="noreferrer">
                                    <Github color="white" size={30}></Github>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default About;