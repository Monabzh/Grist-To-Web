/* global grist */
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { formaterValeur } from './formaterValeur'
import { Tableau } from './Tableau'
import { Carte } from './Carte'
import { Kanban } from './Kanban'
import { Galerie } from './Galerie'
import { useState, useEffect } from 'react'

// const VUES = [
//   {id: "tableau", titre:"Tableau", type:"tableau"},
//   {id: "galerie", titre:"Galerie", type:"galerie"},
//   {id: "kanbanB", titre:"par B", type:"kanban", champ:"B"},
//   {id: "kanbanC", titre:"Par C", type:"kanban", champ:"C"},
// ]

function App() {
  const [records, setRecords] = useState([])
  const [colInfos, setColInfos] = useState({})
  const [kanbanVues, setKanbanVues] = useState([])

  useEffect(() => {
    grist.ready({ requiredAccess: 'full'})
    grist.onRecords((r) => { setRecords(r); chargerColonnes()}, { includeColumns: 'normal'})
    grist.onOptions((options) => {
      setKanbanVues(options?.kanbanVues || [])
    })

  async function chargerColonnes() {
      const tableId = await grist.getTable().getTableId()
      const tables = await grist.docApi.fetchTable('_grist_Tables')
      const cols = await grist.docApi.fetchTable('_grist_Tables_column')

      const tableRef = tables.id[tables.tableId.indexOf(tableId)]

      const infos = {}
      cols.id.forEach((_,i) => {
        if (cols.parentId[i] === tableRef) {
          let options = {}
          try { options = JSON.parse(cols.widgetOptions[i] || '{}')} catch { options = {} }
          infos[cols.colId[i]] = {
            label: cols.label[i],
            type: cols.type[i],
            choiceOptions: options.choiceOptions || {},
          }
        }
      })
      setColInfos(infos)
    }
    chargerColonnes()
}, [])


  const colonnes = records.length > 0
    ? Object.keys(records[0]).filter((nom) => nom !== 'id')
    : []

  const vues = [
    {id: "tableau", titre:"Tableau", type:"tableau"},
    {id: "galerie", titre:"Galerie", type:"galerie"},
    ...kanbanVues.map((v) => ({
      id: "kanban-" + v.id,
      titre: "Par " + (colInfos[v.champ]?.label || v.champ),
      type:"kanban",
      champ: v.champ,
    })),
  ]

  function sauverVues(nouvelles){
    setKanbanVues(nouvelles)
    grist.setOption('kanbanVues', nouvelles)
  }
  function ajouterVue() {
    sauverVues([...kanbanVues, { id: Date.now(), champ: colonnes[0] }])
  }
  function modifierVue(id, champ) {
    sauverVues(kanbanVues.map((v) => (v.id === id ? { ...v, champ } : v)))
  }
  function supprimerVue(id) {
    sauverVues(kanbanVues.filter((v) => v.id !== id))
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Widget bibliothèque</h1>

      <div className="mb-4 p-3 border rounded">
        <h3 className="font-semibold mb-2">Vues kanban</h3>
        {kanbanVues.map((vue) => (
          <div key={vue.id} className="flex items-center gap-2 mb-2">
            <Select value={vue.champ} onValueChange={(c) => modifierVue(vue.id, c)}>
              <SelectTrigger className="w-48"><SelectValue placeholder="Colonne..."/></SelectTrigger>
              <SelectContent>{colonnes.map((nom) => (
                <SelectItem key={nom} value={nom}>{colInfos[nom]?.label || nom}</SelectItem>
              ))}
              </SelectContent>
            </Select>
            <Button variant="destructive" size="sm" onClick={() => supprimerVue(vue.id)}>Supprimer</Button>
          </div>
        ))}
        <Button size="sm" onClick={ajouterVue}>+ Ajouter une vue kanban</Button>
      </div>

      <Tabs defaultValue={vues[0].id}>
        <TabsList>
          {vues.map((vue) => (
          <TabsTrigger key={vue.id} value={vue.id}>{vue.titre}</TabsTrigger>
          ))}
        </TabsList>

        {vues.map((vue) => (
          <TabsContent key={vue.id} value={vue.id}>
            {vue.type === "tableau" && <Tableau records={records} colonnes={colonnes} colInfos={colInfos} />}
            {vue.type === "galerie" && <Galerie records={records} colonnes={colonnes} colInfos={colInfos} />}
            {vue.type === "kanban" && <Kanban records={records} colonnes={colonnes} colInfos={colInfos} champ={vue.champ} />}
          </TabsContent>
        ))}
      </Tabs>
    </>
  )
}

export default App
