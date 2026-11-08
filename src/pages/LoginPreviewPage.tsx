import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Phone, AlertCircle, ExternalLink, ShieldCheck } from 'lucide-react';

export const LoginPreviewPage: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showHelpModal, setShowHelpModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowHelpModal(true);
  };

  return (
    <div className="py-16 bg-[#F7F9F6] text-right min-h-[75vh] flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#16344B] flex items-center justify-center mx-auto">
              <Lock size={22} />
            </div>
            <h1 className="text-xl font-bold text-[#16344B]">تسجيل الدخول للطلاب الحاليين</h1>
            <p className="text-xs text-[#566974]">
              لإدارة الحصص، رؤية التقارير، وتعديل المواعيد
            </p>
          </div>

          {/* Staging Disclaimer */}
          <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs flex items-start gap-2">
            <AlertCircle size={15} className="text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>معاينة توضيحية:</strong> هذه الصفحة للعرض في نموذج الـ Prototype ولا تتصل بقاعدة بيانات مستخدمين فعلية.
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#16344B] mb-1">رقم الهاتف</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="050-0000000"
                className="w-full p-2.5 rounded-xl border border-slate-200 text-right text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-[#16344B] mb-1">كلمة المرور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-2.5 rounded-xl border border-slate-200 text-right text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#118F86] hover:bg-[#0E736C] text-white font-bold rounded-xl text-xs transition-colors"
            >
              تسجيل الدخول (تجريبي)
            </button>
          </form>

          <div className="pt-2 text-center text-xs">
            <a
              href="https://novatova.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#118F86] font-bold hover:underline inline-flex items-center gap-1"
            >
              <span>الدخول للمنصة الفعلية الحالية</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </div>

      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-right space-y-3">
            <h3 className="font-bold text-base text-[#16344B]">تنبيه النموذج الأولي</h3>
            <p className="text-xs text-[#566974] leading-relaxed">
              هذه الواجهة مخصصة لاختبار تجربة الاستخدام فقط ولن تقوم بتسجيل الدخول الفعلي أو حفظ بيانات الاعتماد.
            </p>
            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full py-2 bg-[#118F86] text-white font-bold text-xs rounded-xl"
            >
              حسناً، فهمت
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

