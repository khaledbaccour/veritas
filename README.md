<!-- Badges -->
[![React](https://img.shields.io/badge/React-17.0.2-blue?logo=react)](https://reactjs.org) [![Vite](https://img.shields.io/badge/Vite-4.0.0-brightgreen?logo=vite)](https://vitejs.dev) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

# 📚 Documentation Technique de Veritas
<p align="center">
  <img src="https://veritas-platform.vercel.app/assets/logo-CwHMZLc0.png" alt="Veritas Logo" width="200" style="background-color: white; padding: 10px; border-radius: 10px;" />
</p>

<p align="center">
  <strong>Welcome to <a href="https://veritas-platform.vercel.app">veritas Platform</a></strong>
</p>

> **✨ À Propos**
> **Veritas** est une plateforme de journalisme collaboratif et de gestion de contenu, fournissant un espace centralisé pour :
> - **Recherche**
> - **Rédaction**
> - **Vérification des faits**
> - **Publication**
>
> *Note : données actuellement mockées pour démonstration.*
>
> **🔐 Dénonciation anonyme & sécurisée** : utilisez veritas-platform.vercel.app pour soumettre des informations de manière confidentielle ; celles-ci seront acheminées à la catégorie de journalistes appropriée pour traitement.*

---

## 🗂️ Table des Matières
1. [Architecture Technique](#architecture-technique)
2. [Cas d’Utilisation](#cas-dutilisation)
3. [Choix Technologiques](#choix-technologiques)
4. [Développement](#développement)

---

## 🏗️ Architecture Technique

### 1. Structure Principale

- ⚛️ **React** + **Vite** : dev ultra-rapide et HMR
- 🧩 Architecture **composants** pour modularité
- 🔀 **react-router-dom** pour routage client

### 2. Flux de Données

- 🎯 **React Hooks** (`useState`, `useEffect`)
- 🗄️ Services **mock** (prochainement API)
- 🌐 Providers **Context** pour état global

### 3. Organisation de l’UI

```plain
components/
├─ ui/         # Composants réutilisables
├─ layout/     # Grilles & Layouts
├─ editor/     # Extensions Tiptap
├─ pages/      # Vues principales
└─ data/       # Mock data
```

### 4. Sécurité & Permissions

- 🔒 **Chiffrement** des communications
- 🕵️ Anonymat des lanceurs d’alerte
- 👥 **RBAC** : contrôle d’accès basé sur rôles

---

## 🚀 Cas d’Utilisation

1. **Édition Collaborative**
   - 📝 Multi-utilisateurs + commentaires
   - 🔄 Historique et branching de versions

2. **Gestion & Vérification des Sources**
   - 📚 Bibliothèque de références
   - ✅ Vérification automatique des faits
   - 📊 Analyse de crédibilité & biais

3. **Communication Sécurisée**
   - 💬 Messagerie chiffrée
   - 🗳️ Soumissions anonymes (lanceurs d’alerte)
   - 🔔 Notifications et rappels
   - 🌐 [Dénonciation anonyme & sécurisée](veritas-platform.vercel.app/whistleblower) (info acheminée à la catégorie de journalistes concernée)

4. **Collaboration Visuelle**
   - 🖼️ Tableaux blancs interactifs (`tldraw`)
   - 🧠 Mind maps partagées
   - 📅 Planification & tâches

5. **Workflow de Publication**
   - 📑 Pipeline : _Brouillon → Revue → Approbation → Publication_
   - 👓 Relecture & validation par éditeurs
   - 🌐 Publication multi-plateformes

---

## 💡 Choix Technologiques

| Technologie           | Usage                                                     |
| --------------------- | --------------------------------------------------------- |
| React + Vite          | Rapidité & HMR                                            |
| Mantine UI + shadcn/ui| Composants accessibles et customizables                   |
| Tiptap                | Éditeur riche (ProseMirror)                              |
| tldraw                | Whiteboard collaboratif                                   |
| react-router          | Routage déclaratif & nested routes                        |
| Perplexity, Grok, GPT | Suggestions IA & vérif. de faits (implémentation future)  |

---

## 🛠️ Développement

### Prérequis
- Node.js v16+
- npm

### Installation
```bash
npm install
```

### Lancement (Dev)
```bash
npm run dev
```

### Build (Prod)
```bash
npm run build
```
