$(document).ready(function () {
  $("#search").keypress(function (e) {
    if (e.which === 13) {
      let searchTerm = $("#search").val().trim();
      if (searchTerm === "") return;

      let webLink =
        "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" +
        encodeURIComponent(searchTerm) +
        "&utf8=&format=json&origin=*";

      $.ajax({
        url: webLink,
        dataType: "jsonp", // Keep as jsonp unless using a server
        success: function (data) {
          $("#results").empty();
          let searchResults = data.query.search;

          searchResults.forEach((item) => {
            let title = item.title;
            let snippet = item.snippet;
            let url = "https://en.wikipedia.org/wiki/" + encodeURIComponent(title);

            let resultHtml = `
              <a href="${url}" target="_blank" style="text-decoration: none;">
                <div class="searchResult">
                  <span class="searchTitle">${title}</span>
                  <span><br>${snippet}...</span>
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
