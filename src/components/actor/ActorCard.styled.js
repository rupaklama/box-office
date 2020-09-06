import styled from 'styled-components';

import { SearchCard } from '../styled';

// inheriting/extending style from styled component - SearchCard,
// will be set on top of existing styles of SearchCard component
export const StyledActorCard = styled(SearchCard)`
  .deathday {
    margin: 0;
    margin-top: 15px;
    font-weight: bold;
  }
`;