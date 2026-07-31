import { Carte } from "./Carte"
import { Badge } from "@/components/ui/badge"

const PALETTE = ['#64748B', '#9683C4', '#49cca0', '#cc67e0', '#C99A57', '#B87BA0', '#5CA1A6', '#C58A6B']

export function Kanban({ records, colonnes, colInfos, champ, tri, sensTri, filtreChamp, filtreVals }) {
    // grouper les records par la valeur de champ
    const recordsFiltres = (filtreChamp && filtreVals?.length)
        ? records.filter((r) => {
            const v = r[filtreChamp]
            const texte = (Array.isArray(v) ? v.join(' ') : String(v ?? '')).toLowerCase()
            return filtreVals.some((val) => texte.includes(String(val).toLowerCase()))
        })
        :records
    const groupes = {}
    recordsFiltres.forEach((record) => {
        let valeurs = record[champ]
        if (Array.isArray(valeurs)) {
            valeurs = valeurs[0] === 'L' ? valeurs.slice(1) : valeurs
        } else { valeurs = [valeurs]}
        if (valeurs.length === 0) valeurs = ['(vide)']
        valeurs.forEach((v) => {
            const cle = v ?? '(vide)'
            if (!groupes[cle]) groupes[cle] = []
            groupes[cle].push(record)
        })
    })

    const choiceOptions = colInfos[champ]?.choiceOptions || {}

    return(
        <div className="flex gap-4 items-start">
            {Object.entries(groupes).map(([valeur, cartes], index) => {
                const opt = choiceOptions[valeur] || {}
                const couleur = opt.fillColor || PALETTE[index % PALETTE.length]
                const cartesTriees = tri ? [...cartes].sort((a,b) => {
                    const va = a[tri], vb = b[tri]
                    let c
                    if (typeof va === 'number' && typeof vb === 'number') c = va -vb
                    else c = String(va ?? '').localeCompare(String(vb ?? ''))
                    return sensTri === 'desc' ? -c : c
                })
                : cartes
                return(
                    <div key={valeur} className="flex-1 min-w-[200px] rounded-lg p-2" style={{ backgroundColor: couleur + '22'}}>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge style={{ backgroundColor: couleur, color: opt.textColor || '#fff' }}>{valeur}</Badge>
                            <span className="text-sm font-semibold" style={{ color: couleur }}>{cartes.length}</span>
                            </div>
                               <div className="flex flex-col gap-2">
                                {cartesTriees.map((record) => (
                                    <Carte key={record.id} record={record} colonnes={colonnes} colInfos={colInfos} />
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}