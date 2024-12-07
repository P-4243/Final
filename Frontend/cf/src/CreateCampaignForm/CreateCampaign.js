import React, { useState } from 'react';
import axios from 'axios';
import './CreateCampaign.css'; // Optional: for styling

const CreateCampaign = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [requiredFund, setRequiredFund] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('requiredFund', requiredFund);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/campaigns', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Campaign created successfully!');
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error uploading campaign:', error);
      alert('Error creating campaign. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="campaign-form">
      <h2>Create Campaign</h2>
      <div className="form-group">
        <label>Campaign Name</label>
        <input
        id="campaignId"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Required Fund</label>
        <input style={{width:"100%"}}
        id="amount"
          type="number"
          value={requiredFund}
          onChange={(e) => setRequiredFund(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Image</label>
        <input
          type="file"
          className='imageIn'
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        
      </div>
      <button style={{width:"10vw",marginLeft:"15.5vw"}} type="submit" className='btn'>Submit</button>
    </form>
  );
};

export default CreateCampaign;
