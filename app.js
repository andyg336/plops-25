const DRIVE_THUMB_PREFIX = "https://drive.google.com/thumbnail?id=";
const DRIVE_THUMB_SUFFIX = "&sz=w1000"; // request bigger thumbnails
const DRIVE_FULL_PREFIX = "https://drive.google.com/uc?export=view&id=";
const PRE_FILLED_URL = "https://docs.google.com/forms/d/e/1FAIpQLSebjaGAgXt849SYB6i7P3Gfr8BBVBdVhIxwUB6QPB2WeD_7OQ/viewform?usp=pp_url&entry.2005530914="

fetch("./entries.json")
  .then(res => res.json())
  .then(entries => {
    shuffle(entries);
    renderEntries(entries);
  });

function renderEntries(entries) {
  const container = document.getElementById("entries");

  entries.forEach(entry => {
    const entryDiv = document.createElement("div");
    entryDiv.className = "entry";

    const title = document.createElement("h2");
    title.textContent = "Entry " + entry.id;
    entryDiv.appendChild(title);

    const imageRow = document.createElement("div");
    imageRow.className = "images";
    // Shuffle images per entry
    const shuffledImages = [...entry.images];
    // Shuffle isn't actually the best, disable for now
    // shuffle(shuffledImages);

    if (entry.preview) {
      // Gif Preview
      previewElement = createGifWithPreview(shuffledImages[0], entry.preview,  "300px");

    } else {
      // IMAGE PREVIEW
      previewElement = document.createElement("img");
      previewElement.src = DRIVE_THUMB_PREFIX + shuffledImages[0] + DRIVE_THUMB_SUFFIX;
    }

    previewElement.loading = "lazy";
    previewElement.className = "main-thumbnail";
    previewElement.style.cursor = "pointer";
    previewElement.style.maxWidth = "300px";
    previewElement.style.maxHeight = "300px";
    previewElement.style.margin = "5px";
    imageRow.appendChild(previewElement);

    // Hidden container for the rest of the images
    const hiddenContainer = document.createElement("div");
    hiddenContainer.className = "hidden-images";

    // Populate hidden images
    shuffledImages.slice(0).forEach(id => {
      const link = document.createElement("a");
      link.href = DRIVE_FULL_PREFIX + id;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      const img = document.createElement("img");
      img.src = DRIVE_THUMB_PREFIX + id + DRIVE_THUMB_SUFFIX;
      img.loading = "lazy";
      img.style.maxWidth = "500px";
      img.style.maxHeight = "500px";
      img.style.margin = "5px";

      link.appendChild(img);
      hiddenContainer.appendChild(link);
    });

    imageRow.appendChild(hiddenContainer);

    // Toggle expand/collapse with smooth animation
    previewElement.addEventListener("click", () => {
      hiddenContainer.classList.toggle("show");
    });

    entryDiv.appendChild(imageRow);
    container.appendChild(entryDiv);

    // Add Vote button below images
    const voteButton = document.createElement("a");
    voteButton.href = PRE_FILLED_URL + "Entry+" + entry.id;
    voteButton.target = "_blank";
    voteButton.rel = "noopener noreferrer";
    voteButton.textContent = "Vote!";
    voteButton.style.display = "inline-block";
    voteButton.style.marginTop = "10px";
    voteButton.style.padding = "8px 16px";
    voteButton.style.backgroundColor = "#186129ff";
    voteButton.style.color = "#fff";
    voteButton.style.borderRadius = "2px";
    voteButton.style.textDecoration = "none";
    voteButton.style.fontWeight = "bold";

    entryDiv.appendChild(voteButton);
  });
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createGifWithPreview(previewSrc, gifSrc, maxWidth = "300px") {
  const img = document.createElement("img");
  img.src = DRIVE_THUMB_PREFIX + previewSrc + DRIVE_THUMB_SUFFIX;
  img.style.maxWidth = maxWidth;
  img.style.cursor = "pointer";
  img.style.transition = "opacity 0.3s";
  img.style.opacity = "1";

  const gif = new Image();
  gif.src = DRIVE_THUMB_PREFIX + gifSrc + DRIVE_THUMB_SUFFIX;

  gif.onload = () => {
    img.style.opacity = "0";
    setTimeout(() => {
      img.src = DRIVE_THUMB_PREFIX + gifSrc + DRIVE_THUMB_SUFFIX;
      img.style.opacity = "1";
    }, 200);
  };

  return img;
}
