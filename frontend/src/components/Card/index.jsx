import { Card as MUICard, CardHeader, CardMedia, CardContent } from '@mui/material';

function Card () {
  return(
    <MUICard sx={{ maxWidth: 345 }}>
      <CardHeader title="Teste" />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <button>Veja Mais</button>
      </CardContent>
    </MUICard>
  );
}

export default Card;
