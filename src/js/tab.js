export function activeTab (buttonTab, tabContent) {
    buttonTab.forEach((tab, index) => {
        tab.addEventListener('click', function(){
            document.querySelector('.button-tab.active')?.classList.remove('active');
            this.classList.add('active');
            showTabContent(tabContent,index);
        });
    });
}

function showTabContent(tabContent,index) {
    for(let i=0; i<tabContent.length; i++){
        if(i === index){
            tabContent[i].classList.remove('none');
        } else {
            tabContent[i].classList.add('none');
        }
    }
}
