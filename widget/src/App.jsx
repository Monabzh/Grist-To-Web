/* global grist */
import { formaterValeur } from './formaterValeur'
import { Tableau } from './Tableau'
import { Carte } from './Carte'
import { Kanban } from './Kanban'
import { Galerie } from './Galerie'
import { useState, useEffect } from 'react'

function App() {
  const [records, setRecords] = useState([])
  const [colInfos, setColInfos] = useState({})

  useEffect(() => {
    grist.ready({ requiredAccess: 'full'})
    grist.onRecords((r) => { setRecords(r); chargerColonnes()}, { includeColumns: 'normal'})

  async function chargerColonnes() {
      const tableId = await grist.getTable().getTableId()
      const tables = await grist.docApi.fetchTable('_grist_Tables')
      const cols = await grist.docApi.fetchTable('_grist_Tables_column')

      const tableRef = tables.id[tables.tableId.indexOf(tableId)]

      const infos = {}
      cols.id.forEach((_, i) => {
        if (cols.parentId[i] === tableRef) {
          infos[cols.colId[i]] = { label: cols.label[i], type:cols.type[i]}
        }
      })
      setColInfos(infos)
    }
    chargerColonnes()
}, [])


  const colonnes = records.length > 0
    ? Object.keys(records[0]).filter((nom) => nom !== 'id')
    : []

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Widget bibliothèque</h1>
      <Tableau records={records} colonnes={colonnes} colInfos={colInfos} />
      <Galerie records={records} colonnes={colonnes} colInfos={colInfos} />
      <Kanban records={records} colonnes={colonnes} colInfos={colInfos} champ="B"/>
    </>
  )
}

export default App
