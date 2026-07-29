import { Carte } from "./Carte"

export function Kanban({ records, colonnes, colInfos, champ }) {
    // grouper les records par la valeur de champ
    const groupes = {}
    records.forEach((record) => {
        const cle = record[champ] ?? '(vide)'
        if (!groupes[cle]) groupes[cle] = []
        groupes[cle].push(record)
    })

    return(
        <div className="flex gap-4 items-start">
            {Object.entries(groupes).map(([valeur, cartes]) => (
                <div key={valeur} className="flex-1">
                    <h3 className="font-semibold mb-2">{valeur}({cartes.length})</h3>
                    <div className="flex flex-col gap-2">
                        {cartes.map((record) => (
                            <Carte key={record.id} record={record} colonnes={colonnes} colInfos={colInfos} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}