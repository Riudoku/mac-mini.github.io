//Obtenemos los elementos de DOM


const menuButton  = document.getElementById('menu-button');
const mainHeader  = document.getElementById('main-header');
const overlay     = document.getElementById('main-overlay');
const activeClass = 'is-active';
const isTablet    = matchMedia('(max-width : 734px)');

const toggleMenu = () => mainHeader.classList.toggle(activeClass);
const closeMenu  = () => mainHeader.classList.remove(activeClass)

const closeMenuWhenClickLink = (e) => 
{
    if(e.target.tagName === 'A') closeMenu();
    
};

const closeWhenTypeScape = (e) =>
{
    if(e.code === 'Escape') closeMenu();
}



const handleAddEventListener = () => 
{   
    menuButton.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);
    mainHeader.addEventListener('click', closeMenuWhenClickLink);
    mainHeader.addEventListener('keydown', closeWhenTypeScape);
}

const handleRemoveEventListener = () => 
{
    menuButton.removeEventListener('click', toggleMenu);
    overlay.removeEventListener('click', closeMenu);
    mainHeader.removeEventListener('click', closeMenuWhenClickLink);
    mainHeader.removeEventListener('keydown', closeWhenTypeScape);
}

const handleEventListener = (mediaQuery) =>
{
    mediaQuery.matches ? handleAddEventListener()
                       : handleRemoveEventListener();

}

export const handleActiveMenu = () =>
{
    if(isTablet.matches)  handleAddEventListener();
    
  
    isTablet.addEventListener('change', handleEventListener);

}


handleActiveMenu()


