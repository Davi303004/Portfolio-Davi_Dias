export function getDataBasePath(){
    const isInsidePages = 
        window.location.pathname.includes('/pages/')
    
    return isInsidePages 
    ? '../'
    : './' 
}

export function resolvePath(path){
    
    const basePath = getDataBasePath();

    return basePath + path;
}