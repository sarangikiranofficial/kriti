import React from 'react';

/**
 * MandalaGraphic: Intricate Indian mandala symbol rendered from authentic geometric vector path.
 */
const MandalaGraphic: React.FC<{ className?: string; color?: string; opacity?: number }> = ({
  className = '',
  color = '#3A1D18',
  opacity = 0.12,
}) => (
  <svg
    viewBox="0 0 14 14"
    fill={color}
    style={{ opacity }}
    className={`pointer-events-none select-none ${className}`}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m 6.8198261,12.7441 c -0.08389,-0.2001 -0.099888,-0.4276 -0.075191,-1.071 l 0.031196,-0.8169 -0.25745,0.2793 c -0.317363,0.3443 -0.8150849,0.5937 -1.6084623,0.806 -0.3338711,0.089 -0.6674322,0.1816 -0.7412336,0.2051 -0.1187561,0.038 -0.1463329,-0.01 -0.239612,-0.4171 -0.1937574,-0.8446 -0.1961471,-1.4717 -0.008,-2.0648 0.023597,-0.074 -0.1896479,0.1083 -0.4738247,0.4057 -0.5303481,0.5552 -0.7875881,0.7193 -1.0656357,0.68 C 2.2640465,10.7334 2.216932,10.6774 2.2005939,10.5348 2.1720969,10.2859 2.5839792,9.8786 3.2841575,9.4631 L 3.7798997,9.1689 3.3714273,9.1299 C 2.9090613,9.0859 2.3399077,8.8238 1.677155,8.3508 1.445862,8.1859 1.2223581,8.0508 1.180503,8.0508 1.059777,8.0508 1.085714,7.9928 1.4064266,7.543 1.7687943,7.0353 2.3073715,6.5377 2.7234529,6.3262 L 3.0276974,6.1715 2.2863139,6.1405 C 1.5278024,6.1085 1.2157388,6.0203 1.077095,5.7971 0.79190825,5.3381 1.9302655,5.2975 3.0491949,5.7271 3.1155869,5.7531 3.1114879,5.7011 3.0323969,5.5112 2.9751039,5.3739 2.8556875,4.8294 2.7671378,4.3011 2.6785478,3.7728 2.586179,3.2897 2.5617918,3.2274 2.5246958,3.1324 2.5803898,3.1066 2.9040819,3.0661 c 0.6052994,-0.076 1.5066842,0 1.9155265,0.1658 C 5.208743,3.3875 5.2092929,3.3811 4.8476054,2.906 4.2484353,2.1191 4.1245498,1.4767 4.5719176,1.4767 c 0.2368724,0 0.6724415,0.6678 0.8731981,1.3386 0.099588,0.3326 0.1667006,0.3633 0.231343,0.1058 C 5.7493497,2.6306 5.948107,2.3991 6.5445474,1.9102 6.8514716,1.6586 7.2111597,1.3509 7.3438442,1.2264 L 7.585106,1 7.7260796,1.1537 C 8.1607089,1.6273 8.5896389,2.5139 8.6672498,3.099 L 8.7129448,3.4438 8.9318592,2.9403 C 9.0522552,2.6633 9.208407,2.3382 9.2788387,2.218 9.585143,1.6948 10.050779,1.6034 10.050779,2.0664 c 0,0.2474 -0.1447234,0.5373 -0.4926928,0.9866 C 9.4496288,3.193 9.3542,3.3455 9.3460209,3.3919 c -0.008,0.046 -0.162501,0.2296 -0.34292,0.4074 C 8.822672,3.977 8.6953068,4.1426 8.7200639,4.1674 8.7448609,4.1924 8.8637372,4.1174 8.9843331,4.0001 9.3542699,3.6422 9.6389567,3.5604 10.229968,3.6426 c 0.279607,0.039 0.647614,0.071 0.817795,0.071 l 0.309423,0 -0.04309,0.3668 c -0.08349,0.7107 -0.51822,1.3901 -1.069326,1.6711 l -0.2558301,0.1306 0.1700501,0.17 c 0.202757,0.2028 0.294676,0.1704 0.658443,-0.2323 0.408163,-0.4517 0.804307,-1.3503 1.021181,-2.3162 l 0.0395,-0.176 -0.94936,-0.041 C 10.188341,3.2546 9.9178022,3.2676 9.6995377,3.3446 9.3745056,3.4593 9.2614388,3.4186 9.5500151,3.2916 c 0.1393038,-0.062 0.5079509,-0.081 1.2777909,-0.066 0.595111,0.011 1.097622,0.036 1.11669,0.055 0.0191,0.019 -0.0337,0.2997 -0.117186,0.6237 -0.165731,0.6428 -0.530998,1.4704 -0.810886,1.8373 -0.150372,0.1972 -0.157511,0.2246 -0.04639,0.178 0.945239,-0.3965 1.730828,-0.5452 1.913806,-0.3622 0.145733,0.1458 0.09439,0.3829 -0.105057,0.4853 -0.234603,0.1204 -0.780659,0.2275 -1.453441,0.2851 l -0.521529,0.045 0.284317,0.1501 c 0.307874,0.1624 0.557395,0.4655 0.928182,1.1272 0.130464,0.2329 0.369936,0.5714 0.532147,0.7522 l 0.294946,0.3288 -0.391794,0.1733 C 11.831743,9.1785 11.304645,9.2884 10.7458,9.2602 l -0.502232,-0.025 0.25945,0.2045 c 0.85924,0.677 1.187612,1.1136 1.042149,1.3854 -0.168791,0.3153 -0.589002,0.079 -1.125439,-0.6342 C 10.207793,9.9094 10.026074,9.679 10.015915,9.679 c -0.0102,0 0.0115,0.1296 0.04819,0.2881 0.0387,0.1671 0.0472,0.6149 0.0203,1.0674 -0.0255,0.4287 -0.04439,0.9381 -0.04209,1.1321 l 0.004,0.3527 -0.5492157,-0.2316 C 8.7787331,11.9847 8.0343799,11.5556 7.5494065,11.1647 L 7.159372,10.8505 7.2827776,11.3661 c 0.1364441,0.5701 0.162821,1.3 0.054294,1.5028 C 7.2962766,12.9449 7.1956181,13 7.0963997,13 6.9634752,13 6.9024123,12.944 6.819412,12.7458 Z" />
  </svg>
);

/**
 * BackgroundJaali: Layered subtle repeating SVG motif layer.
 * Authentic Indian visual identity featuring:
 * 1. Tone-on-tone jaali lattice grid with floral buta intersections.
 * 2. Watermark Indian mandalas placed dynamically at corners and background points.
 * 3. Slow drifting animation (transform-only, disabled under prefers-reduced-motion).
 */
export const BackgroundJaali: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Repeating Indian Jaali Lattice Base (Clearly visible handcrafted motif) */}
      <div className="w-[125vw] h-[125vh] -top-[12vh] -left-[12vw] absolute animate-jaali-drift opacity-[0.10]">
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="bg-editorial-jaali"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              {/* Fine diagonal jaali lattice lines */}
              <line
                x1="0"
                y1="0"
                x2="80"
                y2="80"
                stroke="#3A1D18"
                strokeWidth="0.9"
                strokeDasharray="2 3"
              />
              <line
                x1="80"
                y1="0"
                x2="0"
                y2="80"
                stroke="#3A1D18"
                strokeWidth="0.9"
                strokeDasharray="2 3"
              />

              {/* Diamond jaali intersection floral petals */}
              <circle cx="40" cy="40" r="2.2" fill="#A63D2F" />
              <circle cx="40" cy="40" r="4.2" stroke="#E0A526" strokeWidth="0.6" fill="none" />
              <circle cx="0" cy="0" r="2" fill="#A63D2F" />
              <circle cx="80" cy="0" r="2" fill="#A63D2F" />
              <circle cx="0" cy="80" r="2" fill="#A63D2F" />
              <circle cx="80" cy="80" r="2" fill="#A63D2F" />

              {/* Traditional 4-petaled Indian buta motif at center */}
              <path
                d="M40 22 C37 26 34 30 37 33 C40 36 44 34 43 30 C42 26 40 22 40 22 Z"
                stroke="#E0A526"
                strokeWidth="0.85"
                fill="#E0A526"
                fillOpacity="0.15"
              />
              <path
                d="M22 40 C26 37 30 34 33 37 C36 40 34 44 30 43 C26 42 22 40 22 40 Z"
                stroke="#E0A526"
                strokeWidth="0.85"
                fill="#E0A526"
                fillOpacity="0.15"
              />
              <path
                d="M58 40 C54 43 50 46 47 43 C44 40 46 36 50 37 C54 38 58 40 58 40 Z"
                stroke="#E0A526"
                strokeWidth="0.85"
                fill="#E0A526"
                fillOpacity="0.15"
              />
              <path
                d="M40 58 C43 54 46 50 43 47 C40 44 36 46 37 50 C38 54 40 58 40 58 Z"
                stroke="#E0A526"
                strokeWidth="0.85"
                fill="#E0A526"
                fillOpacity="0.15"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bg-editorial-jaali)" />
        </svg>
      </div>

      {/* 2. Prominent Watermark Indian Mandala Motifs */}
      {/* Top Right Floating Mandala */}
      <div className="absolute -top-24 -right-24 w-[480px] h-[480px] sm:w-[620px] sm:h-[620px] pointer-events-none transform rotate-12">
        <MandalaGraphic
          className="w-full h-full"
          color="#3A1D18"
          opacity={0.11}
        />
      </div>

      {/* Mid-Left Floating Mandala (Warm Turmeric/Oxblood tint) */}
      <div className="absolute top-[38%] -left-36 w-[520px] h-[520px] sm:w-[700px] sm:h-[700px] pointer-events-none transform -rotate-45">
        <MandalaGraphic
          className="w-full h-full"
          color="#A63D2F"
          opacity={0.09}
        />
      </div>

      {/* Bottom Right Floating Mandala */}
      <div className="absolute bottom-10 -right-28 w-[420px] h-[420px] sm:w-[580px] sm:h-[580px] pointer-events-none transform rotate-6">
        <MandalaGraphic
          className="w-full h-full"
          color="#E0A526"
          opacity={0.10}
        />
      </div>
    </div>
  );
};
