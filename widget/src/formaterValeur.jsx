import { Badge } from "@/components/ui/badge"

export function formaterValeur(valeur, type) {
  // vide => rien
  if (valeur === null || valeur === undefined || valeur === '') {
    return ''
  }
  
  // booléen
  if (typeof valeur === 'boolean') {
    return <input type="checkbox" checked={valeur} readOnly className="h-4 w-4 accent-green-600"/>
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

  // Choix unique => badge
  if (type === 'Choice') {
    return <Badge variant="secondary">{String(valeur)}</Badge>
  }

  // Date / Date-heure
  if (type === 'Date' || type?.startsWith('DateTime')) {
    const d = typeof valeur === 'number' ? new Date(valeur * 1000) : new Date(valeur)
    return type === 'Date'
      ? d.toLocaleDateString('fr-FR', { timeZone: 'UTC'})
      : d.toLocaleString('fr-FR')
  }

  return String(valeur)
}