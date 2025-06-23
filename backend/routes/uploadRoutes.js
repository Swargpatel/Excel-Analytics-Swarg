
// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const xlsx = require('xlsx');
// const ExcelRecord = require('../models/ExcelRecord');
// const auth = require('../middlewares/auth.middleware'); // Ensure you have auth middleware to protect this route
// const path = require('path');
// const fs = require('fs');

// const storage = multer.diskStorage({
//     destination: './uploads/',
//     filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
// });
// const upload = multer({ storage });

// router.post('/upload', auth, upload.single('file'), async (req, res) => {
//     try {
//         const filePath = req.file.path;
//         const workbook = xlsx.readFile(filePath);
//         const sheetName = workbook.SheetNames[0];
//         const parsedData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

//         const record = new ExcelRecord({
//             user: req.user.id,
//             fileName: req.file.filename,
//             originalName: req.file.originalname,
//             data: parsedData,
//         });
//         await record.save();

//         fs.unlinkSync(filePath); // Remove file after reading

//         res.json({ msg: 'File uploaded and data parsed', data: parsedData });
//     } catch (err) {
//         res.status(500).json({ msg: 'Error uploading file' });
//     }
// });

// module.exports = router;


const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const fs = require('fs');
const verifyToken = require('../middlewares/auth.middleware');
const ExcelRecord = require('../models/ExcelRecord'); // ✅ required model

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', verifyToken, upload.single('excel'), async (req, res) => {
    try {
        // Step 1: Read uploaded Excel file
        const workbook = xlsx.readFile(req.file.path);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(sheet);

        // Step 2: Delete temp file
        fs.unlinkSync(req.file.path);

        // Step 3: Save parsed data into MongoDB
        const newRecord = new ExcelRecord({
            data,
            uploadedBy: req.user._id // ✅ set by verifyToken middleware
        });

        const saved = await newRecord.save();

        // Step 4: Return recordId
        res.status(201).json({
            message: 'File uploaded and saved',
            recordId: saved._id,
            data
        });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Upload failed' });
    }
});

module.exports = router;
