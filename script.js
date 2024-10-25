const imageContainer = document.getElementById('image-container'); 
const loader = document.getElementById('loader');

let photosArray= [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let initialLoad = true;

// Unsplash API

let count = 5;
const apiKey = 'B7xk-NscsKhTWAuO4msm37MkkEL7Bo3ajYIstK033vY';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count};`

// Update apiURL with the new Count 

function updateCount(picCount){
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount};`
}



// Get Photos from Unsplash API

async function getPhotos(){
    try{
        const response =  await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        
        if (initialLoad){
            updateCount(30);
            initialLoad = false;
        }
    }    
    catch(error){
       
    }    
}   

// Create Elements for Links & Photos and add to DOM

function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    
    // Run function for each object in Photo Array

    photosArray.forEach((photo) =>{
        // Create <a> to link to Unsplash
    const item = document.createElement('a');    
    setAttributes(item,{
        href:photo.links.html,
        target:'_blank',
    })    

    // Create Element for img

    const img = document.createElement('img');
    setAttributes(img, {
        src:photo.urls.regular,
        alt:photo.alt_description,
        title:photo.alt_description,
    })    

    // When Each Image is Finished Loading(Event Listener)
    img.addEventListener('load', imageLoaded);
                        
    // insert Image and Anchor inside both inside  the Image Container
    item.appendChild(img);
    imageContainer.appendChild(item);
});    
}

//  Checking if all images were loaded 

function imageLoaded(){
    imagesLoaded ++;
    if(imagesLoaded === totalImages){ 
        ready = true;
        loader.hidden = true;
       }     
   }    


// Helper Function to set Attribute on DOM Elements (To avoid DRY)

function setAttributes(element, Attribute){ 
    for(const key in Attribute)    
    element.setAttribute(key, Attribute[key]);
} 

// Check to see if scrolling near bottom of page ,Load more photos

window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready ){
        ready =false;
        getPhotos();
        
    }
});

// On Load
getPhotos();