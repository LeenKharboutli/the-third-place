import React from 'react';
import EventCard from '../components/EventCard';
import PlaceCard from '../components/PlaceCard';
import GroupCard from '../components/GroupCard';

function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to The Third Place</h1>
      <section>
        <h2>Upcoming Events</h2>
        {/* Add EventCard components here */}
      </section>
      <section>
        <h2>Popular Places</h2>
        {/* Add PlaceCard components here */}
      </section>
      <section>
        <h2>Featured Groups</h2>
        {/* Add GroupCard components here */}
      </section>
    </div>
  );
}

export default HomePage;