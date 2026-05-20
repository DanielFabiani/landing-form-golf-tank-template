import Hero             from '@/components/Hero';
import EventInfo        from '@/components/EventInfo';
import Agenda           from '@/components/Agenda';
import Format           from '@/components/Format';
import Location         from '@/components/Location';
import RegistrationForm from '@/components/RegistrationForm';
import Footer           from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Hero />

      <main>
        <div className="w-full max-w-[1200px] mx-auto px-5 md:px-16">
          <EventInfo />
          <Agenda />
          <Format />
          <Location />
        </div>
        <RegistrationForm />
      </main>

      <Footer />
    </>
  );
}
