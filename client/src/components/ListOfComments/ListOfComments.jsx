import { List, ListSubheader, Paper, Typography } from '@material-ui/core'
import React from 'react'
import CommentForList from './CommentForList/CommentForList'

export default function ListOfComments({ text, comments }) {
  return (
    <List>
      <ListSubheader inset={false} disableGutters={false}>
        <Paper style={{ width: '95%', padding: '11px' }}>
          <Typography variant='h6'>{text}</Typography>
        </Paper>
      </ListSubheader>
      {comments?.length ?
        comments.map(comment => (
          <CommentForList key={comment._id} comment={comment} />
        ))
        : null
      }
    </List>
  )
}
