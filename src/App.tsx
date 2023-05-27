import { useState } from 'react';
import useMeasure from 'react-use-measure';
import { useSpring, animated } from '@react-spring/web';
import './styles.css';

export default function App() {
  const [open, toggle] = useState(false);
  const [ref, bounds] = useMeasure();
  console.log(bounds.width)
  const props = useSpring({ width: open ? bounds.width : 0 });

  const animatedWidth = props.width.to(x => `${(x !== 100 ? 100 : x).toFixed(0)}%`);

  return (
    <div className="container">
      <div ref={ref} className="main" onClick={() => toggle(!open)}>
        <animated.div className="fill" style={props} />
        <animated.div className="content">{animatedWidth}</animated.div>     
      </div>
    </div>
  );
}
