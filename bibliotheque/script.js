const statusEl = document.getElementById('status');

grist.ready({ requiredAccess: 'read table'});

grist.onRecords(function (records) {
    statusEl.textContent = "Connecté -" + records.length + "lignes";
    console.log(records);
    const listeEl = document.getElementById('liste');
    records.forEach(function (record){
        ele = record.A + " " + record.B + " - " + record.C;
        listeEl.appendChild(ele)
    })
});