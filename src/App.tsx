import { useState } from 'react';
import useMeasure from 'react-use-measure';
import { useSpring, animated } from '@react-spring/web';
import './styles.css';

export default function App() {
  const [open, toggle] = useState<boolean>(false);
  const [ref, bounds] = useMeasure();
  const props = useSpring<{ width: number | { to: (value: number) => string } }>({
    width: open ? bounds.width : 0
  });

  const animatedWidth = props.width.to((x: number | { to: (value: number) => string }) => {
    const width: number = typeof x === 'number' ? x : bounds.width || 1;
    return `${((width / (bounds.width || 1)) * 100).toFixed(0)}%`;
  });

  return (
    <div className="container">
      <div ref={ref} className="main" onClick={() => toggle(!open)}>
      <animated.div className="fill" style={{ width: animatedWidth }} />
      <animated.div className="content">{animatedWidth}</animated.div>
      </div>
    </div>
  );
}

