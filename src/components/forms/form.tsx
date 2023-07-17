import styled from "styled-components";
import FormBlock from "./form-block";

export default styled.form<{ $inline?: boolean }>`
  flex: 0 42.5%;
  display: flex;
  flex-direction: ${props => props.$inline ? "row" : "column"};
  justify-content: space-between;

  input[type='text'],
  select {
    padding: 0.2rem;
  }
`
