import Footer from 'components/Footer';
import Header from 'components/Header';
import TitleBanner from 'components/TitleBanner';

const ServicingPage = () => {
  return (
    <>
      <Header />
      <main>
        <TitleBanner title="Servicing" backgroundImage="/static/images/watchmaking-complications.jpg" />
        <section className="bg-white">
          <div className="container py-24">
            <div className="row">
              <div className="col col--12 sm:col--10 sm:offset--1 md:col--8 md:offset--2">
                <div className="prose text-center">
                  <p className="-fluid-text-2 text-gray-60">
                    Franck decided to devote his career to create highlycomplicated watches and started working in his
                    workshop on timepieces thatwould become exceptional world premieres. Later, in 1991, he met Vartan
                    Sirmakes, who challenged him to turn asmall volume production into a prestigious brand and
                    enterprise that FranckMuller is today.
                  </p>
                  <img className="w-full h-auto" src="/static/images/servicing-01.jpg" alt="Servicing" />
                  <p className="-fluid-text-2 text-gray-60">
                    Once the watch has been dismantled, each individual component is closely examined in order to
                    understand the dysfunction. The entire movement is then disassembled and the components are
                    hand-repaired or replaced if required – depending on its level of wear.
                  </p>
                  <img className="w-full h-auto" src="/static/images/servicing-02.jpg" alt="Servicing" />
                  <p className="-fluid-text-2 text-gray-60">
                    In that case, the parts may need to be produced in our own component factory located in Geneva. To
                    guarantee utmost precision standards, the process is done entirely in-house. The components are then
                    hand-decorated — may it be perlage, satinage or bevelling — by our craftsmen and are later given to
                    the watchmaker in order to be replaced within the watch. The balance wheel — the heart of the
                    movement — is also removed with the utmost care. It is then cleaned, tested and adjusted to ensure
                    accurate time-keeping. Once the movement has been fully checked and repaired, it is carefully
                    lubricated to ensure that your timepiece will continue to run properly. Lubrication limits friction
                    between the mechanical parts and thus reduces the wear of the components.
                  </p>
                  <img className="w-full h-auto" src="/static/images/servicing-03.jpg" alt="Servicing" />
                  <p className="-fluid-text-2 text-gray-60">
                    The same attention is devoted to the case and the bracelet which are closely hand-polished. Any
                    damaged or worn parts on the case and bracelet are restored or replaced. The case is then
                    refurbished and ultrasonically cleaned to emphasize its sparkling aspect. Furthermore, you can also
                    have your alligator strap replaced if this one is deteriorated. The restoration of the case and the
                    new strap will give your timepiece its allure and vivacity of the first day. Once the dial and hands
                    are fitted to the movement, the seals within the case are replaced and the watch and all its
                    components are carefully reassembled. This is followed by rigorous air compression tests to ensure
                    that your timepiece will remain water and air-resistant.
                  </p>
                  <img className="w-full h-auto" src="/static/images/servicing-04.jpg" alt="Servicing" />
                  <p className="-fluid-text-2 text-gray-60">
                    The watchmaker then runs and monitors the timepiece for several days of tests. This process can take
                    up to 9 days, until the power reserve completely depletes. This is to attest of the performance of
                    the watch in terms of power reserve and Timing accuracy. Throughout this process, the watchmaker
                    will also set the watch in several positions to adjust the inertia of the balance wheel and control
                    its amplitude.
                  </p>
                  <img className="w-full h-auto" src="/static/images/servicing-05.jpg" alt="Servicing" />
                  <p className="-fluid-text-2 text-gray-60">
                    Finally, the watchmaker verifies one last time the function and aesthetic appearance of the
                    timepiece to ensure there is absolutely no default before it is sent to the client. After a complete
                    service, your Franck Muller will be covered by a two-year warranty.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ServicingPage;
