import { Navbar } from "@/components/layout/NavBar.tsx"
import React from "react"

interface ContentLayoutProps {
  title: string
  breadcrumb: React.ReactNode
  children: React.ReactNode
}

export function ContentLayout({
  title,
  breadcrumb,
  children,
}: ContentLayoutProps) {
  return (
    <>
      <Navbar title={title} />
      {breadcrumb}
      <div className="container py-8 px-8 h-full max-w-[1200px]">
        {children}
      </div>
    </>
  )
}
