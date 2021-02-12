import {createElementWithClasses} from '../GlobalFunctions'

export const createAnnouncementsSections = () => {
    // const textContent = `
    //         <button class="show-all">Show All</button>
    //         <button class="show-exams">Exams</button>
    //         <button class="show-general">General</button>
    //         <select name="sort" id="sort-input">
    //             <option value="newest">From the newest</option>
    //             <option value="oldest">From the oldest</option> 
    //         </select>
    //         `
    const textContent = `
            <div>
            <input type="radio" name="type" id="all" value="all">
            <label for="all">Show all</label>
            </div>

            <div>
            <input type="radio" name="type" id="normal" value="normal">
            <label for="normal">Normal</label>
            </div>
        
            <div>
            <input type="radio" name="type" id="important" value="important">
            <label for="important">Important</label>
            </div>
        
            <div>
            <input type="radio" name="type" id="exams" value="exams">
            <label for="exams">Exams</label>
            </div>
            <select name="sort" id="sort-input">
                <option data-key="newest">Sort by newest</option>
                <option data-key="oldest">Sort by oldest</option>
                <option data-key="most-important">Sort by most important</option>
                <option data-key="least-important">Sort by least important</option>
            </select>
    `
    const announcementsButtonsSection = createElementWithClasses('div', 'announcements-buttons')
    const announcementsContainer = createElementWithClasses('div', 'announcements-container')
    announcementsButtonsSection.innerHTML = textContent
    const announcementsSection = document.querySelector('.announcements-section')!
    announcementsSection.appendChild(announcementsButtonsSection)
    announcementsSection.appendChild(announcementsContainer)
}