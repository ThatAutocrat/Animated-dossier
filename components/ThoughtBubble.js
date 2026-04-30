import { useState } from 'react';

const thoughts = [
  "Why do we park in driveways and drive on parkways?",
  "A 'week' is just seven days pretending to be a unit.",
  "Every expert was once a beginner who didn't quit.",
  "You've never seen your own face in real life, only reflections.",
  "Somewhere, someone is having the best day of their life right now.",
  "A snail can sleep for 3 years. Respect.",
  "Your future self is watching you make decisions right now.",
  "Trying and failing is just succeeding at learning.",
  "The fact that we exist at all is genuinely insane.",
  "Your skeleton has been with you since day one. Loyal.",
];

function getDailyThought() {
  const day = Math.floor(Date.now() / 86400000);
  return thoughts[day % thoughts.length];
}

const ThoughtBubble = () => {
  const [thought, setThought] = useState(getDailyThought());
  const [index, setIndex] = useState(0);

  const refresh = () => {
    setIndex(i => (i + 1) % thoughts.length);
    setThought(thoughts[(index + 1) % thoughts.length]);
  };

  return (
  <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, maxWidth: '220px' }}>
    <div
      onClick={refresh}
      style={{ position: 'relative', background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '12px', fontSize: '12px', cursor: 'pointer', lineHeight: '1.6' }}
    >
      <p style={{ fontSize: '10px', color: '#a0aec0', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px 0' }}>thought of the day</p>
      <p style={{ color: '#4a5568', margin: 0 }}>{thought}</p>
      <div style={{ position: 'absolute', bottom: '-10px', left: '20px', width: '10px', height: '10px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '-18px', left: '12px', width: '6px', height: '6px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '50%' }} />
    </div>
    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#f7fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '12px', marginLeft: '8px', fontSize: '16px' }}>🧠</div>
  </div>
)

export default ThoughtBubble;
