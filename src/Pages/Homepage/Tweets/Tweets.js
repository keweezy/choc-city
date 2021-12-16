import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./styles.scss";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "../../../Component/Modal/Modal";

const Tweets = () => {
  // helpers
  let { id } = useParams();
  let location = useLocation();
  let history = useNavigate();

  // State
  const [tweets, setTweets] = useState([]);
  const [modal, setModal] = useState({ open: false });

  useEffect(() => {
    // Get tweets
    axios.get(" https://jsonplaceholder.typicode.com/comments").then((res) => {
      setTweets(res.data);
    });
  }, []);

  const editTweet = (id) => {
    console.log(id);
  };
  const deleteTweet = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/comments/${id}`)
      .then(() => axios.get(" https://jsonplaceholder.typicode.com/comments"));
  };

  const openModal = () => {
    setModal({ ...modal, open: true });
  };

  return (
    <div id="tweets">
      <div>
        {/* <span onClick={viewHome} className="cursor">
          Go Back
        </span> */}
      </div>
      <Button variant="contained" className="mb-1 float" onClick={openModal}>
        Add Tweet
      </Button>
      <Grid container spacing={3}>
        {/* List of Albums by Artiste */}
        {tweets.map(({ body, email, name, postId, id }) => (
          <Grid item xs={12} sm={12} md={6} lg={3} key={id}>
            <div className="list" key={id}>
              <div className="flex-end">
                <EditIcon className="cursor" onClick={() => editTweet(id)} />
                <DeleteIcon
                  className="cursor"
                  onClick={() => deleteTweet(id)}
                />
              </div>
              <Typography variant="h6">{name}</Typography>
              <div className="">
                <Typography variant="caption">{email}</Typography>
                <Typography className="mt-1" variant="body1">
                  {body}
                </Typography>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>

      {/* Modal */}
      {modal.open && (
        <Modal
          open={modal.open}
          title={modal.isEdit ? "Edit Tweet" : "Add Tweet"}
        >
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </Modal>
      )}
    </div>
  );
};

export default Tweets;
