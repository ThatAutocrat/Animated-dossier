import { useState, useEffect } from 'react';

const NowPlaying = () => {
  const [progress, setProgress] = useState(40);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => (p + 1) % 101);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      bottom: '250px',
      left: '24px',
      zIndex: 9999,
      background: '#1e2330',
      border: '1px solid #3a4460',
      borderRadius: '12px',
      padding: '8px 12px',
      width: '160px',
    }}>
      <p style={{ fontSize: '9px', color: '#a0aec0', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px' }}>now playing</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '28px', height: '28px', borderRadius: '6px',
          background: '#1D9E75', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '14px', color: 'white'
        }}>♪</div>
        <div style={{ overflow: 'hidden' }}>
          <p style={{ fontSize: '11px', color: '#e2e8f0', margin: 0, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Devashish&apos;s Portfolio</p>
<p style={{ fontSize: '10px', color: '#a0aec0', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>You&apos;re listening live</p>
        </div>
      </div>
      <div style={{ marginTop: '8px', height: '2px', background: '#3a4460', borderRadius: '2px' }}>
        <div style={{ width: `${progress}%`, height: '100%', background: '#1D9E75', borderRadius: '2px', transition: 'width 0.3s linear' }} />
      </div>
    </div>
  );
};

export default NowPlaying;
