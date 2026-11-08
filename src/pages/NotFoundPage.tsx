import React from 'react';
import { Link } from 'react-router-dom';
import { Home, MessageCircle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-24 bg-[#F7F9F6] text-center min-h-[70vh] flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 space-y-5">
        <div className="text-6xl font-black text-[#118F86] font-mono">404</div>
        <h1 className="text-2xl font-bold text-[#16344B]">
          الصفحة اللي بتدور عليها مش موجودة
        </h1>
        <p className="text-xs sm:text-sm text-[#566974] leading-relaxed">
          ممكن يكون الرابط تغير أو في خطأ بالعنوان. فيك ترجع للرئيسية أو تتواصل معنا على واتساب لنساعدك.
        </p>

        <div className="flex justify-center gap-3 pt-2">
          <Link
            to="/"
            className="px-6 py-2.5 bg-[#118F86] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 hover:bg-[#0E736C]"
          >
            <Home size={15} />
            <span>العودة للرئيسية</span>
          </Link>
          <Link
            to="/contact"
            className="px-5 py-2.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200"
          >
            تواصل معنا
          </Link>
        </div>
      </div>
    </div>
  );
};

