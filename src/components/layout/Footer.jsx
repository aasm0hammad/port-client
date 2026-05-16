import { FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Aas Mohammad. All rights reserved.</p>
        <div className="flex items-center gap-1 mt-4 md:mt-0">
          <span>Made with</span>
          <FaHeart className="w-4 h-4 text-red-500" />
          <span>using Flutter</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
