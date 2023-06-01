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
                    // document.getElementById("list").innerHTML = temp;
                    $("#usersTableHere").empty();
                    $("#usersTableHere").append(temp);
                }
            )
        }
    )
}
function reloadPostTable() {
    fetch('http://localhost:6060/rest/post/').then(
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
                            "    <a class='btn btn-danger' role='button' onmouseover='fillDeletePostModal(" + p.id + ")' data-toggle='modal' data-target='#deletePost'>Delete</a>" +
                            "    </td>"
                        temp += "</tr>";
                    })
                    // document.getElementById("list").innerHTML = temp;
                    $("#postsTableHere").empty();
                    $("#postsTableHere").append(temp);
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
function fillEditPostModal(postId) {
    $.get("http://localhost:6060/rest/user/post" + postId, function (postJSON) {
        $('#idToEditPost').val(postJSON.id);
        $('#postNameToEditePost').val(postJSON.postName);
        $('#authorToEditePost').val(postJSON.author);
        $('#pubDateToEditPost').val(postJSON.pubDate);
        $('#pubDescribeToEditPost').val(postJSON.pubDescribe);

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
function fillDeletePostModal(postId) {
    $.get("http://localhost:6060/rest/admin/post" + postId, function (postJSON) {
        $('#idToDeletePost').val(postJSON.id);
        $('#postNameToDeletePost').val(postJSON.postName);
        $('#authorToDeletePost').val(postJSON.author);
        $('#pubDateToDeletePost').val(postJSON.pubDate);
        $('#pubDescribeToDeletePost').val(postJSON.pubDescribe);

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
if ($("#newPassword").val() ===($("#newConfirmPassword").val())){
        let user = {
            name : $("#newName").val(),
            age : $("#newAge").val(),
            email : $("#newEmail").val(),
            password : $("#newPassword").val(),
            role : checked
        };
        fetch('http://localhost:6060/rest/admin/', {
            method: "POST",
            credentials: 'same-origin',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        });
        reloadTable();
        reloadNewUserTable()
        //reloadTable()
    }});
    $('#modalDeleteBtn').on("click", function () {
        fetch('http://localhost:6060/rest/admin/'+ $('#idToDeleteUser').val(), {
            method: "DELETE",
            credentials: 'same-origin',
        });
        reloadTable();
        //reloadTable();
    });
    $('#modalEditBtn').on("click", function () {
        let checked = [];
        $('input:checkbox:checked').each(function () {
            checked.push($(this).val());
        });

        let user = {
            id : $('#idToEditUser').val(),
            name : $("#nameToEditUser").val(),
            age : $("#ageToEditUser").val(),
            email : $("#emailToEditUser").val(),
            password : $("#passwordToEditUser").val(),
            role : checked
        };
        fetch('http://localhost:6060/rest/admin/', {
            method: "PUT",
            credentials: 'same-origin',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        });
        reloadTable();
       // reloadTable();
        //reloadNewUserTable();
    });
});
reloadTable();
$(function () {

    $('#addSubmit').on("click", function () {
        let checked = [];
        $('input:checkbox:checked').each(function () {
            checked.push($(this).val());
        });
            let post = {
                postName : $("#newPostName").val(),
                author : $("#newAuthor").val(),
                pubDate : $("#newPubDate").val(),
                pubDescribe : $("#newPubDescribe").val()
            };
            fetch('http://localhost:6060/rest/user/post', {
                method: "POST",
                credentials: 'same-origin',
                body: JSON.stringify(post),
                headers: {
                    'content-type': 'application/json'
                }
            });
            reloadPostTable();
            reloadNewPostTable()
            //reloadTable()
        });
    $('#modalDeleteBtn').on("click", function () {
        fetch('http://localhost:6060/rest/admin/post'+ $('#idToDeletePost').val(), {
            method: "DELETE",
            credentials: 'same-origin',
        });
        reloadPostTable();
        //reloadTable();
    });
    $('#modalEditBtn').on("click", function () {
        let checked = [];
        $('input:checkbox:checked').each(function () {
            checked.push($(this).val());
        });

        let post = {
            id : $('#idToEditPost').val(),
            name : $("#postNameToEditPost").val(),
            age : $("#authorToEditPost").val(),
            email : $("#pubDateToEditPost").val(),
            password : $("#pubDescribeToEditPost").val(),
            role : checked
        };
        fetch('http://localhost:6060/rest/admin/', {
            method: "PUT",
            credentials: 'same-origin',
            body: JSON.stringify(post),
            headers: {
                'content-type': 'application/json'
            }
        });
        reloadPostTable();
        // reloadTable();
        //reloadNewUserTable();
    });
});
reloadPostTable();