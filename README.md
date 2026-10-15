# Menfoutix — frontend VF / VO

## Catalogues

- `/` : page de choix VF / VO, sans appel API.
- `/vf` et `/vo` : accueil du catalogue choisi.
- Sous chaque préfixe : `/movies`, `/tv-shows`, `/search`, `/movie/:id`,
  `/tv/:id`, `/genre/movie/:idCategorieTmbd`, `/genre/tv/:idCategorieTmbd`,
  `/watch/movie/:id`, `/watch/tv/:id/s/:season/e/:episode`.
- Les anciennes URL sans préfixe redirigent vers VF en conservant query/hash.
- Une version inconnue affiche la page 404.

Les pages et services sont réutilisés, pas dupliqués. `src/catalog/navigation.tsx`
et `useCatalogNavigate.ts` préfixent les liens internes, sans changer les liens
externes. Le badge VF/VO de la navbar et le lien du footer reviennent au choix.
Les nouveaux composants doivent utiliser ces liens/navigation pour rester dans
le catalogue courant (la page de choix utilise les liens React Router normaux).

`src/services/api.ts` sélectionne `/api/vf/...` ou `/api/vo/...` d'après l'URL
au début de chaque requête. Les query clients sont séparés et recréés au changement
de catalogue, avec des empreintes de clés incluant VF/VO : aucun résultat partagé
entre catalogues. La progression des séries utilise des clés localStorage séparées.
L'ancienne progression sans version reste lue uniquement pour la VF.

## Publication Cloudflare Pages

L'API V2 doit être publiée sur Render **avant le frontend** avec ses deux DB.
Ajouter la variable de build (également dans `.env` local) :

```env
VITE_API_URL=https://menfoutix-api.onrender.com
```

Ne pas ajouter `/api`, `/vf` ou `/vo` à cette URL. Configurer côté Render
`CORS_ORIGINS=https://menfoutix.pages.dev`. Build : `npm run build`, sortie :
`dist`. Publier par commit/push. Pages sert cette SPA via `index.html` pour les
liens directs : ne pas ajouter de `404.html` statique qui désactiverait ce fallback.

Après publication tester choix VF/VO, navigation, recherche, genres et lecture,
puis recharger directement une fiche `/vo/tv/...` ou `/vf/movie/...`.
VO signifie version originale ; les sous-titres dépendent des options YouTube.
Le site ne garantit pas une traduction ou des sous-titres pour chaque vidéo.

```sh
npm run lint
npm run build
```

## Notes du template d'origine

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
