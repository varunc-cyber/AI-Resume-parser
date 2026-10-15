import multer from 'multer';

// Memory storage keeps file buffer in RAM for direct parsing
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const isPdfMime = file.mimetype === 'application/pdf' || file.mimetype === 'application/x-pdf';
  const isPdfExtension = file.originalname && file.originalname.toLowerCase().endsWith('.pdf');

  if (isPdfMime || isPdfExtension) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF documents (.pdf) are supported.'), false);
  }
};

export const upload = multer({
  storage,
  limits: {
    fileSize: 15 * 1024 * 1024 // 15 MB max
  },
  fileFilter
});
