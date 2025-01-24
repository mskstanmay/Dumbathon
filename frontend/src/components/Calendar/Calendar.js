import React from 'react';
import { Calendar as BigCalendar } from 'react-big-calendar';
import { dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './Calendar.css';

const locales = {
    'en-US': require('date-fns/locale/en-US')
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const Calendar = ({ todos }) => {
    const getTaskCountForDate = (date) => {
        return todos.filter(todo => 
            new Date(todo.dueDate).toDateString() === date.toDateString()
        ).length;
    };

    const eventStyleGetter = (event, start, end, isSelected) => {
        const taskCount = getTaskCountForDate(start);
        const opacity = Math.min(taskCount * 0.2, 1);
        
        return {
            style: {
                backgroundColor: `rgba(128, 0, 255, ${opacity})`,
                borderRadius: '0px',
                opacity: 0,
                color: 'black',
                border: '0px',
                display: 'block'
            }
        };
    };

    const events = todos.map(todo => ({
        title: todo.title,
        start: new Date(todo.dueDate),
        end: new Date(todo.dueDate),
        allDay: true
    }));

    return (
        <div className={styles.calendarContainer}>
            <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%' }}
                eventPropGetter={eventStyleGetter}
            />
        </div>
    );
};

export default Calendar;
