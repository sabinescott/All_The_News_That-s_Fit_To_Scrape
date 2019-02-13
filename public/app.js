$.getJSON("/articles", function (data) {
    for (var i = 0; i < data.length; i++) {

        if (data[i].saved) {

            $(".articlesSaved").append(
                "<div data-id='" + data[i]._id + "' class='card'>" +
                "<img class='card-img-top' src='" + data[i].img + "' alt='Card image cap'>" +
                "<div class='card-body'>" +
                "<h4 id='articleTitle' class='card-title' href='" + data[i].link + "'><b>" + data[i].title + "</b></h4>" +
                "<p id='articleDesc' class='card-text'>" + data[i].description + "</p>" +
                "<a href='" + data[i].link + "'>Link Full Article ></a>" + "<br>" + "<br>" +
                "<button data-id='" + data[i]._id + "' id='deleteBtn' class='btn btn-outline-primary my-2 my-sm-0' type='submit'>Delete Saved Articles" + "</button>" +
                "</div>" +
                "</div>" + "<br>"
            );
        } else {
            $(".articles").append(
                "<div data-id='" + data[i]._id + "' class='card'>" +
                "<img class='card-img-top' src='" + data[i].img + "' alt='Card image cap'>" +
                "<div class='card-body'>" +
                "<h4 id='articleTitle' class='card-title' href='" + data[i].link + "'><b>" + data[i].title + "</b></h4>" +
                "<p id='articleDesc' class='card-text'>" + data[i].description + "</p>" +
                "<a href='" + data[i].link + "'>Link Full Article ></a>" + "<br>" + "<br>" +
                "<button data-id='" + data[i]._id + "' id='saveBtn' class='btn btn-outline-primary my-2 my-sm-0' type='submit'>Save Articles" + "</button>" +
                "</div>" +
                "</div>" + "<br>"
            );
        }
    }
});

$(document).on("click", "#scrapeBtn", function () {
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).done(function () {
        location.reload();
    })
});

$(document).on("click", "#saveBtn", function () {

    var thisId = $(this).attr("data-id");

    console.log("Article Saved ID: \n\n", thisId);

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            "saved": true
        }
    }).done(function (data) {
        location.reload();
        console.log(data);
    })
});

$(document).on("click", "#deleteBtn", function () {

    var thisId = $(this).attr("data-id");

    console.log("Article Saved ID: \n\n", thisId);

    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            "saved": false
        }
    }).done(function (data) {
        location.reload();
        console.log(data);
    })
});
