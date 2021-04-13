import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Paper from "@material-ui/core/Paper";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  AllDayPanel,
  MonthView,
  DayView,
  Toolbar,
  DateNavigator,
  TodayButton,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
  DragDropProvider,
  EditRecurrenceMenu,
} from "@devexpress/dx-react-scheduler-material-ui";
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

import { ViewSwitcher } from '@devexpress/dx-react-scheduler-material-ui';
import { Container } from "@material-ui/core";
import { changeLoadStatus } from "../../redux/actionCreators/loadAC";

const dragDisableIds = new Set([]);
const allowDrag = ({ id }) => !dragDisableIds.has(id);
const appointmentComponent = (props) => {
  if (allowDrag(props.data)) {
    if (props.data?.title.includes('доставка'))  return <Appointments.Appointment {...props} style={{ ...props.style,  backgroundColor: 'rgba(255, 138, 101, .6)' }} />;
    if (props.data?.title.includes('сборка'))  return <Appointments.Appointment {...props} style={{ ...props.style,  backgroundColor: 'rgba(102, 187, 106, .6)' }} />;
    return <Appointments.Appointment {...props} />;
  } return <Appointments.Appointment {...props} style={{ ...props.style, cursor: 'not-allowed' }} />;
};

const useStyles = makeStyles(theme => ({
  delivery: {
    backgroundColor: fade(theme.palette.success.light, 0.1),
    '&:hover': {
      backgroundColor: fade(theme.palette.success.light, 0.14),
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.success.light, 0.16),
    },
  },
  assembly: {
    backgroundColor: fade(theme.palette.primary.dark, 0.1),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.dark, 0.14),
    },
    '&:focus': {
      backgroundColor: fade(theme.palette.primary.dark, 0.16),
    },
  }, 
}));

const Calendar = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    data: [],
    currentDate: new Date(),
  });

  const user = useSelector(state => state.user);
  const loading = useSelector(state => state.loading);
  const dispatch = useDispatch();

  const { data, currentDate } = state;
  console.log({ state });



  useEffect(() => {
    dispatch(changeLoadStatus(true));
    fetch(`https://www.googleapis.com/calendar/v3/calendars/uudmopujkodqksbu55au8opt3k@group.calendar.google.com/events`, {
      headers: {
        Authorization: 'Bearer ' + user.accessToken,
      },
    })
      .then((data) => data.json()).then((data) => {
        const newEvents = data.items.map(event => ({
          id: event.id,
          startDate: event.start.dateTime,
          endDate: event.end.dateTime,
          title: event.summary,
        }))
        setState({
          data: newEvents,
          currentDate: new Date(),
        })
        dispatch(changeLoadStatus(false));
      })
  }, []);

  const commitChanges = ({ added, changed, deleted }) => {
    setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      return { data };
    });
  };



  return (
    <Container>

      <Paper>
        <Scheduler data={data} height={660}>
          <ViewState defaultCurrentDate={currentDate} />
          <EditingState onCommitChanges={commitChanges} />
          <EditRecurrenceMenu />
          <IntegratedEditing />
          <WeekView startDayHour={9} endDayHour={22} />
          <MonthView />
          <DayView startDayHour={9} endDayHour={22}/>
          <ConfirmationDialog />
          <Appointments appointmentComponent={appointmentComponent} />
          <AppointmentTooltip showCloseButton showOpenButton showDeleteButton />
          <AppointmentForm />

          <Toolbar />
          <ViewSwitcher />
          <DateNavigator />
          <TodayButton />
          <AllDayPanel />
          <DragDropProvider allowDrag={allowDrag} />
        </Scheduler>
      </Paper>
    </Container>
  );
};
export default Calendar;





