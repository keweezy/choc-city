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

  // State
  const [tweets, setTweets] = useState([]);
  const [modal, setModal] = useState({ open: false, value: "", isEdit: false });

  useEffect(() => {
    // Get tweets
    axios.get(" https://jsonplaceholder.typicode.com/comments").then((res) => {
      setTweets(res.data);
    });
  }, []);

  //   Methods
  const deleteTweet = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/comments/${id}`)
      .then(() => callBack());
  };

  const openModal = () => {
    setModal({ ...modal, open: true });
  };

  const openEditTweet = (id, body) => {
    setModal({ ...modal, open: true, isEdit: true, id, value: body });
  };

  const handleChange = ({ target: { value } }) => {
    setModal({ ...modal, value });
  };
  const handleClose = () => {
    setModal({ open: false, value: "", isEdit: false });
  };

  const callBack = () => {
    axios.get(" https://jsonplaceholder.typicode.com/comments").then((res) => {
      setTweets(res.data);
    });
    handleClose();
  };

  const submit = () => {
    const { isEdit, id } = modal;
    if (isEdit) {
      axios
        .put(`https://jsonplaceholder.typicode.com/comments/${id}`, modal.value)
        .then(() => callBack());
      return;
    }
    axios
      .post(`https://jsonplaceholder.typicode.com/comments`, modal.value)
      .then(() => callBack());
  };

  return (
    <div id="tweets">
      <div>
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
                <EditIcon
                  className="cursor"
                  onClick={() => openEditTweet(id, body)}
                />
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
          handleClose={handleClose}
          submit={submit}
        >
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tweets"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            value={modal.value}
            onChange={handleChange}
          />
        </Modal>
      )}
    </div>
  );
};

export default Tweets;
