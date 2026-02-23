import { HeroSection } from "@/sections/HeroSection";
import { RegistrationSection } from "@/sections/RegistrationSection";

export default function HomePage(): JSX.Element {
  return (
    <main className="relative overflow-hidden">
      <HeroSection />
      <RegistrationSection />
    </main>
  );
}
