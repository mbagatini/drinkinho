import { MutableRefObject, useEffect } from "react";

interface intersectionProps {
  targetRef: MutableRefObject<any>;
  onIntersect: () => void;
  enableCondition: boolean;
}

export function useIntersectionObserver({
  targetRef,
  enableCondition,
  onIntersect,
}: intersectionProps) {
  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting && enableCondition) {
      onIntersect();
    }
  };

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }
  });
}
