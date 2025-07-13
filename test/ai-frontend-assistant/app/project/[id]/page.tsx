"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Sparkles,
  ArrowLeft,
  Upload,
  FileText,
  Send,
  Bot,
  User,
  Target,
  Map,
  BookOpen,
  GraduationCap,
  Loader2,
  Brain,
  Calendar,
  BarChart3,
  PenTool,
  Star,
  Settings,
  Search,
  MoreHorizontal,
  Lightbulb,
  CheckCircle2,
  TrendingUp,
  Zap,
} from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

interface UploadedFile {
  id: string
  name: string
  type: "textbook" | "exam"
  size: string
  status: "processing" | "completed"
}

interface Tool {
  id: string
  name: string
  icon: React.ElementType
  description: string
  color: string
  requiresFiles?: "textbook" | "exam" | "any"
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "🎉 欢迎来到智能学习工作台！\n\n我可以帮您：📚 分析学习资料 🎯 生成答题模板 🧠 制作思维导图 📊 跟踪学习进度\n\n请上传文件或直接向我提问，也可以使用右侧的智能工具！",
      timestamp: "10:00",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFileType, setSelectedFileType] = useState<"textbook" | "exam">("textbook")
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeTools, setActiveTools] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const projectName = "高等数学复习"

  const tools: Tool[] = [
    {
      id: "template",
      name: "答题模板",
      icon: Target,
      description: "从试卷中提取标准答题模式",
      color: "text-emerald-600",
      requiresFiles: "exam",
    },
    {
      id: "mindmap",
      name: "思维导图",
      icon: Map,
      description: "生成知识点结构图",
      color: "text-purple-600",
      requiresFiles: "textbook",
    },
    {
      id: "summary",
      name: "内容总结",
      icon: FileText,
      description: "智能提取核心知识点",
      color: "text-blue-600",
      requiresFiles: "any",
    },
    {
      id: "quiz",
      name: "智能测试",
      icon: Brain,
      description: "生成个性化练习题",
      color: "text-orange-600",
      requiresFiles: "any",
    },
    {
      id: "plan",
      name: "学习计划",
      icon: Calendar,
      description: "制定个性化学习路径",
      color: "text-indigo-600",
    },
    {
      id: "progress",
      name: "进度分析",
      icon: BarChart3,
      description: "分析学习进度和薄弱点",
      color: "text-pink-600",
    },
    {
      id: "notes",
      name: "智能笔记",
      icon: PenTool,
      description: "整理和优化学习笔记",
      color: "text-teal-600",
    },
    {
      id: "flashcard",
      name: "记忆卡片",
      icon: Star,
      description: "生成记忆卡片辅助背诵",
      color: "text-yellow-600",
    },
  ]

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage("")

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "我正在分析您的问题并基于上传的资料为您提供详细解答...",
        timestamp: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    setIsUploading(true)

    Array.from(files).forEach((file) => {
      const newFile: UploadedFile = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: selectedFileType,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
        status: "processing",
      }

      setUploadedFiles((prev) => [...prev, newFile])

      setTimeout(() => {
        setUploadedFiles((prev) => prev.map((f) => (f.id === newFile.id ? { ...f, status: "completed" } : f)))

        const aiMessage: Message = {
          id: Date.now().toString() + Math.random(),
          role: "assistant",
          content: `✅ 文件「${file.name}」处理完成！现在可以使用右侧工具栏中的相关功能了。`,
          timestamp: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
        }
        setMessages((prev) => [...prev, aiMessage])
      }, 2000)
    })

    setIsUploading(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleToolClick = (tool: Tool) => {
    if (!canUseTool(tool)) return

    setIsProcessing(true)
    setActiveTools((prev) => [...prev, tool.id])

    const toolResponses: Record<string, string> = {
      template: `🎯 **答题模板生成完成**\n\n**微积分解题步骤**：\n1️⃣ 判断题型 → 2️⃣ 选择方法 → 3️⃣ 逐步计算 → 4️⃣ 验证结果`,
      mindmap: `🧠 **思维导图生成完成**\n\n高等数学\n├── 极限与连续\n├── 导数与微分\n└── 积分学\n\n💡 建议按此结构学习！`,
      summary: `📚 **核心知识点**\n\n🔹 重点概念 (85%)\n🔸 关键方法 (72%)\n⚠️ 薄弱环节需加强`,
      quiz: `🧪 **练习题生成**\n\n1. 计算极限 ⭐⭐⭐\n2. 求函数极值 ⭐⭐⭐⭐\n3. 定积分计算 ⭐⭐⭐⭐⭐`,
      plan: `📅 **学习计划**\n\n第1周：基础巩固\n第2周：方法提升\n第3周：应用强化`,
      progress: `📊 **学习进度**\n\n整体进度: 68%\n🟢 极限: 85%\n🟡 导数: 72%\n🔴 积分: 45%`,
      notes: `📝 **学习笔记**\n\n**重要公式**\n• (x^n)' = nx^(n-1)\n• ∫x^n dx = x^(n+1)/(n+1)`,
      flashcard: `🎴 **记忆卡片**\n\n卡片1: 洛必达法则\n卡片2: 导数几何意义\n卡片3: 定积分性质`,
    }

    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now().toString() + Math.random(),
        role: "assistant",
        content: toolResponses[tool.id] || `✨ ${tool.name}功能执行完成！`,
        timestamp: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsProcessing(false)
      setActiveTools((prev) => prev.filter((id) => id !== tool.id))
    }, 1500)
  }

  const canUseTool = (tool: Tool) => {
    if (!tool.requiresFiles) return true
    if (tool.requiresFiles === "any") return uploadedFiles.some((f) => f.status === "completed")
    return uploadedFiles.some((f) => f.type === tool.requiresFiles && f.status === "completed")
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col overflow-hidden">
      {/* Compact Header - Fixed Height */}
      <header className="border-b border-white/20 bg-white/70 backdrop-blur-xl shadow-sm flex-shrink-0 h-16">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2">
              <div className="p-1 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-base font-bold text-gray-900">AI学习助手</h1>
            </Link>
            <Separator orientation="vertical" className="h-4" />
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span className="text-xs font-medium text-gray-700">{projectName}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Settings className="h-3 w-3" />
            </Button>
            <Link href="/">
              <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent">
                <ArrowLeft className="mr-1 h-3 w-3" />
                返回
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content - Fixed Height with Scroll */}
      <div className="flex-1 container mx-auto px-4 py-3 overflow-hidden">
        <div className="grid grid-cols-12 gap-3 h-full">
          {/* Left Sidebar - File Management */}
          <div className="col-span-3 flex flex-col space-y-2 overflow-hidden">
            {/* File Upload - Fixed Height */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg flex-shrink-0">
              <CardContent className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-xs text-gray-900">文件管理</h3>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs h-4">
                    {uploadedFiles.length}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant={selectedFileType === "textbook" ? "default" : "outline"}
                      onClick={() => setSelectedFileType("textbook")}
                      className="flex-1 h-6 text-xs"
                    >
                      <BookOpen className="h-2 w-2 mr-1" />
                      教科书
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedFileType === "exam" ? "default" : "outline"}
                      onClick={() => setSelectedFileType("exam")}
                      className="flex-1 h-6 text-xs"
                    >
                      <GraduationCap className="h-2 w-2 mr-1" />
                      试卷
                    </Button>
                  </div>

                  <div
                    className="border-2 border-dashed border-gray-200 rounded-lg p-3 text-center hover:border-blue-300 hover:bg-blue-50/50 transition-all cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 text-blue-600 mx-auto mb-1" />
                    <p className="text-xs font-medium text-gray-700">点击上传</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>

                  {isUploading && (
                    <div className="flex items-center justify-center py-1 bg-blue-50 rounded-lg">
                      <Loader2 className="h-3 w-3 animate-spin text-blue-600 mr-1" />
                      <span className="text-xs text-blue-600">上传中...</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* File List - Scrollable */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg flex-1 min-h-0">
              <CardContent className="p-3 h-full flex flex-col">
                <h3 className="font-semibold text-xs text-gray-900 mb-2 flex-shrink-0">已上传文件</h3>
                <ScrollArea className="flex-1">
                  {uploadedFiles.length === 0 ? (
                    <div className="text-center py-4 text-gray-400">
                      <FileText className="h-5 w-5 mx-auto mb-1 opacity-50" />
                      <p className="text-xs">暂无文件</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {uploadedFiles.map((file) => (
                        <div key={file.id} className="p-2 bg-gray-50 rounded-lg border text-xs">
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate text-gray-900 text-xs">{file.name}</p>
                              <div className="flex items-center space-x-1 mt-0.5">
                                <Badge
                                  variant={file.type === "textbook" ? "default" : "secondary"}
                                  className="text-xs h-3 px-1"
                                >
                                  {file.type === "textbook" ? "教科书" : "试卷"}
                                </Badge>
                                <span className="text-gray-500 text-xs">{file.size}</span>
                              </div>
                            </div>
                            {file.status === "processing" ? (
                              <Loader2 className="h-3 w-3 animate-spin text-blue-600" />
                            ) : (
                              <CheckCircle2 className="h-3 w-3 text-green-600" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Center - AI Chat */}
          <div className="col-span-6 flex flex-col overflow-hidden">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg flex-1 min-h-0 flex flex-col">
              <CardContent className="flex-1 flex flex-col p-3 overflow-hidden">
                {/* Chat Header - Fixed */}
                <div className="flex items-center justify-between mb-3 flex-shrink-0">
                  <div className="flex items-center space-x-2">
                    <div className="p-1 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                      <Bot className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xs text-gray-900">AI学习助手</h3>
                      <p className="text-xs text-gray-500">{isProcessing ? "处理中..." : "在线"}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Search className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Messages - Scrollable */}
                <ScrollArea className="flex-1 pr-2">
                  <div className="space-y-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex items-start space-x-2 max-w-[85%] ${message.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                        >
                          <div
                            className={`p-1 rounded-lg flex-shrink-0 ${message.role === "user" ? "bg-gradient-to-br from-blue-600 to-blue-700" : "bg-gray-100"}`}
                          >
                            {message.role === "user" ? (
                              <User className="h-3 w-3 text-white" />
                            ) : (
                              <Bot className="h-3 w-3 text-gray-600" />
                            )}
                          </div>
                          <div
                            className={`p-2 rounded-xl ${message.role === "user" ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white" : "bg-gray-50 border"}`}
                          >
                            <div className="whitespace-pre-wrap text-xs leading-relaxed">{message.content}</div>
                            <p
                              className={`text-xs mt-1 ${message.role === "user" ? "text-blue-100" : "text-gray-500"}`}
                            >
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Input Area - Fixed */}
                <div className="mt-3 space-y-2 flex-shrink-0">
                  <div className="flex space-x-2">
                    <div className="flex-1 relative">
                      <Input
                        placeholder="向AI助手提问或使用右侧工具..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        disabled={isProcessing}
                        className="pr-8 h-8 bg-white border-gray-200 focus:border-blue-400 text-xs"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isProcessing}
                        size="sm"
                        className="absolute right-1 top-1 h-6 w-6 p-0 bg-gradient-to-r from-blue-600 to-purple-600"
                      >
                        <Send className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Quick Suggestions */}
                  <div className="flex space-x-1">
                    <Button variant="outline" size="sm" className="h-5 text-xs px-2 bg-transparent">
                      <Lightbulb className="h-2 w-2 mr-1" />
                      解释概念
                    </Button>
                    <Button variant="outline" size="sm" className="h-5 text-xs px-2 bg-transparent">
                      <TrendingUp className="h-2 w-2 mr-1" />
                      学习计划
                    </Button>
                    <Button variant="outline" size="sm" className="h-5 text-xs px-2 bg-transparent">
                      <Target className="h-2 w-2 mr-1" />
                      练习题
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Tools */}
          <div className="col-span-3 flex flex-col overflow-hidden">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg h-full">
              <CardContent className="p-3 h-full flex flex-col overflow-hidden">
                <div className="flex items-center space-x-1 mb-3 flex-shrink-0">
                  <Zap className="h-3 w-3 text-yellow-600" />
                  <h3 className="font-semibold text-xs text-gray-900">智能工具</h3>
                </div>

                <ScrollArea className="flex-1">
                  <div className="space-y-1">
                    {tools.map((tool) => (
                      <TooltipProvider key={tool.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              onClick={() => handleToolClick(tool)}
                              disabled={!canUseTool(tool) || activeTools.includes(tool.id)}
                              className="w-full h-12 flex items-center justify-start p-2 hover:shadow-md transition-all text-left relative"
                            >
                              <div className="flex items-center space-x-2 flex-1">
                                {activeTools.includes(tool.id) ? (
                                  <Loader2 className="h-4 w-4 animate-spin text-blue-600 flex-shrink-0" />
                                ) : (
                                  <tool.icon className={`h-4 w-4 ${tool.color} flex-shrink-0`} />
                                )}
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-xs text-gray-900">{tool.name}</p>
                                  <p className="text-xs text-gray-500 truncate">{tool.description}</p>
                                </div>
                              </div>
                              {!canUseTool(tool) && (
                                <div className="absolute inset-0 bg-gray-100/80 rounded-md flex items-center justify-center">
                                  <span className="text-xs text-gray-500">
                                    需要
                                    {tool.requiresFiles === "textbook"
                                      ? "教科书"
                                      : tool.requiresFiles === "exam"
                                        ? "试卷"
                                        : "文件"}
                                  </span>
                                </div>
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="left">
                            <div className="max-w-xs">
                              <p className="font-medium text-xs">{tool.name}</p>
                              <p className="text-xs text-gray-600 mt-1">{tool.description}</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </ScrollArea>

                {/* Tool Status - Fixed */}
                <div className="mt-2 pt-2 border-t border-gray-200 flex-shrink-0">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>可用工具</span>
                    <span>
                      {tools.filter((tool) => canUseTool(tool)).length}/{tools.length}
                    </span>
                  </div>
                  <div className="mt-1 bg-gray-200 rounded-full h-1">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-1 rounded-full transition-all"
                      style={{
                        width: `${(tools.filter((tool) => canUseTool(tool)).length / tools.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
