"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Plus, MoreHorizontal, User, Settings, MessageCircle, Hash } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

interface ChatSidebarProps {
  onChatSelect: (chatId: string) => void
  selectedChat: string | null
}

const mockChats = [
  {
    id: "1",
    name: "AI Assistant",
    lastMessage: "How can I help you today?",
    time: "2m ago",
    unread: 2,
    online: true,
    type: "ai",
  },
  {
    id: "2",
    name: "John Doe",
    lastMessage: "Thanks for the help!",
    time: "1h ago",
    unread: 0,
    online: true,
    type: "direct",
  },
  {
    id: "3",
    name: "Sarah Wilson",
    lastMessage: "See you tomorrow",
    time: "3h ago",
    unread: 1,
    online: false,
    type: "direct",
  },
  {
    id: "4",
    name: "Team Chat",
    lastMessage: "Meeting at 3 PM",
    time: "1d ago",
    unread: 5,
    online: false,
    type: "group",
  },
  {
    id: "5",
    name: "Mike Johnson",
    lastMessage: "Great work on the project",
    time: "2d ago",
    unread: 0,
    online: false,
    type: "direct",
  },
]

export function Sidebar({ onChatSelect, selectedChat }: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredChats = mockChats.filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const getChatIcon = (type: string) => {
    switch (type) {
      case "ai":
        return <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
      case "group":
        return <Hash className="h-3 w-3 text-blue-600 dark:text-blue-400" />
      default:
        return <MessageCircle className="h-3 w-3 text-blue-600 dark:text-blue-400" />
    }
  }

  return (
    <div className="w-80 gradient-sidebar border-r border-blue-200/50 dark:border-gray-700/50 flex flex-col h-full flex-shrink-0 shadow-custom">
      {/* Header */}
      <div className="p-6 border-b border-blue-200/50 dark:border-gray-700/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 gradient-blue rounded-lg flex items-center justify-center shadow-sm">
              <MessageCircle className="h-4 w-4 text-white" />
            </div>
            <h2 className="text-xl font-bold text-blue-900 dark:text-blue-100">ChatApp</h2>
          </div>
          <div className="flex gap-1">
            <ThemeToggle />
            <Button size="icon" variant="ghost" className="hover:bg-blue-100 dark:hover:bg-blue-900/20">
              <Plus className="h-4 w-4 text-blue-700 dark:text-blue-400" />
            </Button>
            <Button size="icon" variant="ghost" className="hover:bg-blue-100 dark:hover:bg-blue-900/20">
              <MoreHorizontal className="h-4 w-4 text-blue-700 dark:text-blue-400" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500 dark:text-blue-400" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/70 dark:bg-gray-800/70 border-blue-200 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-400/20 backdrop-blur-sm"
          />
        </div>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1 custom-scrollbar">
        <div className="p-3">
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wider mb-2 px-3">
              Recent
            </h3>
          </div>
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onChatSelect(chat.id)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 mb-1 ${
                selectedChat === chat.id
                  ? "bg-white dark:bg-gray-800 shadow-md border border-blue-200 dark:border-blue-700/50"
                  : "hover:bg-white/50 dark:hover:bg-gray-800/50"
              }`}
            >
              <div className="relative">
                <Avatar className="h-12 w-12 border-2 border-white dark:border-gray-700 shadow-sm">
                  <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
                    {chat.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {chat.online && (
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 shadow-sm" />
                )}
                <div className="absolute -top-1 -left-1">{getChatIcon(chat.type)}</div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold truncate text-gray-900 dark:text-gray-100">{chat.name}</h3>
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">{chat.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{chat.lastMessage}</p>
                  {chat.unread > 0 && (
                    <Badge className="gradient-blue text-white border-0 h-5 min-w-5 text-xs font-bold shadow-sm">
                      {chat.unread}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* User Profile */}
      <div className="p-4 border-t border-blue-200/50 dark:border-gray-700/50 bg-white/30 dark:bg-gray-800/30">
        <div className="flex items-center gap-3 p-3 rounded-xl glass-effect shadow-sm">
          <Avatar className="h-10 w-10 border-2 border-blue-200 dark:border-blue-700">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
              U
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 dark:text-gray-100">You</p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm text-green-600 dark:text-green-400 font-medium">Online</p>
            </div>
          </div>
          <div className="flex gap-1">
            <Link href="/profile">
              <Button size="icon" variant="ghost" className="hover:bg-blue-100 dark:hover:bg-blue-900/20">
                <User className="h-4 w-4 text-blue-700 dark:text-blue-400" />
              </Button>
            </Link>
            <Button size="icon" variant="ghost" className="hover:bg-blue-100 dark:hover:bg-blue-900/20">
              <Settings className="h-4 w-4 text-blue-700 dark:text-blue-400" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
