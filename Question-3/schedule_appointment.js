class AppointmentSystem {
    constructor() {
        this.appointments = new Map(); 
        this.reminders = new Map(); 
    }
    
    scheduleAppointment(date, time, doctorId, patientId) {
        if (!this.appointments.has(date)) {
            this.appointments.set(date, []);
        }
        const dayAppointments = this.appointments.get(date);
        const isBooked = dayAppointments.some(appt => appt.doctorId === doctorId && appt.time === time);
        if (isBooked) return "Doctor unavailable at this time";
        dayAppointments.push({ doctorId, patientId, time });
        this.setReminder(patientId, `Appointment on ${date} at ${time} with Dr. ${doctorId}`);
        return `Appointment scheduled for ${patientId} with Dr. ${doctorId} on ${date} at ${time}`;
    }
    
    setReminder(patientId, message) {
        this.reminders.set(patientId, message);
    }
    getReminder(patientId) {
        return this.reminders.get(patientId) || "No reminders";
    }
    checkAvailability(date, doctorId) {
        const dayAppointments = this.appointments.get(date) || [];
        return dayAppointments.filter(appt => appt.doctorId === doctorId);
    }
}

const system = new AppointmentSystem();
console.log(system.scheduleAppointment("2025-05-21", "10:00", "Doctor1", "Patient1"));
console.log(system.scheduleAppointment("2025-05-21", "10:00", "Doctor1", "Patient2")); 
console.log(system.getReminder("Patient1"));
console.log(system.checkAvailability("2025-05-21", "Doctor1"));