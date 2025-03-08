const fs = require('fs');
const path = require('path');

// SUBIR ARCHIVO
const uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No se ha subido ningún archivo' });
    }
    res.json({ message: 'Archivo subido con éxito', file: req.file });
};

// LISTAR ARCHIVOS
const listFiles = (req, res) => {
    fs.readdir('uploads/', (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Error al listar archivos' });
        }
        res.json({ files });
    });
};

// DESCARGAR ARCHIVO
const downloadFile = (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, '../../uploads', fileName);

    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).json({ message: 'Archivo no encontrado' });
    }
};

// ELIMINAR ARCHIVO
const deleteFile = (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, '../../uploads', fileName);

    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(404).json({ message: 'Archivo no encontrado' });
        }
        res.json({ message: 'Archivo eliminado correctamente' });
    });
};

module.exports = { uploadFile, listFiles, downloadFile, deleteFile };
