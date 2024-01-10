const padlockElement = document.getElementById('padlock');
const dataTextElment = document.getElementById('masked-data-text');
const keyTextElement = document.getElementById('masked-data-key');
const messageElement = document.getElementById('message')
const panelSecurity  = document.getElementById('feature-panel-security');
let padlockData, dataTextData, keyTextData;

const options =
{
    threshold: 0.66,
}

const getInitialData = (steps, range, refer) =>
{
    const start = refer + scrollY - (innerHeight * options.threshold);
    const end   = start + range;
    const unit  = (end - start) / steps;
    
    //console.log('refer: '+ refer, 'scrollY: ' + scrollY + ' SUMA: '+ (refer + scrollY) +' innerHeight: ' + innerHeight * 0.66);
    return {start, end, steps, unit};

}

const setInitialData = () =>
{
    padlockData = getInitialData(72, 350, padlockElement.getBoundingClientRect().top);
    dataTextData = getInitialData(dataTextElment.innerText.length, 150, messageElement.getBoundingClientRect().top);
    keyTextData = getInitialData(keyTextElement.innerText.length, 150, messageElement.getBoundingClientRect().bottom);
}

setInitialData()
addEventListener('resize', setInitialData)




const getCurrenStep = ({start, end, steps, unit}) =>
{
    let currentStep = 0;

    //Si el usuario esta en el limite permitido del rango
    if(scrollY >= start && scrollY <= end)
        currentStep = Math.ceil((scrollY - start) / unit);
    

    // Si el usuario esta abajo del inicio y el paso actual NO es 0
    if(scrollY < start && currentStep !== 0)
        currentStep = 0;
    

    // Si el usuario esta arriba del final y el paso actual no es el total de pasos
    if(scrollY > end && currentStep < steps)

        currentStep = steps;
    
    return currentStep;
    
}

const handleOpenPadlockWithScroll = () =>
{
    padlockElement.style.animationDelay = `-${getCurrenStep(padlockData)}s`;
}

const handleChangeTextkWithScroll = (data, element) =>
{
    const steps = element.innerText.length;

    const currentStep = getCurrenStep(data);
    
    const partialText = element.dataset.text.substring(0, currentStep);

    const partialDots = '•'.repeat(steps - currentStep)

    element.innerText = partialText + partialDots;

}

const functionForScroll = () =>
{
    handleOpenPadlockWithScroll();
    handleChangeTextkWithScroll(dataTextData, dataTextElment);
    handleChangeTextkWithScroll(keyTextData, keyTextElement);
}

const callbackSecurityPanel = (entries) =>
{
    if(entries[0].isIntersecting) 
        addEventListener('scroll', functionForScroll)
    else
        removeEventListener('scroll', functionForScroll)
}

const SecurityObserve = new IntersectionObserver(callbackSecurityPanel)

export const securityPanelScroll = () =>
{
    SecurityObserve.observe(panelSecurity)
}

securityPanelScroll()
