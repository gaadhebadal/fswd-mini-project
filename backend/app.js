const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('photo'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const imageUrl = req.file.filename;
  res.json({ imageUrl });
});

app.get('/uploads/filenames', (req, res) => {
  const imageDirectory = path.join(__dirname, 'uploads');
  fs.readdir(imageDirectory, (err, files) => {
    if (err) {
      console.error('Error reading image directory:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const imageFilenames = files.filter((filename) => {
      const extname = path.extname(filename).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.bmp'].includes(extname);
    });

    res.json(imageFilenames);
  });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
