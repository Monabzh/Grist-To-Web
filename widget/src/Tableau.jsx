import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { formaterValeur } from './formaterValeur'

export function Tableau({ records, colonnes, colInfos }) {
    return (
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
                <TableRow key={record.id}>
                  {colonnes.map((nom) => (
                    <TableCell key={nom}>{formaterValeur(record[nom], colInfos[nom]?.type)}</TableCell>
                  ))}
                </TableRow>
              ))}
        </TableBody>
    </Table>
    )
}