document.addEventListener('DOMContentLoaded', function () {
    const sliders = {
        grayscale: document.getElementById('grayscaleSlider'),
        saturation: document.getElementById('saturationSlider'),
        contrast: document.getElementById('contrastSlider'),
    };
    const values = {
        grayscaleValue: document.getElementById('grayscaleValue'),
        saturationValue: document.getElementById('saturationValue'),
        contrastValue: document.getElementById('contrastValue'),
    };

    Object.keys(sliders).forEach(key => {
        sliders[key].oninput = function() {
            values[key + 'Value'].textContent = this.value + '%';
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                const message = {};
                message[key] = sliders[key].value;
                chrome.tabs.sendMessage(tabs[0].id, message);
            });
        };
    });
});
