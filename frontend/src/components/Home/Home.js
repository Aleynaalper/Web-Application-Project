import React, { useEffect, useState } from "react";
import Post from "../Post/Post";
import "./Home.css"
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PostForm from "../Post/PostForm";
import { style } from "@mui/system";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

function Home() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsloaded] = useState(false);
    const [postList, setPostList] = useState([]);

    const refreshFeed = () => {
        fetch("/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsloaded(true);
                    setPostList(result)
                },
                (error) => {
                    console.log(error)
                    setIsloaded(true);
                    setError(error);
                }
            )
    }

    useEffect(() => {
        refreshFeed();
    }, [postList])

    if (error) {
        return <div> Error !!! </div>;
    } else if (!isLoaded) {
        return <div> Loading... </div>
    } else {
        return (
            <div class="wrapper">
                <article class="main">
                    <p>
                    <React.Fragment>
                <CssBaseline />
                <div>
                <Box sx={{
                               display: "flex", 
                               flexWrap: "wrap", 
                               justifyContent : "center", 
                               alignItems : "center",  
                               backgroundColor: '#f5f5f5', 
                                }}> 
                {localStorage.getItem("currentUser") == null ? "" : <PostForm userId ={localStorage.getItem("currentUser")} userName={localStorage.getItem("userName")} refreshFeed={refreshFeed}></PostForm>}
                </Box>
                        {postList.slice(0).reverse().map(post => (
                           <Box sx={{
                               display: "flex", 
                               flexWrap: "wrap", 
                               justifyContent : "center", 
                               alignItems : "center",  
                               backgroundColor: '#f5f5f5',
                                }}> 
                                
                               <Post userId ={post.userId} userName={post.userName}
                                title={post.title} text={post.text} postId={post.id} likes={post.likes} ></Post>
                               </Box>
                        ))}
                </div>
            </React.Fragment>

                    </p>
                </article>
                <aside class="aside aside-1">
                
                
        <Card sx={{ maxWidth: 345 }} class="profilecard">
                    
      <CardMedia 
        component="img"
        alt="card image"
        height="140"
        image="/avatars/default1.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Username
        </Typography>
        <Typography variant="body2" color="text.secondary">
          About
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
                </aside>
                <aside class="aside aside-2">

                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="İlayda Atmaca" src="/avatars/default1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="İlayda Atmaca"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Student
              </Typography>
              <Typography>{"-Third grade"}</Typography>
              
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Taylan Özdoğan" src="/avatars/default3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Taylan Özdoğan"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Academician
              </Typography>
              <Typography>{"-Blockchain"}</Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Aleyna" src="/avatars/default4.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Aleyna Alper"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Graduate
              </Typography>
              <Typography>{"-Game Developer"}</Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
                    
                                

                </aside>
            </div>
        );
    }

}

export default Home;