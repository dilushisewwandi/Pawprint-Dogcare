import React from 'react';
import { useNavigate } from 'react-router-dom';
import dog3 from '../../Assets/p6.jpg'; 
import petservice from '../../Assets/pet service.png'; 
import './Home.css';

function Home() {
  const backgroundStyle = {
    backgroundImage: "url('./Assets/home.jpg')",
  };

  const navigate = useNavigate();

  const handleAdoptClick = () => {
    navigate('/adopt'); 
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-container" style={backgroundStyle}>
        <div className="hero-content">
          <h1 className="animate__animated animate__fadeInDown">
            Connecting Hearts, <br /> Sheltering Paws
          </h1>
          <p className="animate__animated animate__fadeInUp">We care for your pets!</p>
        </div>
      </div>

      {/* About Section */}
    <div className="about-container">
      <div className='about-section' id='about'>
        <h2>About Us</h2>
          <div className="about-content">
            <section className="introduction-section">
              <h2>Who We Are</h2>
              <p>At Pawprints, we are passionate about fostering connections between dog distributors and dog adopters. We understand the importance of finding the perfect companion and aim to facilitate this process with ease and care.</p>
              <p>Our platform serves as a bridge, bringing together those seeking to distribute dogs with individuals eager to adopt, while also offering a range of valuable services for registered pets.</p>
            </section>

            <section className="mission-section">
              <h2>Our Mission</h2>
              <p>Our mission at Pawprints is to promote responsible pet adoption and care while providing a seamless and user-friendly platform for dog distributors and adopters alike.</p>
              <p>We strive to create a nurturing environment where every pet finds a loving home and every owner has access to the resources they need to ensure the well-being of their furry companions.</p>
            </section>

            <section className="why-section">
              <h2>Why Choose Us</h2>
              <p>Choosing Pawprints means choosing a trustworthy and reliable platform dedicated to the welfare of pets. With our extensive network of dog distributors and adopters, coupled with our commitment to offering essential services such as vet consultations and health cards, you can rest assured that your pet's needs are our top priority.</p>
              <p>We provide a seamless experience, making the process of finding or distributing a dog as smooth and stress-free as possible.</p>
            </section>

            <section className="services-section">
              <h2>Our Services</h2>
              <p>At Pawprints, we offer a range of services tailored to meet the needs of both pets and their owners. From facilitating dog distribution and adoption to providing access to vet consultations and health cards, we strive to offer comprehensive support every step of the way. Our services include but are not limited to:</p>
                <ul>
                  <li>Facilitating dog distribution and adoption</li>
                  <li>Connecting pet owners with vet consultations</li>
                  <li>Issuing health cards with vaccination details for registered pets</li>
                  <li>Finding and booking daycare services for your pets</li> 
                </ul>
            </section>
          </div>
      </div>
    </div>
    {/* Adopt Section */}
    <div className="adopt-section">
        <h2>Adopt Your Pet</h2>
        <p>A house is not a home without the pitter-patter of paws. Adopt a loyal companion and fill your heart with unconditional love.</p>
          <div className="adopt-content">
            <div className="adopt-cards">
              <div className="adopt-card">
                <img src="./Assets/p2.jpg" alt="Pet 1" className="adopt-card-img" />
              </div>
              <div className="adopt-card">
                <img src="./Assets/p4.jpg" alt="Pet 2" className="adopt-card-img" />
              </div>
              <div className="adopt-card">
                <img src="./Assets/p1.jpg" alt="Pet 3" className="adopt-card-img" />
              </div>
            </div>
          
            <button onClick={handleAdoptClick} className="adopt-btn">View All Pets</button>
          </div>
    </div>
    {/* Service Section */}
    <div className='service-container'>
      <div className='service-section' id='service'>
        <h2>Our Services</h2>
          <div className='service-content'>
            <div className="service-image-frame">
              <img src={petservice} alt="Pet service" className="service-image" />
            </div>
          <section className='service-details'>
            <p className="service-description">Discover a range of pet care services tailored to meet your needs. From grooming and boarding to veterinary check-ups,
              we provide everything to keep your pets happy and healthy. Click the button below to explore all our available services.
            </p>
            <button className="service-button" onClick={() => navigate('/services')}>Explore Services</button>
          </section>
        </div>
      </div>
    </div>

    <div className='contact-container'>
      <div className='contact-section' id='contact'>
        <h2>Contact Us</h2>
          <div className='contact-content'>
            <section className='contact-details'>
              <p class="contact-description">  We’re here to assist you with any questions or concerns you may have. Whether you're curious about our pet adoption process, 
                services, or anything else, please feel free to reach out via email. 
                Our team is dedicated to providing you with the best support and information. We look forward to hearing from you soon!</p>
              <p class="contact-info"><span>Our Email:</span> <a href="mailto:pawprints786@outlook.com">pawprints786@outlook.com</a></p>
            </section>

          <div class="contact-image-frame">
            <img src={dog3} alt="Dog" class="contact-image" />
          </div>
        </div>
      </div>
    </div>
</div>
            );
}

export default Home;
