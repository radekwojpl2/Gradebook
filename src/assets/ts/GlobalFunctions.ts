//append children to element
export const appendChildrenToElement = (element: HTMLElement, ...children: HTMLElement[]) => {
    for (let child in children) {
      element.appendChild(children[child]);
    }
    return element
  }

//create DOM element with included classes
export const createElementWithClasses = (element: string, ...classes: string[]) => {
    const newDOMElement = document.createElement(element);
    newDOMElement.classList.add(...classes);
    return newDOMElement
  }
  
//create DOM element with inner text
export const createElementWithInnerText = (element: string, text: string, ...classes: string[]) => {
    let newDOMElement = document.createElement(element);
    newDOMElement.classList.add(...classes);
    newDOMElement.innerText = text; 
    return newDOMElement
  }