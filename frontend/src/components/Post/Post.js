import React, { useEffect, useState } from "react"
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import { ClassNames } from "@emotion/react";
import Comment from "../Comment/Comment"
import Container from '@mui/material/Container';
import { BorderStyle } from "@mui/icons-material";
import CommentForm from "../Comment/CommentForm";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

// import "./Post.css"

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({

    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Post(props) {
    const { title, text, userId, userName, postId, likes } = props;
    const [expanded, setExpanded] = React.useState(false);
    const [commentList, setCommentList] = useState([]);
    const isFirstLoad = React.useRef(true);
    const [error, setError] = useState(null);
    const [isLoaded, setIsloaded] = useState(false);
    const [likeCount, setLikeCount] = useState(likes.length);
    const [liked, setLiked] = useState(false)
    const [likeId, setLikeId] = useState(null);
    let disabled = localStorage.getItem("currentUser") == null ? true : false;

    const handleExpandClick = () => {
        setExpanded(!expanded);
        refreshComments();
        console.log(commentList);
    };

    const handleLike = () => {
        setLiked(!liked);
        if (!liked) {
            saveLike();
            setLikeCount(likeCount + 1)

        }
        else {
            deleteLike();
            setLikeCount(likeCount - 1)

        }
    }

    const refreshComments = () => {
        fetch("/comments?postId=" + postId)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsloaded(true);
                    setCommentList(result)
                },
                (error) => {
                    console.log(error)
                    setIsloaded(true);
                    setError(error);
                }
            )
    }

    const checkLikes = () => {
        var likeCheck = likes.find((like => "" + like.userId === localStorage.getItem("currentUser")));
        if (likeCheck != null) {
            setLiked(true);
            setLikeId(likeCheck.id)
        }
    }
    const saveLike = () => {
        fetch("/likes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("tokenKey"),
            },
            body: JSON.stringify({
                postId: postId,
                userId: localStorage.getItem("currentUser"),
            }),
        })
            .then((res) => res.json())
            .catch((err) => console.log(err))
    }



    const deleteLike = () => {
        fetch("/likes/" + likeId, {
            method: "DELETE",
            headers: {
                "Authorization": localStorage.getItem("tokenKey"),
            },
        })
            .catch((err) => console.log(err))
    }




    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
        }
        else
            refreshComments();
    }, [commentList])

    useEffect(() => { checkLikes() }, [])

    return (
        <div className='postContainer'>
            <Card sx={{
                width: 500,
                textAlign: "left",
                margin: 1.5,
                borderStyle: "none",
                boxShadow: "none"
            }}>
                <CardHeader
                    avatar={
                        <Link className='link' to={{ pathname: '/users/' + userId }}>
                            <Avatar sx={{ background: "purple" }} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}

                            </Avatar>
                        </Link>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={title}
                subheader="April 15, 2022"
                />
                {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {text}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    {disabled ?
                        <IconButton
                            disabled
                            onClick={handleLike}
                            aria-label="add to favorites">
                            <ThumbUpIcon style={liked ? { color: "blue" } : null} />
                        </IconButton> :
                        <IconButton
                            onClick={handleLike}
                            aria-label="add to favorites">
                            <ThumbUpIcon style={liked ? { color: "blue" } : null} />
                        </IconButton>}
                    {likeCount}
                    {/* <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton> */}
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <CommentIcon style={expanded ? { color: "black" } : null} />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Container fixed className="postContainer">
                        {error ? "error" :
                            isLoaded ? commentList.map(comment => (
                                <Comment userId={1} userName={userName} text={comment.text}></Comment>
                            )) : "Loading"}
                        {localStorage.getItem("currentUser") == null ? "" :
                            <CommentForm userId={1} userName={userName} postId={postId}></CommentForm>}
                    </Container>
                </Collapse>
            </Card>
        </div>
    );
}
