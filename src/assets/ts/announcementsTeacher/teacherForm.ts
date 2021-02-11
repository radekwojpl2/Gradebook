export default function createAnnouncementForm() {
    const form = document.createElement('form')
    form.setAttribute('method', 'post')
    form.setAttribute('class', 'teacherForm')
    //form.setAttribute('action', 'something')
    const type = document.createElement('select')
    type.setAttribute('class', 'teacherForm__select')
    const optionArr = ['Please select type','Important', 'Normal', 'Exam']
    optionArr.forEach((item) => {
        const opt = document.createElement('option')
        opt.innerHTML = item
        opt.setAttribute('value', `${item.toLowerCase()}`)
        type.appendChild(opt)
    })

    let wrapper = document.createElement('div')
    wrapper.setAttribute('id', 'wrapper')
    const defaultText = document.createElement('p')
    defaultText.setAttribute('class', 'teacherForm__defaultText')
    defaultText.innerHTML = 'Please select the type of announcement'
    wrapper.appendChild(defaultText)
    form.appendChild(type)
    form.appendChild(wrapper)

    //type.setAttribute('id', 'typeSelect')
    type.addEventListener('change', function(){
        if (this.value === 'important') {
            form.removeChild(form.childNodes[1])
            form.appendChild(updateForm('important'))
        }
        else if (this.value === 'exam') {
            form.removeChild(form.childNodes[1])
            form.appendChild(updateForm('exam'))
        }
        else if (this.value === 'normal') {
            form.removeChild(form.childNodes[1])
            form.appendChild(updateForm('normal'))
        }
        else {
            form.removeChild(form.childNodes[1])
            form.appendChild(updateForm('selectType'))
        }
    })
    
    function updateForm(condition: string) {
        const wrapper = document.createElement('div')
        if (condition == 'selectType') {
            const defaultText = document.createElement('p')
            defaultText.setAttribute('class', 'teacherForm__defaultText')
            defaultText.innerHTML = 'Please select the type of announcement'
            wrapper.appendChild(defaultText)
            return wrapper
        }
        else {
            const name = document.createElement('input')
            name.setAttribute('type', 'text')
            name.setAttribute('placeholder', 'Your full name')
            name.setAttribute('class', 'teacherForm__inputName')

            const title = document.createElement('input')
            title.setAttribute('type', 'text')
            title.setAttribute('placeholder', 'Your title of announcement')
            title.setAttribute('class', 'teacherForm__inputTitle')
            
            const message = document.createElement('textarea')
            message.setAttribute('placeholder', 'text here')
            message.setAttribute('class', 'teacherForm__message')    

            const submit = document.createElement('input')
            submit.setAttribute('type', 'submit')
            submit.setAttribute('value', 'Submit')
            submit.setAttribute('class', 'teacherForm__submit')
            
            wrapper.setAttribute('id', 'wrapper')

            wrapper.appendChild(name)
            wrapper.appendChild(title)
            wrapper.appendChild(message)
            wrapper.appendChild(submit)
            if (condition === 'exam') {
                const date = document.createElement('input')
                date.setAttribute('type', 'date')
                date.setAttribute('placeholder', 'Enter the date')
                wrapper.appendChild(date)
            }
            return wrapper
        }
    }

    return form
}