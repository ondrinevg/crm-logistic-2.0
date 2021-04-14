import React from 'react';
import {render} from 'react-dom';
import {Virtuoso} from 'react-virtuoso';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import {useUserRecords} from './data';

const ListContainer = ({listRef, style, children}) => {
  return (
    <List ref={listRef} style={{...style, padding: 0}}>
      {children}
    </List>
  );
};

const ItemContainer = ({children, ...props}) => {
  return (
    <ListItem {...props} style={{margin: 0}}>
      {children}
    </ListItem>
  );
};

const TOTAL_COUNT = 500;
const App = () => {
  const {loadedUsers, loadMore} = useUserRecords(TOTAL_COUNT);
  // increasing the overscan makes the loading more 'eager' 
  // as the end of the list is reached earlier 
  return (
    <Virtuoso
      ListContainer={ListContainer}
      ItemContainer={ItemContainer}
      style={{width: '400px', height: '300px'}}
      totalCount={loadedUsers.length}
      footer={() => {
        return (
          <div>
            {loadedUsers.length === TOTAL_COUNT ? '-- end -- ' : ' loading...'}
          </div>
        );
      }}
      endReached={loadMore}
      overscan={200}
      item={index => {
        return (
          <>
            <ListItemAvatar>
              <Avatar alt="A" src={loadedUsers[index].avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={`${loadedUsers[index].name}`}
              secondary={<span>{loadedUsers[index].description}</span>}
            />
          </>
        ); 
      }}
    />
  );
};

render(<App />, document.getElementById('root'));
