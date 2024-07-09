import React from 'react';
import axios from 'axios';

const App = () => {
    const seedDatabase = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/products/seed');
            alert(data.message);
        } catch (error) {
            console.error(error);
            alert('Error seeding database');
        }
    };

    return (
        <div>
            <h1>Seed Database</h1>
            <button onClick={seedDatabase}>Seed Data</button>
        </div>
    );
};

export default App;
