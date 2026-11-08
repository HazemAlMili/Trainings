import React, { useState } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';
import { Mail, Phone, MessageSquare, Send, Copy, Check, ShieldCheck, AlertCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('حجز حصة مجانية');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const preparedMessage =
    `رسالة تواصل من موقع NovaTova:\n` +
    `• الاسم: ${name}\n` +
    `• رقم التواصل: ${phone}\n` +
    (email ? `• البريد: ${email}\n` : '') +
    `• سبب التواصل: ${reason}\n` +
    `• الرسالة:\n${message}`;

  const cleanWhatsAppNumber = SITE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent(preparedMessage)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(preparedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden text-right">
      <section className="pt-12 pb-14 bg-[#F7F9F6] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5F4] text-[#118F86] text-xs font-bold">
            <MessageSquare size={14} />
            <span>نحن في الخدمة دائماً</span>
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#16344B]">
            عندك سؤال؟ إحنا هون نساعدك
          </h1>

          <p className="text-sm sm:text-base text-[#566974] max-w-xl mx-auto leading-relaxed">
            سواء بدك حصة مجانية، تسأل عن باقة، أو تحتاج مساعدة بالحجز، تواصل معنا بالطريقة اللي بتريحك.
          </p>
        </div>
      </section>

      {/* Main Form & Contact Info */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Contact Details Cards */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-[#F7F9F6] border border-slate-200 text-right space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <MessageSquare size={20} />
                </div>
                <h3 className="font-bold text-base text-[#16344B]">محادثة واتساب المباشرة</h3>
                <p className="text-xs text-[#566974] leading-relaxed">
                  الرد الأسرع لتنسيق الحصص المجانية والإجابة عن أي استفسار عائلي.
                </p>
                <a
                  href={`https://wa.me/${cleanWhatsAppNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block pt-1 text-xs font-bold text-[#118F86] hover:underline"
                >
                  افتح محادثة واتساب الآن ←
                </a>
              </div>

              <div className="p-6 rounded-2xl bg-[#F7F9F6] border border-slate-200 text-right space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                  <Mail size={20} />
                </div>
                <h3 className="font-bold text-base text-[#16344B]">البريد الإلكتروني الرسمي</h3>
                <p className="text-xs text-[#566974] leading-relaxed">
                  للاستفسارات الرسمية والشراكات المؤسسية.
                </p>
                <a
                  href={`mailto:${SITE_CONFIG.contactEmail}`}
                  className="inline-block pt-1 text-xs font-bold text-[#118F86] hover:underline font-mono"
                >
                  {SITE_CONFIG.contactEmail}
                </a>
              </div>
            </div>

            {/* Form Container */}
            <div className="lg:col-span-7 bg-[#F7F9F6] p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-soft">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <h3 className="font-bold text-lg text-[#16344B] mb-2">أرسل لنا رسالة</h3>

                  <div>
                    <label className="block font-bold text-[#16344B] mb-1">الاسم الكامل *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="اكتب اسمك..."
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-right text-xs focus:border-[#118F86]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-[#16344B] mb-1">رقم واتساب للتواصل *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="050-0000000"
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-right text-xs focus:border-[#118F86]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#16344B] mb-1">البريد الإلكتروني (اختياري)</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@mail.com"
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-right text-xs focus:border-[#118F86]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#16344B] mb-1">سبب التواصل *</label>
                    <select
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-right text-xs font-medium"
                    >
                      <option value="حجز حصة مجانية">حجز حصة مجانية</option>
                      <option value="استفسار عن باقة">استفسار عن باقة وأسعار</option>
                      <option value="مساعدة بحصة">مساعدة بحصة حالية</option>
                      <option value="تغيير مدرس">طلب تغيير مدرس</option>
                      <option value="مشكلة دفع">استفسار بخصوص الدفع</option>
                      <option value="أخرى">أخرى</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#16344B] mb-1">الرسالة *</label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="كيف بنقدر نساعدك؟"
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-right text-xs focus:border-[#118F86]"
                    />
                  </div>

                  <label className="flex items-start gap-2 text-[11px] text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 rounded text-[#118F86]"
                    />
                    <span>
                      بوافق إن فريق NovaTova يتواصل معي بخصوص استفساري، وبعرف إني بقدر أراجع سياسة الخصوصية.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={!consent}
                    className="w-full py-3 bg-[#118F86] hover:bg-[#0E736C] disabled:bg-slate-300 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-accent"
                  >
                    <Send size={15} />
                    <span>تجهيز وإرسال الرسالة</span>
                  </button>
                </form>
              ) : (
                /* Confirmation Handoff Box (Blueprint Section N) */
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#118F86] flex items-center justify-center mx-auto">
                    <Check size={24} />
                  </div>

                  <h3 className="font-bold text-lg text-[#16344B]">
                    جهّزنا رسالتك لفريق NovaTova
                  </h3>

                  <p className="text-xs text-[#566974] max-w-sm mx-auto leading-relaxed">
                    بالنسخة التجريبية (Prototype) لم يتم الإرسال لخادم خلفي. يمكنك فتحها مباشرة على واتساب أو نسخها.
                  </p>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 text-right text-xs font-mono whitespace-pre-line text-slate-800">
                    {preparedMessage}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-2 justify-center">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-[#118F86] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                    >
                      <Send size={14} />
                      <span>افتح واتساب الآن</span>
                    </a>
                    <button
                      onClick={handleCopy}
                      className="px-5 py-2.5 bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                    >
                      {copied ? <Check size={14} className="text-emerald-700" /> : <Copy size={14} />}
                      <span>{copied ? 'تم النسخ!' : 'نسخ الرسالة'}</span>
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2 text-slate-500 text-xs hover:underline"
                    >
                      تعديل
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

