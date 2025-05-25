import { Assistant } from "./components/assistant-ui/assistant";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* ヒーローセクション */}
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        
        {/* メインコンテンツエリア */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center">
          
          {/* 左側：AIチャットデモ */}
          <div className="order-2 lg:order-1">
            <div className="w-full max-w-lg mx-auto">
              <Assistant />
            </div>
          </div>
          
          {/* 右側：プロフィール情報 */}
          <div className="order-1 lg:order-2 text-center lg:text-left text-white">
            <div className="mb-8 lg:hidden">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <span className="text-4xl">👨‍💻</span>
              </div>
            </div>
            
            <div className="hidden lg:block mb-8">
              <div className="w-40 h-40 mb-6 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <span className="text-5xl">👨‍💻</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
              I&apos;m <span className="text-yellow-300">hatakeyama</span>
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-light mb-6 opacity-90">
              nextjs web app developer
            </h2>
            <p className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 mb-8 opacity-80">
              7年間のアプリケーション開発経験と3年間の運用保守経験を持つWebアプリ開発者です
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                View My Work
              </button>
              <button className="border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Contact Me
              </button>
            </div>
          </div>
        </div>
        
        {/* スクロールインジケーター */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About Me セクション */}
      <section id="about" className="py-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">About Me</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              Hi there! I&apos;m a passionate web developer.
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              住宅基幹システムのWEBアプリケーションの運用業務を約2年間経験した後、スクラッチ開発及びSaas系のWebアプリケーションの開発業務を約4年経験しました。
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              使用言語はPHP、Java、Apex、Javascriptを使っていました。最近ではReact + TypeScript + Langchain.jsを活用したAIアプリケーションの開発も行っています。
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">7+</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">Years Development</div>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">3+</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">Years Operations</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">React & Next.js</span>
              <span className="text-blue-600 font-semibold">90%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{width: "90%"}}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">PHP & Laravel</span>
              <span className="text-blue-600 font-semibold">85%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{width: "85%"}}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">Java & Spring</span>
              <span className="text-blue-600 font-semibold">80%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{width: "80%"}}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-700 dark:text-gray-300">TypeScript</span>
              <span className="text-blue-600 font-semibold">85%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{width: "85%"}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services セクション */}
      <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">My Services</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              幅広い技術スタックを活用して、現代的なWebアプリケーションを開発します
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">⚛️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Frontend Development</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                React, Next.js, TypeScriptを使用したモダンなフロントエンド開発
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• Responsive Design</li>
                <li>• SPA Development</li>
                <li>• Performance Optimization</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Backend Development</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                PHP Laravel, Java Spring Framework を使用したサーバーサイド開発
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• RESTful API</li>
                <li>• Database Design</li>
                <li>• System Integration</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">AI Integration</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                LangChain.js を活用したAIアプリケーションの開発と統合
              </p>
              <ul className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <li>• LLM Applications</li>
                <li>• Natural Language Processing</li>
                <li>• AI-powered Features</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact セクション */}
      <section id="contact" className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Let&apos;s Work Together</h2>
          <p className="text-xl mb-8 opacity-90">
            新しいプロジェクトのご相談やお問い合わせをお待ちしています
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Get In Touch
          </button>
        </div>
      </section>
    </div>
  );
}
