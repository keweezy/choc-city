import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.scss";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const HomePage = () => {
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

  console.log(albums)

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
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Our Artiste" />
          <Tab label="Albums" />
        </Tabs>
      </Box>

      {/* Artiste List */}
      {value === 0 && (
        <Grid container spacing={3}>
          {/* List of Artsite */}
          {allArtiste.map(({ name, id, email, phone }) => (
            <Grid item xs={12} sm={12} md={6} lg={3} key={id}>
              <div className="list">
                <h4>Name: {name}</h4>
                <div className="">
                  <p>Email: {email}</p>
                  <p>Phone: {phone}</p>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default HomePage;
