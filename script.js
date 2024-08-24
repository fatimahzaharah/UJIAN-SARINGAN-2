

const supplierForm = document.getElementById('supplierForm');
let suppliers = [];

supplierForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const supplier = {
        name: document.getElementById('supplierName').value,
        contact: document.getElementById('supplierContact').value,
        email: document.getElementById('supplierEmail').value,
        address: document.getElementById('supplierAddress').value,
        status: 'Menunggu Kelulusan'
    };
    suppliers.push(supplier);
    renderSuppliers();
    supplierForm.reset(); // Kosongkan borang selepas hantar
});

function renderSuppliers() {
    const tbody = document.querySelector('#supplierTable tbody');
    tbody.innerHTML = ''; // Kosongkan senarai sebelumnya
    suppliers.forEach((supplier, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${supplier.name}</td>
            <td>${supplier.contact}</td>
            <td>${supplier.email}</td>
            <td>${supplier.address}</td>
            <td>${supplier.status}</td>
            <td>
                <button class="edit" onclick="editSupplier(${index})">Edit</button>
                <button class="delete" onclick="deleteSupplier(${index})">Padam</button>
                <button class="approve" onclick="approveSupplier(${index})">Lulus</button>
                <button class="reject" onclick="rejectSupplier(${index})">Tolak</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function deleteSupplier(index) {
    suppliers.splice(index, 1);
    renderSuppliers();
}

function editSupplier(index) {
    const supplier = suppliers[index];
    document.getElementById('supplierName').value = supplier.name;
    document.getElementById('supplierContact').value = supplier.contact;
    document.getElementById('supplierEmail').value = supplier.email;
    document.getElementById('supplierAddress').value = supplier.address;
    suppliers.splice(index, 1);
}

function approveSupplier(index) {
    suppliers[index].status = 'Diluluskan';
    renderSuppliers();
}

function rejectSupplier(index) {
    suppliers[index].status = 'Ditolak';
    renderSuppliers();
}

// Fungsi Tambahan: Cari Pembekal
function searchSupplier(query) {
    const filteredSuppliers = suppliers.filter(supplier =>
        supplier.name.toLowerCase().includes(query.toLowerCase()) ||
        supplier.contact.includes(query) ||
        supplier.email.toLowerCase().includes(query.toLowerCase()) ||
        supplier.address.toLowerCase().includes(query.toLowerCase())
    );
    renderFilteredSuppliers(filteredSuppliers);
}

function renderFilteredSuppliers(filteredSuppliers) {
    const tbody = document.querySelector('#supplierTable tbody');
    tbody.innerHTML = ''; // Kosongkan senarai sebelumnya
    filteredSuppliers.forEach((supplier, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${supplier.name}</td>
            <td>${supplier.contact}</td>
            <td>${supplier.email}</td>
            <td>${supplier.address}</td>
            <td>${supplier.status}</td>
            <td>
                <button class="edit" onclick="editSupplier(${index})">Edit</button>
                <button class="delete" onclick="deleteSupplier(${index})">Padam</button>
                <button class="approve" onclick="approveSupplier(${index})">Lulus</button>
                <button class="reject" onclick="rejectSupplier(${index})">Tolak</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Fungsi untuk mencari pembekal (tambahkan di atas borang atau senarai pembekal)
document.getElementById('searchBox').addEventListener('input', function(e) {
    searchSupplier(e.target.value);
});

// Kod sedia ada...

// Fungsi untuk cetak senarai pembekal
function printSuppliers() {
    const printContents = document.getElementById('supplierTable').outerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = `
        <html>
        <head>
            <title>Cetak Senarai Pembekal</title>
        </head>
        <body>
            <h2>Senarai Pembekal</h2>
            ${printContents}
        </body>
        </html>
    `;

    window.print();
    document.body.innerHTML = originalContents;
    renderSuppliers(); // Refresh senarai pembekal selepas cetak
}
