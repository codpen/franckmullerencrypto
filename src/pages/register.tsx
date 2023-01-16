import Countdown from 'components/Countdown';
import Footer from 'components/Footer';
import Header from 'components/Header';

export const MYSTERY_LAUNCH_DATE = new Date(Date.UTC(2022, 6, 27, 11));

const RegisterPage = () => {
  return (
    <>
      <Header />
      <main>
        <section className="relative text-white pb-24 pt-32 flex items-center">
          <img
            className="absolute inset-0 object-cover object-top w-full h-full pointer-events-none"
            src="/static/images/bg-countdown.jpg"
            alt="Background"
            role="presentation"
            aria-hidden
          />
          <div className="container">
            <div className="row">
              <div className="col col--12 sm:col--10 sm:offset--1 md:col--8 md:offset--2">
                <p className="fluid-text-0 text-center">The registration starts on the 27th of July at 1PM CET.</p>
                <Countdown endDate={MYSTERY_LAUNCH_DATE} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default RegisterPage;
