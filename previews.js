// ON LOAD
$(function () {
    getPreviewData().then((cards) => { setDataCards(cards); });
});

// GET DATA
function getPreviewData() {
    return $.ajax({ url: "preview.csv", dataType: "text" }).then((data) => {
        const rows = data.trim().split("\n").slice(1);

        const cards = rows.map((row) => {
            const fields = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);

            if (fields) {
                const business = fields[0].replace(/(^"|"$)/g, "");
                const tags = fields[1].replace(/(^"|"$)/g, "").split("-");
                const image = fields[2].replace(/(^"|"$)/g, "");
                const link = fields[3].replace(/(^"|"$)/g, "");
                const description = fields[4].replace(/(^"|"$)/g, "");

                return { business, tags, image, link, description };
            }
        });

        return cards.filter((card) => card);
    });
}

// LOAD DATA
function setDataCards(cards) {
    cards.forEach((card) => {
        $("#project-previews").append(`
            <div class="projects-card">
                <img src="images/${card.image}" alt="${card.business} Logo" class="projects-card-image"/>
                <h3 class="projects-card-title">${card.business}</h3>   
                <p class="projects-card-description">${card.description}</p>
    
                <div class="projects-card-tags">
                    <span class="projects-card-tag">${card.tags[0]}</span>
                    <span class="projects-card-tag">${card.tags[1]}</span>
                    <span class="projects-card-tag">${card.tags[2]}</span>
                </div>
    
                <a class="projects-card-preview" href="${card.link}" target="_blank">
                    Preview <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        `);
    });
};