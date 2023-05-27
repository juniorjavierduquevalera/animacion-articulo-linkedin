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

  const animatedWidth = props.width.to(x => {
    const width = bounds.width || 1; // Verificación de bounds.width
    return `${((x / width) * 100).toFixed(0)}%`;
  });

  return (
    <div className="container">
      <div ref={ref} className="main" onClick={() => toggle(!open)}>
        <animated.div className="fill" style={props} />
        <animated.div className="content">{animatedWidth}</animated.div>
      </div>
    </div>
  );
}

