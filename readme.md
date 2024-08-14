# throwexception.dev

> My personal website <3

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fisrael5%2Fthrowexception.dev)

## Technology stack

- **Styling:** [Stitches](https://stitches.dev/)
- **Content:** [Markdown](https://daringfireball.net/projects/markdown/)
- **Back-end:** [Next.js](https://nextjs.org/)
- **Front-end:** [React](https://reactjs.org/)
- **Animation:** [Framer](https://www.framer.com/docs/animation/)
- **Deployment:** [Vercel](https://vercel.com/)

## Running locally

1. Clone this repo:

```sh
$ git clone https://github.com/israel5/throwexception.dev.git
```

2. Then go to the project's folder:

```sh
cd throwexception.dev
```

3. Install all dependencies:

```sh
yarn
```

4. Run locally:

```sh
yarn dev
```

4.1 If it presents an error like `Cannot find module */node_modules/react/jsx-runtime imported from */node_modules/@radix-ui/react-toast/dist/index.mjs`, you can fix it by running:

```sh
yarn add react@latest react-dom@latest
```

## File structure

The basic file structure for the project is organized in the following way:

```
.
|-- articles
|-- components
|-- data
|-- layouts
|-- lib
|-- pages
`-- public
```

### [articles](https://github.com/zenorocha/zenorocha.com/tree/master/articles)

Here you'll find a list of markdown files for each post.

### [components](https://github.com/zenorocha/zenorocha.com/tree/master/components)

Here you'll find reusable blocks of React components.

### [data](https://github.com/zenorocha/zenorocha.com/tree/master/data)

Here you'll find JSON files that populates each section.

### [layouts](https://github.com/zenorocha/zenorocha.com/tree/master/layouts)

Here you'll find default templates for different pages.

### [lib](https://github.com/zenorocha/zenorocha.com/tree/master/lib)

Here you'll find a set of utilities.

### [pages](https://github.com/zenorocha/zenorocha.com/tree/master/pages)

Here you'll find all the main pages of the site.

### [public](https://github.com/zenorocha/zenorocha.com/blob/master/public)

Here you'll find all the CSS, images, and font files.

## License

[MIT License](http://mit-license.org/) © throwException.dev