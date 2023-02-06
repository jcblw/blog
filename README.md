# Blog of jcblw

This is the source code for my blog, [jcblw.com](https://jcblw.com). It's built with [Astro](https://astro.build), a new static site generator that uses React components, JSX, and TypeScript.

## 💻 Tech Stack

- [Astro](https://astro.build) - Static site generator
- [React](https://reactjs.org) - UI library
- [TypeScript](https://www.typescriptlang.org) - Type system

## 🚀 Project Structure

Inside of this blog, you'll see the following folders and files:

```
├── public/
├── src/
│   ├── components/
│   ├── content/
│   │   ├── blog/
│   │   └── talks/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where I like to put any Astro/React components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI                     |
