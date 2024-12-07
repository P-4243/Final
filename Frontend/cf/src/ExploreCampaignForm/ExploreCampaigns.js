import React, { useEffect, useState } from 'react';
import './ExploreCampaigns.css';
import { Link } from 'react-router-dom';

const ExploreCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('http://localhost:5000/campaigns'); // Backend API to get campaigns
        const data = await response.json();
        console.log(data); // Verify API response
        setCampaigns(data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div>
      <header className="topper">
        <div className="container">
        <h1 className="logo">
        <span>C</span>rowd<span>F</span>und
      </h1>
          <nav className="nav">
            <Link  to="/CreateCampaign"><button className='btn'><h6>Create Campaign</h6></button></Link>
           
          </nav>
        </div>
      </header>

      <section className="explore">
       

        <div id="campaign-list" className="campaign-list">
          {campaigns.map((campaign) => (
            <div key={campaign._id} className="campaign">
              {/* Display campaign image */}
              {campaign.image && (
                <img
                  src={campaign.image} // Use the `image` field directly
                  alt={campaign.name}
                  className="campaign-image"
                />
              )}
              <h3>{campaign.name}</h3>
              <p>{campaign.description}</p>
              <p className="fund-required">Required: ${campaign.requiredFund}</p>
             

              <button className="btn">
  <Link to={`/payment?campaignName=${encodeURIComponent(campaign.name)}`}><h6>Pay Now</h6></Link>
</button>


             
            </div>
          ))}
        </div>
      </section>

     
    </div>
  );
};

export default ExploreCampaigns;
