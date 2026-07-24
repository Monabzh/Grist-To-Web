const statusEl = document.getElementById('status');

grist.ready({ requiredAccess: 'read table'});

grist.onRecords(function (records) {
    statusEl.textContent = "Connecté -" + records.length + "lignes";
    console.log(records);
});