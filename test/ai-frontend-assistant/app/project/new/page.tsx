"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NewProjectPage() {
  const router = useRouter()
  const [projectName, setProjectName] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!projectName.trim()) return

    setIsCreating(true)

    // 模拟创建项目
    setTimeout(() => {
      const projectId = Date.now().toString()
      router.push(`/project/${projectId}`)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">AI学习助手</h1>
            </Link>
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                返回首页
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">创建新项目</h2>
            <p className="text-gray-600">为您的学习内容创建一个专属项目，开始智能学习之旅</p>
          </div>

          {/* Create Project Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="mr-2 h-5 w-5 text-blue-600" />
                项目信息
              </CardTitle>
              <CardDescription>请填写项目的基本信息，这将帮助您更好地组织学习内容</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateProject} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="projectName">项目名称 *</Label>
                  <Input
                    id="projectName"
                    placeholder="例如：高等数学复习、英语四级备考"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectDescription">项目描述</Label>
                  <Textarea
                    id="projectDescription"
                    placeholder="简单描述一下这个项目的学习目标和内容..."
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    disabled={isCreating || !projectName.trim()}
                  >
                    {isCreating ? "创建中..." : "创建项目"}
                  </Button>
                  <Link href="/" className="flex-1">
                    <Button type="button" variant="outline" className="w-full bg-transparent">
                      取消
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="mt-6 bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">💡 使用提示</CardTitle>
            </CardHeader>
            <CardContent className="text-blue-700">
              <ul className="space-y-2 text-sm">
                <li>• 建议为不同科目或考试创建独立的项目</li>
                <li>• 项目名称要简洁明了，便于后续管理</li>
                <li>• 创建项目后，您可以上传相关的教科书和试卷</li>
                <li>• AI助手将基于您上传的内容提供个性化学习指导</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
