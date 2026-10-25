import Header from "@/app/components/Header";
import HeroSection from "@/app/components/HeroSection";
import AboutSection from "@/app/components/AboutSection";
import PortfolioSection from "@/app/components/PortfolioSection";
import ResumeSection from "@/app/components/ResumeSection";
import ContactSection from "@/app/components/ContactSection";
import Footer from "@/app/components/Footer";
import CityScene from "@/app/components/city/CityScene";

export default function Home() {
	return (
		<div className="bg-night text-night-text">
			<CityScene />
			<div className="relative z-10">
				<Header />
				<HeroSection />
				<AboutSection />
				<PortfolioSection />
				<ResumeSection />
				<ContactSection />
				<Footer />
			</div>
		</div>
	);
}
