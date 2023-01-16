import socials from 'data/socials';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="text-white py-16">
      <div className="container mb-6">
        <div className="row">
          <div className="col col--12 sm:col--6 xl:col--3 prose">
            <img
              className="mb-8"
              src="/static/images/frankmuller-encrypto-logo.png"
              width={(40 / 480) * 1660}
              height={40}
              alt="Mystery Box"
            />
            <p>
              Franck Muller is proud to present its craftsmanship campaign that showcases the crafts required to create
              a timepiece.
            </p>
            <img
              className="mb-8"
              src="/static/images/fme-signature.svg"
              width={(48 / 47) * 100}
              height={48}
              alt="Mystery Box"
            />
          </div>
          <div className="col col--12 sm:col--6 xl:col--3 prose">
            <h5 className="uppercase -text-0">Online Shop</h5>
            <ul>
              <li className="before:!content-[''] !p-0">
                <a
                  className="hover:underline text-white text-opacity-70 hover:text-opacity-100"
                  href="https://shop.franckmullerencrypto.com/mens-collection"
                >
                  Franck Muller Bitcoin Watch Collection
                </a>
              </li>
              <li className="before:!content-[''] !p-0">
                <a
                  className="hover:underline text-white text-opacity-70 hover:text-opacity-100"
                  href="https://shop.franckmullerencrypto.com/ladies-collection"
                >
                  Ladies&apos; Collection
                </a>
              </li>
              <li className="before:!content-[''] !p-0">
                <a
                  className="hover:underline text-white text-opacity-70 hover:text-opacity-100"
                  href="https://shop.franckmullerencrypto.com"
                >
                  Shop
                </a>
              </li>
            </ul>
          </div>
          <div className="col col--12 sm:col--6 xl:col--3 prose">
            <h5 className="uppercase -text-0">Company</h5>
            <ul>
              <li className="before:!content-[''] !p-0">
                <Link href="/servicing">
                  <a className="hover:underline text-white text-opacity-70 hover:text-opacity-100">Servicing</a>
                </Link>
              </li>
              <li className="before:!content-[''] !p-0">
                <Link href="/faq">
                  <a className="hover:underline text-white text-opacity-70 hover:text-opacity-100">
                    FAQ General & Technical
                  </a>
                </Link>
              </li>
              <li className="before:!content-[''] !p-0">
                <Link href="/our-story">
                  <a className="hover:underline text-white text-opacity-70 hover:text-opacity-100">Our Story</a>
                </Link>
              </li>
              <li className="before:!content-[''] !p-0">
                <Link href="/privacy-policy">
                  <a className="hover:underline text-white text-opacity-70 hover:text-opacity-100">Privacy Policy</a>
                </Link>
              </li>
              <li className="before:!content-[''] !p-0">
                <Link href="/delivery-returns-refunds">
                  <a className="hover:underline text-white text-opacity-70 hover:text-opacity-100">
                    Delivery, Returns & Refunds
                  </a>
                </Link>
              </li>
              <li className="before:!content-[''] !p-0">
                <Link href="/terms-conditions">
                  <a className="hover:underline text-white text-opacity-70 hover:text-opacity-100">
                    Terms & Conditions
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col col--12 sm:col--6 xl:col--3 prose">
            <h5 className="uppercase -text-0">Boutique Location</h5>
            <p>
              Franck Muller
              <br />
              The Dubai Mall, Shop 191
              <br />
              Ground Floor, Dubai, UAE
            </p>
            <a className="hover:underline" href="mailto:support@franckmullerencrypto.com">
              support@franckmullerencrypto.com
            </a>
          </div>
          <div className="col col--12">
            <div className="h-px bg-white opacity-10" />
          </div>
        </div>
      </div>
      <div className="container text-white">
        <div className="row -m-2 justify-between">
          <div className="col col--12 sm:col--auto text-center p-2">
            <div className="row -m-2 justify-center sm:justify-start">
              {socials.map(({ icon: Icon, href }) => (
                <div key={href} className="col col--auto p-2">
                  <a href={href} className="opacity-50 hover:opacity-100" target="_blank" rel="noreferrer">
                    <Icon className="fill-current" height={24} width={24} />
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="col col--12 sm:col--auto text-center p-2">
            <p className="opacity-50 hover:opacity-100">© 2022 Franck Muller Encrypto</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
