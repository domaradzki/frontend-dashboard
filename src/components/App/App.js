import { styled } from '@mui/material/styles';
import Dashborad from '../Dashboard/Dashboard';
import Header from '../Header/Header';

const Wrapper = styled('div')`
  width: 100%;
`;

function App() {
  return (
    <Wrapper>
      <Header></Header>
      <Dashborad />
    </Wrapper>
  );
}

export default App;
