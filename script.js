// Script.js
$(document).ready(function () {
    $("#search").keypress(function (e) {
        if (e.which === 13) {
            let searchTerm = $("#search").val().trim();
            if (searchTerm === "") return; // Prevent empty searches

            let webLink =
                "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" +
                encodeURIComponent(searchTerm) +
                "&format=json&origin=*";

            $.ajax({
                url: webLink,
                dataType: "jsonp",
                success: function (data) {
                    $("#results").empty(); // Clear previous results
                    let searchResults = data.query.search;

                    searchResults.forEach((item) => {
                        let titleForResult = item.title;
                        let snippetForResult = item.snippet;

                        let articleUrl =
                            "https://en.wikipedia.org/wiki/" + encodeURIComponent(titleForResult);

                        let resultHtml = `
                            <a href="${articleUrl}" target="_blank" style="text-decoration: none;">
                                <div class="searchResult">
                                    <span class="searchTitle">${titleForResult}</span>
                                    <span><br />${snippetForResult}...</span>
                                </div>
                            </a>`;

                        $("#results").append(resultHtml);
                    });
                },
                error: function () {
                    $("#results").html("<p>Error fetching data. Please try again.</p>");
                }
            });
        }
    });
});
