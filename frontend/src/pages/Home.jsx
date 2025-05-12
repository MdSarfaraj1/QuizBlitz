 import Hero from '../components/Home/Hero';
 import Features from '../components/Home/Features';
import Testimonials from '../components/Home/Testimonials';
import HowItWorks from '../components/Home/HowItWorks';
import CTASection from '../components/Home/CTA_Section';
function Home() {
  return (
    <div className='flex flex-col'> 
       <Hero />
       <Features />
       <HowItWorks/>
       <Testimonials/> 
       <CTASection/>
    </div>
  );
}

export default Home;
