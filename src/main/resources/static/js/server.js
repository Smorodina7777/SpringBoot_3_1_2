function reloadTable() {
    fetch('http://localhost:6060/rest/admin/').then(
        response => {
            response.json().then(
                data => {
                    let temp ="";
                    data.forEach((u) => {
                        temp += "<tr >";
                        temp += "<td >"+ u.id + "</td>";
                        temp += "<td >"+ u.name + "</td>";
                        temp += "<td >"+ u.password + "</td>";
                        temp += "<td >"+ u.age + "</td>";
                        temp += "<td >"+ u.email + "</td>";
                        temp += "<td >"+ u.role + "</td>"
                        temp += "<td >" +
                            "    <a class='btn btn-info' role='button' onmouseover='fillEditModal(" + u.id + ")' data-toggle='modal' data-target='#editUser'>Edit</a>" +
                            "    <a class='btn btn-danger' role='button' onmouseover='fillDeleteModal(" + u.id + ")' data-toggle='modal' data-target='#deleteUser'>Delete</a>" +
                            "    </td>"
                        temp += "</tr>";
                    })
                    $("#usersTableHere").empty();
                    $("#usersTableHere").append(temp);
                }
            )
        }
    )
}
function reloadAdminPostTable() {
    fetch('http://localhost:6060/rest/admin/post/').then(
        response => {
            response.json().then(
                data => {
                    let temp ="";
                    data.forEach((p) => {
                        temp += "<tr >";
                        temp += "<td >"+ p.id + "</td>";
                        temp += "<td >"+ p.postName + "</td>";
                        temp += "<td >"+ p.author + "</td>";
                        temp += "<td >"+ p.pubDate + "</td>";
                        temp += "<td >"+ p.pubDescribe + "</td>";
                        temp += "<td >" +
                            "    <a class='btn btn-danger' role='button' onmouseover='fillAdminPostDeleteModal(" + p.id + ")' data-toggle='modal' data-target='#deleteAdminPost'>Delete</a>" +
                            "    </td>"
                        temp += "</tr>";
                    })
                    $("#adminPostsTableHere").empty();
                    $("#adminPostsTableHere").append(temp);
                }
            )
        }
    )
}
function reloadUserPostTable() {
    fetch('http://localhost:6060/user/post/').then(
        response => {
            response.json().then(
                data => {
                    let temp ="";
                    data.forEach((p) => {
                        temp += "<tr >";
                        temp += "<td >"+ p.id + "</td>";
                        temp += "<td >"+ p.postName + "</td>";
                        temp += "<td >"+ p.author + "</td>";
                        temp += "<td >"+ p.pubDate + "</td>";
                        temp += "<td >"+ p.pubDescribe + "</td>";
                        temp += "<td >" +
                            "    <a class='btn btn-info' role='button' onmouseover='fillPostEditModal(" + p.id + ")' data-toggle='modal' data-target='#editPost'>Edit</a>" +
                            "    <a class='btn btn-danger' role='button' onmouseover='fillUserPostDeleteModal(" + p.id + ")' data-toggle='modal' data-target='#deleteUserPost'>Delete</a>" +
                            "    </td>"
                        temp += "</tr>";
                    })
                    $("#userPostsTableHere").empty();
                    $("#userPostsTableHere").append(temp);
                }
            )
        }
    )
}

function fillEditModal(userId) {
    $.get("http://localhost:6060/rest/admin/" + userId, function (userJSON) {
        $('#idToEditUser').val(userJSON.id);
        $('#nameToEditUser').val(userJSON.name);
        $('#ageToEditUser').val(userJSON.age);
        $('#emailToEditUser').val(userJSON.email);
        $('#passwordToEditUser').val(userJSON.password);
        if(userJSON.role.length==2){
            $("#ROLE_USER").prop('checked', true);
            $("#ROLE_ADMIN").prop('checked', true);
        } else if (userJSON.role.length==1){
            $("#ROLE_USER").prop('checked', true);
            $("#ROLE_ADMIN").prop('checked', false);
        } else {
            $("#ROLE_USER").prop('checked', false);
            $("#ROLE_ADMIN").prop('checked', false);
        }
    });
}
function fillPostEditModal(postId) {
    $.get("http://localhost:6060/user/post/" + postId, function (postJSON) {
        $('#idToEditPost').val(postJSON.id);
        $('#postNameToEditePost').val(postJSON.postName);
        $('#authorToEditePost').val(postJSON.author);
        $('#pubDateToEditPost').val(postJSON.pubDate);
        $('#pubDescribeToEditPost').val(postJSON.pubDescribe);
        $('#userIdToEditPost').val(postJSON.user_id);

    });
}
function fillDeleteModal(userId) {
    $.get("http://localhost:6060/rest/admin/" + userId, function (userJSON) {
        $('#idToDeleteUser').val(userJSON.id);
        $('#nameToDeleteUser').val(userJSON.name);
        $('#ageToDeleteUser').val(userJSON.age);
        $('#emailToDeleteUser').val(userJSON.email);
        if(userJSON.role.length==2){
            $("#Delete_ROLE_USER").prop('checked', true);
            $("#Delete_ROLE_ADMIN").prop('checked', true);
        } else if (userJSON.role.length==1){
            $("#Delete_ROLE_USER").prop('checked', true);
            $("#Delete_ROLE_ADMIN").prop('checked', false);
        } else {
            $("#Delete_ROLE_USER").prop('checked', false);
            $("#Delete_ROLE_ADMIN").prop('checked', false);
        }
    });
}
function fillAdminPostDeleteModal(postId) {
    $.get("http://localhost:6060/rest/admin/post/" + postId, function (postJSON) {
        $('#idToDeleteAdminPost').val(postJSON.id);
        $('#postNameToDeleteAdminPost').val(postJSON.postName);
        $('#authorToDeleteAdminPost').val(postJSON.author);
        $('#pubDateToDeleteAdminPost').val(postJSON.pubDate);
        $('#pubDescribeToDeleteAdminPost').val(postJSON.pubDescribe);


    });
}
function fillUserPostDeleteModal(postId) {
    $.get("http://localhost:6060/user/post/" + postId, function (postJSON) {
        $('#idToDeleteUserPost').val(postJSON.id);
        $('#postNameToDeleteUserPost').val(postJSON.postName);
        $('#authorToDeleteUserPost').val(postJSON.author);
        $('#pubDateToDeleteUserPost').val(postJSON.pubDate);
        $('#pubDescribeToDeleteUserPost').val(postJSON.pubDescribe);


    });
}
function reloadNewUserTable(){
    $('#newName').val('');
    $('#newAge').val('');
    $('#newEmail').val('');
    $('#newPassword').val('');
    $('#newConfirmPassword').val('');
    $("#New_ROLE_USER").prop('checked', false);
    $("#New_ROLE_ADMIN").prop('checked', false);
}
function reloadNewPostTable(){
    $('#newPostName').val('');
    $('#newAuthor').val('');
    $('#newPubDate').val('');
    $('#newPubDescribed').val('');
}


$(function () {
    $("#logout").append("<a class='custom-a' href='/logout'>Logout</a>");
    $('#addSubmit').on("click", function () {
        let checked = [];
        $('input:checkbox:checked').each(function () {
            checked.push($(this).val());
        });
        // reloadNewUserTable();
        if ($("#newPassword").val() === ($("#newConfirmPassword").val())) {
            let user = {
                name: $("#newName").val(),
                age: $("#newAge").val(),
                email: $("#newEmail").val(),
                password: $("#newPassword").val(),
                role: checked
            };
            fetch('http://localhost:6060/rest/admin/', {
                method: "POST",
                credentials: 'same-origin',
                body: JSON.stringify(user),
                headers: {
                    'content-type': 'application/json'
                }
            }).then(r => reloadTable());//;
            reloadNewUserTable();
        }
    });

    $('#addPostSubmit').on("click", function () {
        let checked = [];
        $('input:checkbox:checked').each(function () {
            checked.push($(this).val());
        });
        let post = {
            postName: $("#newPostName").val(),
            author: $("#newAuthor").val(),
            pubDate: $("#newPubDate").val(),
            pubDescribe: $("#newPubDescribe").val(),

        };
        fetch('http://localhost:6060/rest/user/post/', {
            method: "POST",
            credentials: 'same-origin',
            body: JSON.stringify(post),
            headers: {
                'content-type': 'application/json'
            }
        }).then(r => reloadUserPostTable());
        reloadNewPostTable();
    });
    $('#modalDeleteBtn').on("click", function () {
        fetch('http://localhost:6060/rest/admin/' + $('#idToDeleteUser').val(), {
            method: "DELETE",
            credentials: 'same-origin',
        }).then(r => reloadTable());
    });
    $('#modalAdminDeletePostBtn').on("click", function () {
        fetch('http://localhost:6060/rest/admin/post/' + $('#idToDeletePost').val(), {
            method: "DELETE",
            credentials: 'same-origin',
        }).then(r => reloadAdminPostTable());
    });
    $('#modalUserDeletePostBtn').on("click", function () {
        fetch('http://localhost:6060/user/post/' + $('#idToDeleteUserPost').val(), {
            method: "DELETE",
            credentials: 'same-origin',
        }).then(r => reloadUserPostTable());
    });
    $('#modalEditBtn').on("click", function () {
        let checked = [];
        $('input:checkbox:checked').each(function () {
            checked.push($(this).val());
        });

        let user = {
            id: $('#idToEditUser').val(),
            name: $("#nameToEditUser").val(),
            age: $("#ageToEditUser").val(),
            email: $("#emailToEditUser").val(),
            password: $("#passwordToEditUser").val(),
            role: checked
        };
        fetch('http://localhost:6060/rest/admin/', {
            method: "PUT",
            credentials: 'same-origin',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        }).then(r => reloadTable());
        reloadNewUserTable();
    });
    $('#modalPostEditBtn').on("click", function () {
        let checked = [];
        $('input:checkbox:checked').each(function () {
            checked.push($(this).val());
        });

        let post = {
            id: $('#idToEditPost').val(),
            postName: $("#postNameToEditPost").val(),
            author: $("#authorToEditPost").val(),
            pubDate: $("#pubDateToEditPost").val(),
            pubDescribe: $("#pubDescribeToEditPost").val(),
            user_id: $("#newUserId").val()
        };
        fetch('http://localhost:6060/user/post/', {
            method: "PUT",
            credentials: 'same-origin',
            body: JSON.stringify(post),
            headers: {
                'content-type': 'application/json'
            }
        }).then(r => reloadUserPostTable());
    });
    reloadTable();
    reloadUserPostTable();
    reloadAdminPostTable();
})








