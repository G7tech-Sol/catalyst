import { getEvents } from '@/data'
import '@/styles/tailwind.css'
import { ClerkProvider } from '@clerk/nextjs'

import { ApplicationLayout } from './application-layout'

export const metadata = {
  title: {
    template: '%s - Catalyst',
    default: 'Catalyst',
  },
  description: '',
}

export default async function RootLayout({ children }) {
  let events = await getEvents()

  return (
    <ClerkProvider>
      <html
        lang="en"
        className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
      >
        <head>
          <link rel="preconnect" href="https://rsms.me/" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </head>
        <body>
          {/* <header>
            <SignedOut>
              <SignInButton style={{ zIndex: '9999999' }} />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header> */}
          <ApplicationLayout events={events}>{children}</ApplicationLayout>
        </body>
      </html>
    </ClerkProvider>
  )
}
