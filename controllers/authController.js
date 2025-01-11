
const bcrypt = require('bcryptjs');
const {User} = require('../models'); 



const register = async (req, res) => {
  const { firstName,lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'Please provide all fields.' });
  }

  try {
    
    const existingUser = await User.findOne({where:{email}})
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ firstName ,lastName, email, password: hashedPassword });

    res.status(201).json({
      message: 'User registered successfully!',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', });
  }
};

module.exports = {
  register,
};
