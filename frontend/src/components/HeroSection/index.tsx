import { HeroContent } from './HeroContent';
import { WorkspaceMockup } from './WorkspaceMockup';

export const HeroSection = ({ onOpenAuth }: { onOpenAuth: (tab: 'login' | 'register') => void }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center pt-16 pb-12 sm:pt-24 sm:pb-20 overflow-x-hidden overflow-y-visible bg-[#030712]">
      {/* Elegant Ambient Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-b from-primary/10 to-transparent blur-[120px]" />
        <div className="absolute top-[40%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-secondary/10 to-transparent blur-[120px]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
      </div>

      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 xl:px-20 relative z-10 w-full grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <HeroContent onOpenAuth={onOpenAuth} />
        <WorkspaceMockup />
      </div>
    </section>
  );
};
