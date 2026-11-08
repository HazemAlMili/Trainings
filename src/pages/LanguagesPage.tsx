import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ConversationalArcBackground, SectionWaveDivider } from '../components/common/BrandMotif';
import { LanguageCode, LearnerAudience } from '../types';
import { Sparkles, CheckCircle2, ChevronDown, ArrowRight, Clock, Users, ShieldCheck } from 'lucide-react';

interface LanguagesPageProps {
  onOpenTrialModal: (source?: string) => void;
}

export const LanguagesPage: React.FC<LanguagesPageProps> = ({ onOpenTrialModal }) => {
  const { lang = 'hebrew' } = useParams<{ lang?: string }>();
  const activeLang: LanguageCode = ['hebrew', 'english', 'german', 'french'].includes(lang)
    ? (lang as LanguageCode)
    : 'hebrew';

  const [audienceTab, setAudienceTab] = useState<LearnerAudience>('child');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Content mapped per language from Blueprint Section E
  const content = {
    hebrew: {
      nameAr: 'العبرية',
      eyebrow: 'العبرية مع NovaTova',
      h1: 'عبري عملي لطفلك أو إلك.',
      sub: 'مدرس مباشر، شرح بالعربي عند الحاجة، وتدريب على الكلام حسب المستوى والهدف بدون ضغط.',
      faqs: [
        { q: 'هل لازم أكون بعرف عبري قبل الحصة؟', a: 'لا، منبدأ معك أو مع طفلك من الأساسيات خطوة بخطوة حسب المستوى الفعلي.' },
        { q: 'هل الحصص فردية 1:1؟', a: 'نعم، كل الحصص فردية خاصة مع مدرس مباشر، كامل الوقت مخصص لك.' },
        { q: 'بقدر أطلب شرح بالعربي لو ما فهمت؟', a: 'نعم بكل تأكيد، مدرسونا يفهمون العربية ويقدمون الشرح عند الحاجة لتجاوز أي لبس.' },
      ],
      tabs: {
        child: {
          title: 'نقوّي فهمه وحكيه بالعبري، بدون ضغط.',
          cards: [
            { title: 'المحادثة والثقة', desc: 'تدريب على جمل حية ومواقف يومية لتجاوز الخجل من النطق.' },
            { title: 'القراءة والفهم', desc: 'قراءة قصص قصيرة وبطاقات كلمات تثري الحصيلة اللغوية.' },
            { title: 'دعم مادة المدرسة', desc: 'مساعدة في استيعاب التمارين المدرسية بدون ضغط واجبات.' },
          ],
        },
        adult: {
          title: 'فاهم عبري شوي بس بتتلبّك وقت الحكي؟',
          cards: [
            { title: 'مواقف يومية', desc: 'محادثات العيادة، البنك، التسوق، والتعاملات الرسمية.' },
            { title: 'تصحيح النطق', desc: 'تصحيح هادئ لمخارج الحروف وصياغة الجمل دون مقاطعة محرجة.' },
            { title: 'توسيع المفردات', desc: 'الانتقال من الكلمات المعزولة إلى التعبير السلس المترابط.' },
          ],
        },
        work: {
          title: 'تدرّب على مواقف الشغل بالعبرية (مسار تجريبي).',
          cards: [
            { title: 'عرّف عن حالك وخبرتك', desc: 'محاكاة تقديم النفس باحترافية وسلاسة.' },
            { title: 'احكي مع زبون أو زميل', desc: 'حوارات مهنية متكررة في بيئات العمل المشتركة.' },
            { title: 'تدرّب على المقابلة', desc: 'إجابة الأسئلة الشائعة بثقة ووضوح. (تنويه: التدريب لا يضمن وظيفة).' },
          ],
        },
      },
    },
    english: {
      nameAr: 'الإنجليزية',
      eyebrow: 'الإنجليزية مع NovaTova',
      h1: 'الإنجليزي بصير أسهل لما تتمرّن على الحكي.',
      sub: 'حصص فردية حسب مستواك وهدفك: تأسيس، محادثة، قراءة، وكتابة، مع مدرس مباشر.',
      faqs: [
        { q: 'هل الحصص مناسبة للمبتدئين؟', a: 'نعم، نبدأ من الصفر ومخارج الحروف والمفردات الأساسية.' },
        { q: 'كيف بتعرفوا مستواي؟', a: 'في الحصة التجريبية يقيم المعلم المستوى ويحدد خطة العمل المناسبة.' },
        { q: 'في مواعيد مرنة؟', a: 'نعم، ننسق المواعيد حسب جدولك وجدول المعلم المتاح.' },
      ],
      tabs: {
        child: {
          title: 'تأسيس ومحادثة ممتعة للأطفال.',
          cards: [
            { title: 'محادثة يومية', desc: 'حوارات عن الهوايات، الحيوانات، والأنشطة المحبوبة.' },
            { title: 'تعزيز الأساسيات', desc: 'النطق السليم للأصوات والقواعد بطريقة تفاعلية.' },
            { title: 'تطوير المهارات', desc: 'بناء طلاقة تدريجية بدون خوف من الخطأ.' },
          ],
        },
        adult: {
          title: 'تطوير اللغة الإنجليزية للعمل والدراسة.',
          cards: [
            { title: 'محادثة عملية', desc: 'الطلاقة في الحوارات العامة والسفر.' },
            { title: 'تعزيز المفردات', desc: 'استخدام مصطلحات مناسبة لمجالك الشخصي.' },
            { title: 'كسر حاجز الخوف', desc: 'التحدث مع متحدثين ومختصين بلطف.' },
          ],
        },
        work: {
          title: 'الإنجليزية المهنية والمراسلات.',
          cards: [
            { title: 'المقابلات الشخصية', desc: 'التدريب على أسئلة العمل باللغة الإنجليزية.' },
            { title: 'المكالمات والاجتماعات', desc: 'المشاركة بالرأي وطرح الأسئلة بوضوح.' },
            { title: 'العروض التقديمية', desc: 'تنظيم الأفكار وعرضها بثقة.' },
          ],
        },
      },
    },
    german: {
      nameAr: 'الألمانية',
      eyebrow: 'الألمانية مع NovaTova',
      h1: 'ابدأ الألماني من مستواك، مش من خطة عامة.',
      sub: 'من الحروف والجمل الأساسية لمحادثات يومية، مع حصة فردية تساعدك تتدرّب وتاخد ملاحظات مباشرة.',
      faqs: [
        { q: 'بنفع أبدأ من الصفر تماماً؟', a: 'نعم، نبدأ من الأبجدية ونطق التراكيب الصوتية الألمانية بتدرج.' },
        { q: 'هل في مدرس مناسب لمستواي؟', a: 'نعم، نقترح المدرس حسب مستواك وهدفك المباشر.' },
        { q: 'كيف بنحدد الخطة؟', a: 'يحدد المعلم النقاط الأساسية بعد أول جلسة تجريبية.' },
      ],
      tabs: {
        child: {
          title: 'تأسيس ألماني بأسلوب مبسط.',
          cards: [
            { title: 'تأسيس مفردات ونطق', desc: 'تعلم الكلمات الأولى بأصوات واضحة.' },
            { title: 'محادثات قصيرة', desc: 'جمل التعارف والأرقام والألوان.' },
            { title: 'تقوية الاستماع', desc: 'الاعتياد على نغمة اللغة بهدوء.' },
          ],
        },
        adult: {
          title: 'الألمانية للتواصل والأساسيات العملية.',
          cards: [
            { title: 'محادثات الحياة اليومية', desc: 'التسوق، المواصلات، والسؤال عن الاتجاهات.' },
            { title: 'قواعد مبسطة بالاستخدام', desc: 'تعلم القواعد من خلال الجمل الحية وليس الحفظ الجاف.' },
            { title: 'ملاحظات تصحيحية مباشرة', desc: 'المعلم يوجهك فوراً لنطق الأصوات الدقيقة.' },
          ],
        },
        work: {
          title: 'مسار التواصل الأولي للعمل.',
          cards: [
            { title: 'مصطلحات مهنية عامة', desc: 'التعريف بالنفس والمجال المهني.' },
            { title: 'رسائل وتواصل بسيط', desc: 'صياغة استفسارات واضحة.' },
            { title: 'مواقف العمل اليومية', desc: 'حوارات مع زملاء العمل.' },
          ],
        },
      },
    },
    french: {
      nameAr: 'الفرنسية',
      eyebrow: 'الفرنسية مع NovaTova',
      h1: 'فرنسي أوضح، خطوة بخطوة.',
      sub: 'تعلّم وتدرّب على الفرنسية بحصص مباشرة، مع خطة تناسب الوقت والمستوى وسبب التعلّم.',
      faqs: [
        { q: 'شو المستوى المطلوب للبدء؟', a: 'لا يشترط أي مستوى مسبق؛ نرحب بالمبتدئين تماماً.' },
        { q: 'هل الحصص فردية 1:1؟', a: 'نعم، الحصص شخصية ومباشرة.' },
        { q: 'كيف أبدأ؟', a: 'اضغط على زر الحصة المجانية وسيرتب فريقنا كل التفاصيل على واتساب.' },
      ],
      tabs: {
        child: {
          title: 'اكتشاف الفرنسية للأطفال بحب وفضول.',
          cards: [
            { title: 'أساسيات ونطق', desc: 'التعرف على أصوات الفرنسية الجميلة بنطق صحيح.' },
            { title: 'قراءة واستماع', desc: 'قصص مصورة ومواقف تفاعلية ممتعة.' },
            { title: 'محادثة ومواقف عملية', desc: 'التعبير عن النفس بجمل بسيطة.' },
          ],
        },
        adult: {
          title: 'الفرنسية للتواصل الحقيقي والثقافة.',
          cards: [
            { title: 'محادثة حية', desc: 'التدريب على الحوار في المطعم، الفندق، والسفر.' },
            { title: 'تصحيح الصوتيات', desc: 'ضبط مخارج الحروف الأنفية والأصوات الخاصة.' },
            { title: 'فهم وتعبير', desc: 'الانتقال إلى صياغة أفكارك بالفرنسية براحة.' },
          ],
        },
        work: {
          title: 'الفرنسية في سياقات مهنية.',
          cards: [
            { title: 'التعريف المهني', desc: 'عرض المؤهلات والتجارب السابقة.' },
            { title: 'التواصل واللباقة', desc: 'استخدام أسلوب المخاطبة الرسمي المهذب (Vous).' },
            { title: 'محادثات العمل', desc: 'التفاعل مع الشركاء بالفرنسية.' },
          ],
        },
      },
    },
  };

  const current = content[activeLang];
  const activeTabData = current.tabs[audienceTab];

  return (
    <div className="relative overflow-hidden text-right">
      {/* Top Breadcrumb */}
      <div className="bg-slate-100/80 py-2.5 border-b border-slate-200 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2 text-slate-500">
          <Link to="/" className="hover:text-slate-800">الرئيسية</Link>
          <span>/</span>
          <span>اللغات</span>
          <span>/</span>
          <span className="font-bold text-[#16344B]">{current.nameAr}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 bg-[#F7F9F6]">
        <ConversationalArcBackground opacity={0.12} />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8F5F4] text-[#118F86] text-xs font-bold mb-4">
            <Sparkles size={14} />
            <span>{current.eyebrow}</span>
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#16344B] mb-4">
            {current.h1}
          </h1>

          <p className="text-base sm:text-lg text-[#566974] max-w-2xl mx-auto mb-8 leading-relaxed">
            {current.sub}
          </p>

          {/* Segment Chooser Tabs */}
          <div className="inline-flex p-1.5 bg-white rounded-2xl border border-slate-200 shadow-xs mb-8">
            <button
              onClick={() => setAudienceTab('child')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                audienceTab === 'child'
                  ? 'bg-[#118F86] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              لطفلي (9–14 سنة)
            </button>
            <button
              onClick={() => setAudienceTab('adult')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                audienceTab === 'adult'
                  ? 'bg-[#118F86] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              إلي — محادثة
            </button>
            <button
              onClick={() => setAudienceTab('work')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                audienceTab === 'work'
                  ? 'bg-[#118F86] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              للشغل (مسار تجريبي)
            </button>
          </div>

          <div>
            <button
              onClick={() =>
                onOpenTrialModal(
                  `lang-${activeLang}-${audienceTab}`
                )
              }
              className="bg-[#118F86] hover:bg-[#0E736C] text-white text-base font-bold px-8 py-4 rounded-xl shadow-accent inline-flex items-center gap-2 tap-target-min transition-all"
            >
              <Sparkles size={18} />
              <span>احجز حصة {current.nameAr} مجانية</span>
            </button>
          </div>
        </div>
      </section>

      <SectionWaveDivider fillColor="#FFFFFF" accentStroke="#118F86" heightClass="h-8 sm:h-12" />

      {/* Dynamic Tab Outcomes & Cards */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#16344B]">
              {activeTabData.title}
            </h2>
            <p className="text-sm text-[#566974] mt-2">
              حصص خاصة 1:1 مخصصة بالكامل لمستواك وسرعة استيعابك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activeTabData.cards.map((card, i) => (
              <div
                key={i}
                className="bg-[#F7F9F6] p-6 rounded-2xl border border-slate-200 text-right shadow-soft flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#E8F5F4] text-[#118F86] font-bold flex items-center justify-center text-sm mb-4">
                    {i + 1}
                  </div>
                  <h3 className="font-bold text-base text-[#16344B] mb-2">{card.title}</h3>
                  <p className="text-xs text-[#566974] leading-relaxed mb-4">{card.desc}</p>
                </div>
                <div className="pt-2 text-[11px] font-bold text-[#118F86] flex items-center gap-1">
                  <span>تدرّب عليها بحصة تجريبية</span>
                  <ArrowRight size={13} className="rotate-180" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionWaveDivider fillColor="#F7F9F6" accentStroke="#FFC77A" heightClass="h-8 sm:h-12" />

      {/* FAQs for this language */}
      <section className="py-16 md:py-20 bg-[#F7F9F6]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-right">
          <h2 className="text-2xl font-bold text-[#16344B] text-center mb-8">
            أسئلة شائعة عن تعلّم {current.nameAr}
          </h2>

          <div className="space-y-3">
            {current.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-right font-bold text-sm text-[#16344B] flex items-center justify-between gap-3 hover:bg-slate-50"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-[#118F86] transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-[#566974] leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onOpenTrialModal(`lang-faq-${activeLang}`)}
              className="px-6 py-3 bg-[#118F86] text-white font-bold text-xs rounded-xl hover:bg-[#0E736C]"
            >
              احجز حصة {current.nameAr} مجانية الآن
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

