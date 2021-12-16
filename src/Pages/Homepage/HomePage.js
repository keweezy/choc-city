import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.scss";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";
import Tweets from "./Tweets/Tweets";

const HomePage = () => {
  // helpers
  let history = useNavigate();

  // States
  const [allArtiste, setAllArtiste] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    // Get all artiste
    axios
      .get(" https://jsonplaceholder.typicode.com/users")
      .then((res) => setAllArtiste(res.data));

    // Get albums
    axios
      .get(" https://jsonplaceholder.typicode.com/albums")
      .then((res) => setAlbums(res.data));
  }, []);

  // Handle tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // go to home Page
  const viewAlbum = (id, name) => {
    history(`/albums/${id}`, { state: name });
  };

  console.log(albums);

  return (
    <div id="home-page">
      {/* Tab */}
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          marginBottom: "1.5rem",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          style={{ backgroundColor: "aliceblue" }}
        >
          <Tab label="Artiste" />
          <Tab label="Tweets" />
        </Tabs>
      </Box>

      {/* Artiste List */}
      {value === 0 && (
        <div>
          <h2 className="mb-3"> Artistes</h2>
          <Grid container spacing={3}>
            {/* List of Artsite */}
            {allArtiste.map(({ name, id, email, phone }) => (
              <Grid item xs={12} sm={12} md={6} lg={3} key={id}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography className="mb-1" variant="h5" component="div">
                      {name}
                    </Typography>
                    <Typography className="mb-1" variant="body2">
                      Email: {email}
                    </Typography>
                    <Typography variant="body2">Phone:{phone}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => viewAlbum(id, name)}>
                      View Albums
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}

      {value === 1 && <Tweets />}
    </div>
  );
};

export default HomePage;
