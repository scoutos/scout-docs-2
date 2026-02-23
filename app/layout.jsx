import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: {
    template: '%s – Scout Docs'
  },
  description: 'Scout Documentation - Build AI-powered applications and workflows',
}

const banner = (
  <Banner storageKey="scout-banner">
    🎉 Scout Docs 2.0 is here!
  </Banner>
)

const navbar = (
  <Navbar
    logo={<b>Scout Docs</b>}
    projectLink="https://github.com/scoutos/scout"
  />
)

const footer = (
  <Footer>
    MIT {new Date().getFullYear()} © Scout OS.
  </Footer>
)

export default async function RootLayout({ children }) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
    >
      <Head />
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/scoutos/scout-docs2"
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}