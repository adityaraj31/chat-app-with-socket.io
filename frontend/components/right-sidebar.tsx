"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Users,
  ImageIcon,
  FileText,
  Link,
  Bell,
  BellOff,
  Star,
  Trash2,
  Search,
  Shield,
  Crown,
  User,
} from "lucide-react"

interface RightSidebarProps {
  selectedChat: string | null
}

const mockMembers = [
  { id: "1", name: "John Doe", status: "online", role: "Admin", avatar: "JD" },
  { id: "2", name: "Sarah Wilson", status: "away", role: "Member", avatar: "SW" },
  { id: "3", name: "Mike Johnson", status: "offline", role: "Member", avatar: "MJ" },
  { id: "4", name: "Emma Davis", status: "online", role: "Moderator", avatar: "ED" },
]

const mockFiles = [
  { id: "1", name: "project-proposal.pdf", type: "pdf", size: "2.4 MB", date: "2 days ago" },
  { id: "2", name: "design-mockup.png", type: "image", size: "1.8 MB", date: "1 week ago" },
  { id: "3", name: "meeting-notes.docx", type: "doc", size: "156 KB", date: "2 weeks ago" },
]

const mockLinks = [
  { id: "1", url: "https://github.com/project", title: "Project Repository", date: "3 days ago" },
  { id: "2", url: "https://figma.com/design", title: "Design System", date: "1 week ago" },
]

export function RightSidebar({ selectedChat }: RightSidebarProps) {
  const [activeTab, setActiveTab] = useState<"members" | "files" | "links">("members")

  if (!selectedChat) {
    return (
      <div className="w-80 bg-gradient-to-b from-blue-50/50 to-white dark:from-gray-900/50 dark:to-gray-800 border-l border-blue-200/50 dark:border-gray-700/50 flex items-center justify-center flex-shrink-0">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-blue-500 dark:text-blue-400" />
          </div>
          <p className="text-gray-500 dark:text-gray-400">Select a chat to view details</p>
        </div>
      </div>
    )
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Admin":
        return <Crown className="h-3 w-3 text-yellow-500" />
      case "Moderator":
        return <Shield className="h-3 w-3 text-blue-500 dark:text-blue-400" />
      default:
        return <User className="h-3 w-3 text-gray-400" />
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800"
      case "Moderator":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800"
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700"
    }
  }

  return (
    <div className="w-80 bg-gradient-to-b from-blue-50/50 to-white dark:from-gray-900/50 dark:to-gray-800 border-l border-blue-200/50 dark:border-gray-700/50 flex flex-col h-full flex-shrink-0 shadow-custom">
      {/* Header */}
      <div className="p-6 border-b border-blue-200/50 dark:border-gray-700/50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg">Chat Details</h3>
          <div className="flex gap-1">
            <Button size="icon" variant="ghost" className="hover:bg-blue-100 dark:hover:bg-blue-900/20">
              <Bell className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </Button>
            <Button size="icon" variant="ghost" className="hover:bg-blue-100 dark:hover:bg-blue-900/20">
              <Star className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-white dark:bg-gray-800 rounded-xl p-1 shadow-sm border border-blue-200/50 dark:border-gray-700/50">
          <Button
            variant={activeTab === "members" ? "default" : "ghost"}
            size="sm"
            className={`flex-1 transition-all duration-200 ${
              activeTab === "members"
                ? "gradient-blue text-white shadow-sm"
                : "hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-700 dark:text-blue-400"
            }`}
            onClick={() => setActiveTab("members")}
          >
            <Users className="h-4 w-4 mr-1" />
            Members
          </Button>
          <Button
            variant={activeTab === "files" ? "default" : "ghost"}
            size="sm"
            className={`flex-1 transition-all duration-200 ${
              activeTab === "files"
                ? "gradient-blue text-white shadow-sm"
                : "hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-700 dark:text-blue-400"
            }`}
            onClick={() => setActiveTab("files")}
          >
            <FileText className="h-4 w-4 mr-1" />
            Files
          </Button>
          <Button
            variant={activeTab === "links" ? "default" : "ghost"}
            size="sm"
            className={`flex-1 transition-all duration-200 ${
              activeTab === "links"
                ? "gradient-blue text-white shadow-sm"
                : "hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-700 dark:text-blue-400"
            }`}
            onClick={() => setActiveTab("links")}
          >
            <Link className="h-4 w-4 mr-1" />
            Links
          </Button>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 custom-scrollbar">
        {activeTab === "members" && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Members ({mockMembers.length})</h4>
              <Button size="sm" className="gradient-blue text-white shadow-sm">
                Add Member
              </Button>
            </div>

            <div className="space-y-3">
              {mockMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/70 dark:hover:bg-gray-800/50 transition-all duration-200 border border-transparent hover:border-blue-200/50 dark:hover:border-gray-700/50"
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12 border-2 border-white dark:border-gray-700 shadow-sm">
                      <AvatarImage src="/placeholder.svg?height=48&width=48" />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white dark:border-gray-800 shadow-sm ${
                        member.status === "online"
                          ? "bg-green-500"
                          : member.status === "away"
                            ? "bg-yellow-500"
                            : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{member.name}</p>
                      {getRoleIcon(member.role)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs border ${getRoleBadgeColor(member.role)}`}>{member.role}</Badge>
                      <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{member.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "files" && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Shared Files</h4>
              <Button size="icon" variant="ghost" className="hover:bg-blue-100 dark:hover:bg-blue-900/20">
                <Search className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </Button>
            </div>

            <div className="space-y-3">
              {mockFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/70 dark:hover:bg-gray-800/50 transition-all duration-200 border border-transparent hover:border-blue-200/50 dark:hover:border-gray-700/50"
                >
                  <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                    {file.type === "image" ? (
                      <ImageIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">{file.name}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>{file.size}</span>
                      <span>•</span>
                      <span>{file.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "links" && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Shared Links</h4>
              <Button size="icon" variant="ghost" className="hover:bg-blue-100 dark:hover:bg-blue-900/20">
                <Search className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </Button>
            </div>

            <div className="space-y-3">
              {mockLinks.map((link) => (
                <div
                  key={link.id}
                  className="p-4 border border-blue-200/50 dark:border-gray-700/50 rounded-xl hover:bg-white/70 dark:hover:bg-gray-800/50 transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                      <Link className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">{link.title}</p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 truncate hover:underline cursor-pointer">
                        {link.url}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{link.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ScrollArea>

      {/* Actions */}
      <div className="p-6 border-t border-blue-200/50 dark:border-gray-700/50 bg-white/30 dark:bg-gray-800/30">
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            <BellOff className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
            Mute
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Leave
          </Button>
        </div>
      </div>
    </div>
  )
}
