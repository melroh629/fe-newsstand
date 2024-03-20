const buttonTab = document.querySelectorAll('.button-tab');
const tabContent = document.querySelectorAll('#tabViewType > .tab-content');

export function activeTab () {
    buttonTab.forEach((tab, index) => {
        tab.addEventListener('click', function(){
            document.querySelector('.button-tab.active')?.classList.remove('active');
            this.classList.add('active');
            showTabContent(index);
        });
    });
}

function showTabContent(index) {
    for(let i=0; i<tabContent.length; i++){
        if(i === index){
            tabContent[i].classList.remove('none');
        } else {
            tabContent[i].classList.add('none');
        }
    }
}
