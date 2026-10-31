// ADDED (bug fix): src/app/layout.tsx imports
// `import { Toaster } from "@/components/ui/sonner"`, but this shadcn component
// file was never generated. Next.js failed to compile the shared root layout
// ("Cannot find module '@/components/ui/sonner'"), which returned HTTP 500 on
// EVERY page. This is the standard shadcn/ui sonner wrapper — sonner v2 injects
// its own styles, so no CSS import is needed.
"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return <Sonner className="toaster group" {...props} />
}

export { Toaster }
