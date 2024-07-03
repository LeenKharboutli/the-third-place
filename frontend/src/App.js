import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage'; //Not sure why this is giving issues...
import EventsPage from './pages/EventsPage';
import PlacesPage from './pages/PlacesPage';
import GroupsPage from './pages/GroupsPage';
import ProfilePage from './pages/ProfilePage';

//These are updates from Claude
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

//Updates from Claude
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route exact path='/' element={<HomePage/>} />
            <Route path='/events' element={<EventsPage/>} />
            <Route path='/places' element={<PlacesPage/>}/>
            <Route path='/groups' element={<GroupsPage/>} />
            <Route path='/profile' element={<ProfilePage/>} /> 
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
