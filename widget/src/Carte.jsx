import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { formaterValeur } from "./formaterValeur"

export function Carte({ record, colonnes, colInfos }) {
    const [titre, ...autres] = colonnes
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>{formaterValeur(record[titre], colInfos[titre]?.type)}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">{autres.map((nom) => (
                <div key={nom}>
                    <span className="text-muted-foreground">{colInfos[nom]?.label || nom} : </span>
                    {formaterValeur(record[nom], colInfos[nom]?.type)}
                </div>
            ))}
            </CardContent>
        </Card>
    )
}