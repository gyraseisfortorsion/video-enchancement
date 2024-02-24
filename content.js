// // Find all video elements on the page
// const videos = document.querySelectorAll('video');

// // Apply a CSS filter to each video
// videos.forEach(video => {
//     video.style.filter = 'grayscale(100%)'; // Example: making the video grayscale
// });

// const observer = new MutationObserver((mutations) => {
//     mutations.forEach((mutation) => {
//         mutation.addedNodes.forEach((node) => {
//             if (node.nodeType === 1) { // ELEMENT_NODE
//                 const videos = node.querySelectorAll('video');
//                 if (videos.length) {
//                     videos.forEach(video => {
//                         video.style.filter = 'grayscale(100%)'; // Example: making the video grayscale
//                     });
//                 }
//                 // If custom player, try identifying through specific class names or attributes
//             }
//         });
//     });
// });

// observer.observe(document.body, { childList: true, subtree: true });

// Step 1: Create the CSS style for the grayscale filter

// const videos = document.querySelectorAll('video');

// if (videos.length) {
//     videos.forEach(video => {
//         video.style.filter = 'grayscale(100%)';
//     });
// }
// else {
//     const style = document.createElement('style');
//     style.type = 'text/css';
//     style.innerHTML = `
//     .grayscale-filter {
//         filter: grayscale(100%);
//     }`;
//     document.head.appendChild(style);

//     // Step 2: Apply the grayscale filter class to all embed-responsive containers
//     document.querySelectorAll('.embed-responsive').forEach(container => {
//         container.classList.add('grayscale-filter');
//     });
// }


function applyFilters(filters) {
    const videos = document.querySelectorAll('video');
    const filterString = `grayscale(${filters.grayscale}%) saturate(${filters.saturation}%) contrast(${filters.contrast}%)`;

    if (videos.length) {
        videos.forEach(video => {
            video.style.filter = filterString;
        });
    } else {
        document.querySelectorAll('.embed-responsive').forEach(container => {
            container.style.filter = filterString;
        });
    }
}

// Initialize with default values
const filters = {
    grayscale: '0',
    saturation: '100',
    contrast: '100'
};

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    Object.keys(message).forEach(key => {
        if (message[key] !== undefined) {
            filters[key] = message[key];
        }
    });
    applyFilters(filters);
});


// Apply initial 100% grayscale filter
// applyGrayscaleFilter(100);
