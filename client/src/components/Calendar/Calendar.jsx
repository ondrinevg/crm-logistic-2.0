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
import { editEventSaga } from "../../redux/actionCreators/eventAC";
import { getEventsSaga } from "../../redux/actionCreators/eventsAC";

import mainBack from '../../assets/img/grey-black-gradient-linear-1920x1080-c2-808080-000000-a-300-f-14.svg'

const dragDisableIds = new Set([]);
const allowDrag = ({ id }) => !dragDisableIds.has(id);
const appointmentComponent = (props) => {
  if (allowDrag(props.data)) {
    if (props.data?.title.includes('доставка')) return <Appointments.Appointment {...props} style={{ ...props.style, backgroundColor: 'rgba(255, 138, 101, .6)' }} />;
    if (props.data?.title.includes('сборка')) return <Appointments.Appointment {...props} style={{ ...props.style, backgroundColor: 'rgba(102, 187, 106, .6)' }} />;
    return <Appointments.Appointment {...props} />;
  } return <Appointments.Appointment {...props} style={{ ...props.style, cursor: 'not-allowed' }} />;
};

// так можно переписать элемент, но весьма некрасиво выглядит
// const AppointmentContent = ({ style, ...restProps }) => {
//   return (
//     <Appointments.AppointmentContent {...restProps}>
//       <div className={restProps.container}>
//         <div>{restProps.data.title}</div>
//         <div>Your information</div>
//       </div>
//     </Appointments.AppointmentContent>
//   );
// };

const Calendar = () => {
  const events = useSelector(state => state.events);
  const [state, setState] = useState({
    data: [...events],
    currentDate: new Date(),
  });

  // const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const { data, currentDate } = state;

  useEffect(() => {
    setState(prev => ({ ...prev, data: [...events] }))
  }, [events])


  useEffect(() => {
    dispatch(getEventsSaga());
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
        console.log(changed);
        dispatch(editEventSaga(changed));
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      console.log(changed);
      return { data };
    });
  };



  return (
    <Container style={{ marginTop: '40px' }}>

      <Paper elevation={5}>
        <Scheduler data={data} height={660} /*locale*/>
          <ViewState defaultCurrentDate={currentDate} />
          <EditingState onCommitChanges={commitChanges} />
          <EditRecurrenceMenu />
          <IntegratedEditing />
          <WeekView startDayHour={9} endDayHour={22} />
          <MonthView />
          <DayView startDayHour={9} endDayHour={22} />
          <ConfirmationDialog />
          <Appointments appointmentComponent={appointmentComponent}  /*appointmentContentComponent={AppointmentContent}*/ />
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





