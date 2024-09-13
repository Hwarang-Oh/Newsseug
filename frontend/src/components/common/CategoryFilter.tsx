import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { CategoryFilterProps } from '@/types/common/common';
import styled from 'styled-components';
import { CategoryFilterProps } from '@/types/common/common';

/**
 * IMP : CategoryFilter ( News Category Filter ) Component
 * TYPE : activeCategory, setActiveCategory
 * @param param0
 * @returns
 */
function CategoryFilter({
  activeCategory,
  setActiveCategory,
  isPressPage = false,
  bgColor,
  setParentSticky,
}: Readonly<CategoryFilterProps>) {
  const categories = useMemo(
    () => ['전체', '정치', '경제', '외교', '사건', '과학', '사회', '스포츠'],
    [],
  );

  const [isSticky, setIsSticky] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyTriggerRef = useRef<HTMLDivElement>(null);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      const newIsSticky = !entry.isIntersecting;
      if (isSticky !== newIsSticky) {
        setIsSticky(newIsSticky);
        if (setParentSticky) {
          setParentSticky(newIsSticky);
        }
      }
    },
    [isSticky, setParentSticky],
  );

  useEffect(() => {
    if (isPressPage && stickyTriggerRef.current) {
      const observer = new IntersectionObserver(handleIntersect, {
        threshold: [0, 1],
        rootMargin: '47px 0px 0px 0px',
      });
      observer.observe(stickyTriggerRef.current);
      return () => observer.disconnect();
    }
  }, [isPressPage, handleIntersect]);

  const handleCategoryClick = useCallback(
    (category: string) => {
      setActiveCategory(category);
    },
    [setActiveCategory],
  );

  return (
    <>
      {isPressPage && <StickyTrigger ref={stickyTriggerRef} />}
      <Container
        ref={containerRef}
        isPressPage={isPressPage}
        bgColor={bgColor}
        $isSticky={isSticky}
      >
        {categories.map((category) => (
          <FilterButton
            key={category}
            isPressPage={isPressPage}
            $isSticky={isSticky}
            active={activeCategory === category}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </FilterButton>
        ))}
      </Container>
    </>
  );
}

export default React.memo(CategoryFilter);

const StickyTrigger = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  visibility: hidden;
`;

const Container = styled.div<{
  isPressPage: boolean;
  bgColor?: string;
  $isSticky: boolean;
}>`
  box-sizing: border-box;
  width: 100%;
  white-space: nowrap;
  overflow-x: auto;
  display: flex;
  padding: ${({ isPressPage }) => (isPressPage ? '8px' : '8px 0')};
  align-items: flex-start;
  gap: 8px;
  flex-shrink: 0;
  scroll-behavior: smooth;
  position: ${({ isPressPage }) => (isPressPage ? 'sticky' : 'static')};
  top: ${({ isPressPage }) => (isPressPage ? '48px' : 'auto')};
  background-color: ${({ $isSticky, isPressPage, theme, bgColor }) =>
    isPressPage && $isSticky ? bgColor : theme.bgColor};
  z-index: ${({ isPressPage }) => (isPressPage ? '999' : 'auto')};
  will-change: background-color;
  transition: background-color 0.1s ease-out;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
`;

const FilterButton = styled.button<{
  active?: boolean;
  isPressPage?: boolean;
  $isSticky: boolean;
}>`
  display: flex;
  border: ${({ active, isPressPage, $isSticky }) =>
    isPressPage && $isSticky
      ? '1px solid #EEEEEE'
      : active
        ? 'none'
        : '1px solid #EEEEEE'};
  font-size: 12px;
  width: 55px;
  height: 32px;
  padding: 6px 12px;
  justify-content: center;
  align-items: center;
  color: ${({ active, theme, isPressPage, $isSticky }) =>
    isPressPage && $isSticky ? theme.textColor : active ? 'white' : 'black'};
  border-radius: 3px;
  background-color: ${({ active, isPressPage, $isSticky, theme }) =>
    isPressPage && $isSticky
      ? active
        ? '#EEEEEE'
        : '#eeeeee00'
      : active
        ? theme.mainColor
        : 'white'};
  cursor: pointer;
  outline: none;
  will-change: background-color, color, border;
  transition:
    background-color 0.1s ease-out,
    color 0.1s ease-out,
    border 0.1s ease-out;
`;
