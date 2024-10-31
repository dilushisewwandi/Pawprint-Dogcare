import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Services.css';

function Services() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    const userRole = localStorage.getItem('role');
    if (path === '/distributor/register' && userRole !== 'distributor') {
      navigate('/signup'); 
    } else {
      navigate(path);
    }
  };

  return (
    <div className='services-page-container'>
      <div className='services-page-section' id='service'>
       
        
        {/* Find a Pet Service */}
        <div className='services-page-content'>
          <div className="services-image-frame">
            <img src="/Assets/find.jpg" alt="Find a Pet" className="services-image" />
          </div>
          <section className='services-details'>
            <h3>Find a Pet</h3>
            <p>Discover countless adoptable pets matching your preferences on PawPrints. Our platform features detailed profiles and heartwarming stories, ensuring you find the perfect companion. Seamlessly connect with shelters and rescue organizations for a smooth adoption process. Begin your journey to unconditional love and companionship today.</p>
            <button className="services-button" onClick={() => handleNavigation('/adopt')}>Find Your Pet</button>
          </section>
        </div>

        {/* Pet Distribution Service */}
        <div className='services-page-content'>
          <div className="services-image-frame">
            <img src="/Assets/distribute.jpg" alt="Pet Distribution" className="services-image" />
          </div>
          <section className='services-details'>
            <h3>Pet Distribution</h3>
            <p>PawPrints enables pet distributors to register animals for adoption, expanding their reach to adopters. In the Pet Distribution section, distributors can showcase pets with detailed profiles, facilitating connections with loving homes. Join PawPrints today to broaden your pet distribution network and help animals find their forever families.</p>
            <button className="services-button" onClick={() => handleNavigation('/distributorPanel')}>Distribute Your Pet</button>
          </section>
        </div>

        {/* Daycare Service */}
        <div className='services-page-content'>
          <div className="services-image-frame">
            <img src="/Assets/pet groom.jpg" alt="Daycare" className="services-image" />
          </div>
          <section className='services-details'>
            <h3>Day-Care</h3>
            <p>PawPrints provides daycare options with exclusive discounts for registered pets. In the Daycare section, discover trusted facilities offering quality care tailored to your pet's needs. Enjoy peace of mind knowing your furry friend is in good hands while you're away. Join PawPrints today and unlock discounted daycare services for your beloved pet.</p>
            <button className="services-button" onClick={() => handleNavigation('/daycare')}>Find a Daycare</button>
          </section>
        </div>

        {/* Health-Care Service */}
        <div className='services-page-content'>
          <div className="services-image-frame">
            <img src="/Assets/vet1.jpg" alt="Health Care" className="services-image" />
          </div>
          <section className='services-details'>
            <h3>Health-Care</h3>
            <p>PawPrints offers comprehensive healthcare services, featuring personalized health cards for registered pets. Access vital vaccination records and professional veterinary care in the Healthcare section. Ensure your pet's well-being with ease and convenience. Join PawPrints to prioritize your furry companion's health and happiness.</p>
            <button className="services-button" onClick={() => handleNavigation('/petProfiles')}>Pet Wellness</button>
          </section>
        </div>

        {/* Vet Services */}
        <div className='services-page-content'>
          <div className="services-image-frame">
            <img src="/Assets/vet2.jpg" alt="Vet Services" className="services-image" />
          </div>
          <section className='services-details'>
            <h3>Vet Services</h3>
            <p>PawPrints delivers exceptional veterinary services tailored for your pet's health. Our expert veterinarians provide thorough check-ups, diagnostics, and treatment plans. From routine care to specialized medical services, our Veterinary section ensures your pet receives the highest standard of care. Trust PawPrints to keep your furry friend healthy and thriving.</p>
            <button className="services-button" onClick={() => handleNavigation('/vetProfiles')}>Veterinarians</button>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Services;
