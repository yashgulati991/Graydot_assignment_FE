// Adding selectors, makes enable to use HTML page content
document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll('.item');
    const leftContainer = document.querySelector('.left-container');
    const rightContainer = document.querySelector('.right-container');
    const resetButton = document.querySelector('#reset-btn');
    // In initial there is no dragged item in both containers
    let draggedItem = null;

    /* Add event listeners for drag and drop events for each loop helps to start drag 
    and drop of all the items in the item class/left conatiner*/
    items.forEach(function (item) {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragend', dragEnd);
    });

    // For dragging from right to left you can use this
    rightContainer.addEventListener('dragover', dragOver);
    rightContainer.addEventListener('dragenter', dragEnter);
    rightContainer.addEventListener('dragleave', dragLeave);
    rightContainer.addEventListener('drop', drop);

    /* This reset button will reset the content of both container and bring it to the initial..
     position and the function is defined below ....*/
    resetButton.addEventListener('click', resetContainers);

    // Dragging  functions listed here 
    function dragStart() {
        draggedItem = this;
        
        setTimeout(() => this.style.display = 'none', 0);// for moving elements from A--->B display is none 
        this.classList.add('dragged');// this dragged class is made in css for showing the dragging path while moving
    }

    function dragEnd() {
        
        this.style.display = 'block';// this will block the display after leaving mouse
        this.classList.remove('dragged');// here we removed dragged class
        draggedItem = null;
    }
    // for selecting the text,image, icon and move it on the desired path
    function dragOver(e) {
        e.preventDefault();
    }
    //picking up the element and moving it to drop over container we use dragEnter(e)  ,e  is the event
    function dragEnter(e) {
        e.preventDefault();
        this.classList.add('drag-over');
    }
    // Mouse is above the right container and ready to drop
    function dragLeave() {
        this.classList.remove('drag-over');
    }
    // when you leave your mouse and item is dropped 
    function drop() {
        this.classList.remove('drag-over');
        this.appendChild(draggedItem);
        popUpSuccess();
    }
    // after dropping below function displays the message of dropped content successfully
    function popUpSuccess() {
        const successMessage = document.createElement('p');
        successMessage.classList.add('success-message');
        successMessage.innerText = 'Item dropped successfully!';
        rightContainer.appendChild(successMessage);
        // Adding timeout here to display the message for only 1 second 
        setTimeout(function () {
            setTimeout(function () {
                successMessage.remove();
            }, 1000);
        }, 0);
    }
    // The below function is used to reset right container and left to its initial postion
    function resetContainers() {
        rightContainer.innerHTML = '<h3>DROP</h3>';// message  in  the right conatiner after pressing reset
        items.forEach(function (item) {
            leftContainer.appendChild(item);
        });
    }
});
