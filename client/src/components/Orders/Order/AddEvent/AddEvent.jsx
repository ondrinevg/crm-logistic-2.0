import React, { useState } from 'react'
import { Button, CircularProgress, FormControl, Grid, InputLabel, Paper, Select, TextField } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AddIcon from '@material-ui/icons/Add';
import { IconButton, InputAdornment } from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import { useDispatch, useSelector } from 'react-redux';
import { addCommentToOrderSaga } from '../../../../redux/actionCreators/orderAC';
import { addEventSaga } from '../../../../redux/actionCreators/eventAC';

export default function AddEvent({ order, id }) {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectedEndDate, handleEndDateChange] = useState(new Date());
  const [selectedRole, handleRoleChange] = useState('');
  const [description, setDescription] = useState('');

  const loading = useSelector(state => state.loading);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (selectedDate && selectedEndDate && selectedRole && description.trim()) {
      const newEvent = {
        start: {
          dateTime: selectedDate,
          timeZone: 'Europe/Moscow'
        },
        end: {
          dateTime: selectedEndDate,
          timeZone: 'Europe/Moscow'
        },
        summary: `${selectedRole} для заказа №${order}`,
        colorId: selectedRole === 'доставка' ? 1 : 2,
        description: description.trim(),
      };
      dispatch(addEventSaga(newEvent));
      dispatch(addCommentToOrderSaga(id,
        `установлено событие "${selectedRole}", которое пройдет с ${selectedDate.toLocaleString()} до ${selectedEndDate.toLocaleString()}, дополнительные сведения: "${description.trim()}"`
      ));
      handleDateChange(new Date());
      handleEndDateChange(new Date());
      handleRoleChange('');
      setDescription('');
    }
  }

  return (
    <Paper>
      <Grid container>

        {!loading ?
          <>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <form onSubmit={submitHandler} name="addEvent">
                <FormControl margin='normal' fullWidth={true}>
                  <DateTimePicker
                    autoOk
                    required
                    hideTabs
                    ampm={false}
                    value={selectedDate}
                    onChange={handleDateChange}
                    allowKeyboardControl={false}
                    minDate={new Date()}
                    name="startDate"
                    helperText="Дата начала нового события"
                    leftArrowIcon={<ArrowBackIosIcon />}
                    leftArrowButtonProps={{ "aria-label": "Prev month" }}
                    rightArrowButtonProps={{ "aria-label": "Next month" }}
                    rightArrowIcon={<ArrowForwardIosIcon />}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <AddIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                <FormControl margin='normal' fullWidth={true}>
                  <DateTimePicker
                    autoOk
                    required
                    hideTabs
                    ampm={false}
                    value={selectedEndDate}
                    onChange={handleEndDateChange}
                    allowKeyboardControl={false}
                    minDate={new Date()}
                    name="endDate"
                    helperText="Дата окончания нового события"
                    leftArrowIcon={<ArrowBackIosIcon />}
                    leftArrowButtonProps={{ "aria-label": "Prev month" }}
                    rightArrowButtonProps={{ "aria-label": "Next month" }}
                    rightArrowIcon={<ArrowForwardIosIcon />}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <AddIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                <FormControl margin='normal' fullWidth={true}>
                  <InputLabel htmlFor="age-native-simple">Вид события</InputLabel>
                  <Select
                    native
                    required
                    name="eventRole"
                    onChange={(e) => handleRoleChange(e.target.value)}
                    value={selectedRole}
                  >
                    <option aria-label="None" value="" />
                    <option value="доставка">доставка</option>
                    <option value="сборка">сборка</option>
                  </Select>
                </FormControl>
                <FormControl margin='normal' fullWidth={true}>
                  <TextField
                    label="Дополнительные сведения:"
                    multiline
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    variant="outlined"
                    name="description"
                  />
                  <Button type="submit" color="primary">Установить событие</Button>
                </FormControl>
              </form>
            </Grid>
            <Grid item xs={1}></Grid>
          </>
          : <CircularProgress style={{position: 'absolute', top: '50%', left: '50%'}} />}
      </Grid>
    </Paper>
  )
}

