import type { ReactNode } from 'react'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'

import appCss from "@/styles/app.css?url"
import Appbar from '@/components/Appbar'
import { ThemeProvider } from '@/theme-provider'
import QueryProvider from '@/query-provider'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'ExerciseRight | Get Personalised AI Coach',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss
      }
    ]
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <ThemeProvider
        defaultTheme="dark"
        storageKey="vite-ui-theme"
      >
        <body>
          <QueryProvider>
          <Appbar />
          {children}
          </QueryProvider>
          <Scripts />
        </body>
      </ThemeProvider>
    </html>
  )
}
