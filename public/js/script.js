async function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    if (!fileInput.files.length) {
        return showAlert("Por favor, selecciona un archivo", "warning");
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    const response = await fetch("/api/files/upload", {
        method: "POST",
        body: formData
    });

    if (response.ok) {
        showAlert("Archivo subido con éxito", "success");
        loadFiles();
    } else {
        showAlert("Error al subir archivo", "danger");
    }
}

async function loadFiles() {
    const response = await fetch("/api/files/files");
    const data = await response.json();
    const fileList = document.getElementById("fileList");
    fileList.innerHTML = "";

    data.files.forEach(file => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            ${file}
            <div>
                <a href="/api/files/download/${file}" class="btn btn-sm btn-success">📥 Descargar</a>
                <button class="btn btn-sm btn-danger" onclick="deleteFile('${file}')">🗑 Eliminar</button>
            </div>
        `;
        fileList.appendChild(li);
    });
}

async function deleteFile(filename) {
    if (!confirm(`¿Seguro que quieres eliminar ${filename}?`)) return;

    const response = await fetch(`/api/files/delete/${filename}`, { method: "DELETE" });

    if (response.ok) {
        showAlert("Archivo eliminado correctamente", "success");
        loadFiles();
    } else {
        showAlert("Error al eliminar archivo", "danger");
    }
}

// Mostrar alertas con Bootstrap
function showAlert(message, type) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type} text-center`;
    alert.textContent = message;
    document.body.prepend(alert);
    
    setTimeout(() => alert.remove(), 3000);
}

document.addEventListener("DOMContentLoaded", loadFiles);
