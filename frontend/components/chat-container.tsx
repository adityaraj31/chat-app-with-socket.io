"use client"

import { useChat } from "ai/react"
import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Paperclip, Smile, MoreVertical, Phone, Video, Bot, Sparkles } from "lucide-react"

interface ChatContainerProps {
  selectedChat: string | null
}

export function ChatContainer({ selectedChat }: ChatContainerProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50/50 to-white dark:from-gray-900/50 dark:to-gray-800">
        <div className="text-center max-w-md">
          <div className="h-32 w-32 gradient-blue rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Sparkles className="h-16 w-16 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-gray-100">Welcome to ChatApp</h3>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Select a conversation to start messaging</p>
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              💡 Tip: Try chatting with our AI Assistant for instant help!
            </p>
          </div>
        </div>
      </div>
    )
  }

  const getChatName = (chatId: string) => {
    const chatNames: { [key: string]: string } = {
      "1": "AI Assistant",
      "2": "John Doe",
      "3": "Sarah Wilson",
      "4": "Team Chat",
      "5": "Mike Johnson",
    }
    return chatNames[chatId] || "Unknown Chat"
  }

  const isAIChat = selectedChat === "1"

  return (
    <div className="flex-1 flex flex-col h-full min-w-0 bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-blue-200 dark:border-blue-700 shadow-sm">
              <AvatarImage src="/placeholder.svg?height=48&width=48" />
              <AvatarFallback
                className={`font-semibold text-white ${isAIChat ? "bg-gradient-to-br from-blue-500 to-purple-500" : "bg-gradient-to-br from-blue-500 to-blue-600"}`}
              >
                {isAIChat ? (
                  <Bot className="h-6 w-6" />
                ) : (
                  getChatName(selectedChat)
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                )}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg">{getChatName(selectedChat)}</h3>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                {isAIChat ? "AI Assistant • Always available" : "Last seen 2 hours ago"}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" className="hover:bg-blue-50 dark:hover:bg-blue-900/20">
              <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </Button>
            <Button size="icon" variant="ghost" className="hover:bg-blue-50 dark:hover:bg-blue-900/20">
              <Video className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </Button>
            <Button size="icon" variant="ghost" className="hover:bg-blue-50 dark:hover:bg-blue-900/20">
              <MoreVertical className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6 custom-scrollbar" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 py-12">
              <div className="mb-4">
                {isAIChat ? (
                  <div className="w-16 h-16 gradient-blue rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bot className="h-8 w-8 text-white" />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>
              <p className="text-lg font-medium">Start a conversation with {getChatName(selectedChat)}</p>
              {isAIChat && (
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">Ask me anything! I'm here to help.</p>
              )}
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              {message.role === "assistant" && (
                <Avatar className="h-10 w-10 border-2 border-blue-200 dark:border-blue-700 shadow-sm">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={`max-w-[75%] rounded-2xl p-4 shadow-sm transition-all duration-200 ${
                  message.role === "user"
                    ? "gradient-blue text-white"
                    : "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p
                  className={`text-xs mt-2 ${message.role === "user" ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}`}
                >
                  {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>

              {message.role === "user" && (
                <Avatar className="h-10 w-10 border-2 border-blue-200 dark:border-blue-700 shadow-sm">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white font-semibold">
                    U
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4 justify-start">
              <Avatar className="h-10 w-10 border-2 border-blue-200 dark:border-blue-700 shadow-sm">
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 shadow-sm">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Button type="button" size="icon" variant="ghost" className="hover:bg-blue-50 dark:hover:bg-blue-900/20">
            <Paperclip className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </Button>
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder={`Message ${getChatName(selectedChat)}...`}
              className="pr-12 py-3 border-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl bg-white dark:bg-gray-800"
              disabled={isLoading}
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <Smile className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </Button>
          </div>
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="gradient-blue hover:opacity-90 shadow-md"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}
