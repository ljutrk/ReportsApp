function Person(name, surname) {
    this.name = name;
    this.surname = surname;
}

function Patient(name, surname, JMBG, chartNumber) {
    Person.call(this, name, surname);
    this.JMBG = JMBG;
    this.chartNumber = chartNumber;
    this.doctor = null;
}

Patient.prototype.addDoctor = function (doctor) {
    this.doctor = doctor
}

function Doctor(name, surname, specialty) {
    Person.call(this, name, surname);
    this.specialty = specialty;
    this.patients = [];
}

Doctor.prototype.addPatient = function (patient) {
    this.patients.push(patient)
}

// ToDo use exam type
function ExamType(type) {
    this.type = type;
}

function Exam(patient, doctor, date, ) {
    this.patient = patient;
    this.doctor = doctor;
    this.date = new Date(date);
    this.examType = examType;
}
BloodSugarExam.prototype.getResults = function () {
    const result = Math.floor(Math.random() * (25 - 1 + 1)) + 1;
    return new BloodSugarExamResult(this.patient, result);
}

function BloodSugarExamResult(patient, result) {
    this.patient = patient;
    this.result = result;
}
BloodSugarExamResult.prototype.getResults = function () {
    return "[Patient " + "\"" + this.patient.name + "\"]" + " Your blood sugar is " + this.result + "mmol/L. Please consult with your doctor, you might be dying!"
}

function BloodPressureExam(patient, doctor, date) {
    this.patient = patient;
    this.doctor = doctor;
    this.date = new Date(date);
}
BloodPressureExam.prototype.getResults = function () {
    const systolic = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
    const diastolic = Math.floor(Math.random() * (100 - 60 + 1)) + 60;
    return new BloodPressureExamResult(this.patient, systolic, diastolic);
}

function BloodPressureExamResult(patient, systolic, diastolic) {
    this.patient = patient;
    this.systolic = systolic;
    this.diastolic = diastolic;
}
BloodPressureExamResult.prototype.getResults = function () {
    return "[Patient " + "\"" + this.patient.name + "\"]" + " Your blood pressure is " + this.systolic + "/" + this.diastolic + "mmHg. Please consult with your doctor, you might be dying!"
}

function BloodCholesterolExam(patient, doctor, date) {
    this.patient = patient;
    this.doctor = doctor;
    this.date = new Date(date);
}
BloodCholesterolExam.prototype.getResults = function () {
    const result = Math.floor(Math.random() * (200 - 100 + 1)) + 100;
    return new BloodCholesterolExamResult(this.patient, result);
}

function BloodCholesterolExamResult(patient, result) {
    this.patient = patient;
    this.result = result;
}
BloodCholesterolExamResult.prototype.getResults = function () {
    return "[Patient " + "\"" + this.patient.name + "\"]" + " Your total blood cholesterol is " + this.result + "mg/dL. Please consult with your doctor, you might be dying!"
}

function Clinic() {
    this.patients = [];
    this.doctors = [];
    this.log = [];
    this.results = [];
}

Clinic.prototype.addPatient = function (patient) {
    this.patients.push(patient);
}
Clinic.prototype.addDoctor = function (doctor) {
    this.doctors.push(doctor);
}
Clinic.prototype.addResult = function (result) {
    this.results.push(result);
}
Clinic.prototype.addLog = function (log) {
    this.log.push(log)
}
Clinic.prototype.listAllLogs = function () {
    for (let i = 0; i < this.log.length; i++) {
        console.log(this.log[i]);
    }
}

function Laboratory() {
    this.bloodSugar = [];
    this.bloodPressure = [];
    this.bloodCholesterol = [];
}

Laboratory.prototype.addBloodSugarExam = function (test) {
    this.bloodSugar.push(test);
}
Laboratory.prototype.addBloodPressureExam = function (test) {
    this.bloodPressure.push(test);
}
Laboratory.prototype.addBloodCholesterolExam = function (test) {
    this.bloodCholesterol.push(test);
}
Laboratory.prototype.showResults = function (result) {
    return result;
}

function getCurrentDate() {
    var date = new Date();
    return "[" + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + "]";

}

function createPatient(name, surname, JMBG, chartNumber) {
    klinickiCentarSrbije.addLog(getCurrentDate() + " Patient " + "\"" + name + "\"" + " was created!");
    var person = new Person(name, surname);
    var patient = new Patient(name, surname, JMBG, chartNumber);
    klinickiCentarSrbije.addPatient(patient);
    return patient;
}

function createDoctor(name, surname, specialty) {
    klinickiCentarSrbije.addLog(getCurrentDate() + " Doctor " + "\"" + name + "\"" + " was created!");
    var person = new Person(name, surname);
    var doctor = new Doctor(name, surname, specialty);
    klinickiCentarSrbije.addDoctor(doctor);
    return doctor;
}

function addDoctor(patientObj, doctorObj) {
    klinickiCentarSrbije.addLog(getCurrentDate() + " Patient " + "\"" + patientObj.name + "\"" + " choose " + "\"" + doctorObj.name + "\"" + " as his/her doctor!");
    patientObj.addDoctor(doctorObj);
    doctorObj.addPatient(patientObj);

}

function makeAppointment(patient, doctor, date, typeOfAppointment) {
    if (typeOfAppointment === "pressure") {
        laboratorija.addBloodPressureExam(new BloodPressureExam(patient, doctor, date));
    }
    if (typeOfAppointment === "sugar") {
        laboratorija.addBloodSugarExam(new BloodSugarExam(patient, doctor, date));
    }
    if (typeOfAppointment === "cholesterol") {
        laboratorija.addBloodCholesterolExam(new BloodCholesterolExam(patient, doctor, date));
    }
}

function doExam(patient, typeOfAppointment) {
    if (typeOfAppointment === "pressure") {
        for (let i = 0; i < laboratorija.bloodPressure.length; i++) {
            if (laboratorija.bloodPressure[i].patient.name === patient) {
                var patientObj = laboratorija.bloodPressure[i].patient;
                klinickiCentarSrbije.addLog(getCurrentDate() + " Patient " + "\"" + patientObj.name + "\"" + " had his blood pressure checkup by his/her doctor \"" + patientObj.doctor.name + "\"!");
                var results = laboratorija.bloodPressure[i].getResults();
                klinickiCentarSrbije.addResult(results);
            }
        }
    }

    if (typeOfAppointment === "sugar") {
        for (let i = 0; i < laboratorija.bloodSugar.length; i++) {
            if (laboratorija.bloodSugar[i].patient.name === patient) {
                var patientObj = laboratorija.bloodSugar[i].patient;
                klinickiCentarSrbije.addLog(getCurrentDate() + " Patient " + "\"" + patientObj.name + "\"" + " had his blood sugar checkup by his/her doctor \"" + patientObj.doctor.name + "\"!");
                var results = laboratorija.bloodSugar[i].getResults();
                klinickiCentarSrbije.addResult(results);
            }
        }
    }

    if (typeOfAppointment === "cholesterol") {
        for (let i = 0; i < laboratorija.bloodCholesterol.length; i++) {
            if (laboratorija.bloodCholesterol[i].patient.name === patient) {
                var patientObj = laboratorija.bloodCholesterol[i].patient;
                klinickiCentarSrbije.addLog(getCurrentDate() + " Patient " + "\"" + patientObj.name + "\"" + " had his blood cholesterol checkup by his/her doctor \"" + patientObj.doctor.name + "\"!");
                var results = laboratorija.bloodCholesterol[i].getResults();
                klinickiCentarSrbije.addResult(results);
            }
        }
    }
}

var klinickiCentarSrbije = new Clinic();
var laboratorija = new Laboratory();
var ljuba = createDoctor("Ljubomir", "Trkulja", "hematology");

var sava = createPatient("Sava", "Jankovic", 0879647334981, 44973);
var marija = createPatient("Marija", "Kovacevic", 2901987261487, 13547);
var maja = createPatient("Maja", "Milanovic", 1284691648732, 98176);
var milica = createPatient("Milica", "Roljic", 9734168149852, 44973);

addDoctor(sava, ljuba);
addDoctor(marija, ljuba);
addDoctor(milica, ljuba);
addDoctor(maja, ljuba);

makeAppointment(sava, ljuba, "05-04-2018", "pressure");
makeAppointment(marija, ljuba, "06-02-2018", "sugar");
makeAppointment(milica, ljuba, "12-06-2018", "cholesterol");
makeAppointment(maja, ljuba, "31-01-2018", "pressure");

doExam("Sava", "pressure")
doExam("Marija", "sugar")
doExam("Milica", "cholesterol")
doExam("Maja", "pressure")

klinickiCentarSrbije.listAllLogs();
console.log(klinickiCentarSrbije.results[0].getResults());
console.log(klinickiCentarSrbije.results[1].getResults());
console.log(klinickiCentarSrbije.results[2].getResults());
console.log(klinickiCentarSrbije.results[3].getResults());

// getResults("Sava", "pressure")
// console.log(klinickiCentarSrbije.doctors);

// ///////
// singleton //
// let instance;

// class Clinic {
//     constructor(params) {
//         if (!instance) {
//             instance = this;
//             instance.params = params;
//         }

//         return instance;
//     }
// }

// const c = new Clinic("asd");
// const q = new Clinic("asdfg");

// console.log(q)