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

import { ViewSwitcher } from '@devexpress/dx-react-scheduler-material-ui';
import { Container } from "@material-ui/core";
import { changeLoadStatus } from "../../redux/actionCreators/loadAC";

// let appointments = [
//   { startDate: new Date(), endDate: new Date(), title: 'Meeting' },
//   { startDate: new Date(), endDate: new Date(), title: 'Go to a gym' },
// ];


const dragDisableIds = new Set([]);
const allowDrag = ({ id }) => !dragDisableIds.has(id);
const appointmentComponent = (props) => {
  if (allowDrag(props.data)) {
    return <Appointments.Appointment {...props} />;
  } return <Appointments.Appointment {...props} style={{ ...props.style, cursor: 'not-allowed' }} />;
};

const eventStartTime = new Date('2021-04-15T14:00:00-00:00')
// eventStartTime.setDate(eventStartTime.getDate())

// Create a new event end date instance for temp uses in our calendar.
const eventEndTime = new Date('2021-04-15T17:00:00-00:00')
// eventEndTime.setDate(eventEndTime.getDate())
// eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)

// Create a dummy event for temp uses in our calendar
const event = {
  summary: `Встреча с Семеном`,
  location: `Москва, кампус Эльбрус`,
  description: `Как отобразить красивый календарь на Сайте`,
  colorId: 1,
  start: {
    dateTime: eventStartTime,
    timeZone: 'Europe/Moscow',
  },
  end: {
    dateTime: eventEndTime,
    timeZone: 'Europe/Moscow',
  },
}

const Calendar = () => {
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
    // fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/managers/token`, {
    //   credentials: "include",
    // })
    //   .then((response) => response.json())
    //   .then((token) =>
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
            console.log(newEvents);
            setState({
              data: newEvents,
              currentDate: new Date(),
            })
            dispatch(changeLoadStatus(false));
          })
      // )
      
      // fetch(`${process.env.REACT_APP_ADDRESS_TO_FETCH}/api/v1/managers/token`, {
      //     credentials: "include",
      //     method: 'POST',
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(event),
      //   })
      
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
          <DayView />
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





