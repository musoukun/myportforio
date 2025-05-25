import Image from "next/image";
import ChatDemo from "./components/ChatDemo";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      {/* ヘッダー */}
      <header className="p-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
          Webアプリ開発者ポートフォリオ
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Next.js × React × TypeScript で構築
        </p>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-6xl mx-auto px-6 pb-12">
        {/* AIチャットデモセクション */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
              AIチャットアプリケーション デモ
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              React + TypeScript + Langchain.js を活用したAIアプリケーションの開発が可能です
            </p>
          </div>
          <ChatDemo />
        </section>

        {/* 経歴概要セクション */}
        <section className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              開発経験
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-center">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">7</span>
                アプリケーション開発（年）
              </li>
              <li className="flex items-center">
                <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</span>
                運用保守（年）
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              主要技術スタック
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {["React", "Next.js", "TypeScript", "Laravel", "Java", "PHP", "Python", "Docker"].map((tech) => (
                <span key={tech} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 特徴セクション */}
        <section className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl mb-4">🚀</div>
            <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              モダン開発
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              最新のフレームワークと開発手法を活用した効率的な開発
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl mb-4">🤖</div>
            <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              AI活用
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              LangChain.js × React でのAIアプリケーション開発
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl mb-4">💼</div>
            <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              豊富な経験
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              要件定義からリリースまでの一貫した開発経験
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
