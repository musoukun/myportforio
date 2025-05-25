import ChatDemo from "./components/ChatDemo";

export default function Home() {
	return (
		<div className="bg-gray-50 dark:bg-gray-900">
			{/* Sticky Navigation */}
			<nav className="fixed top-0 w-full bg-white dark:bg-gray-800 shadow-lg z-50 transition-all duration-300">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex items-center">
							<div className="flex-shrink-0">
								<h2 className="text-xl font-bold text-gray-900 dark:text-white">
									HATAKEYAMA
								</h2>
							</div>
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
				className="relative min-h-screen flex items-center justify-center overflow-hidden"
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
						style={{ animationDelay: "2s" }}
					></div>
				</div>

				{/* Main Content */}
				<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						{/* Left Side - Hero Text */}
						<div className="text-center lg:text-left">
							<div className="mb-6">
								<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
									I'm{" "}
									<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
										hatakeyama
									</span>
								</h1>
								<h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-200 mt-4">
									nextjs web app developer
								</h2>
							</div>

							<p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
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
							<div className="w-full max-w-lg lg:max-w-xl">
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
								住宅基幹システムのWebアプリケーション運用から始まり、スクラッチ開発、SaaS系Webアプリケーション開発まで幅広い経験を積んできました。
								最新の技術トレンドを常にキャッチアップし、効率的で保守性の高いコードの作成を心がけています。
							</p>
							<p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
								特にReact + TypeScript +
								Next.jsを使用したフロントエンド開発と、
								LangChain.js
								を活用したAIアプリケーション開発に力を入れており、
								ユーザビリティとパフォーマンスを両立したアプリケーションの構築を得意としています。
							</p>

							{/* Skills Progress Bars */}
							<div className="space-y-4">
								<div>
									<div className="flex justify-between mb-2">
										<span className="text-gray-700 dark:text-gray-300 font-medium">
											React / Next.js
										</span>
										<span className="text-gray-700 dark:text-gray-300">
											90%
										</span>
									</div>
									<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
										<div
											className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
											style={{ width: "90%" }}
										></div>
									</div>
								</div>
								<div>
									<div className="flex justify-between mb-2">
										<span className="text-gray-700 dark:text-gray-300 font-medium">
											TypeScript
										</span>
										<span className="text-gray-700 dark:text-gray-300">
											85%
										</span>
									</div>
									<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
										<div
											className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
											style={{ width: "85%" }}
										></div>
									</div>
								</div>
								<div>
									<div className="flex justify-between mb-2">
										<span className="text-gray-700 dark:text-gray-300 font-medium">
											PHP / Laravel
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
											Java / Spring
										</span>
										<span className="text-gray-700 dark:text-gray-300">
											75%
										</span>
									</div>
									<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
										<div
											className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
											style={{ width: "75%" }}
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
										アジャイル開発手法に基づく反復的な開発
									</li>
									<li className="flex items-start">
										<span className="text-blue-600 mr-2">
											•
										</span>
										テスト駆動開発（TDD）の実践
									</li>
									<li className="flex items-start">
										<span className="text-blue-600 mr-2">
											•
										</span>
										CI/CDパイプラインの構築と運用
									</li>
									<li className="flex items-start">
										<span className="text-blue-600 mr-2">
											•
										</span>
										ユーザビリティを重視したUI/UX設計
									</li>
								</ul>
							</div>

							<div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
								<h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
									得意分野
								</h4>
								<div className="grid grid-cols-2 gap-4">
									<div className="text-center p-3 bg-white dark:bg-gray-600 rounded-lg">
										<div className="text-2xl mb-2">🚀</div>
										<div className="text-sm text-gray-600 dark:text-gray-300">
											SPA開発
										</div>
									</div>
									<div className="text-center p-3 bg-white dark:bg-gray-600 rounded-lg">
										<div className="text-2xl mb-2">🤖</div>
										<div className="text-sm text-gray-600 dark:text-gray-300">
											AI統合
										</div>
									</div>
									<div className="text-center p-3 bg-white dark:bg-gray-600 rounded-lg">
										<div className="text-2xl mb-2">⚡</div>
										<div className="text-sm text-gray-600 dark:text-gray-300">
											パフォーマンス
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

			{/* Resume Section */}
			<section id="resume" className="py-20 bg-gray-50 dark:bg-gray-900">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-16">
						<h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
							Resume
						</h2>
						<div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
					</div>

					<div className="grid md:grid-cols-2 gap-12">
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
										IoT関連システム開発
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
											"LangChain.js",
											"Playwright",
											"Jest",
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
							しばらくお待ちください。
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
