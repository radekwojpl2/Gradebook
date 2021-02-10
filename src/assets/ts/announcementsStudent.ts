import '../css/announcementsStudent.css'
import {TopPanel} from './TopPanel'
import {AnnouncementsList} from './announcementsStudent/AnnouncementsList'
import {createAnnouncementsSections} from './announcementsStudent/createAnnouncementsSections'

TopPanel()
createAnnouncementsSections()
const ann = new AnnouncementsList()
