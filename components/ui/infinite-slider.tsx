'use client';
import { cn } from '@/lib/utils';
import { useMotionValue, animate, motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const translation = useMotionValue(0);
  const [key, setKey] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const animationControlsRef = useRef<any>(null);

  // Measure dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setWidth(rect.width);
        setHeight(rect.height);
      }
    };

    updateDimensions();
    
    const resizeObserver = new ResizeObserver(updateDimensions);
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Pause animation when not visible
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Don't animate if not visible
    if (!isVisible) return;

    let controls;
    const size = direction === 'horizontal' ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    controls = animate(translation, [from, to], {
      ease: 'linear',
      duration: currentDuration,
      repeat: Infinity,
      repeatType: 'loop',
      repeatDelay: 0,
      onRepeat: () => {
        translation.set(from);
      },
    });

    animationControlsRef.current = controls;

    return () => {
      controls?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    key,
    currentDuration,
    width,
    height,
    gap,
    direction,
    reverse,
    isVisible,
    // translation intentionally excluded - MotionValue is stable and causes infinite loops
  ]);

  const hoverProps = durationOnHover
    ? {
        onHoverStart: () => {
          setCurrentDuration(durationOnHover);
        },
        onHoverEnd: () => {
          setCurrentDuration(duration);
        },
      }
    : {};

  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        className='flex w-max'
        style={{
          ...(direction === 'horizontal'
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
