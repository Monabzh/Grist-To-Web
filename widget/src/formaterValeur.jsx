import { Badge } from "@/components/ui/badge"

export function formaterValeur(valeur) {
  // vide => rien
  if (valeur === null || valeur === undefined || valeur === '') {
    return ''
  }
  
  // booléen
  if (typeof valeur === 'boolean') {
    return valeur ? 'y' : 'x'
  }

  // liste Grist => badge
  if (Array.isArray(valeur)) {
    return (
      <div className="flex flex-wrap gap-1">
        {valeur.slice(0).map((item, i) => (
          <Badge key={i} variant="secondary">{String(item)}</Badge>
        ))}
      </div>
    )
  }

  return String(valeur)
}