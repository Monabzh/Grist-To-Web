import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { formaterValeur } from './formaterValeur'
import { Carte } from "./Carte"
import { useState } from "react"

export function Tableau({ records, colonnes, colInfos }) {
    const [selected, setSelected] = useState(null)
    return (
        <>
        <Table>
            <TableHeader>
                <TableRow>
                {colonnes.map((nom) => (
                    <TableHead key={nom}>{colInfos[nom]?.label || nom}</TableHead>
                ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {records.map((record) => (
                    <TableRow key={record.id} onClick={() =>
                        setSelected(record)} className="cursor-pointer">
                    {colonnes.map((nom) => (
                        <TableCell key={nom}>{formaterValeur(record[nom], colInfos[nom])}</TableCell>
                    ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>

        <Sheet open={selected !== null} onOpenChange={(ouvert) => {if (!ouvert) setSelected(null)}}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Détail</SheetTitle>
                </SheetHeader>
                {selected && <Carte record={selected} colonnes={colonnes} colInfos={colInfos} />}
            </SheetContent>
        </Sheet>
        </>
    )
}