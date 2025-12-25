import { MessageCircle } from "lucide-react";
import { generateWhatsAppLink } from "@/data/products";

const WhatsAppButton = () => {
  return (
    <a
      href={generateWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-elevated hover:shadow-glow transition-all duration-300 group"
      aria-label="Hubungi via WhatsApp"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25" />
      
      {/* Button content */}
      <span className="relative flex items-center gap-2 px-5 py-3.5">
        <MessageCircle className="h-6 w-6" />
        <span className="hidden sm:inline font-medium">Chat WhatsApp</span>
      </span>
    </a>
  );
};

export default WhatsAppButton;
