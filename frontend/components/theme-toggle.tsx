"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button size="icon" variant="ghost" className="hover:bg-blue-100 dark:hover:bg-blue-900/20">
        <div className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-all duration-200"
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4 text-blue-700 dark:text-blue-400" />
      ) : (
        <Sun className="h-4 w-4 text-blue-700 dark:text-blue-400" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
