import React from 'react';
import Svg, {
  Circle, Defs, ClipPath, RadialGradient, Stop, G, Line, Path, Ellipse,
} from 'react-native-svg';

type Mood  = 'neutral' | 'happy' | 'focus';
type Props = { size?: number; mood?: Mood };

export default function Stroopwafel({ size = 48, mood = 'neutral' }: Props) {
  const gridLines: React.ReactNode[] = [];
  for (let i = 1; i < 7; i++) {
    const v = (i / 7) * 100;
    gridLines.push(
      <Line key={`v${i}`} x1={v} y1={2} x2={v} y2={98} stroke="rgba(60,30,5,0.32)" strokeWidth="1.2" />,
      <Line key={`h${i}`} x1={2} y1={v} x2={98} y2={v} stroke="rgba(60,30,5,0.32)" strokeWidth="1.2" />,
    );
  }

  const smilePath =
    mood === 'happy' ? 'M42 64 Q50 72 58 64' :
    mood === 'focus' ? 'M44 66 Q50 68 56 66' :
                       'M44 66 Q50 69 56 66';

  return (
    <Svg viewBox="0 0 100 100" width={size} height={size}>
      <Defs>
        <ClipPath id="wafel"><Circle cx="50" cy="50" r="48" /></ClipPath>
        <RadialGradient id="body" cx="40%" cy="35%" r="70%">
          <Stop offset="0%"   stopColor="#F0C37C" />
          <Stop offset="60%"  stopColor="#D9A55E" />
          <Stop offset="100%" stopColor="#A87333" />
        </RadialGradient>
      </Defs>
      <Circle cx="50" cy="50" r="48" fill="url(#body)" />
      <G clipPath="url(#wafel)">{gridLines}</G>
      <Circle cx="50" cy="50" r="48" fill="none" stroke="#8B5A24" strokeWidth="1.6" />
      <Ellipse cx="36" cy="32" rx="18" ry="8" fill="rgba(255,255,255,0.18)" />
      <Circle cx="42" cy="54" r="2.6" fill="#2A1607" />
      <Circle cx="58" cy="54" r="2.6" fill="#2A1607" />
      <Path d={smilePath} stroke="#2A1607" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <Circle cx="34" cy="62" r="3" fill="rgba(200,80,60,0.25)" />
      <Circle cx="66" cy="62" r="3" fill="rgba(200,80,60,0.25)" />
    </Svg>
  );
}
