// const express = require('express');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const User = require('../models/User');
// const router = express.Router();

// router.post('/register', async (req, res) => {
//     const { email, password } = req.body;

//     const hash = await bcrypt.hash(password, 10);
//     const user = new User({ email, password: hash });
//     await user.save();
//     res.send('Registered');
// });

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user || !(await bcrypt.compare(password, user.password))) {
//         return res.status(401).send('Invalid credentials');
//     }

//     const token = jwt.sign(
//         { userId: user._id, role: user.role },
//         process.env.JWT_SECRET
//     );

//     res.json({ token });
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const {register, login} = require('../controllers/authControllers');
const {uploadExcel} = require('../controllers/fileControllers')

router.post('/register', register);
router.post('/login', login);
// router.post('/excel/upload', verifyToken, upload.single('file'),uploadExcel)

module.exports = router;
// This code defines the authentication routes for user  and registration and login.
