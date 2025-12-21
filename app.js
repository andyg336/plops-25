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
    title.textContent = entry.id;
    entryDiv.appendChild(title);

    const imageRow = document.createElement("div");
    imageRow.className = "images";

    entry.images.forEach(id => {
      const link = document.createElement("a");
      link.href = DRIVE_FULL_PREFIX + id; // full image opens in new tab
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      const img = document.createElement("img");
      img.src = DRIVE_THUMB_PREFIX + id + DRIVE_THUMB_SUFFIX;
      img.loading = "lazy";
      img.style.maxWidth = "300px"; // control display size
      img.style.margin = "5px";

      link.appendChild(img);
      imageRow.appendChild(link);
    });

    entryDiv.appendChild(imageRow);
    container.appendChild(entryDiv);
    // Add Vote button below images
    const voteButton = document.createElement("a");
    voteButton.href = PRE_FILLED_URL + entry.id;
    voteButton.target = "_blank";
    voteButton.rel = "noopener noreferrer";
    voteButton.textContent = "Vote!";
    voteButton.style.display = "inline-block";
    voteButton.style.marginTop = "10px";
    voteButton.style.padding = "8px 16px";
    voteButton.style.backgroundColor = "#28a745";
    voteButton.style.color = "#fff";
    voteButton.style.borderRadius = "6px";
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
