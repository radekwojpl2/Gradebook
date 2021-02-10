import {createElementWithClasses} from '../GlobalFunctions'

export const createAnnouncementsSections = () => {
    const textContent = `
            <button class="show-all">Show All</button>
            <button class="show-exams">Exams</button>
            <button class="show-general">General</button>
            <select name="sort" id="sort-input">
                <option value="newest">From the newest</option>
                <option value="oldest">From the oldest</option> 
            </select>
            `
    const announcementsButtonsSection = createElementWithClasses('div', 'announcements-buttons')
    const announcementsContainer = createElementWithClasses('div', 'announcements-container')
    announcementsButtonsSection.innerHTML = textContent
    const announcementsSection = document.querySelector('.announcements-section')!
    announcementsSection.appendChild(announcementsButtonsSection)
    announcementsSection.appendChild(announcementsContainer)
}