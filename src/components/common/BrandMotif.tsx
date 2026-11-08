import React from 'react';

interface LogoProps {
  className?: string;
  hideSymbol?: boolean;
  hideWordmark?: boolean;
  colorScheme?: 'default' | 'white' | 'dark';
}

/**
 * NovaTova Signature Logo
 * Motif: Two rounded conversational speech paths converging into a rising growth arc.
 */
export const BrandLogo: React.FC<LogoProps> = ({
  className = '',
  hideSymbol = false,
  hideWordmark = false,
  colorScheme = 'default',
}) => {
  const isWhite = colorScheme === 'white';
  const isDark = colorScheme === 'dark';

  const primaryTeal = isWhite ? '#FFFFFF' : '#118F86';
  const secondaryApricot = isWhite ? '#FFE5B4' : '#FFC77A';
  const textDark = isWhite ? '#FFFFFF' : isDark ? '#16344B' : '#132B36';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`} aria-label="NovaTova Home">
      {!hideSymbol && (
        <svg
          width="38"
          height="38"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 transition-transform hover:scale-105 duration-200"
        >
          {/* First Speech Path: Foundation / Student Voice */}
          <path
            d="M8 26C8 17.1634 15.1634 10 24 10C27.5 10 30.8 11.2 33.5 13.2"
            stroke={primaryTeal}
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Second Speech Path: Guide / Teacher Connection */}
          <path
            d="M40 22C40 30.8366 32.8366 38 24 38C20.5 38 17.2 36.8 14.5 34.8"
            stroke={secondaryApricot}
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Converging Rising Growth Arc (The Breakthrough / Confidence Arc) */}
          <path
            d="M17 28C20.5 24 25.5 20.5 35 15"
            stroke={primaryTeal}
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          {/* Terminal Star / Spark of Confidence */}
          <circle cx="36" cy="14" r="3.5" fill={primaryTeal} />
        </svg>
      )}

      {!hideWordmark && (
        <div className="flex flex-col text-right leading-tight">
          <span className="font-bold text-xl tracking-tight" style={{ color: textDark }}>
            Nova<span className="text-[#118F86]">Tova</span>
          </span>
          <span className="text-[11px] font-medium tracking-normal text-[#566974] -mt-0.5">
            تعلّم لغة. احكي بثقة.
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * Background Graphic Signature: Subtle Conversational Learning Arc
 */
export const ConversationalArcBackground: React.FC<{ className?: string; opacity?: number }> = ({
  className = '',
  opacity = 0.08,
}) => {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M-50 480C280 480 420 220 720 250C1020 280 1150 110 1500 80"
          stroke="#118F86"
          strokeWidth="3"
          strokeDasharray="8 8"
          strokeOpacity={opacity}
        />
        <path
          d="M0 550C340 550 510 320 840 340C1170 360 1280 180 1600 160"
          stroke="#FFC77A"
          strokeWidth="2.5"
          strokeOpacity={opacity * 1.5}
        />
        {/* Soft Ambient Radial Blur Blends */}
        <circle cx="780" cy="280" r="240" fill="#118F86" fillOpacity={opacity * 0.4} filter="blur(80px)" />
        <circle cx="1180" cy="160" r="200" fill="#FFC77A" fillOpacity={opacity * 0.3} filter="blur(70px)" />
      </svg>
    </div>
  );
};

/**
 * Organic Wave Section Divider for seamless visual continuity
 */
export const SectionWaveDivider: React.FC<{
  fillColor?: string;
  accentStroke?: string;
  inverted?: boolean;
  className?: string;
  heightClass?: string;
}> = ({
  fillColor = '#FFFFFF',
  accentStroke = 'transparent',
  inverted = false,
  className = '',
  heightClass = 'h-10 sm:h-14 md:h-20',
}) => {
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none relative z-10 ${
        inverted ? 'rotate-180 -mb-px' : '-mt-px'
      } ${className}`}
      aria-hidden="true"
    >
      <svg
        className={`w-full ${heightClass} object-cover`}
        viewBox="0 0 1440 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 48C240 88 480 96 720 72C960 48 1200 16 1440 48V96H0V48Z"
          fill={fillColor}
        />
        {accentStroke !== 'transparent' && (
          <path
            d="M0 48C240 88 480 96 720 72C960 48 1200 16 1440 48"
            stroke={accentStroke}
            strokeWidth="2.5"
            strokeDasharray="6 6"
            strokeOpacity="0.4"
          />
        )}
      </svg>
    </div>
  );
};

/**
 * Honest Asset Placeholder Badge (Guaranteeing no fabricated images/testimonials)
 */
export const StagingAssetBadge: React.FC<{ label?: string; note?: string; className?: string }> = ({
  label = 'صورة توضيحية — قيد اعتماد مادة الدرس الأصلية',
  note = 'تُستبدل بمادة مصورة حقيقية بموافقة خطية من ولي الأمر قبل النشر',
  className = '',
}) => {
  return (
    <div
      className={`p-3 rounded-lg border border-dashed border-amber-300 bg-amber-50/90 text-amber-900 text-xs flex items-start gap-2.5 ${className}`}
      role="status"
    >
      <div className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1 shrink-0 animate-pulse" />
      <div>
        <p className="font-semibold">{label}</p>
        <p className="text-[11px] text-amber-800/80 mt-0.5">{note}</p>
      </div>
    </div>
  );
};

/**
 * Policy Review Warning Tag for Unfinalized Legal Policies
 */
export const PolicyReviewTag: React.FC<{ text?: string }> = ({
  text = 'بند خاضع للمراجعة القانونية قبل الإطلاق [POLICY_REVIEW]',
}) => {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-semibold bg-rose-50 text-rose-700 border border-rose-200 rounded-md">
      <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
      {text}
    </span>
  );
};

