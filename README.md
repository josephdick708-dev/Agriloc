# AGRILOC — Plateforme agritech (Togo)

Marketplace de location de machines agricoles : tracteurs, motoculteurs, moissonneuses, pulvérisateurs et pompes d'irrigatio
**Stack :** React 18 · Vite 4 · Tailwind CSS 3 · Lucide React

---

## Démarrage rapide

```bash
cd Agriloc
npm install
npm run dev
```

Application disponible sur [http://localhost:5173](http://localhost:5173).

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production (`dist/`) |
| `npm run preview` | Prévisualisation du build |

---

## Structure du projet

```
Agriloc/
├── public/
│   ├── logo.png              # Icône / logo principal (fond transparent)
│   └── machines/             # Photos des équipements marketplace
│       ├── massey-ferguson-375.png
│       ├── kubota-krt140.png
│       ├── john-deere-w330.png
│       ├── agrator-1200l.png
│       └── lorentz-pompe.png
├── src/
│   ├── App.jsx               # Données machines, réservations, navigation
│   ├── components/
│   │   ├── Navbar.jsx        # Barre de navigation + logo
│   │   └── Footer.jsx        # Pied de page + logo
│   └── pages/
│       ├── Marketplace.jsx   # Liste des machines
│       ├── MachineDetail.jsx # Fiche produit
│       ├── SupplierDashboard.jsx
│       └── ...
├── index.html                # Favicon et métadonnées
└── package.json
```

---

## Journal des modifications

Récapitulatif des ajouts et changements réalisés sur le projet.

### 1. Assets ajoutés (`public/`)

#### Logo principal — `public/logo.png`
- Icône de marque (A vert + cadenas) utilisée comme favicon et logo UI.
- Fond **noir supprimé** → PNG **transparent**.
- Image **recadrée** autour du symbole (sans grandes marges noires en bas ou sur les côtés).

#### Photos machines — `public/machines/`

| Fichier | Produit associé |
|---------|-----------------|
| `massey-ferguson-375.png` | Tracteur Massey Ferguson 375 |
| `kubota-krt140.png` | Motoculteur Kubota KRT140 |
| `john-deere-w330.png` | Moissonneuse-batteuse John Deere W330 |
| `agrator-1200l.png` | Pulvérisateur Tracté Agrator 1200L |
| `lorentz-pompe.png` | Pompe d'irrigation Solaire LORENTZ |

---

### 2. Fichiers modifiés

#### `index.html`
- **Avant :** favicon emoji tracteur (SVG inline).
- **Après :** favicon et icône Apple Touch → `/logo.png`.

#### `src/App.jsx`
- Remplacement des images Unsplash par les photos locales pour les 5 machines du catalogue initial (`images: ['/machines/...']`).

#### `src/components/Navbar.jsx`
- Remplacement de l’icône Lucide `Tractor` par `<img src="/logo.png" />`.
- **Disposition :** logo et texte **AGRILOC** sur la même ligne ; sous-titre **TOGO AGRITECH** en dessous.
- **Taille :** `h-9 w-auto` (hauteur fixe, largeur proportionnelle — évite les bandes latérales).
- Alignement : `flex items-start` + léger `mt-0.5` sur l’image pour caler le « A » avec le texte.

#### `src/components/Footer.jsx`
- Même logo `/logo.png` à la place du tracteur.
- Affichage : `h-10 w-auto object-contain`.

#### `src/pages/SupplierDashboard.jsx`
- Nouvelles annonces : images par catégorie via `categoryImages` (chemins locaux `/machines/...`).
- Fallback des miniatures : `/machines/massey-ferguson-375.png` au lieu d’Unsplash.

#### Pages impactées indirectement (affichage des `machine.images`)
- `Marketplace.jsx` — cartes produits
- `MachineDetail.jsx` — fiche détaillée
- `FarmerDashboard.jsx` — réservations

---

### 3. Évolutions UI du logo (navbar)

| Étape | Changement |
|-------|------------|
| 1 | Ajout du logo comme icône principale (favicon + navbar + footer) |
| 2 | Agrandissement (`h-16` navbar, `h-14` footer) |
| 3 | Alignement icône + **AGRILOC** sur une même ligne |
| 4 | Recadrage + fond transparent de `logo.png` |
| 5 | Suppression des barres noires : `w-auto` au lieu de `w-9` / `w-16` carré |

---

## Personnalisation

### Changer le logo / favicon

1. Remplacer `public/logo.png` (PNG transparent recommandé).
2. Vérifier les liens dans `index.html` (`href="/logo.png"`).
3. Ajuster taille / position dans `src/components/Navbar.jsx` et `Footer.jsx` (classes Tailwind sur la balise `<img>`).

### Changer une photo machine

1. Remplacer le fichier dans `public/machines/`.
2. Mettre à jour le chemin dans `src/App.jsx` (tableau `machines`, champ `images`).
3. Optionnel : mettre à jour `categoryImages` dans `SupplierDashboard.jsx` pour les nouvelles annonces par catégorie.

### Ajouter une nouvelle machine avec image

Dans `App.jsx`, ajouter un objet dans le state `machines` :

```js
{
  id: 'm6',
  name: 'Nom de la machine',
  category: 'Tracteur',
  images: ['/machines/mon-image.png'],
  // ... autres champs
}
```

Placer l’image dans `public/machines/mon-image.png`.

---

## Catalogue initial (données)

Les 5 machines de démo et leurs images locales :

| ID | Nom | Catégorie | Image |
|----|-----|-----------|-------|
| m1 | Tracteur Massey Ferguson 375 | Tracteur | `/machines/massey-ferguson-375.png` |
| m2 | Motoculteur Kubota KRT140 | Motoculteur | `/machines/kubota-krt140.png` |
| m3 | Moissonneuse-batteuse John Deere W330 | Moissonneuse | `/machines/john-deere-w330.png` |
| m4 | Pulvérisateur Tracté Agrator 1200L | Pulvérisateur | `/machines/agrator-1200l.png` |
| m5 | Pompe d'irrigation Solaire LORENTZ | Pompe | `/machines/lorentz-pompe.png` |

---

## Notes techniques

- Les fichiers dans `public/` sont servis à la racine (`/logo.png`, `/machines/...`).
- Après modification du logo, forcer le rechargement du navigateur (**Ctrl+F5**) pour mettre à jour le favicon en cache.
- Le projet applicatif se trouve dans le dossier `Agriloc/` (sous-dossier du dépôt téléchargé).

---

## Licence

Projet privé (`"private": true` dans `package.json`).
