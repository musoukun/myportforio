import ChatDemo from "./components/ChatDemo";

export default function Home() {
	return (
		<div className="bg-gray-50 dark:bg-gray-900">
			{/* Sticky Navigation */}
			<nav className="fixed top-0 w-full bg-white dark:bg-gray-800 shadow-lg z-50 transition-all duration-300">
				<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
									HATAKEYAMA
								</h2>
							</div>
						</div>
						<div className="flex md:hidden items-center">
							<button className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							</button>
						</div>
						<div className="hidden md:flex items-center space-x-8">
							<a
								href="#home"
								className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
							>
								Home
							</a>
							<a
								href="#about"
								className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
							>
								About
							</a>
							<a
								href="#resume"
								className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
							>
								Resume
							</a>
							<a
								href="#portfolio"
								className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
							>
								Portfolio
							</a>
							<a
								href="#contact"
								className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
							>
								Contact
							</a>
						</div>
					</div>
				</div>
			</nav>

			{/* Hero Section with Parallax Effect */}
			<section
				id="home"
				className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
			>
				{/* Parallax Background */}
				<div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 opacity-90"></div>
				<div className="absolute inset-0 bg-black opacity-20"></div>

				{/* Animated Background Elements */}
				<div className="absolute inset-0">
					<div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full opacity-10 animate-pulse"></div>
					<div
						className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full opacity-10 animate-pulse"
						style={{ animationDelay: "1s" }}
					></div>
					<div
						className="absolute top-1/2 left-1/3 w-48 h-48 bg-indigo-500 rounded-full opacity-10 animate-pulse"
						style={{ animationDelay: "1s" }}
					></div>
				</div>

				{/* Main Content */}
				<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-4rem)]">
						{/* Left Side - Hero Text */}
						<div className="text-center lg:text-left pt-8 sm:pt-0">
							<div className="mb-6">
								<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
									I&apos;m{" "}
									<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 block sm:inline">
										hatakeyama
									</span>
								</h1>
								<h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light text-gray-200 mt-4">
									nextjs web app developer
								</h2>
							</div>

							<p className="text-md md:text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed">
								React + Next.js + TypeScript
								を活用したモダンWebアプリケーション開発。
								7年間の開発経験と3年間の運用保守経験を持つフルスタック開発者です。
							</p>

							<div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
								<a
									href="#portfolio"
									className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
								>
									作品を見る
								</a>
								<a
									href="#contact"
									className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
								>
									お問い合わせ
								</a>
							</div>

							{/* Statistics */}
							<div className="grid grid-cols-2 gap-8 mt-12">
								<div className="text-center lg:text-left">
									<div className="text-4xl font-bold text-white mb-2">
										7+
									</div>
									<div className="text-gray-300">
										Years Development
									</div>
								</div>
								<div className="text-center lg:text-left">
									<div className="text-4xl font-bold text-white mb-2">
										3+
									</div>
									<div className="text-gray-300">
										Years Operations
									</div>
								</div>
							</div>
						</div>

						{/* Right Side - Chat Demo */}
						<div className="flex justify-center lg:justify-end">
							<div className="w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl">
								<ChatDemo />
							</div>
						</div>
					</div>
				</div>

				{/* Scroll Indicator */}
				<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
					<div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
						<div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
					</div>
				</div>
			</section>

			{/* About Section */}
			<section id="about" className="py-20 bg-white dark:bg-gray-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
							About Me
						</h2>
						<div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
					</div>

					<div className="grid md:grid-cols-2 gap-12 items-center">
						<div>
							<h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
								モダンWebアプリケーション開発者
							</h3>
							<p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
								住宅基幹システムのWebアプリケーション運用からキャリアを開始し、Webアプリのスクラッチ開発の経験を積んできました。
								最新の技術トレンドを常にキャッチアップし、効率的な開発を心がけています。
							</p>
							<p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
								現在は特にReact + TypeScript +
								Next.jsを使用したフロントエンド開発と、
								Mastraを活用したAIアプリケーション開発に力を入れてます。
							</p>

							{/* Programming Languages Usage */}
							<div className="mb-6">
								<h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
									開発プロジェクトでの使用頻度
								</h4>
								<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
									最近はもっぱらReact + Next.js +
									TypeScriptをつかってます。
								</p>
							</div>
							<div className="space-y-4">
								<div>
									<div className="flex justify-between mb-2">
										<span className="text-gray-700 dark:text-gray-300 font-medium">
											React / Next.js + TypeScript
										</span>
										<span className="text-gray-700 dark:text-gray-300">
											80%
										</span>
									</div>
									<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
										<div
											className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
											style={{ width: "80%" }}
										></div>
									</div>
								</div>

								<div>
									<div className="flex justify-between mb-2">
										<span className="text-gray-700 dark:text-gray-300 font-medium">
											PHP / Laravel
										</span>
										<span className="text-gray-700 dark:text-gray-300">
											10%
										</span>
									</div>
									<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
										<div
											className="bg-gradient-to-r from-orange-600 to-orange-500 h-2 rounded-full"
											style={{ width: "10%" }}
										></div>
									</div>
								</div>
								<div>
									<div className="flex justify-between mb-2">
										<span className="text-gray-700 dark:text-gray-300 font-medium">
											Java / Spring
										</span>
										<span className="text-gray-700 dark:text-gray-300">
											10%
										</span>
									</div>
									<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
										<div
											className="bg-gradient-to-r from-green-600 to-green-500  h-2 rounded-full"
											style={{ width: "10%" }}
										></div>
									</div>
								</div>
							</div>
						</div>

						<div className="space-y-6">
							<div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
								<h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
									開発スタイル
								</h4>
								<ul className="space-y-3 text-gray-600 dark:text-gray-300">
									<li className="flex items-start">
										<span className="text-blue-600 mr-2">
											•
										</span>
										アイデアを形にするのが早いです。素早くWebアプリを開発します。
									</li>
									<li className="flex items-start">
										<span className="text-blue-600 mr-2">
											•
										</span>
										開発知識の教育と情報発信を重視しています。
									</li>
									<li className="flex items-start">
										<span className="text-blue-600 mr-2">
											•
										</span>
										CI/CDパイプラインの構築と運用、自動テスト等もしていました。
									</li>
								</ul>
							</div>

							<div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
								<h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
									得意分野
								</h4>
								<div className="grid grid-cols-2 gap-4">
									<div className="text-center p-3 bg-white dark:bg-gray-600 rounded-lg">
										<div className="text-2xl mb-2">💻</div>
										<div className="text-sm text-gray-600 dark:text-gray-300">
											Webアプリ開発
										</div>
									</div>
									<div className="text-center p-3 bg-white dark:bg-gray-600 rounded-lg">
										<div className="text-2xl mb-2">🤖</div>
										<div className="text-sm text-gray-600 dark:text-gray-300">
											AIアプリケーション開発
										</div>
									</div>
									<div className="text-center p-3 bg-white dark:bg-gray-600 rounded-lg">
										<div className="text-2xl mb-2">📚</div>
										<div className="text-sm text-gray-600 dark:text-gray-300">
											教育
										</div>
									</div>
									<div className="text-center p-3 bg-white dark:bg-gray-600 rounded-lg">
										<div className="text-2xl mb-2">🔧</div>
										<div className="text-sm text-gray-600 dark:text-gray-300">
											システム設計
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Portfolio Section */}
			<section id="portfolio" className="py-20 bg-white dark:bg-gray-800">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
							Portfolio
						</h2>
						<div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
						<p className="text-lg text-gray-600 dark:text-gray-300 mt-6 max-w-3xl mx-auto">
							私が開発したWebアプリケーションやツールをご紹介します。
							それぞれ異なる技術スタックと課題解決に焦点を当てています。
						</p>
					</div>

					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{/* Memo App */}
						<div className="bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
							<div className="relative h-48 overflow-hidden">
								<img
									src="https://raw.githubusercontent.com/musoukun/memoapp/main/gif/beta.gif"
									alt="Notion Clone Memo App"
									className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
							</div>
							<div className="p-6">
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
									Notion Clone Memo App
								</h3>
								<p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
									React + TypeScript +
									Prismaで開発したNotionライクなメモアプリ。BlockNoteエディターを使用してリッチテキスト編集機能を実装。両面TypeScriptで開発。
								</p>
								<div className="flex flex-wrap gap-2 mb-4">
									{[
										"TypeScript",
										"React",
										"Express",
										"Prisma",
										"PostgreSQL",
									].map((tech) => (
										<span
											key={tech}
											className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs"
										>
											{tech}
										</span>
									))}
								</div>
								<div className="flex justify-between items-center">
									<a
										href="https://github.com/musoukun/memoapp"
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors flex items-center text-sm"
									>
										<span className="mr-1">🐙</span>
										GitHub
									</a>
									<span className="text-xs text-gray-500 dark:text-gray-400">
										学習用プロジェクト
									</span>
								</div>
							</div>
						</div>

						{/* VBA 採点支援システム */}
						<div className="bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
							<div className="relative h-48 bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
								<div className="text-center text-white">
									<div className="text-6xl mb-2">📊</div>
									<div className="text-sm font-medium">
										VBA Automation
									</div>
								</div>
								<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
							</div>
							<div className="p-6">
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
									VBA 採点支援システム
								</h3>
								<p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
									学校の評価項目管理および採点基準設定を自動化するVBAシステム。科目・観点・単元別の評価シートを自動生成し、自動計算や色分け表示機能を提供。
								</p>
								<div className="flex flex-wrap gap-2 mb-4">
									{[
										"VBA",
										"Excel",
										"Automation",
										"Education",
									].map((tech) => (
										<span
											key={tech}
											className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs"
										>
											{tech}
										</span>
									))}
								</div>
								<div className="flex justify-between items-center">
									<a
										href="https://github.com/musoukun/saitenxlsx"
										target="_blank"
										rel="noopener noreferrer"
										className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors flex items-center text-sm"
									>
										<span className="mr-1">🐙</span>
										GitHub
									</a>
									<span className="text-xs text-gray-500 dark:text-gray-400">
										業務効率化ツール
									</span>
								</div>
							</div>
						</div>

						{/* Discord Bot */}
						<div className="bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group">
							<div className="relative h-48 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
								<div className="text-center text-white">
									<div className="text-6xl mb-2">🤖</div>
									<div className="text-sm font-medium">
										AI Voice Bot
									</div>
								</div>
								<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
							</div>
							<div className="p-6">
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
									Gemini × VOICEVOX Discord Bot
								</h3>
								<p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
									DiscordのボイスチャットでGemini
									AIとVOICEVOXを連携させた音声Bot。
									チャットに入室してずんだもんの音声でGeminiの回答を話してくれます！
									※ずんだもん以外も指定できます
								</p>
								<div className="flex flex-wrap gap-2 mb-4">
									{[
										"Node.js",
										"Discord.js",
										"Gemini API",
										"VOICEVOX",
									].map((tech) => (
										<span
											key={tech}
											className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full text-xs"
										>
											{tech}
										</span>
									))}
								</div>
								<div className="flex justify-between items-center">
									<a
										href="https://github.com/musoukun/geminiAi-voice-discord-bot"
										target="_blank"
										rel="noopener noreferrer"
										className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors flex items-center text-sm"
									>
										<span className="mr-1">🐙</span>
										GitHub
									</a>
									<span className="text-xs text-gray-500 dark:text-gray-400">
										AIアプリケーション
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Call to Action */}
					<div className="text-center mt-16">
						<div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
							<h3 className="text-2xl font-bold mb-4">
								もっと詳しく見る
							</h3>
							<p className="text-blue-100 mb-6 max-w-2xl mx-auto">
								各プロジェクトの詳細な技術仕様や開発プロセスについては、
								GitHubリポジトリをご確認ください。
							</p>
							<a
								href="https://github.com/musoukun"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
							>
								<span className="mr-2">🐙</span>
								GitHubプロフィール
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* Resume Section */}
			<section id="resume" className="py-20 bg-gray-50 dark:bg-gray-900">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
							Resume
						</h2>
						<div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
					</div>

					<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
						{/* Experience */}
						<div>
							<h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 flex items-center">
								<span className="bg-blue-600 text-white p-2 rounded-lg mr-3">
									💼
								</span>
								職歴
							</h3>

							<div className="space-y-8">
								<div className="border-l-4 border-blue-600 pl-6 pb-6">
									<h4 className="text-xl font-semibold text-gray-900 dark:text-white">
										Webアプリ開発
									</h4>
									<p className="text-blue-600 font-medium">
										製造業向けシステムインテグレータ
									</p>
									<p className="text-gray-600 dark:text-gray-400 text-sm">
										2023年10月 - 現在
									</p>
									<ul className="mt-3 space-y-2 text-gray-600 dark:text-gray-300">
										<li>
											• Nextjs or React + TypeScript +
											Express でのフルスタック開発
										</li>
										<li>
											• Playwright を用いたE2Eテスト導入
										</li>
										<li>
											• Mastra及びLangChain.js +
											Nextjsを用いたAIアプリケーション開発
										</li>
										<li>• CI/CD パイプライン構築</li>
									</ul>
								</div>

								<div className="border-l-4 border-blue-600 pl-6 pb-6">
									<h4 className="text-xl font-semibold text-gray-900 dark:text-white">
										医薬系ECサイト開発・運用
									</h4>
									<p className="text-blue-600 font-medium">
										試薬・化成品製造販売会社
									</p>
									<p className="text-gray-600 dark:text-gray-400 text-sm">
										2022年10月 - 2023年10月
									</p>
									<ul className="mt-3 space-y-2 text-gray-600 dark:text-gray-300">
										<li>
											• レガシーシステムからPHP + Laravel
											へのリプレイス主導
										</li>
										<li>• 自動テスト導入とCI/CD環境構築</li>
										<li>
											•
											開発チーム教育とモダン開発手法の導入
										</li>
									</ul>
								</div>

								<div className="border-l-4 border-blue-600 pl-6">
									<h4 className="text-xl font-semibold text-gray-900 dark:text-white">
										住宅基幹システム運用保守
									</h4>
									<p className="text-blue-600 font-medium">
										業務コンサルティング会社
									</p>
									<p className="text-gray-600 dark:text-gray-400 text-sm">
										2015年8月 - 2022年6月
									</p>
									<ul className="mt-3 space-y-2 text-gray-600 dark:text-gray-300">
										<li>
											• Salesforce (Apex)
											での機能追加・カスタマイズ
										</li>
										<li>
											•
											要件定義から設計、開発、テストまで一貫した業務
										</li>
										<li>
											•
											新人教育プログラム作成と技術勉強会主催
										</li>
									</ul>
								</div>
							</div>
						</div>

						{/* Skills */}
						<div>
							<h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 flex items-center">
								<span className="bg-purple-600 text-white p-2 rounded-lg mr-3">
									🛠️
								</span>
								技術スキル
							</h3>

							<div className="space-y-6">
								<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
									<h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
										フロントエンド
									</h4>
									<div className="flex flex-wrap gap-2">
										{[
											"React",
											"Next.js",
											"TypeScript",
											"Tailwind CSS",
											"shadcn/ui",
										].map((skill) => (
											<span
												key={skill}
												className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm"
											>
												{skill}
											</span>
										))}
									</div>
								</div>

								<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
									<h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
										バックエンド
									</h4>
									<div className="flex flex-wrap gap-2">
										{[
											"Node.js",
											"Express",
											"PHP",
											"Laravel",
											"Java",
											"Spring Boot",
											"Python",
										].map((skill) => (
											<span
												key={skill}
												className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm"
											>
												{skill}
											</span>
										))}
									</div>
								</div>

								<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
									<h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
										データベース・インフラ
									</h4>
									<div className="flex flex-wrap gap-2">
										{[
											"PostgreSQL",
											"Docker",
											"Firebase",
											"AWS(Cloud Practitioner取得)",
										].map((skill) => (
											<span
												key={skill}
												className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm"
											>
												{skill}
											</span>
										))}
									</div>
								</div>

								<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
									<h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
										AI・その他
									</h4>
									<div className="flex flex-wrap gap-2">
										{[
											"Mastra",
											"Playwright",
											"Git",
											"GitLab CI/CD",
											"Salesforce",
										].map((skill) => (
											<span
												key={skill}
												className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-3 py-1 rounded-full text-sm"
											>
												{skill}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>

						{/* Certifications */}
						<div>
							<h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 flex items-center">
								<span className="bg-yellow-500 text-white p-2 rounded-lg mr-3">
									🏆
								</span>
								資格・認定
							</h3>

							<div className="space-y-6">
								<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
									<div className="space-y-4">
										<div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
											<div className="flex items-center space-x-3">
												<div className="bg-blue-600 text-white p-2 rounded-lg">
													<span className="text-lg">
														💻
													</span>
												</div>
												<div>
													<h5 className="font-semibold text-gray-900 dark:text-white">
														基本情報技術者試験
													</h5>
													<p className="text-sm text-gray-600 dark:text-gray-300">
														IPA（情報処理推進機構）
													</p>
												</div>
											</div>
										</div>

										<div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-lg border border-orange-200 dark:border-orange-700">
											<div className="flex items-center space-x-3">
												<div className="bg-orange-500 text-white p-2 rounded-lg">
													<span className="text-lg">
														☁️
													</span>
												</div>
												<div>
													<h5 className="font-semibold text-gray-900 dark:text-white">
														AWS Cloud Practitioner
													</h5>
													<p className="text-sm text-gray-600 dark:text-gray-300">
														Amazon Web Services
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Contact Section - Under Construction */}
			<section
				id="contact"
				className="py-20 bg-white dark:bg-gray-800 relative"
			>
				{/* Construction Overlay */}
				<div className="absolute inset-0 bg-gradient-to-br from-gray-200/70 via-gray-100/50 to-gray-300/60 dark:from-gray-800/70 dark:via-gray-700/50 dark:to-gray-900/60 backdrop-blur-sm z-10"></div>

				{/* Construction Pattern Overlay */}
				<div className="absolute inset-0 z-20 opacity-30">
					<div className="construction-pattern"></div>
				</div>

				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
							Contact
						</h2>
						<div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>

						{/* Under Construction Notice */}
						<div className="mt-8 mb-6">
							<div className="inline-flex items-center bg-yellow-100 dark:bg-yellow-900/50 border border-yellow-300 dark:border-yellow-600 rounded-full px-6 py-3">
								<span className="text-2xl mr-3 animate-bounce">
									🚧
								</span>
								<span className="text-yellow-800 dark:text-yellow-200 font-semibold">
									このセクションは工事中です
								</span>
								<span
									className="text-2xl ml-3 animate-bounce"
									style={{ animationDelay: "0.5s" }}
								>
									🚧
								</span>
							</div>
						</div>

						<p className="text-gray-500 dark:text-gray-400 mt-6 max-w-2xl mx-auto">
							お問い合わせ機能は現在開発中です。
							<br />
							ご連絡はwaroshi@gmail.comにお願いします。
						</p>
					</div>

					<div className="grid md:grid-cols-2 gap-12 opacity-50 pointer-events-none">
						<div>
							<h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
								お気軽にご連絡ください
							</h3>
							<div className="space-y-6">
								<div className="flex items-center">
									<div className="bg-gray-400 text-white p-3 rounded-lg mr-4">
										<span className="text-xl">📧</span>
									</div>
									<div>
										<h4 className="font-semibold text-gray-600 dark:text-gray-400">
											Email
										</h4>
										<p className="text-gray-500 dark:text-gray-500">
											準備中...
										</p>
									</div>
								</div>

								<div className="flex items-center">
									<div className="bg-gray-400 text-white p-3 rounded-lg mr-4">
										<span className="text-xl">💼</span>
									</div>
									<div>
										<h4 className="font-semibold text-gray-600 dark:text-gray-400">
											LinkedIn
										</h4>
										<p className="text-gray-500 dark:text-gray-500">
											準備中...
										</p>
									</div>
								</div>

								<div className="flex items-center">
									<div className="bg-gray-400 text-white p-3 rounded-lg mr-4">
										<span className="text-xl">🐙</span>
									</div>
									<div>
										<h4 className="font-semibold text-gray-600 dark:text-gray-400">
											GitHub
										</h4>
										<p className="text-gray-500 dark:text-gray-500">
											準備中...
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="bg-gray-200 dark:bg-gray-600 p-8 rounded-lg">
							<form className="space-y-6">
								<div>
									<label className="block text-gray-500 dark:text-gray-400 font-medium mb-2">
										お名前
									</label>
									<input
										type="text"
										className="w-full px-4 py-3 border border-gray-400 dark:border-gray-500 rounded-lg bg-gray-100 dark:bg-gray-500 text-gray-500 cursor-not-allowed"
										placeholder="現在利用できません"
										disabled
									/>
								</div>
								<div>
									<label className="block text-gray-500 dark:text-gray-400 font-medium mb-2">
										メールアドレス
									</label>
									<input
										type="email"
										className="w-full px-4 py-3 border border-gray-400 dark:border-gray-500 rounded-lg bg-gray-100 dark:bg-gray-500 text-gray-500 cursor-not-allowed"
										placeholder="現在利用できません"
										disabled
									/>
								</div>
								<div>
									<label className="block text-gray-500 dark:text-gray-400 font-medium mb-2">
										メッセージ
									</label>
									<textarea
										rows={5}
										className="w-full px-4 py-3 border border-gray-400 dark:border-gray-500 rounded-lg bg-gray-100 dark:bg-gray-500 text-gray-500 cursor-not-allowed"
										placeholder="現在利用できません"
										disabled
									></textarea>
								</div>
								<button
									type="button"
									className="w-full bg-gray-400 text-gray-600 py-3 rounded-lg font-semibold cursor-not-allowed"
									disabled
								>
									工事中
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-900 dark:bg-black text-white py-8">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<p className="text-gray-400">
						© 2025 Hatakeyama. All rights reserved. Built with
						Next.js & TypeScript.
					</p>
				</div>
			</footer>
		</div>
	);
}
