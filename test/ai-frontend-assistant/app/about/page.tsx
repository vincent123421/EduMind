"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Sparkles,
  BookOpen,
  Brain,
  Target,
  Zap,
  Users,
  ArrowRight,
  CheckCircle,
  Upload,
  MessageSquare,
  Map,
} from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const features = [
    {
      icon: Upload,
      title: "智能文档上传",
      description: "支持多种格式的教科书和试卷上传，AI自动识别和分析内容结构",
    },
    {
      icon: MessageSquare,
      title: "AI助手对话",
      description: "24/7在线AI助手，基于您的学习材料提供个性化答疑和指导",
    },
    {
      icon: Target,
      title: "答题模板提取",
      description: "从历年试卷中智能提取答题模式，生成标准化解题模板",
    },
    {
      icon: Map,
      title: "思维导图生成",
      description: "将复杂知识点结构化，自动生成清晰的思维导图",
    },
  ]

  const benefits = [
    "提高学习效率，节省整理时间",
    "个性化学习路径规划",
    "智能知识点提取和总结",
    "标准化答题模板生成",
    "可视化知识结构展示",
    "24/7 AI助手答疑服务",
  ]

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
            <nav className="flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                首页
              </Link>
              <Button variant="outline">登录</Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">重新定义学习方式</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            我们的AI学习助手结合了先进的人工智能技术和教育学原理，
            为学生提供个性化、高效的学习体验，让知识获取变得更加智能和有趣。
          </p>
          <div className="flex justify-center">
            <Link href="/project/new">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                开始使用
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Core Features */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">核心功能</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">使用流程</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="text-xl font-semibold mb-2">创建项目</h4>
              <p className="text-gray-600">创建学习项目，为不同科目或考试建立独立的学习空间</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="text-xl font-semibold mb-2">上传资料</h4>
              <p className="text-gray-600">上传教科书和往年试卷，AI自动分析和处理文档内容</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="text-xl font-semibold mb-2">智能学习</h4>
              <p className="text-gray-600">与AI助手对话，获取答题模板，查看思维导图，高效学习</p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">为什么选择我们？</h3>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="text-center p-6">
                <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h4 className="font-semibold mb-2">AI驱动</h4>
                <p className="text-sm text-gray-600">先进的人工智能技术</p>
              </Card>
              <Card className="text-center p-6">
                <Zap className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <h4 className="font-semibold mb-2">高效学习</h4>
                <p className="text-sm text-gray-600">显著提升学习效率</p>
              </Card>
              <Card className="text-center p-6">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="font-semibold mb-2">个性化</h4>
                <p className="text-sm text-gray-600">量身定制学习方案</p>
              </Card>
              <Card className="text-center p-6">
                <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h4 className="font-semibold mb-2">全面覆盖</h4>
                <p className="text-sm text-gray-600">支持多种学科领域</p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-12">
          <h3 className="text-3xl font-bold mb-4">准备开始您的智能学习之旅？</h3>
          <p className="text-xl mb-8 opacity-90">加入我们，体验AI驱动的个性化学习，让学习变得更加高效和有趣</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/project/new">
              <Button size="lg" variant="secondary" className="px-8 py-3">
                立即开始
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                返回首页
              </Button>
            </Link>
          </div>
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
