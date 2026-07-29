import { Carte } from "./Carte"

export function Galerie({ records, colonnes, colInfos }) {
    return (
        <div className="grid grid-cols-3 gap-4">
            {records.map((record) => (
                <Carte key={record.id} record={record} colonnes={colonnes} colInfos={colInfos} />
            ))}
        </div>
    )
}