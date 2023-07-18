import React, { useRef } from 'react';
import { styled } from 'styled-components';

export const SuggestionsListContainer = styled.ul`
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  overflow-y: scroll;
  max-height: 30svh;
  top: 45px;
  border: 1px solid white;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  border-top: 1px solid #000;

  li {
    background-color: #000;
    list-style: none;
    padding: 0.4rem;
    box-sizing: border-box;
    font-size: 14px;
  }

  .suggestion-active {
    border: 1px solid white;
    background-color: #fff;
    color: #000;
  }
`

interface SuggestionListProps<T> {
  suggestions: T[];
  labelFor: (item: T) => string;
  keyFor: (item: T) => string;
  activeSuggestion: number;
  onClick: (item: T) => void;
}

const SuggestionList = <T,>({ suggestions, labelFor, keyFor, activeSuggestion, onClick }: SuggestionListProps<T>) => {
  const selectRef = useRef<HTMLUListElement>(null);

  function keepInView() {
    const selected = selectRef?.current?.querySelector(".suggestion-active");
    if (selected) {
      selected?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }

  if (suggestions.length === 0) {
    return <em>No suggestions available</em>
  }

  return (
    <SuggestionsListContainer className="suggestions" ref={selectRef}>
      {suggestions.map((suggestion, index) => {
        let className = '';
        if (index === activeSuggestion) {
          className = 'suggestion-active';
        }

        setTimeout(() => {
          keepInView();
        }, 1000)

        return (
          <li className={className} key={keyFor(suggestion)} onClick={() => onClick(suggestion)}>
            {labelFor(suggestion)}
          </li>
        );
      })}
    </SuggestionsListContainer>
  );
};

export default SuggestionList;

