import { useState } from "react";
import { HiOutlineChat, HiOutlineX } from "react-icons/hi";
import { FaFacebookMessenger } from "react-icons/fa";
import { SiZalo } from "react-icons/si";

const channels = [
  {
    name: "Messenger",
    icon: FaFacebookMessenger,
    url: "https://m.me/your-facebook-page",
    gradient: "from-[#0695FF] to-[#A334FA]",
    shadow: "shadow-blue-500/30",
  },
  {
    name: "Zalo",
    icon: SiZalo,
    url: "https://zalo.me/your-zalo-id",
    gradient: "from-[#0068FF] to-[#0099FF]",
    shadow: "shadow-blue-400/30",
  },
];

export default function ChatBubble() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3">
      {/* Channel buttons */}
      <div
        className={`flex flex-col gap-2.5 transition-all duration-300 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {channels.map((ch, i) => (
          <a
            key={ch.name}
            href={ch.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-3 no-underline transition-all duration-300`}
            style={{ transitionDelay: open ? `${i * 80}ms` : "0ms" }}
          >
            {/* Label */}
            <span className="glass text-dark text-xs font-semibold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg whitespace-nowrap">
              {ch.name}
            </span>
            {/* Icon */}
            <div
              className={`w-12 h-12 rounded-full bg-gradient-to-br ${ch.gradient} flex items-center justify-center shadow-lg ${ch.shadow} hover:scale-110 active:scale-95 transition-transform`}
            >
              <ch.icon className="w-5 h-5 text-white" />
            </div>
          </a>
        ))}
      </div>

      {/* Main toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 rounded-full btn-gradient flex items-center justify-center shadow-xl shadow-pink/25 hover:shadow-2xl hover:shadow-pink/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border-none ${
          open ? "rotate-0" : "rotate-0"
        }`}
      >
        <span className={`transition-transform duration-300 ${open ? "rotate-90 scale-110" : "rotate-0"}`}>
          {open ? (
            <HiOutlineX className="w-6 h-6 text-white" />
          ) : (
            <HiOutlineChat className="w-6 h-6 text-white" />
          )}
        </span>
        {/* Ping animation when closed */}
        {!open && (
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-pink to-purple animate-ping opacity-20" />
        )}
      </button>
    </div>
  );
}
