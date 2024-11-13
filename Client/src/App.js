import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupForm from './Components/SignupForm';
import Login from './Components/LoginForm';
import DistributorRegi from './Components/DistributorRegiForm';
import PetRegistrationForm from './Components/PetRegistrationForm';
import AdminAddForms from './Components/AdminAddForms';
import VetManagement from './Components/VetManage';
import DaycareManage from './Components/DaycareManage';
import AdopterManage from './Components/AdopterManage';
import DistributorManage from './Components/DistributorManage';
import Admin from './Pages/Admin';
import Header from './Components/Header';
import Footer from './Components/Footer';
import PetManage from './Components/PetManage';
// import AdopterRegi from './Components/AdopterRegiForm';
import VetRegi from './Components/VetRegiForm';
import Adoption from './Components/Adoption';
import PetProfile from './Components/PetProfile';
import Services from './Pages/Services/Services';
import Home from './Pages/Home/Home';
import AllPetProfiles from './Components/AllPetProfiles';
import VetProfiles from './Components/VetProfiles';
import Daycare from './Components/Daycare';
import MainDashboard from './Components/MainDashboard';
import HealthCardManagement from './Components/HealthCardManagement';
import HealthCardDashBoard from './Components/HealthCardDashBoard';
import HealthCardMainDashBoard from './Components/HealthCardMainDashBoard';
import VetAppointment from './Components/VetAppointment'; 
import FindVetAppointments from './Components/FindVetAppointments';
import FindAdoptionRequests from './Components/FindAdoptionRequests';
import DistributorPanel from './Components/DistributorPanel';
import VetPanel from './Components/VetPanel';
import DaycarePanel from './Components/DaycarePanel';
import DaycareRegiForm from './Components/DaycareRegiForm';
import FindDaycareBooking from './Components/FindDaycareBooking';
import ViewDaycareSchedule from './Components/ViewDaycareSchedule';

const App = () => {
  return (

    <Router>
      <Header />
      
      <div className="app-container">
        <Routes>

          {/* main pages routes */}
          <Route path="/" element={<Home />} />
         
          <Route path="/services" element={<Services />} />
          
          <Route path="/adopt" element={<Adoption />} />

          {/* pet management */}
          <Route path="/petManage/add" element={<PetManage formType="add" />} />
          <Route path="/petManage/update" element={<PetManage formType="update" />} />
          <Route path="/petManage/delete" element={<PetManage formType="delete" />} />
          <Route path="/petManage/find" element={<PetManage formType="find" />} />

          {/* distributor management */}
          <Route path="/distributorManage/add" element={<DistributorManage formType="add" />} />
          <Route path="/distributorManage/update" element={<DistributorManage formType="update" />} />
          <Route path="/distributorManage/delete" element={<DistributorManage formType="delete" />} />
          <Route path="/distributorManage/find" element={<DistributorManage formType="find" />} />

          {/* adopter management */}
          <Route path="/adopter/add" element={<AdopterManage formType="add" />} />
          <Route path="/adopter/update" element={<AdopterManage formType="update" />} />
          <Route path="/adopter/delete" element={<AdopterManage formType="delete" />} />
          <Route path="/adopter/find" element={<AdopterManage formType="find" />} />

          {/* vet management */}
          <Route path="/vet/add" element={<VetManagement formType="add" />} />
          <Route path="/vet/update" element={<VetManagement formType="update" />} />
          <Route path="/vet/delete" element={<VetManagement formType="delete" />} />
          <Route path="/vet/find" element={<VetManagement formType="find" />} />

          {/* daycare management */}
          <Route path="/daycareManage/add" element={<DaycareManage formType="add" />} />
          <Route path="/daycareManage/update" element={<DaycareManage formType="update" />} />
          <Route path="/daycareManage/delete" element={<DaycareManage formType="delete" />} />
          <Route path="/daycareManage/find" element={<DaycareManage formType="find" />} />

          {/* healthcard management */}
          <Route path="/healthcard/add" element={<HealthCardManagement formType="add" />} />
          <Route path="/healthcard/update" element={<HealthCardManagement formType="update" />} />
          <Route path="/healthcard/delete" element={<HealthCardManagement formType="delete" />} />
          <Route path="/healthcard/find" element={<HealthCardManagement formType="find" />} /> 

          {/* registration routes */}
          <Route path="/pet/register" element={<PetRegistrationForm />} />

          {/* other routes */}
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<Login />} />   
          <Route path="/admin/:userId" element={<MainDashboard />} />
          <Route path="/distributor/:userId" element={<DistributorRegi/>} />
          {/* <Route path="/adopter/:userId" element={<AdopterRegi />} /> */}
          <Route path="/vet/:userID" element={<VetRegi />} />       
          <Route path="/admin" element={<Admin />} />          
          <Route path="/petProfile/:petID" element={<PetProfile />} />
          <Route path="/petProfiles" element={<AllPetProfiles />} />
          <Route path="/admin/add" element={<AdminAddForms />} />
          <Route path="/vetProfiles" element={<VetProfiles />} />
          <Route path="/daycare" element={<Daycare/>} />
          <Route path="/healthCardMainDashBoard" element={<HealthCardMainDashBoard/>} />
          <Route path="/healthCardMainDashBoard/:userID" element={<HealthCardDashBoard/>} />
         
          {/* <Route path="/vetAppointment" element={<VetAppointment vetId="vetID" userId="userID" />} /> */}
          <Route path="/vetAppointment/:vetID" element={<VetAppointment />} />
          <Route path="/findVetAppointment" element={<FindVetAppointments />} />
          <Route path="/findAdoptionRequests" element={<FindAdoptionRequests />} />
          <Route path="/distributorPanel" element={<DistributorPanel />} />
          <Route path="/vetPanel" element={<VetPanel />} />
          <Route path="/daycarePanel" element={<DaycarePanel/>} />
          <Route path="/daycareRegiForm" element={<DaycareRegiForm/>} />
          <Route path="/findDaycareBooking" element={<FindDaycareBooking/>} />
          <Route path="/viewDaycareSchedule" element={<ViewDaycareSchedule/>} />
        </Routes>
</div>
<Footer />

</Router>

);
};

export default App;