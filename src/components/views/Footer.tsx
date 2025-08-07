import Logo from "@/assets/Logo.png";
import { QuizState } from "@/models/types/enums";
import { motion } from "framer-motion";
import { Button } from "../ui";
interface FooterProps {
  quizState: QuizState;
  handleStartPlay: () => void;
}

export const Footer: React.FC<FooterProps> = ({quizState, handleStartPlay }) => {
  return (
    <footer role="contentinfo" className="bg-gray-900 text-gray-200 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-14">
        {/* Logo and Introduction */}
        <div>
          <motion.div  
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 rounded-full flex items-center justify-center bg-[radial-gradient(circle,white_40%,#4b5563_100%)] shadow-md"
          >
            <img
              loading="lazy"
              src={Logo}
              alt="Khan's Logo"
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-cover rounded-full"
            />
          </motion.div>
          <p className="text-sm leading-relaxed">
            Developed by <strong>Khan Mahmudul Hasan</strong>, a dedicated software engineer based in Japan.
            Specializing in modern frontend technologies and committed to building accessible,
            useful, and user-friendly applications for learners and businesses alike.
          </p>
          <p className="mt-4 text-xs text-gray-400">
            © {new Date().getFullYear()} Khan Mahmudul Hasan. All rights reserved.
          </p>
        </div>

        {/* Professional Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Connect</h4>
          <ul className="space-y-3">
            <li>
              <a
                href="https://www.facebook.com/cse.mahmud"
                target="_blank"
                rel="me noopener noreferrer"
                aria-label="Visit Khan's Facebook profile"
                className="flex items-center hover:text-white transition-colors duration-200 focus-visible:outline"
              >
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <img 
                    loading="lazy"
                    src="icons/Facebook.png"
                    alt="Facebook"
                    className="w-6 h-6 mr-2 opacity-80 group-hover:opacity-100 transition-opacity duration-200"
                  />
                </motion.div>
                Facebook: cse.mahmud
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/mahmudulcse/"
                target="_blank"
                rel="me noopener noreferrer"
                aria-label="Visit Khan's LinkedIn profile"
                className="flex items-center hover:text-white transition-colors duration-200 focus-visible:outline"
              >
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    loading="lazy"
                    src="icons/LinkedIn.png"
                    alt="LinkedIn"
                    className="w-6 h-6 mr-2 opacity-80 group-hover:opacity-100 transition-opacity duration-200"
                  />
                  </motion.div>
                LinkedIn: /in/mahmudulcse
              </a>
            </li>
            <li>
              <a
                href="https://github.com/csemahmud"
                target="_blank"
                rel="me noopener noreferrer"
                aria-label="Visit Khan's GitHub profile"
                className="flex items-center hover:text-white transition-colors duration-200 focus-visible:outline"
              >
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    loading="lazy"
                    src="icons/GitHub.png"
                    alt="GitHub"
                    className="w-6 h-6 mr-2 opacity-80 group-hover:opacity-100 transition-opacity duration-200"
                  />
                  </motion.div>
                GitHub: @csemahmud
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <p className="text-sm mb-2">
            For professional inquiries or collaboration opportunities:
          </p>
          <p className="text-sm mb-2">
            📞 <a href="tel:+817043814193" className="underline hover:text-white focus-visible:outline">+81-70-4381-4193</a>
          </p>
          <p className="text-sm">
            📧 <a href="mailto:lone.wolf.mahmud@gmail.com" className="underline hover:text-white focus-visible:outline">lone.wolf.mahmud@gmail.com</a>
          </p>
        </div>
      </div>
      {quizState === QuizState.Welcome && (
        
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-20 flex flex-col md:flex-row items-center justify-center text-center bg-black text-white gap-4 pb-10 pt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
        <p className="text-gray-200 text-sm md:text-base">
          Click Start to continue your Kanji journey...
        </p>
        <motion.div whileHover={{ scale: 1.1, rotate: 2 }} whileTap={{ scale: 0.95 }}>
        <div className="relative group inline-block">
          <Button
            onClick={handleStartPlay}
            aria-label="Start Quiz"
          >
            Start
          </Button>

          {/* Tooltip: horizontal layout for 'Start Quiz' */}
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-1 text-sm text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
            <span className="flex gap-1">
              <span>Start</span>
              <span>Quiz</span>
            </span>
          </div>
        </div>
        </motion.div>
      </motion.div>
      )}
    </footer>
  );
};
