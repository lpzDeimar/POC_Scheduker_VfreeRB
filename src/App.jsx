import React, { useState, useEffect, useRef } from 'react';
import { Scheduler, SchedulerData, ViewType, DATE_FORMAT, DemoData } from "react-big-schedule";
import dayjs from "dayjs";
import "react-big-schedule/dist/css/style.css";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

/**
 * Main Scheduler Application Component
 * Implements a highly interactive scheduling component using react-big-schedule.
 * Features drag-and-drop functionality, event creation, editing, and resource management.
 */
function App() {
  const refreshCounter = useRef(0);
  const schedulerDataRef = useRef(null);

  // If we already have scheduler data initialized, return it
  const schedulerData = new SchedulerData(
    new dayjs().format(DATE_FORMAT),
    ViewType.Week
  );

  // Set English as the locale for the calendar
  schedulerData.setSchedulerLocale('en');
  schedulerData.setCalendarPopoverLocale('en');

  // Enable creation, movement, and resizing of events
  schedulerData.config.creatable = true;
  schedulerData.config.movable = true;
  schedulerData.config.resizable = true;

  // Define hierarchical resource structure
  // Resources can be nested (parent-child relationships)
  // Resources with groupOnly: true serve as group headers
  schedulerData.setResources([
    { id: 'r0', name: 'Janson Wills' },
    { id: 'r1', name: 'Sergio Garcia' },
    { id: 'r2', name: 'Pablo Larraz' },
    { id: 'r3', name: 'Santiago Garcia' },
    { id: 'r4', name: 'David Walsh' },
  ]);

  // Configure initial events
  // Each event has unique ID, title, start/end times
  // Events are associated with resources via resourceId
  // Events can have custom properties like background color
  // Special flags control behavior (movable, resizable)
  // Only set events on first render to avoid duplicate data
  const events = [
    {
      id: 1,
      start: '2022-12-18 09:30:00',
      end: '2022-12-19 23:30:00',
      resourceId: 'r1',
      title: 'I am finished',
      bgColor: '#D9D9D9',
    },
    {
      id: 2,
      start: '2022-12-18 12:30:00',
      end: '2022-12-26 23:30:00',
      resourceId: 'r2',
      title: 'I am not resizable',
      resizable: false,
    },
    {
      id: 3,
      start: '2022-12-19 12:30:00',
      end: '2022-12-20 23:30:00',
      resourceId: 'r3',
      title: 'I am not movable',
      movable: false,
    },
    {
      id: 4,
      start: '2022-12-19 14:30:00',
      end: '2022-12-20 23:30:00',
      resourceId: 'r1',
      title: 'I am not start-resizable',
      startResizable: false,
    },
    {
      id: 5,
      start: '2022-12-19 15:30:00',
      end: '2022-12-20 23:30:00',
      resourceId: 'r2',
      title: 'R22332 has recurring tasks every week on Tuesday, Friday',
      rrule: 'FREQ=WEEKLY;DTSTART=20221219T013000Z;BYDAY=TU,FR',
      bgColor: '#3759ab',
    },
  ];

  // Set initial events
  schedulerData.setEvents(events);

  // Store scheduler data in state with a counter to force re-renders
  const [state, setState] = useState(() => ({
    viewModel: schedulerData,
    refreshCount: 0
  }));

  // Function to update the view model and force a refresh
  const updateViewModel = (newViewModel) => {
    // Update the ref to keep it in sync
    schedulerDataRef.current = newViewModel;

    refreshCounter.current += 1;
    setState({
      viewModel: newViewModel,
      refreshCount: refreshCounter.current
    });
  };

  /**
   * Navigate to previous time frame
   * @param {SchedulerData} schedulerData - Current scheduler data
   */
  const prevClick = (schedulerData) => {
    console.log('prevClick');
    schedulerData.prev();
    updateViewModel(schedulerData);
  };

  /**
   * Navigate to next time frame
   * @param {SchedulerData} schedulerData - Current scheduler data
   */
  const nextClick = (schedulerData) => {
    console.log('nextClick');
    schedulerData.next();
    updateViewModel(schedulerData);
  };

  /**
   * Handle date selection from date picker
   * @param {SchedulerData} schedulerData - Current scheduler data
   * @param {Date} date - Selected date
   */
  const onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    updateViewModel(schedulerData);
  };

  /**
   * Handle view type change (day, week, month)
   * @param {SchedulerData} schedulerData - Current scheduler data
   * @param {Object} view - View configuration object
   */
  const onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(
      view.viewType,
      view.showAgenda,
      view.isEventPerspective
    );
    updateViewModel(schedulerData);
  };

  /**
   * Handle click on an event
   * @param {SchedulerData} schedulerData - Current scheduler data
   * @param {Object} event - The event that was clicked
   */
  const eventItemClick = (schedulerData, event) => {
    alert(`Has hecho clic en el evento: ${event.title}`);
    console.log(event);
  };

  /**
   * Create a new event when user selects a time slot
   * @param {SchedulerData} schedulerData - Current scheduler data
   * @param {string} slotId - ID of the resource slot
   * @param {string} slotName - Name of the resource slot
   * @param {string} start - Start time of the new event
   * @param {string} end - End time of the new event
   * @param {string} type - Type of slot
   * @param {Object} item - Additional item data
   */
  const newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
    console.log('newEvent called with:', {
      schedulerData,
      slotId,
      slotName, 
      start,
      end,
      type,
      item
    });
    console.log('Creating new event:', slotId, start, end);

    // Prompt user to enter a name for the event
    const eventName = prompt('Ingrese el nombre del evento:', 'Nuevo evento');

    // If user cancels the prompt, don't create the event
    if (eventName === null) {
      return;
    }

    // Generate a unique ID for the new event - more robust approach
    let newFreshId = 1;
    if (schedulerData.events && schedulerData.events.length > 0) {
      // Handle all possible cases including NaN values
      const ids = schedulerData.events.map(event => {
        const parsedId = parseInt(event.id);
        // Return 0 for any NaN values to avoid issues
        return isNaN(parsedId) ? 0 : parsedId;
      });

      newFreshId = Math.max(...ids) + 1;
      // Ensure we never get a NaN ID
      if (isNaN(newFreshId)) {
        newFreshId = schedulerData.events.length + 1;
      }
    }

    console.log('New event ID:', newFreshId);

    // Create the new event object with all required properties
    // Ensure the ID is a number, not a string
    const newEvent = {
      id: Number(newFreshId),
      title: eventName,
      description: 'Descripción del evento',
      start: start,
      end: end,
      resourceId: slotId,
      bgColor: '#6495ED',
      movable: true,
      resizable: true,
      showPopover: true
    };

    // Add the new event to the schedulerData
    schedulerData.addEvent(newEvent);

    // Force a full refresh with our custom update function
    updateViewModel(schedulerData);

    // Notify user of successful creation
    alert(`Evento "${eventName}" creado exitosamente!`);
  };

  /**
   * Move an event via drag and drop
   * @param {SchedulerData} schedulerData - Current scheduler data
   * @param {Object} event - The event being moved
   * @param {string} slotId - Target resource ID
   * @param {string} slotName - Target resource name
   * @param {string} start - New start time
   * @param {string} end - New end time
   */
  const moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    console.log(`Moving event: ${event.id} to ${slotId}, start: ${start}, end: ${end}`);

    // Use the library's built-in method to handle the move operation
    schedulerData.moveEvent(event, slotId, slotName, start, end);

    // Update component state
    updateViewModel(schedulerData);
  };

  /**
   * Resize an event (change duration)
   * @param {SchedulerData} schedulerData - Current scheduler data
   * @param {Object} event - The event being resized
   * @param {string} start - New start time
   * @param {string} end - New end time
   */
  const resizeEvent = (schedulerData, event, start, end) => {
    console.log(`Resizing event: ${event.id}, start: ${start}, end: ${end}`);

    // Use the library's built-in method to update the event end time
    schedulerData.updateEventEnd(event, end);

    // Update component state
    updateViewModel(schedulerData);
  };

  /**
   * Callback for when right scroll limit is reached during drag operations
   * @param {SchedulerData} schedulerData - Current scheduler data
   * @param {HTMLElement} schedulerContent - Scheduler content element
   * @param {number} maxScrollLeft - Maximum scroll left value
   */
  const onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
    console.log('Reached right scroll limit');
  };

  /**
   * Callback for when left scroll limit is reached during drag operations
   * @param {SchedulerData} schedulerData - Current scheduler data
   * @param {HTMLElement} schedulerContent - Scheduler content element
   * @param {number} maxScrollLeft - Maximum scroll left value
   */
  const onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
    console.log('Reached left scroll limit');
  };

  /**
   * Callback for when top scroll limit is reached during drag operations
   * @param {SchedulerData} schedulerData - Current scheduler data
   * @param {HTMLElement} schedulerContent - Scheduler content element
   * @param {number} maxScrollTop - Maximum scroll top value
   */
  const onScrollTop = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log('Reached top scroll limit');
  };

  /**
   * Callback for when bottom scroll limit is reached during drag operations
   * @param {SchedulerData} schedulerData - Current scheduler data
   * @param {HTMLElement} schedulerContent - Scheduler content element
   * @param {number} maxScrollTop - Maximum scroll top value
   */
  const onScrollBottom = (schedulerData, schedulerContent, maxScrollTop) => {
    console.log('Reached bottom scroll limit');
  };

  /**
   * Toggle expansion/collapse of resource groups
   * @param {SchedulerData} schedulerData - Current scheduler data
   * @param {string} slotId - ID of the resource slot to toggle
   */
  const toggleExpandFunc = (schedulerData, slotId) => {
    schedulerData.toggleExpandStatus(slotId);
    updateViewModel(schedulerData);
  };

  /**
   * Update event start time
   * @param {SchedulerData} schedulerData - Current scheduler data
   * @param {Object} event - The event to update
   * @param {string} newStart - New start time
   */
  const updateEventStart = (schedulerData, event, newStart) => {
    schedulerData.updateEventStart(event, event.resourceId, newStart);
    updateViewModel(schedulerData);
  };

  /**
   * Update event end time
   * @param {SchedulerData} schedulerData - Current scheduler data
   * @param {Object} event - The event to update
   * @param {string} newEnd - New end time
   */
  const updateEventEnd = (schedulerData, event, newEnd) => {
    schedulerData.updateEventEnd(event, newEnd);
    updateViewModel(schedulerData);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="scheduler-container">
        {/* The key prop forces React to recreate the component when it changes */}
        <Scheduler
          key={`scheduler-${state.refreshCount}`}
          schedulerData={state.viewModel}
          prevClick={prevClick}
          nextClick={nextClick}
          onSelectDate={onSelectDate}
          onViewChange={onViewChange}
          eventItemClick={eventItemClick}
          viewEventClick={() => { }}
          viewEventText="Ver"
          viewEvent2Text={"Text"}
          viewEvent2Click={() => { }}
          updateEventStart={updateEventStart}
          updateEventEnd={updateEventEnd}
          moveEvent={moveEvent}
          newEvent={newEvent}
          onScrollLeft={onScrollLeft}
          onScrollRight={onScrollRight}
          onScrollTop={onScrollTop}
          onScrollBottom={onScrollBottom}
          toggleExpandFunc={toggleExpandFunc}
          resizeEvent={resizeEvent}
        />
      </div>
    </DndProvider>
  );
}

export default App;
