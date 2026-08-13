'use client';

import { useState } from 'react';
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
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { MOCK_JOBS } from '@/data/jobs';

export default function Home() {
  useScrollReveal();

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
      <RolesSection jobs={MOCK_JOBS} />
      <HiringTimeline />
      <FaqSection />
      <Footer />
      <StickyCta />
    </main>
  );
}
