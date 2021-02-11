import submitForm from './announcementsTeacher/submitForm'
import createAnnouncementForm from './announcementsTeacher/teacherForm'
import submitAnnouncementForm from './announcementsTeacher/submitForm'

const teacherFormDiv = document.querySelector('.teacherFormContainer')
const form = createAnnouncementForm()

teacherFormDiv?.appendChild(form)

form?.addEventListener('submit',submitAnnouncementForm)