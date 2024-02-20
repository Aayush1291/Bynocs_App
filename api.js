const ip = '34.93.35.201';

//AppointmentSlots
const BookAppointment = `http://${ip}/uat_mobileapi/api/AppointmentSlots/BookAppointment`;
const RescheduleAppointment = `http://${ip}/uat_mobileapi/api/AppointmentSlots/RescheduleAppointment`;
const GetAppointmentsforPatient = `http://${ip}/uat_mobileapi/api/AppointmentSlots/GetAppointmentsforPatient`;
const GetAppointments = `http://${ip}/uat_mobileapi/api/AppointmentSlots/GetAppointments`;
const GetAppointmentsforServiceTeam = `http://${ip}/uat_mobileapi/api/AppointmentSlots/GetAppointmentsforServiceTeam`;
const GetFutureBookedAppointmentsforServiceTeam = `http://${ip}/uat_mobileapi/api/AppointmentSlots/GetFutureBookedAppointmentsforServiceTeam`;
const GetAppointmentsforDashboard = `http://${ip}/uat_mobileapi/api/AppointmentSlots/GetAppointmentsforDashboard`;
const CompleteAppointment = `http://${ip}/uat_mobileapi/api/AppointmentSlots/CompleteAppointment`;
const GetHistoryAppointmentServiceTeam = `http://${ip}/uat_mobileapi/api/AppointmentSlots/GetHistoryAppointmentServiceTeam`;

//Articles
const GetArticles = `http://${ip}/uat_mobileapi/api/Articles/GetArticles`;
const BynocsIntroduction = `http://${ip}/uat_mobileapi/api/Articles/BynocsIntroduction`;
const AddBynocsIntroduction = `http://${ip}/uat_mobileapi/api/Articles/AddBynocsIntroduction`;
const EditBynocsIntroduction = `http://${ip}/uat_mobileapi/api/Articles/EditBynocsIntroduction`;
const DeleteBynocsIntroduction = `http://${ip}/uat_mobileapi/api/Articles/DeleteBynocsIntroduction`;
const GetBynocsIntroductionById = `http://${ip}/uat_mobileapi/api/Articles/GetBynocsIntroductionById`;

//Category
const AppointmentCategoryGet = `http://${ip}/uat_mobileapi/api/Category/AppointmentCategoryGet`;
const CategoryAPI = `http://${ip}/uat_mobileapi/api/Category`;
const GetCategoryID = '';

//ClinicalAssesments
const SubmitClinicalAssessmentRecord = `http://${ip}/uat_mobileapi/api/ClinicalAssessment/SubmitClinicalAssessmentRecord`;
const UpdateClinicalAssessmentRecord = `http://${ip}/uat_mobileapi/api/ClinicalAssessment/UpdateClinicalAssessmentRecord`;
const ChangeStatusClinicalAssessment = `http://${ip}/uat_mobileapi/api/ClinicalAssessment/ChangeStatusClinicalAssessment`;
const GetClinicalAssessment = `http://${ip}/uat_mobileapi/api/ClinicalAssessment/GetClinicalAssessment`;
const GetClinicalAssessmentByDoctorId = `http://${ip}/uat_mobileapi/api/ClinicalAssessment/GetClinicalAssessmentByDoctotId`;
const GetTypeOfPatients = `http://${ip}/uat_mobileapi/api/ClinicalAssessment/GetTypeOfPatients`;

//Country
const GetCountries = `http://${ip}/uat_mobileapi/api/Country/GetCountries`;

//Device
const DeviceToken = `http://${ip}/uat_mobileapi/api/Device/Token`;
const AddDevice = `http://${ip}/uat_mobileapi/api/Device/AddDevice`;
const GetDevices = `http://${ip}/uat_mobileapi/api/Device/GetDevices`;

//Enquiry
const EnquiryAPI = `http://${ip}/uat_mobileapi/api/Enquiry`;

//Home
const HomeAPI = `http://${ip}/uat_mobileapi/api/Home`;

//OverideSlots
const AddOverideSlots = `http://${ip}/uat_mobileapi/api/OverideSlots/AddOverideSlots`;
const EditOverideSlots = `http://${ip}/uat_mobileapi/api/OverideSlots/EditOverideSlots`;
const DeleteOverideSlots = `http://${ip}/uat_mobileapi/api/OverideSlots/DeleteOverideSlots`;
const GetOverideSlots = `http://${ip}/uat_mobileapi/api/OverideSlots/GetOverideSlots`;
const GetOverideSlotsById = `http://${ip}/uat_mobileapi/api/OverideSlots/GetOverideSlotsById`;
const GetOverideSlotsByUserId = `http://${ip}/uat_mobileapi/api/OverideSlots/GetOverideSlotsByUserId`;

//Slots
const AddSlots = `http://${ip}/uat_mobileapi/api/Slots/AddSlots`;
const EditSlots = `http://${ip}/uat_mobileapi/api/Slots/EditSlots`;
const DeleteSlots = `http://${ip}/uat_mobileapi/api/Slots/DeleteSlots`;
const GetSlotsByUserId = `http://${ip}/uat_mobileapi/api/Slots/GetSlotsByUserId`;

//Users
const GetUserIdByUserDetailId = `http://${ip}/uat_mobileapi/api/Users/GetUserIdByUserDetailId`;
const GetServiceTeamUserIdByPatientId = `http://${ip}/uat_mobileapi/api/Users/GetServiceTeamUserIdByPatientId`;
const GetChatByUserId = `http://${ip}/uat_mobileapi/api/Users/GetChatByUserId`;
const AddChatMessage = `http://${ip}/uat_mobileapi/api/Users/AddChatMessage`;
const ReadChatMessage = `http://${ip}/uat_mobileapi/api/Users/ReadChatMessage`;
const GetUnReadMessagesByUserDetailsId = `http://${ip}/uat_mobileapi/api/Users/GetUnReadMessagesByUserDetailsId`;
const GetUnReadMessagesTotalCountByUserDetailsId = `http://${ip}/uat_mobileapi/api/Users/GetUnReadMessagesTotalCountByUserDetailsId`;
const AddReportAccess = `http://${ip}/uat_mobileapi/api/Users/AddReportAccess`;
const GetReportsByServiceTeam = `http://${ip}/uat_mobileapi/api/Users/GetReportsByServiceTeam`;
const GetReportsByUserDetailsId = `http://${ip}/uat_mobileapi/api/Users/GetReportsByUserDetailsId`;
const SendPushNotificationByUser = `http://${ip}/uat_mobileapi/api/Users/SendPushNotificationByUser`;
const GetPushNotificationByUserDetailsId = `http://${ip}/uat_mobileapi/api/Users/GetPushNotificationByUserDetailsId`;
const LogOut = `http://${ip}/uat_mobileapi/api/Users/LogOut`;