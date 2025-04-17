import axiosInstance from './axiosInstance';

const TasksAPI = {

    getTasksByWardNumber: async (wardNumber) => {
        const response = await axiosInstance.get(`/tasks-by-ward-number/${wardNumber}`);
        return response.data;
      },

    getTasksById: async (id) => {
      const response = await axiosInstance.get(`/staff-tasks/${id}`);
      return response.data;
    },
    
    getPrioritisedTasks: async (staff_member) => {
      const response = await axiosInstance.get(`/prioritised-daily-cleaning-tasks/${staff_member}`);
      console.log(response.data);
      return response.data;
    },

    insertComplete: async (complete, ward_number, bed_number) => {
      const response = await axiosInstance.post("/insert-complete", {
        complete: complete, 
        ward_number: ward_number,
        bed_number: bed_number,
      });
      return response.data;
    },

    insertNote: async (note, ward_number, bed_number) => {
      const response = await axiosInstance.post("/insert-note", {
        note: note, 
        ward_number: ward_number,
        bed_number: bed_number,
      });
      return response.data;
    },

    insertCleaningLogEntry: async (taskId, date, time, complete) => {
      const response = await axiosInstance.post("/cleaning-log", {
        taskId: taskId,
        date: date,
        time: time,
        complete: complete,
      });
      return response.data;
    },

    insertStaffInfo: async (staff_first_name, staff_last_name, staff_id) => {
      const response = await axiosInstance.post("/insert-staff-info", {
        staff_first_name: staff_first_name,
        staff_last_name: staff_last_name,
        staff_id: staff_id
      });
      return response.data;
    },

    getStaffSchedules: async (position, date, shift_type) => {
      const response = await axiosInstance.get(`/staff-schedules/${position}/${date}/${shift_type}`);
      return response.data;
    },

    getAssignedTasks: async () => {
      const response = await axiosInstance.get("/assigned-tasks");
      return response.data;
    },    

    getMissedCleaning: async (date, complete) => {
      const response = await axiosInstance.get(`/missed-cleaning/${date}/${complete}`);
      return response.data
    },

    getPreviousDayTaskNotes: async (date_created, ward_number, bed_number) => {
      const response = await axiosInstance.get(`/previous-day-notes/${date_created}/${ward_number}/${bed_number}`);
      return response.data;
    }
};

export default TasksAPI;
