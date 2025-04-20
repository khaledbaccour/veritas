# veritas

## documentation technique complète et détaillée

### explication du concept

veritas is a collaborative journalism and content management platform designed to enhance the workflow of journalists, editors, and content creators. it serves as a centralized workspace for researching, writing, fact-checking, and publishing accurate and well-sourced articles.

the platform integrates multiple tools that address the specific needs of modern journalism, including real-time collaboration, version control, source management, and fact verification tools - all within a secure environment that protects both content and sources.

note: this application currently uses almost all mock data for demonstration purposes.

### architecture technique

the application follows a modern front-end architecture with the following key components:

1. **core structure**
   - react application built with vite
   - component-based architecture for modularity and reusability
   - client-side routing via react-router-dom

2. **data flow**
   - state management using react hooks (useState, useEffect)
   - mock data services (future: api integration)
   - context providers for global state where needed

3. **ui organization**
   - components/ui: reusable ui components
   - components/layout: layout-related components
   - components/editor: specialized editor components
   - pages: main application views
   - data: mock data structures

4. **security considerations**
   - secure communication channels
   - whistleblower anonymity protections
   - role-based access control

### elaboration des cas d'utilisation

1. **collaborative article editing**
   - multiple journalists can work on the same document
   - track changes and contributions by each collaborator
   - commenting system for feedback and discussions
   - version control with branching capability

2. **source and fact management**
   - organize research materials and references
   - verify facts against trusted sources
   - track source credibility and bias metrics
   - create fact libraries for reuse across articles

3. **secure communication**
   - encrypted messaging between team members
   - protected whistleblower submission system
   - notification system for updates and deadlines

4. **visual collaboration**
   - interactive whiteboards for brainstorming
   - collaborative mind mapping and organization
   - visual tracking of story development
   - scheduling and task management

5. **content publication workflow**
   - draft → review → approval → publication pipeline
   - editor review system
   - fact-checking integration
   - multi-platform publishing options

### choix technologiques justifiés

1. **react + vite**
   - justification: provides fast development experience with hot module replacement
   - component reusability enhances development efficiency
   - large ecosystem and community support

2. **mantine ui + shadcn/ui**
   - justification: comprehensive component libraries with minimal setup
   - accessible components that follow best practices
   - customizable design system to match branding requirements
   - combination provides both robust functionality and aesthetic flexibility

3. **tiptap rich text editor**
   - justification: extensible editor framework based on prosemirror
   - collaborative editing capabilities
   - supports custom extensions for specialized journalism needs
   - markdown support for efficient writing

4. **tldraw whiteboard**
   - justification: lightweight but powerful drawing/diagramming tool
   - collaborative features for team brainstorming
   - extensible for custom journalism-specific tools

5. **react router**
   - justification: industry standard for react applications
   - declarative routing that integrates well with react components
   - supports nested routes for complex application structure

6. **ai integration**
   - **perplexity api**: for generating article ideas and enhanced search capabilities
   - **grok api**: for truth probability analysis and bias detection in content
   - **chatgpt/gemini**: for suggesting edits to articles and assisting in content creation
   - justification: leverages ai capabilities to enhance journalistic workflow while maintaining human oversight on critical editorial decisions
   - note: these ai integrations will be implemented in future development phases, as there wasn't sufficient time to include them in the current iteration

## development

### prerequisites
- node.js (v16+)
- npm 

### installation
```
npm install

```

### running development server
```
npm run dev

```

### building for production
```
npm run build

```

