import React, { ReactNode, useRef, useState, useEffect } from 'react';

interface TransitionProps {
  show: boolean;
  children: ReactNode;
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
  className?: string;
}

const Transition: React.FC<TransitionProps> = ({
  show,
  children,
  enter = 'transition-opacity duration-300',
  enterFrom = 'opacity-0',
  enterTo = 'opacity-100',
  leave = 'transition-opacity duration-300',
  leaveFrom = 'opacity-100',
  leaveTo = 'opacity-0',
  className = '',
}) => {
  const [mounted, setMounted] = useState(false);
  const [transitionClasses, setTransitionClasses] = useState('');
  const prevShow = useRef(show);

  useEffect(() => {
    if (show && !prevShow.current) {
      // Enter transition
      setMounted(true);
      setTransitionClasses(`${enter} ${enterFrom}`);
      
      // Apply enterTo classes after a small delay to trigger transition
      const enterTimer = setTimeout(() => {
        setTransitionClasses(`${enter} ${enterTo}`);
      }, 10);
      
      return () => clearTimeout(enterTimer);
    } else if (!show && prevShow.current) {
      // Leave transition
      setTransitionClasses(`${leave} ${leaveFrom}`);
      
      // Apply leaveTo classes after a small delay to trigger transition
      const leaveTimer = setTimeout(() => {
        setTransitionClasses(`${leave} ${leaveTo}`);
      }, 10);
      
      // Unmount after transition is complete
      const unmountTimer = setTimeout(() => {
        setMounted(false);
      }, 300); // Match this with your transition duration
      
      return () => {
        clearTimeout(leaveTimer);
        clearTimeout(unmountTimer);
      };
    }
    
    prevShow.current = show;
  }, [show, enter, enterFrom, enterTo, leave, leaveFrom, leaveTo]);

  if (!mounted && !show) return null;

  return (
    <div className={`${transitionClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Transition;