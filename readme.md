## Painty Plops 2025 Competion Voting and Results

This project is a partially vibe-coded voting and displaying site for our hobby group.

Entry data is stored in `entries.json`. Each file ID corresponds to the file ID in a specific public [Google drive folder](https://drive.google.com/drive/folders/1fhM2Msu8DYWc44G6TCmAvG5Wl7s1NyCe?usp=drive_link).


The entry data is generated from the following [app script](https://script.google.com/d/1ymF9MaVFQ7inojixJKWMCleAYwYgfcniAtnqWU20dDJmKb977dROBxq_/edit?usp=sharing)

This script gets the IDS of all the images, videos, and preview gifs, assigns each entry an ID, and then prints the json, for manual copy-paste into here.

The rest is a simple js app which parses the entry data, loads the appropriate drive thumbnails, displays a gallery, and when closed, shows the results.

[Here](https://docs.google.com/forms/d/1t96bqlvgs60XNI87ODpb10FK_MZ66hKTcllBdyBM1Cw/) is the original competition submission form
[And here](https://docs.google.com/forms/d/1icKzbDqgVa5_dAW7qRca5gI-c9lzieohDQMSvgxb2w4) is the voting form.

Voting form has been published as csv, which is then parsed for the results.