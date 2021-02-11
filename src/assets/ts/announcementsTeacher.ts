import submitForm from './announcementsTeacher/submitForm'
import createAnnouncementForm from './announcementsTeacher/teacherForm'
import submitAnnouncementForm from './announcementsTeacher/submitForm'
import instance from '../../axios'
const teacherFormDiv = document.querySelector('.teacherFormContainer')
const form = createAnnouncementForm()
console.log(form)
teacherFormDiv?.appendChild(form)
console.log(teacherFormDiv)
form?.addEventListener('submit',submitAnnouncementForm)
const user = {
    yo: 'yo yo'
}

function firebasePostAnnouncements() {
    instance.post('announcements.json', user)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}
