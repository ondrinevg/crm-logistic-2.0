import React from 'react';
import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function CommentForList({ comment }) {
  const classes = useStyles();
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={comment.manager.lastName} src={comment.manager.photo} />
        </ListItemAvatar>
        <ListItemText
          primary={`${comment.manager?.lastName} ${comment.manager?.name[0]}. ${comment.manager?.middleName[0]}. ${new Date(comment.createdAt).toLocaleDateString()}`}
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {new Date(comment.createdAt).toLocaleTimeString() + ': '}
              </Typography>
              {comment.text}
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  )
}

