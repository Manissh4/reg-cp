import { Youtube } from 'lucide-react';
import React from 'react';

const Footer: React.FC = () => {
  const socialIcons = [
    {
      src: 'https://api.builder.io/api/v1/image/assets/424e1b1d21f4426eba269c701c06be33/401cc2050e771b315c9ca7c70141d21d809f029d?placeholderIfAbsent=true',
      alt: 'Facebook'
    },
    {
      src: 'https://api.builder.io/api/v1/image/assets/424e1b1d21f4426eba269c701c06be33/0c0ee2fb50cf56dee57b820481e5941a2353d0f9?placeholderIfAbsent=true',
      alt: 'Twitter'
    }
  ];

  const footerLinks = [
    'Disclaimer',
    'Website Policies',
    'Web Information Manager',
    'Copyright © 2025'
  ];

  const footerInfo = [
    'Last Updated On: 29-05-2025',
    'Total Visitors : 5051855 (since 19-01-2024)',
    'Version 7.0.01092019.0.0'
  ];

  return (
    <footer className="items-stretch flex w-full flex-col overflow-hidden bg-[#212121] mt-[60px] px-[261px] py-10 max-md:max-w-full max-md:mt-10 max-md:px-5">
      {/* Social */}
      <div className="self-center flex flex-col items-center justify-center">
        <h3 className="text-white text-xl font-semibold leading-[1.4]">
          Follow us on:
        </h3>
        <div className="flex gap-6 mt-4">
          {socialIcons.map((icon, index) => (
            <button
              key={index}
              className="hover:opacity-80 transition-opacity"
              aria-label={icon.alt}
            >
              <img
                src={icon.src}
                alt={icon.alt}
                className="aspect-[1] object-contain w-8 shrink-0 rounded-lg"
              />
            </button>
          ))}
          <Youtube className='aspect-[1] object-contain w-8 shrink-0 rounded-lg bg-white h-8 w-9'/>
        </div>
      </div>

      {/* Footer Links */}
      <div className="flex w-full flex-col items-stretch mt-[60px] max-md:max-w-full max-md:mt-10">
        <nav className="self-center flex items-center gap-4 flex-wrap text-lg text-white font-medium">
          {footerLinks.map((link, index) => (
            <React.Fragment key={link}>
              <button className="hover:underline transition-all">
                {link}
              </button>
              {index < footerLinks.length - 1 && (
                <div className="border-l h-5 border-white" />
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Footer Info */}
        <div className="flex w-full justify-center items-center gap-4 flex-wrap mt-4 text-sm text-gray-400">
          {footerInfo.map((info, index) => (
            <React.Fragment key={info}>
              <div>{info}</div>
              {index < footerInfo.length - 1 && (
                <div className="border-l h-4 border-gray-600 mx-2" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
