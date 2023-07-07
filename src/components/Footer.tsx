import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='footer' id='footer'>
      <div className='container--fluid'>
        <strong className='footer__logo'>
          <Link
            href='http://iic.izumi-it-company.com'
            className='footer__logo-link'
          >
            <Image
              src='/logo_02.svg'
              alt='Izumi it company'
              className='img object-contain h-[30px] md:h-[46px]'
              width={100}
              height={100}
              priority
            />
          </Link>
        </strong>
        <div className='footer__row'>
          <div className='footer__address'>
            <span className='footer__address-icon'>
              <svg
                className='svg'
                width='32'
                height='32'
                viewBox='0 0 32 32'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32ZM8 13.0076C8 8.49326 11.7347 4.85137 16.2825 5.00467C21.1442 5.16861 24.7002 9.72719 23.8828 14.5237C23.4058 17.3246 21.6616 19.6111 19.8059 22.0437C18.5907 23.6368 17.3276 25.2926 16.3413 27.1966C16.201 27.468 15.8102 27.4677 15.6704 27.1962C14.6751 25.2644 13.3978 23.5453 12.1722 21.8957C10.0053 18.9792 8 16.28 8 13.0076ZM11.8121 13.0076C11.8121 15.324 13.6896 17.202 16.0054 17.202C18.3213 17.202 20.1988 15.324 20.1988 13.0076C20.1988 10.6912 18.3213 8.81321 16.0054 8.81321C13.6896 8.81321 11.8121 10.6912 11.8121 13.0076Z'
                  fill='#EEEEEE'
                ></path>
              </svg>
            </span>
            <ul className='footer__address-list'>
              <li className='footer__address-item'>
                <strong>JAPAN</strong>
                <span>東京都板橋区</span>
              </li>
              <li className='footer__address-item'>
                <strong>ESTONIA</strong>
                <span>エストニア,タリン</span>
              </li>
              <li className='footer__address-item'>
                <strong>UKRAINE</strong>
                <span>ウクライナ、ハリコフ</span>
              </li>
            </ul>
          </div>
          <div className='footer__social'>
            <ul className='footer__social-list'>
              <li className='footer__social-item'>
                <a
                  href='https://www.facebook.com/IZUMIITCOMPANYOU/'
                  target='_blank'
                  className='footer__social-link'
                >
                  <svg
                    className='svg'
                    xmlns='http://www.w3.org/2000/svg'
                    width='32'
                    height='32'
                    viewBox='0 0 32 32'
                    fill='none'
                  >
                    <path
                      fill='#F6F6F6'
                      d='M16 0C7.178 0 0 7.178 0 16s7.178 16 16 16 16-7.178 16-16S24.823 0 16 0Zm3.98 16.563h-2.604v9.278h-3.857v-9.278h-1.834v-3.279h1.834v-2.12c0-1.52.722-3.894 3.892-3.894l2.859.011v3.183h-2.075c-.338 0-.818.17-.818.894v1.927h2.94l-.338 3.278Z'
                    ></path>
                  </svg>
                </a>
              </li>
              <li className='footer__social-item'>
                <a
                  href='https://www.instagram.com/izumiitcompany_ou/'
                  target='_blank'
                  className='footer__social-link'
                >
                  <svg
                    className='svg'
                    xmlns='http://www.w3.org/2000/svg'
                    width='32'
                    height='32'
                    viewBox='0 0 32 32'
                    fill='none'
                  >
                    <path
                      fill='#fff'
                      fillRule='evenodd'
                      d='M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16ZM26.113 9.017c.262.676.445 1.455.495 2.588.05 1.138.055 1.5.055 4.397 0 2.897-.013 3.26-.063 4.397-.05 1.133-.233 1.909-.496 2.588a5.456 5.456 0 0 1-3.121 3.121c-.675.263-1.455.446-2.588.496-1.138.05-1.5.063-4.397.063-2.896 0-3.26-.013-4.397-.063-1.133-.05-1.908-.233-2.588-.496a5.25 5.25 0 0 1-1.888-1.23 5.26 5.26 0 0 1-1.233-1.891c-.263-.675-.446-1.455-.496-2.588-.05-1.138-.063-1.5-.063-4.397 0-2.896.013-3.259.067-4.4.05-1.134.233-1.91.496-2.589a5.252 5.252 0 0 1 1.23-1.888 5.205 5.205 0 0 1 1.891-1.233c.676-.263 1.455-.446 2.588-.496 1.138-.05 1.5-.063 4.397-.063 2.896 0 3.26.013 4.401.067 1.134.05 1.909.233 2.588.496a5.251 5.251 0 0 1 1.888 1.23 5.206 5.206 0 0 1 1.233 1.891ZM24.32 22.295c.146-.375.321-.938.367-1.98.05-1.125.063-1.458.063-4.305 0-2.846-.013-3.183-.063-4.309-.046-1.037-.22-1.604-.367-1.98a3.315 3.315 0 0 0-.796-1.225 3.28 3.28 0 0 0-1.225-.795c-.375-.146-.937-.321-1.98-.367-1.12-.05-1.458-.063-4.309-.063-2.846 0-3.184.013-4.309.063-1.037.046-1.604.22-1.98.367-.462.17-.879.441-1.224.795-.359.342-.63.763-.8 1.226-.147.375-.322.938-.367 1.98-.05 1.12-.063 1.462-.063 4.309 0 2.846.013 3.184.063 4.309.045 1.037.22 1.604.366 1.98.171.462.442.878.796 1.224.342.355.763.626 1.225.796.376.146.938.321 1.98.367 1.121.05 1.463.063 4.31.063 2.846 0 3.183-.013 4.308-.063 1.038-.046 1.605-.22 1.98-.367a3.539 3.539 0 0 0 2.025-2.025Zm-8.315-11.772a5.482 5.482 0 0 0-5.48 5.48 5.481 5.481 0 1 0 5.48-5.48Zm0 9.035a3.555 3.555 0 1 1 .001-7.11 3.555 3.555 0 0 1 0 7.11Zm5.695-7.973a1.28 1.28 0 1 0 0-2.56 1.28 1.28 0 0 0 0 2.56Z'
                      clipRule='evenodd'
                    ></path>
                  </svg>
                </a>
              </li>
              <li className='footer__social-item'>
                <a
                  href='https://www.linkedin.com/company/izumi-it-compani'
                  target='_blank'
                  className='footer__social-link'
                >
                  <svg
                    className='svg'
                    xmlns='http://www.w3.org/2000/svg'
                    width='32'
                    height='32'
                    viewBox='0 0 32 32'
                    fill='none'
                  >
                    <path
                      fill='#F6F6F6'
                      d='M16 0C7.165 0 0 7.165 0 16s7.165 16 16 16 16-7.165 16-16S24.835 0 16 0Zm-4.65 24.188H7.455V12.463h3.897v11.723ZM9.403 10.863h-.025c-1.308 0-2.153-.9-2.153-2.025 0-1.15.871-2.025 2.204-2.025 1.333 0 2.153.875 2.179 2.025 0 1.125-.846 2.025-2.205 2.025Zm16 13.325h-3.897v-6.272c0-1.576-.564-2.651-1.974-2.651-1.076 0-1.717.725-2 1.425-.102.25-.127.6-.127.95v6.547h-3.897s.051-10.623 0-11.723h3.897v1.66c.517-.799 1.444-1.935 3.511-1.935 2.564 0 4.486 1.675 4.486 5.276v6.723Z'
                    ></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className='footer__copyright'>
          <small className='footer__copyright-text'>
            Copyright © IZUMI IT COMPANY OU <span>2023</span>{' '}
          </small>
        </div>
      </div>
    </footer>
  );
}
