export default {
  logo: <b>Chiho&apos;s Wiki</b>,
  project: {
    link: 'https://github.com/songtov/wiki',
  },
  docsRepositoryBase: 'https://github.com/songtov/wiki/tree/main',
  footer: {
    text: `Chiho's Wiki · ${new Date().getFullYear()}`,
  },
  useNextSeoProps() {
    return { titleTemplate: '%s — Wiki' }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Personal knowledge base — notes, insights, and things I learn." />
    </>
  ),
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  editLink: {
    text: 'Edit this page on GitHub',
  },
}
