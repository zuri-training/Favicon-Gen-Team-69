import { createPicker } from "./picmo/dist/index.js";

// The picker must have a root element to insert itself into
const rootElement = document.querySelector("#pickerContainer");

// Create the picker
const picker = createPicker({
  rootElement,
  emojisPerRow: 14,
  showRecents: false,
  showPreview: false,
  showSearch: false,
  emojiSize: "1.8rem",
  className: 'my-picker'
});

// The picker emits an event when an emoji is selected. Do with it as you will!
picker.addEventListener("emoji:select", (event) => {
  console.log("Emoji selected:", event);
  document.getElementById("emoji-things").value = event.emoji;
});
