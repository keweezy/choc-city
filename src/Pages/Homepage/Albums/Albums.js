import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./styles.scss";
import { CardActionArea } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Albums = () => {
  // helpers
  let { id } = useParams();
  let location = useLocation();
  let history = useNavigate();

  // State
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    // Get albums
    axios.get(" https://jsonplaceholder.typicode.com/albums").then((res) => {
      const albums = res.data.filter(({ userId }) => userId === Number(id));
      setAlbums(albums);
    });

    axios
      .get(` https://jsonplaceholder.typicode.com/albums/${id}/photos`)
      .then((res) => {
        setPhotos(res.data);
      });
  }, []);

  // go to home Page
  const viewHome = () => {
    history(`/`);
  };

  return (
    <div id="albums">
      <div>
        <ArrowBackIcon onClick={viewHome} className="cursor" />

        <h2>{location.state} Albums</h2>
      </div>
      <Grid container spacing={3}>
        {/* List of Albums by Artiste */}
        {albums.map(({ title, id }, i) => (
          <Grid item xs={12} sm={12} md={6} lg={3} key={id}>
            <Card sx={{ height: 220, overflowY: "scroll" }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="120"
                  image={photos[i]?.thumbnailUrl}
                  alt=""
                />
                <CardContent style={{ background: "#e1cbcb" }}>
                  <span className="title">Album Title</span>
                  <Typography gutterBottom variant="h5" component="div">
                    {title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Albums;
