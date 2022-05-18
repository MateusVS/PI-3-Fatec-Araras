import { Box } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import { SearchInput } from './styles';

function SearchBar() {
  const icon = <SearchIcon />;
  return (
    <Box sx={{ display: 'flex', width: '100vw', alignItems: 'center', justifyContent: 'center' }}>
      <SearchInput
            id="outlined-adornment-amount"
            color='error'
            onChange={console.log('amount')}
            InputProps={{ endAdornment: icon }}
            label="Search by SuperHero"
            sx={{ m: 4 }}
          />
    </Box>
  );
}

export default SearchBar;
