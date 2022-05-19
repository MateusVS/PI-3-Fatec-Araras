import { Card as MUICard, CardHeader, CardMedia, CardContent } from '@mui/material';

function Card ({ name, image }) {
  return(
    <MUICard sx={{ maxWidth: 345 }}>
      <CardHeader title={name} />
      <CardMedia
        component="img"
        image={image}
        alt={name}
      />
      <CardContent>
        <button>Veja Mais</button>
      </CardContent>
    </MUICard>
  );
}

export default Card;
