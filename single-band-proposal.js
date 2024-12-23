const bandList = [
    {
        name: "The Hustle",
        image: ""
    },
    {
        name: "The Reverie",
        image: ""
    },
    {
        name: "When We Were Young",
        image: ""
    },
    {
        name: "Moonshine",
        image: ""
    },
    {
        name: "Call of the Kraken",
        image: "https://res.cloudinary.com/dubsado/image/upload/v1715367894/mpu88muj2n2tld9bfmaw.jpg"
    },
    {
        name: "The New Ventures",
        image: ""
    },
    {
        name: "The Clovers",
        image: ""
    },
    {
        name: "Cascades",
        image: ""
    },
    {
        name: "The Outlaws",
        image: ""
    },
    {
        name: "Pinstripes",
        image: ""
    },
    {
        name: "Scuzzed",
        image: ""
    },
    {
        name: "Subtract",
        image: ""
    },
    {
        name: "Yubaba",
        image: ""
    },
    {
        name: "The Instigators",
        image: ""
    },
    {
        name: "Atrlantic Park",
        image: ""
    },
    {
        name: "The Highlife",
        image: ""
    },
    {
        name: "The Wolfpack",
        image: ""
    },
    {
        name: "The Maydays",
        image: ""
    },
    {
        name: "Sundown",
        image: ""
    },
    {
        name: "Edit Acoustic",
        image: ""
    },
    {
        name: "Warped",
        image: ""
    }
]

let observerInitialized = false;

function getBandName() {
    // Get the parent element containing the target text
    const packageElement = document.querySelector('#element__5eda923023d3414ea86fba7e');

    // Find the <strong> <span> element containing the text
    const bandNameContainer = packageElement.querySelector('strong > span');

    // Get the text content of the target element
    const bandName = bandNameContainer.textContent.trim();

    // Log or use the text as needed
    console.log(bandName); // Outputs: "Call of the Kraken"

    return bandName;
}

function getBandInfo(bandName) {
    const bandInfo = bandList.find(band => band.name === bandName);
    return bandInfo;
}

function getBandImage(bandName) {
    const bandInfo = getBandInfo(bandName);
    if (bandInfo && bandInfo.image) {
        return bandInfo.image;
    } else {
        console.log('Image not found for the band.');
    }
}

function displayBandImage(bandName) {
    const bandImage = getBandImage(bandName);
    if (bandImage) {
        console.log(bandImage);
        const bandImageDiv = document.getElementById('band-image');
        const imgElement = document.createElement('img');
        imgElement.src = bandImage;
        bandImageDiv.appendChild(imgElement);
    }
}

function updateBandName(bandName) {
    const bandNameElements = document.querySelectorAll('span.band-name');
    bandNameElements.forEach(element => {
        element.textContent = bandName;
    });
}

function checkAndInitializeReactElements() {
    const textInput = document.querySelector('#element__6769d1d5c5b0900000e1771d .form-element__input');
    const submitButton = document.querySelector('.submit-form-button');

    if (textInput && submitButton) {
        console.log("React form elements detected. Initializing sync logic...");
        const bandName = getBandName(); // Get the band name here
        initializeCustomTextareaSync(textInput, bandName);

        // Disconnect the observer if it's running
        if (observerInitialized) observer.disconnect();
    } else if (!observerInitialized) {
        // Set up MutationObserver only if polling doesn’t find the elements
        console.log("Elements not found. Setting up MutationObserver...");
        setupObserver();
    }
}

function setupObserver() {
    const observer = new MutationObserver(() => {
        checkAndInitializeReactElements();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    observerInitialized = true;
}

function initializeCustomTextareaSync(textInput, bandName) {
    // Hide the input field
    textInput.style.visibility = 'hidden';
    textInput.style.position = 'absolute';
    textInput.style.height = '0';
    textInput.style.width = '0';
    console.log("Input field hidden.");

    // Add band name to React form input
    updateReactInput(textInput, bandName);
    console.log(`Input field initialized with band name: ${bandName}`);
}

function updateReactInput(textInput, value) {
    // Update the input field's visible value
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value'
    ).set;
    nativeInputValueSetter.call(textInput, value);

    // Update the input's `value` attribute for submission
    textInput.setAttribute('value', value);

    // Trigger React-compatible events to notify its internal state
    const inputEvent = new Event('input', { bubbles: true });
    textInput.dispatchEvent(inputEvent);

    console.log(`React input updated with value: ${value}`);
}

bandName = getBandName();
displayBandImage(bandName);
updateBandName(bandName);
checkAndInitializeReactElements();