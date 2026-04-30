import { useEffect, useRef } from 'react';

const visitors = [
  {lat:28.6, lng:77.2, city:'New Delhi'},
  {lat:51.5, lng:-0.1, city:'London'},
  {lat:40.7, lng:-74.0, city:'New York'},
  {lat:35.7, lng:139.7, city:'Tokyo'},
  {lat:-33.9, lng:151.2, city:'Sydney'},
  {lat:48.9, lng:2.3, city:'Paris'},
  {lat:37.8, lng:-122.4, city:'San Francisco'},
  {lat:1.3, lng:103.8, city:'Singapore'},
  {lat:55.8, lng:37.6, city:'Moscow'},
  {lat:-23.5, lng:-46.6, city:'São Paulo'},
  {lat:19.1, lng:72.9, city:'Mumbai'},
  {lat:30.0, lng:31.2, city:'Cairo'},
  {lat:6.5, lng:3.4, city:'Lagos'},
  {lat:43.7, lng:-79.4, city:'Toronto'},
  {lat:52.5, lng:13.4, city:'Berlin'},
  {lat:26.5, lng:93.7, city:'Assam'},
];

const VisitorGlobe = () => {
  const canvasRef = useRef();
  const rotRef = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const R = 75, cx = 80, cy = 80;

    function toXY(lat, lng, rotDeg) {
      const phi = (90 - lat) * Math.PI / 180;
      const theta = (lng + rotDeg) * Math.PI / 180;
      const x = R * Math.sin(phi) * Math.cos(theta);
      const y = R * Math.cos(phi);
      const z = R * Math.sin(phi) * Math.sin(theta);
      return { x: cx + x, y: cy - y, z };
    }

    function draw() {
      ctx.clearRect(0, 0, 160, 160);
      const rotDeg = rotRef.current * 180 / Math.PI;

      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = '#1e2330';
      ctx.fill();
      ctx.strokeStyle = '#3a4460';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let first = true;
        for (let lng = -180; lng <= 180; lng += 5) {
          const p = toXY(lat, lng, rotDeg);
          if (p.z > 0) { first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y); first = false; }
          else first = true;
        }
        ctx.strokeStyle = '#3a4460'; ctx.lineWidth = 0.3; ctx.stroke();
      }

      for (let lng = -180; lng < 180; lng += 30) {
        ctx.beginPath();
        let first = true;
        for (let lat = -90; lat <= 90; lat += 5) {
          const p = toXY(lat, lng, rotDeg);
          if (p.z > 0) { first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y); first = false; }
          else first = true;
        }
        ctx.strokeStyle = '#3a4460'; ctx.lineWidth = 0.3; ctx.stroke();
      }

      const front = [], back = [];
      visitors.forEach(v => {
        const p = toXY(v.lat, v.lng, rotDeg);
        (p.z > 0 ? front : back).push({ ...v, ...p });
      });

      back.forEach(v => {
        ctx.beginPath();
        ctx.arc(v.x, v.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = v.city === 'Assam' ? '#1D9E7555' : '#378ADD33';
        ctx.fill();
      });

      front.forEach(v => {
        const isHome = v.city === 'Assam';
        ctx.beginPath();
        ctx.arc(v.x, v.y, isHome ? 4 : 3, 0, Math.PI * 2);
        ctx.fillStyle = isHome ? '#1D9E75' : '#378ADD';
        ctx.fill();
        if (isHome) {
          ctx.beginPath();
          ctx.arc(v.x, v.y, 7, 0, Math.PI * 2);
          ctx.strokeStyle = '#1D9E7566'; ctx.lineWidth = 1; ctx.stroke();
        }
        ctx.font = '9px sans-serif';
        ctx.fillStyle = '#a0aec0';
        ctx.fillText(v.city, v.x + 5, v.y - 3);
      });
    }

    let animId;
    const animate = () => {
      if (!dragging.current) rotRef.current += 0.003;
      draw();
      animId = requestAnimationFrame(animate);
    };

    const onMouseDown = e => { dragging.current = true; lastX.current = e.clientX; };
    const onMouseUp = () => { dragging.current = false; };
    const onMouseMove = e => {
      if (dragging.current) { rotRef.current += (e.clientX - lastX.current) * 0.01; lastX.current = e.clientX; }
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);
    animate();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', bottom: '24px', left: '24px', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <p style={{ fontSize: '10px', color: '#a0aec0', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px' }}>visitors</p>
      <canvas ref={canvasRef} width={160} height={160} style={{ cursor: 'grab' }} />
    </div>
  );
};

export default VisitorGlobe;
