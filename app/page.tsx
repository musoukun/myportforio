import Header from "@/app/components/Header";
import HeroSection from "@/app/components/HeroSection";
import AboutSection from "@/app/components/AboutSection";
import PortfolioSection from "@/app/components/PortfolioSection";
import ResumeSection from "@/app/components/ResumeSection";
import ContactSection from "@/app/components/ContactSection";
import Footer from "@/app/components/Footer";

export default function Home() {
	return (
		<div className="bg-stone-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
			<Header />
			<HeroSection />
			<AboutSection />
			<PortfolioSection />
			<ResumeSection />
			<ContactSection />
			<Footer />
		</div>
	);
}
