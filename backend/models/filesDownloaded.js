const mongoose = require('mongoose');

const downloadedFileSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});

const DownloadedFile = mongoose.model('DownloadedFile', downloadedFileSchema);

module.exports = DownloadedFile;
