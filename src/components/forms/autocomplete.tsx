import { useState, ChangeEvent, ReactNode, KeyboardEvent, MouseEvent, useEffect, useMemo } from "react";
import Input from "./input";
import { styled } from "styled-components";

const AutocompleteListContainer = styled.div`
  position: relative;
  width: 100%;
  
  input {
      width: 100%;
      height: 48px;
      margin-bottom: 1rem;
    }

  ul {
    box-sizing: border-box;
      position: absolute;
      width: 100%;
      overflow-y: scroll;
      height: 250px;

      li {
          background-color: #e3e3e3;
          list-style: none;
          padding: 0.4rem;
          box-sizing: border-box;
        }

        .suggestion-active {
            border: 1px solid pink;
            background-color: black;
          }
    }
`

export default function AutoComplete<T>(
  { suggestions, onSelect, searchOn }: { suggestions: T[], searchOn: keyof T & string, onSelect: (item: T) => void }) {
  const memoOnSelect = useMemo(() => onSelect, [])
  const [state, setState] = useState<{ activeSuggestion: number, filteredSuggestions: T[], showSuggestions: boolean, selected?: T, userInput: string }>({
    activeSuggestion: 0,
    filteredSuggestions: [],
    showSuggestions: false,
    selected: undefined,
    userInput: ''
  });


  function onChange(e: ChangeEvent<{ value: string }>) {
    const userInput = e.currentTarget.value;
    const filteredSuggestions = suggestions.filter(
      suggestion => (suggestion[searchOn] as string).toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput
    })
  }

  function onKeyDown(e: KeyboardEvent<unknown>) {
    const { activeSuggestion, filteredSuggestions } = state;

    if (e.key === 'Enter') {
      setState({
        activeSuggestion: 0,
        showSuggestions: false,
        filteredSuggestions: [],
        userInput: (filteredSuggestions[activeSuggestion][searchOn]) as string,
        selected: filteredSuggestions[activeSuggestion]
      })
    } else if (e.key === 'ArrowUp') {
      if (activeSuggestion === 0) {
        return;
      }
      setState({ ...state, activeSuggestion: activeSuggestion - 1 });
    } else if (e.key === 'ArrowDown') {
      if (activeSuggestion + 1 >= filteredSuggestions.length) {
        return;
      }
      setState({ ...state, activeSuggestion: activeSuggestion + 1 });
    }
  }

  function onClick(e: MouseEvent<{ innerText: string }>) {
    setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
      selected: suggestions.find(suggestion => suggestion[searchOn] === e.currentTarget.innerText)
    })
  }

  useEffect(() => {
    if (state.selected !== undefined) {
      memoOnSelect(state.selected);
    }
  }, [state.selected, memoOnSelect])

  let suggestionsListComponent: ReactNode;

  if (state.showSuggestions && state.userInput) {
    if (state.filteredSuggestions.length) {
      suggestionsListComponent = (
        <ul className="suggestions">
          {state.filteredSuggestions.map((suggestion, index) => {
            let className;

            // Flag the active suggestion with a class
            if (index === state.activeSuggestion) {
              className = "suggestion-active";
            }
            return (
              <li className={className} key={suggestion[searchOn] as string} onClick={onClick}>
                {suggestion[searchOn] as string}
              </li>
            );
          })}
        </ul>
      );
    } else {
      suggestionsListComponent = (
        <em>No suggestions available.</em>
      );
    }
  }

  return (
    <AutocompleteListContainer>
      <Input autoComplete="off" placeholder="Search for item, e.g. Tumeken's Shadow" onChange={onChange} onKeyDown={onKeyDown} value={state.userInput} />
      {suggestionsListComponent}
    </AutocompleteListContainer>
  )
}
