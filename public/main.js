$('.add-student').click(function () {
    $('header').addClass("hide");
    $('.form-add').addClass('show');
});
$('.back').click(function () {
    $('.form-add').removeClass('show');
    $('header').removeClass('hide');
    $('header').addClass("show");
    $('.form-edit').removeClass('show');
    $('header').removeClass('hide');
    $('header').addClass("show");
});
let isEmailAddress = email => {
    return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email) || /w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/.test(email);
}
let courseApi = 'http://localhost:3000/users';
function loadDocJQuery() {
    $.ajax(courseApi, {
        method: "GET"
    }).done(function (users) {
        let content = "";

        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            content += `<tr>
                <td>${user.name}</td>
                <td>${user.birthday}</td>
                <td>${user.email}</td>
                <td>${user.phone} </td>
                <td class="fix-student">
                            <div class="edit">
                                <i class="fas fa-edit"></i>
                                <span onclick=editor()>Chỉnh sửa</span>
                            </div>
                            <div class="border-a"></div>
                            <div class="delete">
                                <i class="far fa-trash-alt"></i>
                                <span onclick=deleteEdit(${user.id})>Xóa</span>
                            </div>
                        </td>
                </tr>`;
        }
        $("#table-users").html(content);
    });
}
$(function () {
    loadDocJQuery();
});
$('.save').click(function () {
    let name = $('#name').val();
    let birthday = $('#birthday').val();
    let email = $('#email').val();
    let phone = $('#phone').val();
    // Name
    if (_.isEmpty(name)) {
        name = "";
        $('#name-error').text('Vui lòng nhập họ và tên')
    } else if (name.trim().length <= 2) {
        name = "";
        $('#name-error').text('Họ và tên không được nhỏ hơn 2 kí tự')
    } else if (name.trim().length > 50) {
        name = "";
        $('#name-error').text('Họ và tên quá dài')
    }
    else {
        $('#name-error').text('')
    }
    // birthday
    if (_.isEmpty(birthday)) {
        birthday = ""
        $('#ngaysinh-error').text('Vui lòng nhập dữ liệu')
    }
    else {
        $('#ngaysinh-error').text('')
    }
    // Email
    if (_.isEmpty(email)) {
        email = "";
        $('#email-error').text('Vui lòng nhập Email')
    } else if (!isEmailAddress(email)) {
        email = "";
        $('#email-error').text('Email không đúng')
    }
    else {
        $('#email-error').text('')
    }
    // Phone
    if (_.isEmpty(phone)) {
        phone = "";
        $('#phone-error').text('Vui lòng nhập Số điện thoại')
    } else if (phone.trim().length > 10) {
        phone = "";
        $('#phone-error').text('Số điện thoại không chính xác')
    } else if (phone.trim().length < 10) {
        phone = "";
        $('#phone-error').text('Số điện thoại không chính xác')
    }
    else {
        $('#email-error').text('')
    }
   let agrs = {
        url: courseApi, // gửi ajax đến file result.php
        type: "POST", // chọn phương thức gửi là post
        dataType: "text", // dữ liệu trả về dạng text
        data: { // Danh sách các thuộc tính sẽ gửi đi
            name: name,
            birthday: birthday,
            email: email,
            phone: phone
        },
        success: function (result) {
            // Sau khi gửi và kết quả trả về thành công thì gán nội dung trả về
            // đó vào thẻ div có id = result
            $('#table-users').html(result);
        }
    };

    // Truyền object vào để gọi ajax
    $.ajax(agrs);
});
function deleteEdit(id) {
    let formData = {
        method: 'DELETE',
        Headers: {
            'Content-Type': 'application/json'
        },
    };
    fetch(courseApi + '/' + id, formData)
        .then(function (loadDocJQuery) {
            loadDocJQuery.json();
        })
        .then(function () {
            loadDocJQuery();
        });

}

