import { Box } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import { SearchInput } from './styles';

function SearchBar({ searchFunction }) {
  const icon = <SearchIcon />;
  return (
    <Box sx={{ display: 'flex', width: '100vw', alignItems: 'center', justifyContent: 'center' }}>
      <SearchInput
            id="superheroSearchBar"
            color='error'
            onChange={(e) => searchFunction(e)}
            InputProps={{ endAdornment: icon }}
            label="Search by SuperHero"
            sx={{ m: 4 }}
          />
    </Box>
  );
}

export default SearchBar;
