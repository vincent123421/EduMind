"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, BookOpen, Calendar, ArrowRight, Sparkles, Users, Target } from "lucide-react"
import Link from "next/link"

interface Project {
  id: string
  name: string
  createdAt: string
  description: string
  fileCount: number
}

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([])

  // 模拟获取用户项目数据
  useEffect(() => {
    const mockProjects: Project[] = [
      {
        id: "1",
        name: "高等数学复习",
        createdAt: "2024-01-15",
        description: "包含教科书和历年真题",
        fileCount: 5,
      },
      {
        id: "2",
        name: "英语四级备考",
        createdAt: "2024-01-10",
        description: "词汇书和模拟试题",
        fileCount: 3,
      },
    ]
    setProjects(mockProjects)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">AI学习助手</h1>
            </div>
            <nav className="flex items-center space-x-6">
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                关于我们
              </Link>
              <Button variant="outline">登录</Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">智能学习，高效提升</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            上传教科书和往年试卷，让AI助手帮您提取知识点、生成思维导图，提供个性化学习指导
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/project/new">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                <Plus className="mr-2 h-5 w-5" />
                创建新项目
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="px-8 py-3 bg-transparent">
                了解更多
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Preview */}
        <section className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>智能文档分析</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">上传教科书和试卷，AI自动提取关键知识点和考试重点</p>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>答题模板生成</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">从往年试卷中提取答题模式，生成标准化答题模板</p>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>思维导图整理</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">将复杂知识结构化，生成清晰的思维导图帮助记忆</p>
            </CardContent>
          </Card>
        </section>

        {/* Projects Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">我的项目</h3>
            <Link href="/project/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                新建项目
              </Button>
            </Link>
          </div>

          {projects.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">还没有任何项目</h4>
                <p className="text-gray-600 mb-6">创建您的第一个学习项目，开始智能学习之旅</p>
                <Link href="/project/new">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="mr-2 h-4 w-4" />
                    创建项目
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{project.name}</span>
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {project.createdAt}
                      </div>
                      <span>{project.fileCount} 个文件</span>
                    </div>
                    <Link href={`/project/${project.id}`}>
                      <Button className="w-full bg-transparent" variant="outline">
                        进入项目
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 AI学习助手. 让学习更智能，让知识更有序。</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
