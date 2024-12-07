const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

// Initialize environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

// Import models
const User = require('./models/User');
const Campaign = require('./models/Campaign'); // Import the Campaign model

// Middleware for authentication and authorization
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
};

const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied!' });
    }
    next();
  };
};

// File upload configuration
const upload = multer({ dest: 'uploads/' });

// Serve static files from the "uploads" folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const newUser = new User({ username, password, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered!' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in', error });
  }
});
app.get('/campaigns', async (req, res) => {
  try {
    const campaigns = await Campaign.find();

    // Update image paths to include the static '/uploads' prefix
    const campaignsWithImageURL = campaigns.map((campaign) => ({
      ...campaign._doc, // Include all campaign fields
      image: campaign.image
      ? `http://localhost:5000/uploads/${path.basename(campaign.image)}`
      : null,
    
    }));

    res.status(200).json(campaignsWithImageURL);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ message: 'Error fetching campaigns', error });
  }
});

// File upload configuration with multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  },
});


// Campaign upload endpoint
app.post('/api/campaigns', upload.single('image'), async (req, res) => {
  const { name, description, requiredFund } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const newCampaign = new Campaign({
      name,
      description,
      requiredFund,
      image,
    });

    await newCampaign.save();
    res.status(201).json({ message: 'Campaign created successfully', campaign: newCampaign });
  } catch (error) {
    console.error('Error creating campaign:', error);
    res.status(500).json({ message: 'Error creating campaign', error });
  }
});


app.post('/campaigns/payment', async (req, res) => {
  const { campaignName, amount } = req.body;

  console.log(`Received payment request for campaign: ${campaignName} with amount: ${amount}`);

  try {
    // Find the campaign by name
    const campaign = await Campaign.findOne({ name: campaignName });
    if (!campaign) {
      console.error('Campaign not found');
      return res.status(404).json({ message: 'Campaign not found' });
    }
  
    // Validate payment amount
    if (amount <= 0) {
      console.error('Invalid payment amount');
      return res.status(400).json({ message: 'Invalid payment amount' });
    }
  
    if (amount > campaign.requiredFund) {
      console.error('Payment amount exceeds required funds');
      return res.status(400).json({ message: 'Payment amount exceeds required funds' });
    }
  
    // Deduct payment amount from requiredFund
    campaign.requiredFund -= amount;
  
    await campaign.save();
    console.log('Payment successful, updated campaign:', campaign);
    res.status(200).json({ message: 'Payment successful', campaign });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ message: 'Error processing payment', error });
  }
  
});



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
