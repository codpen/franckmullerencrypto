import Footer from 'components/Footer';
import Header from 'components/Header';
import TitleBanner from 'components/TitleBanner';

const FAQPage = () => {
  return (
    <>
      <Header />
      <main>
        <TitleBanner title="FAQ GENERAL & TECHNICAL" backgroundImage="/static/images/watch-box.jpg" />
        <section className="bg-white">
          <div className="container py-24">
            <div className="row">
              <div className="col col--12">
                <div className="prose">
                  <h2 className="text-2">General</h2>
                  <ul>
                    <li>
                      <h3>Is www.franckmullerencrypto.com official site for Franck Muller Encrypto collection?</h3>
                      <p className="text-0">
                        Yes, see&nbsp;
                        <a className="hover:underline" href="https://www.franckmuller.com/vanguard-encrypto-">
                          https://www.franckmuller.com/vanguard-encrypto-
                        </a>
                      </p>
                    </li>
                    <li>
                      <h3>Can I purchase Encrypto time piece in my local store?</h3>
                      <p className="text-0">
                        No, due to the custom nature of the Encrypto watches and the additional security measures in
                        final production, the Encrypto watch is only sold online and in Franck Muller Dubai Mall
                        Boutique.
                      </p>
                    </li>
                  </ul>

                  <h2 className="text-2">Technical</h2>
                  <ul>
                    <li>
                      <h3>How do I add bitcoins to my Franck Muller watch set?</h3>
                      <p className="text-0">
                        Treat your Franck Muller Watch like a Bitcoin piggy bank: Add funds as often as you like, but
                        only import (or “sweep”) your funds once.
                      </p>
                    </li>
                    <li>
                      <h3>How to transfer bitcoins through my Franck Muller Watch dial?</h3>
                      <p className="text-0">
                        Open any live wallet software or web-based wallet and send or receive funds from any live wallet
                        to the public address shown on your watch dial.
                      </p>
                    </li>
                    <li>
                      <h3>How to check my account balance</h3>
                      <p className="text-0">
                        After transferring funds, or just to check your account balance and USD value. Scan your watch
                        dial using any live wallet or Bitcoin balance checker app. (this will take your public address
                        and search a block explorer)
                      </p>
                    </li>
                    <li>
                      <h3>How do I withdraw them?</h3>
                      <p className="text-0">
                        <strong>Step 1. Use a live wallet</strong> Claiming the funds from the set happens at the USB or
                        cold wallet level and is not related to your time piece, and this requires software. This
                        software is usually referred to as a “live wallet”, which should not be confused with your
                        off-line USB or cold wallet. <strong>Step 2. Import your private key</strong> Having set up a
                        live wallet, the next goal is to fund it. The Franck Muller timepiece comes as a 2 piece set. A
                        watch and a sealed USB. Your watch dial contains your public key, and a sealed USB, holds your
                        private key. The watch, which you can freely wear with no risk of losing your Bitcoins if it
                        were to get lost or damaged, and a sealed USB, which you would store in a safe place, the same
                        way you would store large sums of cash or physical gold. (e.g. safety deposit box). To be able
                        to move the funds, you must push a pin through the hole marked on the back of the USB. Once that
                        is done, the private key will be revealed. Once unsealed, you will have access to your private
                        key. Then, you’ll need to link your private key to the live wallet. This can be accomplished
                        through a process known as “importing.” Most live wallets have a category called “cold wallet”
                        or “manual import” There you will be able to link your private key to your live wallet.
                      </p>
                    </li>
                  </ul>

                  <h2 className="text-2">Q & A</h2>
                  <ul>
                    <li>
                      <h3>Can I re-seal after breaking the seal?</h3>
                      <p className="text-0">
                        No, the private key was generated using 256 bits of high-quality entropy with FIPS-certified
                        True RNG inside the USB, in conjunction with external inputs. Only when the USB is unsealed does
                        the private key become accessible. However once this happens, a physical change occurs
                        permanently affecting the processor.
                      </p>
                    </li>
                    <li>
                      <h3>Does anyone know my private key?</h3>
                      <p className="text-0">
                        No. The Franck Muller Encrypto comes with a QR code on the dial connected to a sealed USB
                        However due to liability reasons it is intended as a commemorative, limited edition novelty
                        item, and not for storing Bitcoins. If you would like to store Bitcoins through your watch dial
                        as a physical access point, you can either submit the public address from an offline generated
                        wallet of your choice or request an unused sealed USB (with the public and private key not yet
                        generated) with your order. You will receive your unused USB prior delivery of your watch, which
                        you can then generate a new public address and private key from. You can then submit your public
                        address with your order number to:&nbsp;
                        <a className="hover:underline" href="mailto:support@franckmullerencrypto.com">
                          support@franckmullerencrypto.com
                        </a>
                        &nbsp; and your watch and card will arrive with your own public address laser marked on the dial
                        and card. This will give you the assurance that your private key is generated by you, and never
                        leaves your possession.
                      </p>
                    </li>
                    <li>
                      <h3>Can I get the public key replaced on my watch dial?</h3>
                      <p className="text-0">
                        Yes, you can ship your watch to Franck Muller Dubai Mall with your new public address to have
                        the QR code replaced, the cost for QR code replacement is 389 USD.
                      </p>
                    </li>
                    <li>
                      <h3>Can I submit my own public address to have on my watch dial?</h3>
                      <p className="text-0">Yes, you can submit your own QR code</p>
                    </li>
                    <li>
                      <h3>How much does it cost to have the QR code on my watch dial replaced?</h3>
                      <p className="text-0">The replacement of your QR code costs 389 USD</p>
                    </li>
                    <li>
                      <h3>Can I use an encrypted public address?</h3>
                      <p className="text-0">Yes, you will need to submit your own encrypted QR code</p>
                    </li>
                    <li>
                      <h3>If it were to get my watch lost or damaged do I lose my Bitcoins</h3>
                      <p className="text-0">
                        No, your private key is held in your USB or wallet of your choice which should be safely stored
                        and unrelated to your public address on your watch dial.
                      </p>
                    </li>
                    <li>
                      <h3>If it were to get my USB lost or damaged do I lose my Bitcoins</h3>
                      <p className="text-0">
                        Yes, you should treat your USB or anything containing a private like the value of your asset.
                      </p>
                    </li>
                  </ul>
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

export default FAQPage;
