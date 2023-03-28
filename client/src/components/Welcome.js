import './welcome.css';

function Welcome() {

  // moves user to the listings section of the webpage
  function scrollDown(){
    const element = document.getElementById('scroll-to');
    element.scrollIntoView({ block: 'start',  behavior: 'smooth' });
  }

  return (
    <div>
        <nav className="nav-bar">
        <a href="index.html"><img src="images/flatArt.png" class="logoArt" alt="Etsy Logo"></img></a>
        <div className="quick-link">
            <a class="quick-link-text" onClick={scrollDown}>browse</a>
            <a href="https://www.etsy.com/ca/shop/BeadBashStudio" class="quick-link-text">etsy</a>
            <a href="https://www.etsy.com/ca/people/BoltonBeadBash" class="quick-link-text">contact</a>
        </div>
        </nav>

        <div className="info">
            <a href="https://www.etsy.com/ca/shop/BeadBashStudio"><img src="images/shadedArt.png" class="etsy-image" alt="BeadBash Art"></img></a>
            <div className="description">
                <h1>Bead Bash Studio</h1>
                <h3>Fun and Flirty Gemstone Jewelry</h3>
                <p>Bead Bash Studio is a home-owned business run by a working mother, and
                    located in Toronto Canada. 
                    We work with a variety of materials to satisfy your preferences while taking into account
                    skin sensitivity. This includes Sterling silver, beaded jewelry, natural gemstones, 
                    crystals and more. Keeping up to date with the most popular jewelry trends,
                    while also infusing our own creativity and uniqueness, Bead Bash Studio
                    has a piece made with care for everyone.</p> <br></br>
                    <a className="etsy-link" href="https://www.etsy.com/ca/shop/BeadBashStudio">Visit Our Etsy Shop</a>
            </div>
        </div>
    </div>
  );
}

export default Welcome;

