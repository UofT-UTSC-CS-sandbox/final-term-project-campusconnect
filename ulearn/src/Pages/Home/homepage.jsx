import React from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import './homePage.css'; // Import your CSS file

const tutors = [
  { id: 1, name: 'Tutor 1', courses: 'MATA31, MATA67, MATA67, MATA67, MATA67', rating: 5, image: '${user.imageURL}' },
  { id: 2, name: 'Tutor 2', courses: 'MATA31, MATA67', rating: 4.5, image: 'path-to-image' },
  { id: 3, name: 'Tutor 2', courses: 'MATA31, MATA67', rating: 5, image: 'path-to-image' },
  { id: 4, name: 'Tutor 2', courses: 'MATA31, MATA67', rating: 5, image: 'path-to-image' },
  { id: 5, name: 'Tutor 2', courses: 'MATA31, MATA67', rating: 5, image: 'path-to-image' },
  { id: 6, name: 'Tutor 2', courses: 'MATA31, MATA67', rating: 5, image: 'path-to-image' },
  { id: 9, name: 'Tutor 2', courses: 'MATA31, MATA67', rating: 5, image: 'path-to-image' },
  // Add more tutors as needed
];

function HomePage() {
    const { user } = useUser();

    const handleImageUplaod = () => {
    
    console.log(user.imageUrl);
  };


  return (
    
    <div className="homepage">
      <div className="header-userbutton">
        <UserButton />
      </div>
      <div className="header-home">
        <h1> Find Your Tutor!</h1>      
      </div>
      <button className="setting-button">Tabs</button>
      <div className="search-bar">
        <input type="text" placeholder="Search" onClick={handleImageUplaod}/>
        <button className="filter-button">Filter</button>
      </div>
      <div className="header2-home">
        <h2> Top Tutors</h2>      
      </div>
      <div className="tutors-container">
        {tutors.map(tutor => (
          <Link to={`/tutor/${tutor.id}`} key={tutor.id} className="tutor-card">
            <img src={tutor.image} alt={tutor.name} />
            <div className="tutor-info">
              <div className="tutor-rating">
                {'★'.repeat(tutor.rating)}{'☆'.repeat(5 - tutor.rating)}
              </div>
              <p>Courses: {tutor.courses}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
