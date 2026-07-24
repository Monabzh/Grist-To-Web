const statusEl = document.getElementById('status');

grist.ready({ requiredAccess: 'read table'});

grist.onRecords(function (records) {
    statusEl.textContent = "Connecté -" + records.length + "lignes";
    console.log(records);

    const listeEl = document.getElementById('liste');
    listeEl.replaceChildren();
    
    records.forEach(function (record){
        const ligneEl = document.createElement('div');
        ligneEl.textContent = record.A + " " + record.B + " - " + record.C;
        listeEl.appendChild(ligneEl);
    })
});
