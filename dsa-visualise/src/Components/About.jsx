import React from "react";
import { Code, Play, Book, BarChart2, Cpu, CheckCircle, Layers, Users, Zap, Globe, Award } from "lucide-react";

const AboutPage = () => {
  const features = [
    {
      icon: <Code className="w-12 h-12 text-green-600" />,
      title: "Solve Problems",
      description: "Access thousands of coding problems across various difficulty levels and languages, and improve your problem-solving skills."
    },
    {
      icon: <Play className="w-12 h-12 text-blue-600" />,
      title: "Run & Test Code",
      description: "Instantly execute your code in a powerful runtime environment supporting multiple programming languages."
    },
    {
      icon: <Book className="w-12 h-12 text-purple-600" />,
      title: "Learn Topics",
      description: "Explore curated tutorials, guides, and theory to strengthen your knowledge in data structures, algorithms, and more."
    },
    {
      icon: <BarChart2 className="w-12 h-12 text-red-600" />,
      title: "Track Progress",
      description: "Visualize your learning journey, track solved problems, streaks, and milestones to stay motivated."
    },
    {
      icon: <Cpu className="w-12 h-12 text-teal-600" />,
      title: "Dry Run Code",
      description: "Step through your code line by line to understand logic flow and debug effectively."
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-orange-500" />,
      title: "Compiler Support",
      description: "Compile and run code efficiently with instant feedback and detailed error reporting."
    },
    {
      icon: <Layers className="w-12 h-12 text-indigo-500" />,
      title: "Data Visualization",
      description: "Visualize algorithms, data structures, and execution flow with interactive diagrams."
    },
  ];

  const stats = [
    { 
      icon: <Award className="w-8 h-8" />,
      number: "20K+", 
      label: "Problems Solved" 
    },
    { 
      icon: <Users className="w-8 h-8" />,
      number: "5K+", 
      label: "Active Users" 
    },
    { 
      icon: <Zap className="w-8 h-8" />,
      number: "10K+", 
      label: "Code Executions" 
    },
    { 
      icon: <Globe className="w-8 h-8" />,
      number: "99.9%", 
      label: "Uptime" 
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 pt-20">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-r from-green-200 to-blue-200 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-3xl opacity-30"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  About{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 animate-gradient-x">
                    CodePulse
                  </span>
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                  Master coding with our interactive platform. Practice problems, run code instantly, 
                  visualize algorithms, and track your progress—all in one place.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="group relative bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <span className="relative z-10">Get Started Free</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-gray-400 hover:bg-white/50 transition-all duration-300 transform hover:scale-105">
                  View Live Demo
                </button>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Trusted by 5,000+ developers
                </div>
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-200/50">
                <div className="grid grid-cols-2 gap-4">
                  {/* Code Blocks */}
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className={`p-4 rounded-lg border-2 ${
                      item === 1 ? "bg-green-50 border-green-200" :
                      item === 2 ? "bg-blue-50 border-blue-200" :
                      item === 3 ? "bg-purple-50 border-purple-200" :
                      "bg-orange-50 border-orange-200"
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${
                          item === 1 ? "bg-green-500" :
                          item === 2 ? "bg-blue-500" :
                          item === 3 ? "bg-purple-500" :
                          "bg-orange-500"
                        }`}></div>
                        <div className="text-xs font-mono text-gray-600">code_{item}.js</div>
                      </div>
                      <div className="space-y-1">
                        <div className="h-1 bg-gray-300 rounded"></div>
                        <div className="h-1 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-1 bg-gray-300 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  Live
                </div>
                <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  Running
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">Features</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              Everything you need to master programming, from beginner to advanced levels. 
              Practice, learn, and grow with our comprehensive toolkit.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="group relative bg-white rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-200/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
              >
                {/* Background Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-inner group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="relative text-xl lg:text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="relative text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-green-500 to-blue-500 bg-clip-border opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
                  <div className="absolute inset-[2px] rounded-2xl bg-white"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Level Up Your Coding Skills?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of developers who are mastering programming with CodePulse. 
            Start your journey today and transform your coding abilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Start Coding Now
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:bg-opacity-10 transition-all duration-300 transform hover:scale-105">
              Explore Features
            </button>
          </div>
          
          {/* Additional Info */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-blue-200">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              Free forever plan
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              Setup in 30 seconds
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              CodePulse
            </h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Empowering developers worldwide to write better code, faster.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">
                Contact
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline">
                Documentation
              </a>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 CodePulse. Made with ❤️ for developers everywhere.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;