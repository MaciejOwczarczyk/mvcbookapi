document.addEventListener('DOMContentLoaded', function() {

    var button = document.querySelector("#addBtn");

    button.addEventListener("click", function () {
        var isbn = document.querySelector("#isbn");
        var title = document.querySelector("#title");
        var author = document.querySelector("#author");
        var publisher = document.querySelector("#publisher");
        var type = document.querySelector("#type");

        var isbnVal = isbn.value;
        var titleVal = title.value;
        var authorVal = author.value;
        var publisherVal = publisher.value;
        var typeVal = type.value;

        $.ajax({
            url: "http://localhost:8282/books",
            data: JSON.stringify({
                isbn: isbnVal,
                title: titleVal,
                author: authorVal,
                publisher: publisherVal,
                type: typeVal
            }),
            type: "POST",
            dataType: "JSON",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            success: function(data) {
                if (data.status == 'OK') {
                    alert('Book has been added');
                } else {
                    alert('Failed adding book: ' + data.status + ', ' + data.errorMessage)
                };
            }
        })
        location.reload();

        isbn.value = "";
        title.value = "";
        author.value = "";
        publisher.value = "";
        type.value = "";


    });

    function showAllBooks() {
        $.ajax({
            url: "http://localhost:8282/books" ,
            data: {},
            type: "GET",
            dataType: "JSON"
        })
            .done(function(result) {
                // console.log('Udalo sie! result: ', result);

                var list = document.querySelector(".books");

                for (var i = 0; i < result.length ; i++) {
                    var div = document.createElement("div");
                    var newTitle = document.createElement("p");
                    var newButton = document.createElement("a");
                    var editButton = document.createElement("a");
                    newButton.classList.add("button2");
                    newButton.innerText = "Usuń książkę";
                    newButton.setAttribute("id",result[i].id)
                    editButton.classList.add("button3");
                    editButton.innerText = "Edytuj książkę";
                    editButton.setAttribute("id", result[i].id);
                    newTitle.classList.add("title");
                    newTitle.id = result[i].id;
                    newTitle.innerText = (i + 1) +  ". " + result[i].title;
                    newTitle.appendChild(div);
                    newTitle.insertBefore(newButton, div);
                    newTitle.insertBefore(editButton, div);
                    list.appendChild(newTitle);

                };
                var title = document.querySelectorAll(".title");
                for (var i = 0; i < title.length ; i++) {
                    title[i].addEventListener("click", function () {
                        var bookId = this.getAttribute("id");
                        $.ajax({
                            url: "http://localhost:8282/books/" + bookId ,
                            data: {},
                            type: "GET",
                            dataType: "JSON"
                        })
                            .done(function (result) {
                                var all = document.querySelectorAll('p[id]');
                                for (var j = 0; j < all.length ; j++) {
                                    if (all[j].getAttribute("id") == parseInt(result.id)){
                                        all[j].lastElementChild.innerText = "Id: " + result.id + " Isbn: " + result.isbn + " Title: " + result.title
                                        + " Author: " + result.author + " Publisher: " + result.publisher + " Type: " + result.type;
                                    };

                                };
                            });
                    });
                };

                var deleteButtons = document.querySelectorAll("a.button2");
                for (var i = 0; i < deleteButtons.length ; i++) {
                    deleteButtons[i].addEventListener("click", function () {
                        var deleteId = this.getAttribute("id");
                        $.ajax({
                            url: "http://localhost:8282/books/" + deleteId ,
                            data: {},
                            type: "DELETE",
                            dataType: "JSON"
                        })
                            .done(function () {
                                location.reload();
                            });
                    });
                };

                var editButton = document.querySelectorAll(("a.button3"));
                for (var i = 0; editButton.length; i++) {
                    editButton[i].addEventListener("click", function () {

                        var isbn = document.querySelector("#isbn");
                        var title = document.querySelector("#title");
                        var author = document.querySelector("#author");
                        var publisher = document.querySelector("#publisher");
                        var type = document.querySelector("#type");

                        var book = this.getAttribute("id");
                        $.ajax({
                            url: "http://localhost:8282/books/" + book ,
                            data: {},
                            type: "GET",
                            dataType: "JSON"
                        })
                            .done(function (result) {
                                var all = document.querySelectorAll('p[id]');
                                for (var j = 0; j < all.length ; j++) {
                                    if (all[j].getAttribute("id") == parseInt(result.id)){
                                        isbn.value = result.isbn;
                                        title.value = result.title;
                                        author.value = result.author;
                                        publisher.value = result.publisher;
                                        type.value = result.type;
                                    };
                                };

                                var newSaveButton = document.querySelector("#saveBtn");
                                newSaveButton.addEventListener("click", function () {
                                    $.ajax({
                                        url: "http://localhost:8282/books/" + book,
                                        data: JSON.stringify({
                                            id : book,
                                            isbn: isbn.value,
                                            title: title.value,
                                            author: author.value,
                                            publisher: publisher.value,
                                            type: type.value
                                        }),
                                        type: "PUT",
                                        dataType: "JSON",
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json'
                                        },

                                    })
                                        .done(function () {
                                            location.reload();
                                        });
                                })

                            });
                    })
                }
            })
            .fail(function(xhr,status,err) {
                console.log('Nie udalo sie :( ', xhr);
            })
            .always(function(xhr,status) {
                console.log('Wykona sie zawsze, xhr: ', xhr);
                console.log('Wykona sie zawsze, status: ', status);
            });

    };
    showAllBooks();
});