"use client"

import { useState } from "react"
import { Sidebar } from "@/components/chat-sidebar"
import { ChatContainer } from "@/components/chat-container"
import { RightSidebar } from "@/components/right-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function HomePage() {
  const [selectedChat, setSelectedChat] = useState<string | null>("1")

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden transition-all duration-300">
        <Sidebar onChatSelect={setSelectedChat} selectedChat={selectedChat} />
        <ChatContainer selectedChat={selectedChat} />
        <RightSidebar selectedChat={selectedChat} />
      </div>
    </SidebarProvider>
  )
}
