document.addEventListener('DOMContentLoaded', solve);

function solve() {
    const encodeButton = document.querySelector("#encode button");
    const decodeButton = document.querySelector("#decode button");
    const encodeTextarea = document.querySelector("#encode textarea");
    const decodeTextarea = document.querySelector("#decode textarea");

    encodeButton.addEventListener("click", function (event) {
        event.preventDefault();
        let message = encodeTextarea.value;
        let encodedMessage = encodeMessage(message);
        decodeTextarea.value = encodedMessage;
        encodeTextarea.value = "";
    });

    decodeButton.addEventListener("click", function (event) {
        event.preventDefault();
        let encodedMessage = decodeTextarea.value;
        let decodedMessage = decodeMessage(encodedMessage);
        decodeTextarea.value = decodedMessage;
    });

    function encodeMessage(message) {
        return message.split("").map(char => String.fromCharCode(char.charCodeAt(0) + 1)).join("");
    }

    function decodeMessage(message) {
        return message.split("").map(char => String.fromCharCode(char.charCodeAt(0) - 1)).join("");
    }
}