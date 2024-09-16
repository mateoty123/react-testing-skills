import * as React from 'react'
import Paper from '@mui/material/Paper'
import FormGroup from '@mui/material/FormGroup'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Typography from '@mui/material/FormControl'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { locale, loadMessages } from 'devextreme/localization'
import  plMessages  from 'devextreme/localization/messages/pl.json'
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  ViewSwitcher,
  DayView
} from '@devexpress/dx-react-scheduler-material-ui'
import {
  ViewState,
  EditingState,
  IntegratedEditing,
  
} from '@devexpress/dx-react-scheduler'
import {
  WeekView,
  AppointmentForm,
  AppointmentTooltip,
  DragDropProvider,
} from '@devexpress/dx-react-scheduler-material-ui'

import { appointments } from './demo-data/appointments'
import { t } from 'i18next'
import { Today } from '@mui/icons-material'
import { months, now } from 'moment'
import pl from 'date-fns/locale/pl'
import { Dayjs } from 'dayjs';


loadMessages(plMessages)
locale('pl')


const PREFIX = 'Demo'
export const classes = {
  container: `${PREFIX}-container`,
  text: `${PREFIX}-text`,
  formControlLabel: `${PREFIX}-formControlLabel`,
}

const StyledDiv = styled('div')(({ theme }) => ({
  [`&.${classes.container}`]: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  [`& .${classes.text}`]: theme.typography.h6,
  [`& .${classes.formControlLabel}`]: {
    ...theme.typography.caption,
    fontSize: '1rem',
  },
}))

const editingOptionsList = [
  { id: 'allowAdding', text: 'Adding' },
  { id: 'allowDeleting', text: 'Deleting' },
  { id: 'allowUpdating', text: 'Updating' },
  { id: 'allowResizing', text: 'Resizing' },
  { id: 'allowDragging', text: 'Dragging' },
]

const EditingOptionsSelector = ({ options, onOptionsChange }) => {
  const { t } = useTranslation()
  return (
    <StyledDiv className={classes.container}>
      <Typography className={classes.text}>{t('Enable Options')}</Typography>
      <FormGroup row>
        {editingOptionsList.map(({ id, text }) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={options[id]}
                onChange={onOptionsChange}
                value={id}
                color='primary'
              />
            }
            classes={{ label: classes.formControlLabel }}
            label={t(text)}
            key={id}
            disabled={
              (id === 'allowDragging' || id === 'allowResizing') &&
              !options.allowUpdating
            }
          />
        ))}
      </FormGroup>
    </StyledDiv>
  )
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [data, setData] = React.useState(appointments)
  const { t } = useTranslation()
  const [editingOptions, setEditingOptions] = React.useState({
    allowAdding: true,
    allowDeleting: true,
    allowUpdating: true,
    allowDragging: true,
    allowResizing: true,
  })
  const [addedAppointment, setAddedAppointment] = React.useState({})
  const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] =
    React.useState(false)

  const { i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  const {
    allowAdding,
    allowDeleting,
    allowUpdating,
    allowResizing,
    allowDragging,
  } = editingOptions

  const onCommitChanges = React.useCallback(
    ({ added, changed, deleted }) => {
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0
        setData([...data, { id: startingAddedId, ...added }])
      }
      if (changed) {
        setData(
          data.map((appointment) =>
            changed[appointment.id]
              ? { ...appointment, ...changed[appointment.id] }
              : appointment
          )
        )
      }
      if (deleted !== undefined) {
        setData(data.filter((appointment) => appointment.id !== deleted))
      }
      setIsAppointmentBeingCreated(false)
    },
    [setData, setIsAppointmentBeingCreated, data]
  )
  const onAddedAppointmentChange = React.useCallback((appointment) => {
    setAddedAppointment(appointment)
    setIsAppointmentBeingCreated(true)
  })
  const handleEditingOptionsChange = React.useCallback(({ target }) => {
    const { value } = target
    const { [value]: checked } = editingOptions
    setEditingOptions({
      ...editingOptions,
      [value]: !checked,
    })
  })

  const TimeTableCell = React.useCallback(
    React.memo(({ onDoubleClick, ...restProps }) => (
      <WeekView.TimeTableCell
        {...restProps}
        onDoubleClick={allowAdding ? onDoubleClick : undefined}
      />
    )),
    [allowAdding]
  )

  const CommandButton = React.useCallback(
    ({ id, ...restProps }) => {
      if (id === 'deleteButton') {
        return (
          <AppointmentForm.CommandButton
            id={id}
            {...restProps}
            disabled={!allowDeleting}
          />
        )
      }
      return <AppointmentForm.CommandButton id={id} {...restProps} />
    },
    [allowDeleting]
  )

  const allowDrag = React.useCallback(
    () => allowDragging && allowUpdating,
    [allowDragging, allowUpdating]
  )
  const allowResize = React.useCallback(
    () => allowResizing && allowUpdating,
    [allowResizing, allowUpdating]
  )

  return (
    <>
      <React.Fragment>
        <EditingOptionsSelector
          options={editingOptions}
          onOptionsChange={handleEditingOptionsChange}
        />
        <Paper>
          <Scheduler locale={pl} data={data} height={600}>
            <EditingState
              onCommitChanges={onCommitChanges}
              addedAppointment={addedAppointment}
              onAddedAppointmentChange={onAddedAppointmentChange}
            />

            <IntegratedEditing />
            
            <ViewState
              currentDate={currentDate}
              defaultCurrentDate='2018-07-27'
              onCurrentDateChange={setCurrentDate}
            />
            

            <WeekView
            
              startDayHour={7}
              endDayHour={21}
              timeTableCellComponent={TimeTableCell}
            />

            <MonthView locale={pl} />
            <DayView/>
            <Appointments />
            
            <Toolbar />
            <ViewSwitcher/>
            
            <DateNavigator />

            <TodayButton messages={{ today: t('today') }} />
            
            

            <AppointmentTooltip
              showOpenButton
              showDeleteButton={allowDeleting}
            />
            <AppointmentForm
              commandButtonComponent={CommandButton}
              readOnly={isAppointmentBeingCreated ? false : !allowUpdating}
            />

            <DragDropProvider allowDrag={allowDrag} allowResize={allowResize} />
            <button onClick={() => changeLanguage('en')}>English</button>
            <button onClick={() => changeLanguage('pl')}>Polski</button>
          </Scheduler>
        </Paper>
      </React.Fragment>
    </>
  )
}
