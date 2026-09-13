import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import WorkSection from '@/components/WorkSection';
import WhyWeExist from '@/components/WhyWeExist';
import TeamVoices from '@/components/TeamVoices';
import Benefits from '@/components/Benefits';
import Leadership from '@/components/Leadership';
import RolesSection from '@/components/RolesSection';
import HiringTimeline from '@/components/HiringTimeline';
import FaqSection from '@/components/FaqSection';
import Footer from '@/components/Footer';
import StickyCta from '@/components/StickyCta';
import LoadingScreen from '@/components/LoadingScreen';
import CursorGlow from '@/components/CursorGlow';
import { getActiveJobs } from '@/lib/sanity';
import HomeClient from './HomeClient';

export default async function Home() {
  // Fetch live Sanity jobs merged with hardcoded jobs at build time
  const jobs = await getActiveJobs();

  return (
    <main>
      <LoadingScreen />
      <CursorGlow />
      <Navbar />
      <HeroSection />
      <WorkSection />
      <WhyWeExist />
      <TeamVoices />
      <Benefits />
      <Leadership />
      <RolesSection jobs={jobs} />
      <HiringTimeline />
      <FaqSection />
      <Footer />
      <StickyCta />
      <HomeClient />
    </main>
  );
}
