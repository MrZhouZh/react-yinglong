'use client'

import { usePathname, useRouter } from "next/navigation"
import { ReactNode } from "react"

export default function DemoLayout({
  children
}: {
  children: ReactNode
}) {
  const pathname = usePathname()
  return (
    <section>
      <h1>There is hooks preview</h1>
      {pathname !== '/demo' && (
        <div>
          <a href="/demo">Back to list</a>
        </div>
      )}
      {children}
    </section>
  )
}
