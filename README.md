# AGRILOC — Plateforme agritech (Togo)

Marketplace de location de machines agricoles : tracteurs, motoculteurs, moissonneuses, pulvérisateurs et pompes d'irrigation.

**Stack :** React 18 · Vite 4 · Tailwind CSS 3 · Lucide React

---

## Démarrage rapide

```bash
npm install
npm run dev
```

Application : [http://localhost:5173](http://localhost:5173)

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production → `dist/` |
| `npm run preview` | Prévisualisation du build |

---

## Structure du projet (racine unique)

Tous les fichiers sont à la **racine du dépôt** — pas de sous-dossier `Agriloc/` ni `agriloc/` :

```
./
├── public/
│   ├── logo.png
│   └── machines/
├── src/
│   ├── App.jsx
│   ├── components/
│   └── pages/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
└── .gitignore
```

---

## Déploiement Vercel

### Réglages obligatoires

| Paramètre | Valeur |
|-----------|--------|
| **Root Directory** | *(vide — ne rien saisir)* |
| **Framework Preset** | Vite *(auto via `vercel.json`)* |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Node.js** | 18.x ou 20.x |

### Erreurs à éviter

| Erreur | Cause | Solution |
|--------|-------|----------|
| `Root Directory "agriloc" does not exist` | Mauvais chemin | Laisser Root Directory **vide** |
| `npm run build` exit **126** | `node_modules` commité (binaires Windows) | Ne jamais pousser `node_modules` — `.gitignore` en place |
| Build en 4 secondes | Pas de `package.json` à la racine | Pousser depuis la racine du repo |

### Déployer

```bash
# À la racine du projet (là où se trouve package.json)
git add .
git commit -m "chore: structure projet prête pour Vercel"
git push origin main
```

Puis **Redeploy** sur le dashboard Vercel.

---

## Journal des modifications

### Assets (`public/`)

| Fichier | Usage |
|---------|--------|
| `logo.png` | Favicon + logo navbar/footer (fond transparent) |
| `machines/*.png` | Photos des 5 machines du catalogue |

### Catalogue (prix journaliers en FCFA)

| Machine | Prix |
|---------|------|
| Tracteur Massey Ferguson 375 | 75 000 |
| Motoculteur Kubota KRT140 | 25 000 |
| Moissonneuse John Deere W330 | 150 000 |
| Pulvérisateur Agrator 1200L | **20 000** |
| Pompe solaire LORENTZ | 15 000 |

### Fichiers clés modifiés

- `index.html` — favicon `/logo.png`
- `src/App.jsx` — images locales + données machines
- `src/components/Navbar.jsx` — logo aligné avec « AGRILOC »
- `src/components/Footer.jsx` — logo
- `src/pages/SupplierDashboard.jsx` — images par catégorie
- `vercel.json` — configuration build Vercel
- `.gitignore` — exclut `node_modules`, `dist`, `.vercel`

---

## Personnalisation

| Élément | Fichier |
|---------|---------|
| Logo / favicon | `public/logo.png` + `index.html` |
| Affichage logo | `src/components/Navbar.jsx`, `Footer.jsx` |
| Photos machines | `public/machines/` + `src/App.jsx` |
| Couleurs thème | `tailwind.config.js` |

---

## Licence

Projet privé (`"private": true`).
