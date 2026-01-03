import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import BookingForm from '@/components/BookingForm';
import FeaturedVehicles from '@/components/FeaturedVehicles';
import HowItWorks from '@/components/HowItWorks';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen">
      {/* Animated Background - Fixed behind all content */}
      <AnimatedBackground />
      
      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        
        <main>
          <HeroSection />
          <BookingForm />
          <FeaturedVehicles />
          <HowItWorks />
          <WhyChooseUs />
          <Testimonials />
          <FAQ />
          <Newsletter />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Index;
