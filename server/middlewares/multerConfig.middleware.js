const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadFields = upload.fields([
  { name: 'profilePhoto', maxCount: 1 },
  { name: 'certificate', maxCount: 1 },
]);

module.exports = uploadFields;