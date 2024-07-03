// not sure yet...
import React from 'react';
import EventCard from '../components/GroupCard';

function GroupsPage() {
    return (
      <div className="groups-page">
        <h1>Events</h1>
        <section>
          <h2>Events</h2>
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
  
  export default GroupsPage;