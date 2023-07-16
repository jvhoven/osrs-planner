import { useState, ChangeEvent, KeyboardEvent, MouseEvent, useEffect } from "react";
import { styled } from "styled-components";

import Input from "../input";
import SuggestionList from "./suggestions-list";

const AutocompleteListContainer = styled.div`
  position: relative;
  width: 100%;
  
  input {
      width: 100%;
      height: 48px;
      margin-bottom: 1rem;
    }

`

type AutoCompleteState<T> = { activeSuggestion: number, filteredSuggestions: T[], showSuggestions: boolean, selected?: T, userInput: string };

const initialState = {
  activeSuggestion: 0,
  filteredSuggestions: [],
  showSuggestions: false,
  selected: undefined,
  userInput: ''
}

interface AutoCompleteProps<T> {
  keyFor: (item: T) => string;
  suggestions: T[];
  indexFor: (item: T) => string;
  onSelect: (item: T) => void;
}

const AutoComplete = <T,>({ suggestions, onSelect, keyFor, indexFor }: AutoCompleteProps<T>) => {
  const [state, setState] = useState<AutoCompleteState<T>>(initialState);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const userInput = e.currentTarget.value;
    const filteredSuggestions = suggestions.filter(
      suggestion => indexFor(suggestion).toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setState({
      ...initialState,
      filteredSuggestions,
      showSuggestions: true,
      userInput,
    });
  }

  function onKeyDown(e: KeyboardEvent<unknown>) {
    const { activeSuggestion, filteredSuggestions } = state;

    if (e.key === 'Enter') {
      setState({
        activeSuggestion: 0,
        showSuggestions: false,
        filteredSuggestions: [],
        userInput: indexFor(filteredSuggestions[activeSuggestion]),
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
    } else if (e.key === 'Escape') {
      setState({ ...state, showSuggestions: false, userInput: '' })
    }
  }

  function onClickSuggestion(suggestion: T) {
    setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: indexFor(suggestion),
      selected: suggestion
    })
  }

  useEffect(() => {
    if (state.selected !== undefined) {
      onSelect(state.selected);
      setState(initialState);
    }
  }, [state.selected])

  return (
    <AutocompleteListContainer>
      <Input autoComplete="off" placeholder="Search for item, e.g. Tumeken's Shadow" onChange={onChange} onKeyDown={onKeyDown} value={state.userInput} />
      {state.userInput && state.showSuggestions && (
        <SuggestionList
          keyFor={keyFor}
          suggestions={state.filteredSuggestions}
          indexFor={indexFor}
          activeSuggestion={state.activeSuggestion}
          onClick={(e) => onClickSuggestion(e)}
        />
      )}
    </AutocompleteListContainer>
  )
}

export default AutoComplete;
