const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');

const app = express();
const PORT = 5000;

app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON request body

// Serve static images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Store uploaded image metadata
const images = [];

// Upload images endpoint
app.post('/upload', upload.array('images', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No files uploaded.');
  }

  const uploadedFiles = req.files.map((file, index) => {
    const imageObj = {
      id: images.length + index + 1,
      url: `http://localhost:${PORT}/uploads/${file.filename}`,
      filename: file.filename,
      filepath: file.path
    };
    images.push(imageObj);
    return imageObj;
  });

  res.json(uploadedFiles);
});

// Get all uploaded images
app.get('/images', (req, res) => {
  res.json(images);
});

// Download a single image
app.get('/download/:id', (req, res) => {
  const imageId = parseInt(req.params.id, 10);
  const image = images.find((img) => img.id === imageId);

  if (!image) {
    return res.status(404).send('Image not found');
  }

  res.download(image.filepath, image.filename);
});

// Download multiple images as a ZIP file
app.get('/download-multiple', (req, res) => {
  const ids = req.query.ids.split(',').map(Number);
  const selectedImages = images.filter((img) => ids.includes(img.id));

  if (selectedImages.length === 0) {
    return res.status(400).send('No images selected');
  }

  const archive = archiver('zip', { zlib: { level: 9 } });
  res.attachment('images.zip');
  archive.pipe(res);

  selectedImages.forEach((image) => {
    archive.file(image.filepath, { name: image.filename });
  });

  archive.finalize();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
